import {StyleSheet} from 'react-native';
import {stylesCommon, colors, scaler} from '@stylesCommon';
import {getBottomSpace} from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
    paddingHorizontal: scaler(16),
  },
  viewContnet: {
    ...stylesCommon.viewContainer,
    paddingTop: scaler(80),
  },
  txtTitle: {
    fontSize: scaler(32),
    color: '#000000',
    ...stylesCommon.fontPlus500,
    marginBottom: scaler(12),
    lineHeight: scaler(48),
  },
  txtContent: {
    color: colors.textPlaceHolder,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
    marginBottom: scaler(14),
  },
  button: {
    marginTop: scaler(18),
    paddingVertical: scaler(10),
    paddingHorizontal: scaler(12),
    borderRadius: scaler(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtButton: {
    color: '#000000',
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    marginLeft: scaler(16),
  },
  buttonBottom: {
    marginBottom: getBottomSpace() + scaler(20),
  },
});

export {styles};
