import {colors, scaler, stylesCommon} from '@stylesCommon';
import {DefaultTFuncReturn} from 'i18next';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  title?: string | DefaultTFuncReturn;
};

export const ViewEmpty = ({title}: Props) => {
  const {t} = useTranslation();
  return (
    <View style={styles.viewEmpty}>
      <Text style={styles.txtEmpty}>{title || t('test.noData')}</Text>
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
