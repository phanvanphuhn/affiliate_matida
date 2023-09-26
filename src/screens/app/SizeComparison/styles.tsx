import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {StyleSheet} from 'react-native';
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

  textTitle: {
    ...stylesCommon.fontWeight700,
    fontSize: scaler(20),
    lineHeight: scaler(28),
    color: colors.textColor,
    // marginLeft: scaler(8),
    maxWidth: scaler(widthScreen - 150),
    marginBottom: scaler(16),
    marginLeft: scaler(16),
  },
});
export {styles};
