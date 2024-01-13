import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ViewLockPaymentProps} from './type';
import {ViewLock} from './ViewLock';
import {ViewPrice} from './ViewPrice';
import {iconCrownWhite, iconFlowerWhite} from '@images';
import {useTranslation} from 'react-i18next';

export const ViewLockPayment = ({
  borderRadius = scaler(8),
  opacity = 'ba',
  style,
  price,
  icon,
  styleLock,
  stylePrice,
}: ViewLockPaymentProps) => {
  const {t} = useTranslation();

  return (
    <>
      <View
        style={[
          styles.container,
          {
            borderRadius,
            // backgroundColor:
            //   opacity === 0
            //     ? undefined
            //     : `${colors.black10}${opacity < 1 ? `${opacity * 100}` : ''}`,
            backgroundColor: '#000000ba',
            flexDirection: 'row',
          },
          style,
        ]}>
        <Image
          source={iconFlowerWhite}
          style={{
            height: scaler(20),
            width: scaler(20),
            // marginRight: scaler(8),
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: scaler(8),
          paddingHorizontal: scaler(12),
          backgroundColor: colors.pink4,
          borderRadius: scaler(24),
          position: 'absolute',
          top: '40%',
          left: '27%',
        }}>
        <Image
          source={iconCrownWhite}
          style={{
            height: scaler(16),
            width: scaler(16),
            marginRight: scaler(8),
          }}
        />
        <Text
          style={{
            ...stylesCommon.fontSarabun600,
            fontSize: scaler(13),
            color: colors.white,
          }}>
          {t('myPurchases.signUpNow')}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingVertical: scaler(14),
    paddingHorizontal: scaler(12),
  },
  textPrice: {
    color: colors.red50,
    fontSize: scaler(10),
    ...stylesCommon.fontWeight800,
  },
});
