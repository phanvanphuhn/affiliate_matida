import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';

import {AppButton, Header} from '@component';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../styles';
import {stylesScreen} from './styles';

import {changeStatusLogin} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {event, trackingAppEvent, useUXCam} from '@util';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

const ResultDueDateScreen = (props: any) => {
  const {t} = useTranslation();
  const {route} = props;
  const {data} = route?.params;
  const navigation = useNavigation<any>();

  const dispatch = useDispatch();

  useEffect(() => {
    trackingAppEvent(event.SCREEN.RESULT_DUE_DATE, {});
  }, []);

  useUXCam(ROUTE_NAME.RESULT_DUE_DATE);

  const handlePressButton = () => {
    // dispatch(changeStatusLogin(true));
    navigation.navigate(ROUTE_NAME.SELECT_DOB);
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
