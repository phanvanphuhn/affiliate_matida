import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

export const TicketPrice = () => {
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{t('allRoomMetting.ticketPrice')}</Text>
      <View style={styles.row}>
        <Text style={styles.textCost}>{lang === 1 ? '$4' : 'VND 100.000'}</Text>
        <Text style={styles.textPrice}>
          {lang === 1 ? '$0 (Limited slots)' : 'Free(giới hạn)'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaler(60),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green50,
    marginTop: scaler(16),
    paddingHorizontal: scaler(16),
    justifyContent: 'space-between',
    borderRadius: scaler(4),
  },
  textTitle: {
    color: colors.gray200,
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
  },
  textPrice: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(20),
    marginLeft: scaler(4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  textCost: {
    color: colors.textSmallColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(12),
    textDecorationLine: 'line-through',
  },
});
