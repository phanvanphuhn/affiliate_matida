import {SvgLockPayment} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {ViewLockProps} from './type';
export const ViewLock = ({
  borderRadius = scaler(8),
  opacity,
  style,
  showText = false,
  absolute = false,
  icon,
}: ViewLockProps) => {
  const {t} = useTranslation();
  return (
    <View
      style={[
        styles.container,
        {
          borderRadius,
          backgroundColor: opacity ? `${colors.black}${opacity}` : opacity,
        },
        absolute && styles.viewAbsolute,
        style,
      ]}>
      <>{icon || <SvgLockPayment />}</>
      {showText ? (
        <Text style={styles.txtPremium}>{t('payment.premium')}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtPremium: {
    fontSize: scaler(12),
    color: colors.white,
    ...stylesCommon.fontWeight400,
    paddingHorizontal: scaler(24),
    textAlign: 'center',
    marginTop: scaler(18),
  },
  viewAbsolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
