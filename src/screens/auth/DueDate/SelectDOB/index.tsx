import {AppButton, AppDatePicker, Header} from '@component';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {t} from 'i18next';
import moment from 'moment';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const SelectDOB = () => {
  const [date, setDate] = useState<any>(moment());

  const handlePressButton = () => {
    navigate(ROUTE_NAME.ON_BOARDING);
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <Text style={[styles.text, styles.textTitle]}>
          {t('chooseDueDate.titleQuestion1')}
        </Text>
        <AppDatePicker
          onChange={(newDate: any) => {
            setDate(newDate);
          }}
          minimumDate={new Date()}
          style={{marginTop: scaler(80)}}
        />
        <AppButton
          titleButton={t('chooseDueDate.save')}
          customStyleButton={styles.button}
          customStyleText={styles.textButton}
          onClick={handlePressButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  contentContainer: {
    paddingHorizontal: scaler(16),
  },
  text: {
    color: colors.white,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
    lineHeight: scaler(21),
    marginTop: scaler(40),
  },
  textTitle: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(32),
    lineHeight: scaler(48),
    marginBottom: scaler(12),
  },
  button: {
    backgroundColor: colors.white,
    marginTop: scaler(103),
  },
  textButton: {
    color: colors.brandMainPinkRed,
  },
});
