import React, {useEffect, useRef, useState} from 'react';
import {View, Text, ScrollView, FlatList, ListRenderItem} from 'react-native';
import {styles} from './styles';
import {Header, PickerWeek, ViewButton} from '@component';
import {SvgArrowLeft} from '@images';
import {useTranslation} from 'react-i18next';
import {colors} from '@stylesCommon';
import {useSelector} from 'react-redux';
import {GlobalService, getSizeComparison} from '@services';

import {Body} from './component/Body';
import {Embryo} from './component/Embryo';
import {Size} from './component/Size';
import {useRoute} from '@react-navigation/native';
import {trackingAppEvent, event, useUXCam} from '@util';
import {ROUTE_NAME} from '@routeName';

const SizeComparison = () => {
  const route = useRoute<any>();
  const {option} = route?.params;
  const {t} = useTranslation();
  const [status, setStatus] = useState(option);
  const [data, setData] = useState<any>(null);
  const [weekLocal, setWeekLocal] = useState(null);

  useUXCam(ROUTE_NAME.SIZE_COMPARISON);

  const refList = useRef<FlatList>(null);

  const week =
    useSelector(
      (state: any) => state?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks,
    ) ?? 40;

  const renderView = () => {
    switch (status) {
      case 1:
        return <Size data={data?.baby_size} week={weekLocal} />;
      case 2:
        return <Embryo data={data?.baby} week={weekLocal} />;
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
        refList?.current?.scrollToOffset({animated: true, offset: 0});
      }, 50);
      const res = await getSizeComparison(value);
      setData(res.data);
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
    </View>
  );
};

export {SizeComparison};
