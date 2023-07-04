import {SvgCalendar} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type Props = {
  label: string;
  value?: string;
  icon: JSX.Element;
  onPress: () => void;
};

export const RoomButtonSelect = ({label, value, icon, onPress}: Props) => {
  return (
    <TouchableOpacity style={s.container} activeOpacity={0.9} onPress={onPress}>
      <Text style={s.text}>{label}</Text>
      {icon}
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    borderRadius: scaler(8),
    paddingHorizontal: scaler(12),
    paddingVertical: scaler(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaler(8),
  },
  text: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    color: colors.textSmallColor,
  },
});
