import {SvgClose} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Text, TouchableOpacity, View} from 'react-native';

export const HeaderModalPost = ({
  onPress,
  title,
  style,
}: {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderColor: '#EAEAEA',
          marginBottom: scaler(16),
          borderTopLeftRadius: scaler(10),
          borderTopRightRadius: scaler(10),
        },
        style,
      ]}>
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
