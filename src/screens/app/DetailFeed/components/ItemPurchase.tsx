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
import {ic_purchase} from '@images';
import {IDataListFeed} from '../../Feed/type';
import {colors, heightScreen, widthScreen} from '@stylesCommon';
import {useVideo} from './Container';

interface ItemPurchaseProps {
  item: IDataListFeed;
}

const ItemPurchase = (props: ItemPurchaseProps) => {
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
    <View style={{flex: 1}}>
      <ImageBackground
        resizeMode={'contain'}
        source={{uri: props.item.thumbnail}}
        style={styles.container}>
        <View style={styles.containerBg}>
          <Image source={ic_purchase} />
          <Text style={styles.textPurchase}>
            This video has been locked. Please purchase to continue.
          </Text>
          <TouchableOpacity style={styles.buttonPurchase}>
            <Text style={styles.textButtonPurchase}>
              {formatPrice(props?.item?.price_vn || '')} VND
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ItemPurchase;

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
});
