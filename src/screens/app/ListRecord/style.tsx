import {colors, scaler, stylesCommon} from '@stylesCommon';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
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
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: scaler(8),
    // marginRight: scaler(12),
    height: scaler(50),
    paddingHorizontal: scaler(12),
  },
  inputSearch: {
    flex: 1,
    marginLeft: scaler(12),
    height: '100%',
  },
});
