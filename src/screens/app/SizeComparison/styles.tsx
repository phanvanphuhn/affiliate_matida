import {StyleSheet} from 'react-native';
import {scaler, colors, stylesCommon} from '@stylesCommon';
const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  containerPicker: {
    marginTop: scaler(16),
  },
  createPostButton: {
    marginHorizontal: scaler(20),
    width: undefined,
    backgroundColor: colors.white,
    marginBottom: scaler(40),
    flexDirection: 'row',
    height: scaler(48),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaler(8),
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  titleButton: {
    fontSize: scaler(14),
    ...stylesCommon.fontWeight600,
    lineHeight: scaler(21),
    color: colors.primary,
    marginLeft: scaler(11),
  },
  viewLoadmore: {
    alignItems: 'center',
    marginBottom: scaler(8),
  },
});
export {styles};
