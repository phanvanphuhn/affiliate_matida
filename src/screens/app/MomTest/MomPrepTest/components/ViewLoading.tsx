import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export const ViewLoading = () => {
  return (
    <View style={styles.viewLoadMore}>
      <ActivityIndicator color={colors.primary} size="small" />
    </View>
  );
};

const styles = StyleSheet.create({
  viewLoadMore: {
    alignItems: 'center',
    marginTop: scaler(8),
  },
});
