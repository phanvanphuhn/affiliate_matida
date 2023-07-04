import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';

import {AppButton, Header} from '@component';
import {styles} from '../styles';
import {stylesScreen} from './styles';
import {useNavigation} from '@react-navigation/native';

import {Lemon} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {useDispatch} from 'react-redux';
import {changeStatusLogin} from '@redux';
import {useTranslation} from 'react-i18next';
import {trackingAppEvent, event, useUXCam} from '@util';
import {getDueDate, GlobalService} from '@services';

const ResultDueDateScreen = (props: any) => {
  const {t} = useTranslation();
  const {route} = props;
  const {data} = route?.params;
  const navigation = useNavigation<any>();
  const [detail, setDetail] = useState<any>(null);

  const dispatch = useDispatch();

  // const getDataConfig = async () => {
  //   try {
  //     GlobalService.showLoading();
  //     const res = await getDueDate();
  //     setDetail(res?.data);
  //     GlobalService.hideLoading();
  //   } catch (error) {
  //     GlobalService.hideLoading();
  //   }
  // };

  useEffect(() => {
    // getDataConfig();
    trackingAppEvent(event.SCREEN.RESULT_DUE_DATE, {});
  }, []);

  useUXCam(ROUTE_NAME.RESULT_DUE_DATE);

  const handlePressButton = () => {
    dispatch(changeStatusLogin(true));
  };

  return (
    <View style={[styles.container, {paddingHorizontal: 0}]}>
      <Header />
      <View style={styles.container}>
        <View style={[styles.body, stylesScreen.body]}>
          <Image
            source={{uri: `${data?.image?.url}`}}
            style={stylesScreen.icon}
          />
          <Text style={stylesScreen.text}>
            {data?.text || data?.textPeriod || data?.textIVF}
          </Text>
          <AppButton
            titleButton={t('calculateDueDate.tellMeMore')}
            customStyleButton={[styles.button, stylesScreen.button]}
            customStyleText={styles.textButton}
            onClick={handlePressButton}
          />
        </View>
      </View>
    </View>
  );
};

export default ResultDueDateScreen;
