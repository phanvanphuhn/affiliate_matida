import {noResults, SvgNotResult} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {t} from 'i18next';
import React from 'react';
import {Image, Text, View} from 'react-native';

export const NoResultsFound = () => {
  return (
    <View style={{alignItems: 'center'}}>
      {/* <Image
        source={noResults}
        style={{width: scaler(290)}}
        resizeMode="contain"
      /> */}
      <SvgNotResult style={{marginTop: scaler(60)}} />
      <Text
        style={{
          ...stylesCommon.fontWeight700,
          fontSize: scaler(26),
          color: colors.textPlaceHolder,
          marginTop: scaler(32),
        }}>
        {t('explore.sorry')}
      </Text>
      <Text
        style={{
          ...stylesCommon.fontWeight400,
          fontSize: scaler(14),
          textAlign: 'center',
          marginHorizontal: scaler(50),
          marginTop: scaler(10),
          color: colors.gray200,
        }}>
        {t('explore.notResult')}
      </Text>
    </View>
  );
};
