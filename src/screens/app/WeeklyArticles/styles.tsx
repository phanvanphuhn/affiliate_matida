import {colors, scaler, stylesCommon} from '@stylesCommon';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textSeeMore: {
    color: colors.brandMainPinkRed,
    fontSize: scaler(12),
    lineHeight: 18,
    ...stylesCommon.fontWeight400,
  },
  textTitle: {
    color: colors.textColor,
    fontSize: scaler(16),
    ...stylesCommon.fontWeight600,
    lineHeight: 19,
    paddingBottom: scaler(10),
    paddingTop: scaler(10),
  },
  containerPicker: {
    paddingBottom: scaler(20),
    marginTop: scaler(16),
  },
});
