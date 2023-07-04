import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';

export const ViewEmpty = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.viewEmpty}>
      <Text style={styles.txtEmpty}>{t('test.noData')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewEmpty: {
    alignItems: 'center',
    marginTop: scaler(20),
  },
  txtEmpty: {
    ...stylesCommon.fontWeight500,
    color: colors.borderColor,
    fontSize: scaler(14),
  },
});
