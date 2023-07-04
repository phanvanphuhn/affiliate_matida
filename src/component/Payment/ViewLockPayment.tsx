import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ViewLockPaymentProps} from './type';
import {ViewLock} from './ViewLock';
import {ViewPrice} from './ViewPrice';

export const ViewLockPayment = ({
  borderRadius = scaler(8),
  opacity = 'ba',
  style,
  price,
  icon,
  styleLock,
  stylePrice,
}: ViewLockPaymentProps) => {
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
        <ViewPrice price={price} style={stylePrice} />
        <ViewLock icon={icon} opacity={undefined} style={styleLock} />
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
