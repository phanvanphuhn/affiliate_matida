import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {ic_program, ic_purchase, iconCrownWhite} from '@images';
import {IDataListFeed} from '../../Feed/type';
import {
  colors,
  heightScreen,
  scaler,
  stylesCommon,
  widthScreen,
} from '@stylesCommon';
import {useVideo} from './Container';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import useCheckPregnancy from '@util/hooks/useCheckPregnancy';
import {LazyImage} from '@component';
import {heightFullScreen, widthFullScreen} from '../useDetailFeed';

interface ItemPurchaseProps {
  item: IDataListFeed;
}

const ItemPurchase = (props: ItemPurchaseProps) => {
  const {t} = useTranslation();
  const checkPlan = useCheckPregnancy();

  const formatPrice = (str: string | number) => {
    if (!str) {
      return '';
    }
    let price = parseInt(String(str));
    return price
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      .replace('.00', '')
      .replace(/,/g, '.');
  };

  return (
    <>
      <LazyImage
        source={{
          uri: props.item.image,
        }}
        resizeMode={'cover'}
        fastImage={true}
        style={styles.fullScreen}
      />
      <LinearGradient
        colors={['#0009', '#00000090']}
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopLeftRadius: scaler(8),
          borderTopRightRadius: scaler(8),
        }}>
        <Image
          source={ic_program}
          style={[
            {
              tintColor: colors.white,
              marginBottom: scaler(24),
              height: scaler(56),
              width: scaler(56),
            },
          ]}
        />
        <Text
          style={{
            ...stylesCommon.fontWeight400,
            fontSize: scaler(15),
            color: colors.white,
            marginBottom: scaler(24),
            textAlign: 'center',
          }}>
          {
            ' Nội dung này chỉ dành cho người dùng\nMatida Masterclass. Đăng ký ngay.'
          }
        </Text>
        <TouchableOpacity
          onPress={checkPlan}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: scaler(8),
            paddingHorizontal: scaler(12),
            backgroundColor: colors.pink4,
            borderRadius: scaler(24),
          }}>
          <Image
            source={iconCrownWhite}
            style={{
              height: scaler(24),
              width: scaler(24),
              marginRight: scaler(8),
            }}
          />
          <Text
            style={{
              ...stylesCommon.fontWeight600,
              fontSize: scaler(13),
              color: colors.white,
            }}>
            {t('myPurchases.signUpNow')}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
};

export default React.memo(ItemPurchase);

const styles = StyleSheet.create({
  textButtonPurchase: {
    color: colors.white,
    fontWeight: '700',
  },
  buttonPurchase: {
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginTop: 15,
  },
  textPurchase: {
    color: colors.white,
    paddingHorizontal: '20%',
    textAlign: 'center',
  },
  containerBg: {
    flex: 1,
    backgroundColor: '#00000090',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: widthScreen,
    aspectRatio: Platform.select({
      android: widthScreen / (heightScreen - 27),
      ios: widthScreen / (heightScreen - 65),
    }),
  },
  fullScreen: {
    width: widthFullScreen,
    height: heightFullScreen,
  },
});
