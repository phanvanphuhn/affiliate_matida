import {AppButton, AppDatePicker} from '@component';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler} from '@stylesCommon';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {styles} from '../styles';

import {saveDataUser} from '@redux';
import {GlobalService, selectDueDate, updateUserInfo} from '@services';
import {event, eventType, trackingAppEvent, useUXCam} from '@util';
import {showMessage} from 'react-native-flash-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {trackChildsBirthdate} from '@services/webengageManager.tsx';

const ChooseDueDateScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [date, setDate] = useState<any>(moment());

  useUXCam(ROUTE_NAME.CHOOSE_DUE_DATE);

  useEffect(() => {
    trackingAppEvent(event.SCREEN.CHOOSE_DUE_DATE, {}, eventType.AFF_FLYER);
  }, []);

  const handlePressButton = async () => {
    try {
      GlobalService.showLoading();
      const res = await selectDueDate({
        due_date: moment(date).format('MM/DD/YYYY'),
      });
      trackChildsBirthdate(moment(date).format('MM/DD/YYYY'), false);
      trackingAppEvent(event.LOGIN.CONTINUE, {}, eventType.MIX_PANEL);
      showMessage({
        message: res?.data?.message,
        type: 'default',
        backgroundColor: colors.success_message,
      });
      navigate(ROUTE_NAME.RESULT_DUE_DATE, {data: res?.data});
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const navigateToCalculate = () => {
    trackChildsBirthdate("Don't know", true);
    navigate(ROUTE_NAME.CALCULATE_DUE_DATE);
    // navigate(ROUTE_NAME.ON_BOARDING);
  };

  const handlePressSkip = async () => {
    try {
      GlobalService.showLoading();
      const res: any = await updateUserInfo({
        is_skip: true,
      });
      trackingAppEvent(event.LOGIN.SKIP, {}, eventType.MIX_PANEL);
      dispatch(saveDataUser(res?.data?.user));
      // dispatch(changeStatusLogin(true));
      navigate(ROUTE_NAME.SLIDE_INTRO);
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: colors.transparent,
      });
    } finally {
      GlobalService.hideLoading();
    }
  };

  return (
    <View style={[styles.container, {paddingHorizontal: 0}]}>
      {/* <Header hideLeftButton /> */}
      <SafeAreaView edges={['top']} />
      <AppButton
        titleButton={t('chooseDueDate.skip')}
        customStyleButton={styles.viewSkip}
        customStyleText={styles.textSkip}
        onClick={handlePressSkip}
      />
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={[styles.text, styles.textTitle]}>
            {t('chooseDueDate.title')}
          </Text>
          <Text style={[styles.text, {marginBottom: scaler(80)}]}>
            {t('chooseDueDate.placeholderText')}
          </Text>
          <AppDatePicker
            onChange={(date: any) => {
              trackingAppEvent(
                event.LOGIN.SELECT_DUE_DATE,
                {},
                eventType.MIX_PANEL,
              );
              setDate(date);
            }}
            minimumDate={new Date()}
            maximumDate={
              new Date(new Date().setMonth(new Date().getMonth() + 9))
            }
          />
          <AppButton
            titleButton={t('chooseDueDate.notKnowDueDate')}
            customStyleText={[styles.text, styles.textLink]}
            onClick={navigateToCalculate}
          />
          <AppButton
            titleButton={t('chooseDueDate.save')}
            customStyleButton={styles.button}
            customStyleText={styles.textButton}
            onClick={handlePressButton}
          />
        </View>
      </View>
    </View>
  );
};

export default ChooseDueDateScreen;
