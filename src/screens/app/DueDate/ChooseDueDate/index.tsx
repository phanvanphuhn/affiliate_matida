import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from '../styles';
import {AppButton, Header, AppDatePicker} from '@component';
import {useTranslation} from 'react-i18next';
import {goBack, navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {scaler, colors} from '@stylesCommon';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {trackingAppEvent, event, useUXCam} from '@util';
import {selectDueDate, GlobalService} from '@services';
import {showMessage} from 'react-native-flash-message';
import {trackBirthdateEvent} from '@services/webengageManager.tsx';

const ChooseDueDateScreenApp = (props: any) => {
  const {route} = props;
  const {t} = useTranslation();
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const [date, setDate] = useState<any>(new Date());

  useUXCam(ROUTE_NAME.CHOOSE_DUE_DATE_APP);

  const handlePressButton = async () => {
    if (route?.params?.isAddNewBaby) {
      route?.params?.setState({
        due_date: moment.utc(date).format('MM/DD/YYYY'),
      });
      navigate(ROUTE_NAME.ADD_NEW_BABY);
    } else {
      try {
        GlobalService.showLoading();
        const res = await selectDueDate({
          due_date: moment(date).format('MM/DD/YYYY'),
        });
        trackBirthdateEvent(moment(date).format('MM/DD/YYYY'), false);
        showMessage({
          message: res?.data?.message,
          type: 'default',
          backgroundColor: colors.success_message,
        });
        navigate(ROUTE_NAME.RESULT_DUE_DATE_APP, {
          data: res?.data,
          type: 'Choose',
        });
        GlobalService.hideLoading();
      } catch (error) {
        GlobalService.hideLoading();
      }
    }
  };

  // useEffect(() => {
  //   if (user?.due_date) {
  //     setDate(new Date(user?.due_date));
  //   }
  // }, [user]);

  const navigateToCalculate = () => {
    trackBirthdateEvent("Don't know", true);
    const params = {
      isAddNewBaby: route?.params?.isAddNewBaby,
      state: route?.params?.state,
      setState: route?.params?.setState,
    };
    navigate(ROUTE_NAME.CALCULATE_DUE_DATE_APP, params);
  };

  return (
    <View style={[styles.container, {paddingHorizontal: 0}]}>
      <Header />
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={[styles.text, styles.textTitle]}>
            {t('chooseDueDate.title')}
          </Text>
          <Text style={[styles.text, {marginBottom: scaler(80)}]}>
            {t('chooseDueDate.placeholderText')}
          </Text>
          <AppDatePicker
            dataDate={date}
            onChange={(date: any) => {
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

export default ChooseDueDateScreenApp;
