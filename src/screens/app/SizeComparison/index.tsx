import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Header, PickerWeek, ViewButton} from '@component';
import {SvgArrowLeft, SvgMessages3} from '@images';
import {useNavigation, useRoute} from '@react-navigation/native';
import {updateDataHome} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {GlobalService, answerDailyQuiz, getSizeComparison} from '@services';
import {colors} from '@stylesCommon';
import {event, trackingAppEvent, useUXCam} from '@util';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {ListPostComponent} from '../Home/ListPostComponent';
import {ViewQuiz} from '../Home/components';
import {Body} from './component/Body';
import {Embryo} from './component/Embryo';
import {Size} from './component/Size';
import {styles} from './styles';

const SizeComparison = () => {
  const dispatch = useDispatch();
  const route = useRoute<any>();
  const {option} = route?.params;
  const weekNotifi = route?.params?.week;
  const {t} = useTranslation();
  const [status, setStatus] = useState(option);
  const [data, setData] = useState<any>(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<any>();
  const homeData = useSelector((state: any) => state?.home);
  const weekPregnant =
    useSelector(
      (state: any) => state?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks,
    ) ?? 40;
  const week = weekNotifi ? weekNotifi : weekPregnant;

  useUXCam(ROUTE_NAME.SIZE_COMPARISON);
  const getData = async (value: any) => {
    setSelectedWeek(value);
    try {
      GlobalService.showLoading();
      setTimeout(() => {
        flatListRef?.current?.scrollToOffset({animated: true, offset: 0});
      }, 50);
      const res = await getSizeComparison(value);
      setData(res?.data);
    } catch (error) {
    } finally {
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
  const renderBodyByStatus = () => {
    switch (status) {
      case 1:
        return <Size data={data?.baby_size} week={selectedWeek} />;
      case 2:
        return <Embryo data={data?.baby} week={selectedWeek} />;
      case 3:
        return <Body data={data?.mom} week={selectedWeek} />;
      default:
        return null;
    }
  };
  const renderView = () => {
    return (
      <View>
        {renderBodyByStatus()}
        <ListPostComponent
          loading={homeData?.loading}
          posts={homeData?.data?.posts}
          cardBorderStyle={{
            borderWidth: 1,
            borderColor: '#F5F5F5',
          }}
        />
        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => navigation.navigate(ROUTE_NAME.CREATE_NEWPOST)}>
          <SvgMessages3 />
          <Text style={styles.titleButton}>{t('home.createPost')}</Text>
        </TouchableOpacity>
        {homeData?.data?.dailyQuizz ? (
          <ViewQuiz onAnswer={onAnswerQuiz} />
        ) : null}
        {/* <BannerTestQuiz /> */}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header
        title={t('sizeComparison.titleHeader')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      <PickerWeek
        customStyleContainer={styles.containerPicker}
        onSelect={(value: any) => {
          trackingAppEvent(event.BABY_TRACKER.BABY_TRACKER_CHANGE_WEEK, {
            content: value,
          });
          getData(value);
        }}
        weekNotifi={week}
      />
      <FlatList
        data={[1]}
        ref={flatListRef}
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
      <FLoatingAIButton />
    </View>
  );
};
export {SizeComparison};
