import {AppButton, AppDatePicker, Header} from '@component';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {GlobalService, updateUserBirth} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {t} from 'i18next';
import moment from 'moment';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';

export const SelectDOB = () => {
  const crrDate = new Date(2000, 1, 29);
  // crrDate.setFullYear(2000);

  const [date, setDate] = useState<any>(crrDate);

  const handlePressButton = async () => {
    try {
      GlobalService.showLoading();
      const res = await updateUserBirth({
        date_of_birth: moment(date).format('YYYY-MM-DD'),
      });
      showMessage({
        message: res?.data?.message,
        type: 'default',
        backgroundColor: colors.success_message,
      });
      navigate(ROUTE_NAME.ON_BOARDING);
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const onSKip = () => {
    navigate(ROUTE_NAME.ON_BOARDING);
  };
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.contentContainer}>
        <Text style={[styles.text, styles.textTitle]}>
          {t('chooseDueDate.titleQuestion1')}
        </Text>
        <AppDatePicker
          onChange={(newDate: any) => {
            setDate(newDate);
          }}
          // minimumDate={new Date()}
          dataDate={date}
          style={{marginTop: scaler(80)}}
        />
        <View style={styles.viewButton}>
          <AppButton
            titleButton={t('chooseDueDate.skip')}
            customStyleButton={styles.button}
            customStyleText={styles.textButton}
            customStyleDisable={styles.disableButton}
            onClick={onSKip}
          />
          <View style={{width: scaler(16)}} />
          <AppButton
            titleButton={t('chooseDueDate.save')}
            customStyleButton={styles.button}
            customStyleText={styles.textButton}
            onClick={handlePressButton}
          />
        </View>
      </ScrollView>
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
    flexShrink: 1,
    flexGrow: 0,
  },
  disableButton: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  viewButton: {
    flexDirection: 'row',
    gap: scaler(16),
  },
  textButton: {
    color: colors.brandMainPinkRed,
  },
});
