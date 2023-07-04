import {SvgClose} from '@images';
import {stylesCommon, scaler, colors} from '@stylesCommon';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export const HeaderFilter = ({
  onPress,
  title,
}: {
  onPress: () => void;
  title: string;
}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text
        style={{
          ...stylesCommon.fontWeight600,
          fontSize: scaler(16),
          color: colors.textColor,
          padding: scaler(16),
        }}>
        {title}
      </Text>
      <TouchableOpacity
        style={{padding: scaler(16)}}
        onPress={onPress}
        activeOpacity={0.9}>
        <SvgClose />
      </TouchableOpacity>
    </View>
  );
};
