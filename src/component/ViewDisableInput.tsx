import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {colors, stylesCommon, scaler} from '@stylesCommon';

const ViewDisableInput = React.memo((props: any) => {
  const {label, value, style} = props;

  return (
    <View style={[styles.inputWrap, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  inputWrap: {
    height: scaler(54),
    flexDirection: 'row',
    backgroundColor: '#F6F4F6',
    paddingHorizontal: scaler(12),
    alignItems: 'center',
    borderRadius: scaler(12),
  },
  label: {
    position: 'absolute',
    left: scaler(12),
    ...stylesCommon.fontWeight500,
    fontSize: scaler(12),
    color: colors.primary,
    top: scaler(3),
  },
  value: {
    paddingVertical: 0,
    width: '100%',
    alignItems: 'center',
    fontSize: scaler(14),
    ...stylesCommon.fontWeight500,
    marginTop: scaler(28),
    marginBottom: scaler(9),
    color: colors.textColor,
  },
});

export {ViewDisableInput};
