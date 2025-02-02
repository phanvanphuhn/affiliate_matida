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
    backgroundColor: colors.pink4,
    marginBottom: scaler(40),
    flexDirection: 'row',
    height: scaler(48),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaler(80),
  },
  titleButton: {
    fontSize: scaler(14),
    ...stylesCommon.fontWeight600,
    lineHeight: scaler(21),
    color: colors.white,
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
  title: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(18),
    marginBottom: scaler(12),
    marginTop: scaler(16),
  },
  ph: {
    paddingHorizontal: scaler(16),
  },
});
export {styles};
