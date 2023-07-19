import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Header, PickerWeek, ViewButton } from '@component';
import { SvgArrowLeft, SvgMessages3 } from '@images';
import { useTranslation } from 'react-i18next';
import { colors } from '@stylesCommon';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateDataHome,
} from '@redux';
import { GlobalService, getSizeComparison, answerDailyQuiz } from '@services';

import { Body } from './component/Body';
import { Embryo } from './component/Embryo';
import { Size } from './component/Size';
import { useNavigation, useRoute } from '@react-navigation/native';
import { trackingAppEvent, event, useUXCam } from '@util';
import { ROUTE_NAME } from '@routeName';
import { ListPostComponent } from '../Home/ListPostComponent';
import { ViewQuiz, BannerTestQuiz } from '../Home/components';


const SizeComparison = () => {
  const dispatch = useDispatch();
  const route = useRoute<any>();
  const { option } = route?.params;
  const { t } = useTranslation();
  const [status, setStatus] = useState(option);
  const [data, setData] = useState<any>(null);
  const [weekLocal, setWeekLocal] = useState(null);

  useUXCam(ROUTE_NAME.SIZE_COMPARISON);

  const refList = useRef<FlatList>(null);

  const loading = useSelector((state: any) => state?.home?.loading);
  const dataHome = useSelector((state: any) => state?.home?.data);
  const navigation = useNavigation<any>();

  const week =
    useSelector(
      (state: any) => state?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks,
    ) ?? 40;

  const renderView = () => {
    switch (status) {
      case 1:
        return <Size data={data?.baby_size} week={weekLocal} />;
      case 2:
        return <View>
          <Embryo data={data?.baby} week={weekLocal} />

          <ListPostComponent loading={loading} posts={dataHome?.posts} />

          <TouchableOpacity
            style={styles.createPostButton}
            onPress={() => navigation.navigate(ROUTE_NAME.CREATE_NEWPOST)}>
            <SvgMessages3 />
            <Text style={styles.titleButton}>{t('home.createPost')}</Text>
          </TouchableOpacity>

          {dataHome?.dailyQuizz ? <ViewQuiz onAnswer={onAnswerQuiz} /> : null}

          <BannerTestQuiz />
        </View>;
      case 3:
        return <Body data={data?.mom} week={weekLocal} />;
      default:
        return <></>;
    }
  };

  const getData = async (value: any) => {
    setWeekLocal(value);
    try {
      GlobalService.showLoading();
      setTimeout(() => {
        refList?.current?.scrollToOffset({ animated: true, offset: 0 });
      }, 50);
      const res = await getSizeComparison(value);
      setData(res.data);
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const onAnswerQuiz = async (value: any) => {
    try {
      GlobalService.showLoading();
      const res = await answerDailyQuiz(value);
      dispatch(
        updateDataHome({
          ...data,
          dailyQuizz: {
            ...data?.dailyQuizz,
            ...res?.data,
          },
        }),
      );
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  useEffect(() => {
    trackingAppEvent(event.SCREEN.SIZE_COMPARISON, {});
    if (week) {
      getData(week);
    }
  }, [week]);

  return (
    <View style={styles.container}>
      <Header
        title={t('sizeComparison.titleHeader')}
        // title=""
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      <PickerWeek
        customStyleContainer={styles.containerPicker}
        onSelect={(value: any) => getData(value)}
      />

      <FlatList
        data={[1]}
        ref={refList}
        renderItem={() => {
          return (
            <ViewButton
              onChangeState={(value: any) => setStatus(value)}
              data={data}
              option={option}
            />
          );
        }}
        bounces={false}
        ListFooterComponent={renderView}
      />

      {/* <View>
        <ListPostComponent loading={loading} posts={dataHome?.posts} />

        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => navigation.navigate(ROUTE_NAME.CREATE_NEWPOST)}>
          <SvgMessages3 />
          <Text style={styles.titleButton}>{t('home.createPost')}</Text>
        </TouchableOpacity>
      </View> */}

    </View>
  );
};

export { SizeComparison };
