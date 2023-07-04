import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

export const ProgressBar = ({
  now,
  total,
  segmentNumber = 0,
  styleProgressBar,
}: {
  now: number;
  total: number;
  segmentNumber?: number;
  styleProgressBar?: StyleProp<ViewStyle>;
}) => {
  const width = !!total
    ? (now / total) * 100 < 100
      ? (now / total) * 100
      : 100
    : 0;
  return (
    <View style={[styles.progressBar, styleProgressBar]}>
      <View style={[styles.progress, {width: `${width}%`}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    backgroundColor: colors.green50,
    height: scaler(8),
    borderRadius: scaler(200),
    // flex: 1,
    width: scaler(134),
  },
  progress: {
    height: '100%',
    backgroundColor: colors.success_message,
    borderRadius: scaler(200),
    position: 'absolute',
  },
});
