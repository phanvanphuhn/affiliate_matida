import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';

import {AppButton, Header} from '@component';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../styles';
import {stylesScreen} from './styles';

import {ROUTE_NAME} from '@routeName';
import {useUXCam} from '@util';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {trackTellMeMoreClicked} from '@services/webengageManager.tsx';
import {navigate} from '@navigation';

const ResultDueDateScreenApp = (props: any) => {
  const {t} = useTranslation();
  const {route} = props;
  const {data, type} = route?.params;
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

  useUXCam(ROUTE_NAME.RESULT_DUE_DATE_APP);

  useEffect(() => {
    // getDataConfig();
  }, []);

  const handlePressButton = () => {
    trackTellMeMoreClicked();
    if (route?.params?.isAddNewBaby) {
      navigate(ROUTE_NAME.TAB_HOME);
    } else if (type === 'Choose') {
      navigation.pop(2);
      // navigation.navigate(ROUTE_NAME.SELECT_DOB);
    } else {
      navigation.pop(3);
    }
  };

  return (
    <View style={[styles.container, {paddingHorizontal: 0}]}>
      <Header />
      <View style={styles.container}>
        <View style={[styles.body, stylesScreen.body]}>
          <Image
            source={{uri: `${data?.image?.url}`} || {uri: data?.image}}
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

export default ResultDueDateScreenApp;
