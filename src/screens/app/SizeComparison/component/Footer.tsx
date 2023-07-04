import {ViewProgress} from '@component';
import {WEEK_MAX} from '@constant';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {t} from 'i18next';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
interface IProps {
  week: number;
  title: number;
}

export const Footer = ({week, title}: IProps) => {
  const isOverDate = week > WEEK_MAX;
  if (isOverDate) {
    <Text style={styles.textOver}>Your due date has arrived</Text>;
  }
  return (
    <ViewProgress
      title={title}
      content={t('sizeComparison.titleProgress')}
      width={(week / (title + week)) * 100}
    />
  );
};

const styles = StyleSheet.create({
  textOver: {
    textAlign: 'center',
    fontSize: scaler(16),
    marginVertical: scaler(14),
    ...stylesCommon.fontWeight600,
    color: colors.red,
  },
});
