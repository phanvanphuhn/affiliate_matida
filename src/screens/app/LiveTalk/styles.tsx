import {StyleSheet} from 'react-native';
import {stylesCommon, scaler, colors, widthScreen} from '@stylesCommon';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSoon: {
    width: scaler(96),
    height: scaler(96),
  },
  txtTitle: {
    color: colors.textColor,
    fontSize: scaler(24),
    ...stylesCommon.fontWeight600,
    marginTop: scaler(25),
  },
  txtContent: {
    color: '#7C7C7C',
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
    textAlign: 'center',
    marginTop: scaler(10),
  },
  separator: {
    color: '#D3D3D3',
  },
  digit: {
    justifyContent: 'flex-end',
    marginHorizontal: scaler(12),
  },
  digitTxt: {
    color: colors.textColor,
    fontSize: scaler(48),
    lineHeight: scaler(57),
    ...stylesCommon.fontPlus500,
  },
  timeLabel: {
    color: '#A8A8A8',
    ...stylesCommon.fontWeight600,
    lineHeight: scaler(12),
    fontSize: scaler(10),
  },
  banner: {
    width: widthScreen - scaler(32),
    height: scaler(141),
    borderRadius: scaler(8),
    // marginLeft: scaler(16),
    // marginBottom: scaler(32),
  },
  dot: {
    width: scaler(6),
    height: scaler(6),
    borderRadius: scaler(6) / 2,
    backgroundColor: '#F6C4C4',
  },
  activeDot: {
    width: scaler(32),
    height: scaler(6),
    borderRadius: scaler(20),
    backgroundColor: colors.primary,
  },
});

export {styles};
