import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {scaler} from '@stylesCommon';
import {
  AppButton,
  AppDatePicker,
  AppRadioButton,
  Header,
  ModalMethodCalculation,
  SelectionPicker,
} from '@component';
import {styles} from '../styles';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {getCycleLength, getIVFdays, getMethod, IItem} from './handle';
import {CalculationMethod} from './_type';
import {trackingAppEvent, event, useUXCam} from '@util';
import {calculateDate, GlobalService} from '@services';
import moment from 'moment';
import {navigate} from '@navigation';

const CalculateDueDateScreenApp = (props: any) => {
  const {route} = props;
  const listMethod = getMethod();
  const listCycleLength = getCycleLength();
  const listIVFdays = getIVFdays();
  const navigation = useNavigation<any>();

  const {t} = useTranslation();
  const [method, setMethod] = useState<string | number>(listMethod[0].value);
  const [cycleLength, setCycleLength] = useState<string>('TWENTY_EIGHT');
  const [daysIVF, setDaysIVF] = useState<string>('IVF3');
  const [date, setDate] = useState<any>(moment());
  useUXCam(ROUTE_NAME.CALCULATE_DUE_DATE_APP);

  const handlePressButton = async () => {
    GlobalService.showLoading();
    const body = {
      calc_method: 0,
      date: moment(date).format('MM/DD/YYYY'),
      cycle_length: cycleLength,
    };
    const body2 = {
      calc_method: 1,
      date: moment(date).format('MM/DD/YYYY'),
      ivf_day: daysIVF,
    };

    if (route?.params?.isAddNewBaby) {
      const res = await calculateDate(
        method === 'FIRST_DAY_OF_LAST_PERIOD' ? body : body2,
      );
      console.log('res: ', res?.data?.resultPeriod?.dueDate);
      route?.params?.setState({
        due_date: moment(
          res?.data?.resultPeriod?.dueDate || res?.data?.resultIVF?.dueDate,
          'MM/DD/YYYY',
        ).format('MM/DD/YYYY'),
        body: res,
      });
      navigate(ROUTE_NAME.ADD_NEW_BABY, {
        type: 'Caculate',
      });
      GlobalService.hideLoading();
    } else {
      try {
        const res = await calculateDate(
          method === 'FIRST_DAY_OF_LAST_PERIOD' ? body : body2,
        );
        navigation.navigate(ROUTE_NAME.RESULT_DUE_DATE_APP, {
          data: res?.data,
          type: 'Caculate',
        });
        GlobalService.hideLoading();
      } catch (error) {
        GlobalService.hideLoading();
      }
    }
  };

  return (
    <View style={[styles.container, {paddingHorizontal: 0}]}>
      <Header />
      <View style={styles.container}>
        <ScrollView
          style={styles.body}
          bounces={false}
          contentContainerStyle={{paddingBottom: scaler(30)}}
          showsVerticalScrollIndicator={false}>
          <Text style={[styles.text, styles.textTitle]}>
            {method === CalculationMethod.IVF
              ? t('calculateDueDate.calculateDuaDate')
              : t('calculateDueDate.whenBabyDue')}
          </Text>
          <Text style={[styles.text, styles.textDescription]}>
            {method === CalculationMethod.IVF
              ? t('calculateDueDate.calculateDuaDateDescription')
              : t('calculateDueDate.whenBabyDueDescription')}
          </Text>
          <ModalMethodCalculation
            titleSelection={t('CalculationMethod.method')}
            value={method}
            onPress={setMethod}
          />
          <View style={{marginVertical: scaler(20)}}>
            <AppDatePicker
              title={
                method === CalculationMethod.IVF
                  ? t('CalculationMethod.dateOfTransfer')
                  : t('CalculationMethod.first_day_of_last_period')
              }
              onChange={(date: any) => setDate(date)}
              maximumDate={new Date()}
              minimumDate={
                new Date(new Date().setMonth(new Date().getMonth() - 9))
              }
            />
          </View>
          {method === CalculationMethod.FIRST_DAY_OF_LAST_PERIOD ? (
            <SelectionPicker
              titleSelection={t('FirstDayLastPeriod.cycle_length')}
              value={cycleLength}
              listItem={listCycleLength}
              onPress={setCycleLength}
            />
          ) : (
            <AppRadioButton
              listItem={listIVFdays}
              value={daysIVF}
              onChange={setDaysIVF}
            />
          )}
          <AppButton
            titleButton={t('CalculationMethod.calculate')}
            customStyleButton={styles.button}
            customStyleText={styles.textButton}
            onClick={handlePressButton}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default CalculateDueDateScreenApp;
