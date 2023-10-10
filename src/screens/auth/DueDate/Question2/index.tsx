/* eslint-disable @typescript-eslint/no-unused-vars */
import {AppButton, AppInput, Header} from '@component';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {t} from 'i18next';
import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {trackTellMeMoreClicked} from '@services/webengageManager.tsx';

export const Question2 = () => {
  const handlePressButton = () => {
    trackHowDidYouHear();
    navigate(ROUTE_NAME.QUESTION3_ONBOARDING);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.contentContainer}>
        <Text style={[styles.text, styles.textTitle]}>
          {t('chooseDueDate.titleQuestion2')}
        </Text>
        <View style={styles.viewInput}>
          <TextInput
            style={[styles.input]}
            placeholder={t('chooseDueDate.placeHolderQuestion2').toString()}
            placeholderTextColor={'rgba(255,255,255,0.5)'}
            multiline
          />
        </View>
        <View style={styles.viewButton}>
          <AppButton
            titleButton={t('chooseDueDate.submit')}
            customStyleButton={styles.button}
            customStyleText={styles.textButton}
            customStyleDisable={styles.disableButton}
            disable
            // onClick={handlePressButton}
          />
          <View style={{width: scaler(16)}} />
          <AppButton
            titleButton={t('chooseDueDate.skip')}
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
  input: {
    maxHeight: scaler(100),
    color: 'white',
    fontSize: scaler(14),
    paddingTop: 13,
    paddingHorizontal: scaler(12),
  },
  viewInput: {
    height: scaler(100),
    borderRadius: scaler(8),
    backgroundColor: '#AE5151',
  },
});
