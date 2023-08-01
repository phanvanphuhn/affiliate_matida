import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  body: {
    paddingHorizontal: scaler(20),
  },
  textTitle: {
    fontSize: scaler(32),
    color: colors.white,
    ...stylesCommon.fontWeight500,
    textAlign: 'left',
    marginBottom: scaler(36),
    marginTop: scaler(40),
  },
  textBody: {
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
    textAlign: 'left',
    color: colors.white,
  },
  viewInputBig: {
    paddingVertical: Platform.OS == 'ios' ? scaler(12) : 0,
    paddingHorizontal: scaler(9),
    borderRadius: scaler(8),
    backgroundColor: colors.red150,
    height: scaler(202),
  },
  viewItemFlatList: {
    width: widthScreen,
    paddingHorizontal: scaler(20),
    marginTop: scaler(32),
  },
  btnNext: {
    backgroundColor: colors.white,
    width: undefined,
    alignSelf: 'center',
    paddingHorizontal: scaler(52),
    marginTop: scaler(35),
  },
  inputBig: {
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
    color: colors.white,
    minHeight: scaler(26),
  },
  viewLoadmore: {
    alignItems: 'center',
    marginBottom: scaler(8),
  },
});
