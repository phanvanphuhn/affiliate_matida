import {StyleSheet} from 'react-native';
import {stylesCommon, scaler, colors} from '@stylesCommon';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: scaler(20),
  },
  body: {
    flex: 1,
    paddingTop: scaler(47),
  },
  text: {
    color: colors.white,
    fontSize: scaler(18),
    ...stylesCommon.fontWeight400,
    lineHeight: scaler(21),
  },
  textTitle: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(32),
    lineHeight: scaler(48),
    marginBottom: scaler(12),
  },
  textLink: {
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: colors.white,
    marginTop: scaler(20),
    marginBottom: scaler(51),
  },
  textButton: {
    color: colors.brandMainPinkRed,
    fontSize: scaler(16),
    lineHeight: scaler(19),
    ...stylesCommon.fontWeight600,
  },
  selectionMethod: {
    marginTop: scaler(80),
  },
  textDescription: {
    marginBottom: scaler(80),
  },
});
