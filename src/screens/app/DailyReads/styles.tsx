import {colors, scaler, stylesCommon} from '@stylesCommon';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  textTitle: {
    marginTop: scaler(32),
    marginBottom: scaler(20),
    ...stylesCommon.fontWeight600,
    fontSize: scaler(16),
    lineHeight: 19,
    color: colors.textColor,
  },
  flatList: {
    flexGrow: 1,
    paddingBottom: scaler(450),
  },
  textNoData: {
    textAlign: 'center',
    marginBottom: scaler(40),
    marginTop: scaler(24),
    color: colors.borderColor,
    fontStyle: 'italic',
  },
});
