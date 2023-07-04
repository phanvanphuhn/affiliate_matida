import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ViewPriceProps} from './type';

export const ViewPrice = ({
  price,
  style,
  onPress,
  endingText,
  button = false,
}: ViewPriceProps) => {
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);

  if (!button) {
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.textPrice}>
          {`${t('payment.pay', {
            money: price?.toLocaleString(),
            currency: 'VND',
          })}${endingText ? `/${endingText}` : ''}`}
        </Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={1}
      onPress={onPress}>
      <Text style={styles.textPrice}>
        {`${t('payment.pay', {
          money: price?.toLocaleString(),
          currency: 'VND',
        })}${endingText ? `/${endingText}` : ''}`}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: scaler(16),
    borderWidth: scaler(2),
    borderColor: colors.red50,
    alignSelf: 'flex-start',
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(8),
  },
  textPrice: {
    color: colors.red50,
    fontSize: scaler(10),
    ...stylesCommon.fontWeight800,
  },
});
