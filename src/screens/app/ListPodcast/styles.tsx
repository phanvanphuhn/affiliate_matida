import {colors, scaler, stylesCommon} from '@stylesCommon';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  textTitle: {
    marginTop: scaler(32),
    marginBottom: scaler(20),
    ...stylesCommon.fontWeight600,
    fontSize: scaler(16),
    lineHeight: 19,
    color: colors.textColor,
  },
  flatList: {
    // paddingHorizontal: scaler(20),
    flexGrow: 1,
    paddingBottom: scaler(250),
    backgroundColor: colors.gray250,
    paddingHorizontal: scaler(16),
  },
  textNoData: {
    textAlign: 'center',
    marginBottom: scaler(40),
    marginTop: scaler(24),
    color: colors.borderColor,
    fontStyle: 'italic',
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: scaler(8),
    marginRight: scaler(12),
    height: scaler(50),
    paddingHorizontal: scaler(12),
  },
  inputSearch: {
    flex: 1,
    marginLeft: scaler(12),
    height: '100%',
  },
  viewLoadmore: {
    alignItems: 'center',
    marginBottom: scaler(8),
  },
  viewEmpty: {
    alignItems: 'center',
    marginTop: scaler(20),
  },
});
