import {StyleSheet} from 'react-native';
import {scaler, colors, stylesCommon, widthScreen} from '@stylesCommon';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  containerPicker: {
    marginTop: scaler(25),
    marginBottom: scaler(11),
  },
  image: {
    width: '100%',
    height: scaler(213),
    borderRadius: scaler(10),
  },
  viewItem: {
    marginBottom: scaler(40),
    paddingHorizontal: scaler(20),
  },
  txtTitle: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    marginTop: scaler(12),
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaler(8),
  },
  txtTime: {
    marginLeft: scaler(6),
    color: colors.borderColor,
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
  },
  iconPlay: {
    position: 'absolute',
    top: scaler(213 / 2) - 22,
    left: (widthScreen - scaler(40) - 44) / 2,
  },
  viewEmpty: {
    alignItems: 'center',
    marginTop: scaler(20),
  },
  txtEmpty: {
    ...stylesCommon.fontWeight500,
    color: colors.borderColor,
    fontSize: scaler(14),
  },
  viewLoadmore: {
    alignItems: 'center',
    marginBottom: scaler(8),
  },
});

export {styles};
