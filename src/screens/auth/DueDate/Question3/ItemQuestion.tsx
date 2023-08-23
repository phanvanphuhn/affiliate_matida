import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type Props = {
  text: string;
  active: boolean;
  onPress: () => void;
};

export const ItemQuestion = (props: Props) => {
  const {active, text, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={active ? styles.containerActive : styles.container}>
      <Text style={active ? styles.textActive : styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: scaler(8),
    paddingVertical: scaler(8),
    paddingHorizontal: scaler(11),
    backgroundColor: '#AE5151',
    marginTop: scaler(8),
    minHeight: scaler(60),
    justifyContent: 'center',
  },
  containerActive: {
    borderRadius: scaler(8),
    paddingVertical: scaler(8),
    paddingHorizontal: scaler(11),
    backgroundColor: 'white',
    marginTop: scaler(8),
    minHeight: scaler(60),
    justifyContent: 'center',
  },
  text: {
    ...stylesCommon.fontWeight600,
    color: 'white',
    fontSize: scaler(14),
  },
  textActive: {
    ...stylesCommon.fontWeight600,
    color: colors.primary,
    fontSize: scaler(14),
  },
});
