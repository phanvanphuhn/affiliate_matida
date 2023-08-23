import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import {iconEdit} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import reactotron from 'reactotron-react-native';

export const DueDateComponent = (props: any) => {
  const {t} = useTranslation();
  const navigation = useNavigation<any>();
  const {dateValue} = props;

  const handleOnPress = () => {
    reactotron.log?.('NAVIGATE DUEDATE');
    navigation.navigate(ROUTE_NAME.CHOOSE_DUE_DATE_APP, {value: dateValue});
  };

  const convertDat = (value: any) => {
    switch (Number(value)) {
      case 1:
        return t('MonthTime.month_1');
      case 2:
        return t('MonthTime.month_2');
      case 3:
        return t('MonthTime.month_3');
      case 4:
        return t('MonthTime.month_4');
      case 5:
        return t('MonthTime.month_5');
      case 6:
        return t('MonthTime.month_6');
      case 7:
        return t('MonthTime.month_7');
      case 8:
        return t('MonthTime.month_8');
      case 9:
        return t('MonthTime.month_9');
      case 10:
        return t('MonthTime.month_10');
      case 11:
        return t('MonthTime.month_11');
      case 12:
        return t('MonthTime.month_12');
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, styles.textTitle]}>
          {t('profileSettings.dueDate')}
        </Text>
        <Text style={[styles.text, styles.textDate]}>
          {dateValue
            ? `${moment(dateValue).format('DD')} ${convertDat(
                moment(dateValue).format('M'),
              )} ${moment(dateValue).format('YYYY')}`
            : t('profileSettings.noData')}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleOnPress}>
        <Image source={iconEdit} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scaler(8),
    marginTop: scaler(20),
  },
  text: {
    fontSize: scaler(14),
    lineHeight: scaler(17),
    ...stylesCommon.fontWeight500,
  },
  textTitle: {
    color: colors.brandMainPinkRed,
    marginBottom: scaler(4),
    fontSize: scaler(12),
  },
  textDate: {
    color: colors.black,
  },
  button: {
    padding: scaler(10),
    paddingRight: 0,
  },
});
