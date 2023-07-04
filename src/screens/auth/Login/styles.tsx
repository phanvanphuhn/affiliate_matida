import {StyleSheet} from 'react-native';
import {scaler, colors, stylesCommon} from '@stylesCommon';

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: scaler(10),
    borderTopRightRadius: scaler(10),
    height: scaler(732),
    paddingHorizontal: scaler(16),
  },
  viewOut: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  iconBack: {
    marginTop: scaler(40),
  },
  txtHeader: {
    fontSize: scaler(32),
    marginTop: scaler(57),
    color: '#000000',
    ...stylesCommon.fontWeight500,
  },
  txtContent: {
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
    color: colors.textOpacityColor,
    marginTop: scaler(12),
  },
  customButton: {
    marginBottom: scaler(24),
  },
  customButtonFace: {
    marginTop: scaler(80),
    backgroundColor: colors.facebook,
  },
  customButtonZalo: {
    backgroundColor: colors.zalo,
  },
  txtBottom: {
    marginTop: scaler(38),
    textAlign: 'center',
  },
});

export {styles};
