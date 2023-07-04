import {SvgArrowLeft} from '@images';
import {goBack} from '@navigation';
import {colors, heightScreen, scaler, widthScreen} from '@stylesCommon';
import React, {useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ModalConfirmPay, ModalConfirmPayment} from './ModalConfirmPay';
import {ViewPaymentProps} from './type';
import {ViewLock} from './ViewLock';
import {ViewPrice} from './ViewPrice';

export const ViewPayment = ({
  price,
  flex = false,
  type,
  id,
  onCallBack,
  isPay,
}: ViewPaymentProps) => {
  const insets = useSafeAreaInsets();
  const refPay = useRef<ModalConfirmPayment>(null);

  const handlePressPay = () => {
    refPay.current?.open();
  };

  return (
    <View style={[styles.container, flex && {height: '100%', width: '100%'}]}>
      <View style={styles.body}>
        <View>
          <ViewLock showText opacity={undefined} />
        </View>
        <ViewPrice
          price={price}
          button
          style={{alignSelf: 'center', marginTop: scaler(18)}}
          onPress={handlePressPay}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => goBack()}
        style={[
          {
            top: insets?.top ? insets?.top : scaler(30),
          },
          styles.buttonBack,
        ]}>
        <SvgArrowLeft />
      </TouchableOpacity>
      <ModalConfirmPay
        ref={refPay}
        isPay={isPay}
        price={price}
        type={type}
        id={id}
        onCallBack={onCallBack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: widthScreen,
    height: heightScreen,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `#000000ca`,
  },
  buttonBack: {
    alignSelf: 'flex-start',
    padding: scaler(12),
    position: 'absolute',
    left: scaler(4),
  },
});
