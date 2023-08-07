import {colors, scaler} from '@stylesCommon';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  viewLoadMore: {
    alignItems: 'center',
    marginVertical: scaler(8),
  },
  viewEmpty: {
    alignItems: 'center',
    marginTop: scaler(20),
  },
  textNoData: {
    textAlign: 'center',
    marginBottom: scaler(40),
    marginTop: scaler(24),
    color: colors.borderColor,
    fontStyle: 'italic',
  },
});
