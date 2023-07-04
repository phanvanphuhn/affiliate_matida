import {colors, scaler, stylesCommon} from '@stylesCommon';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  containerViewModal: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: scaler(10),
    borderTopRightRadius: scaler(10),
  },
  keyboardAwareScrollView: {
    paddingBottom: scaler(30),
  },
  containerItemModal: {
    paddingVertical: scaler(10),
    height: scaler(50),
    alignItems: 'center',
    paddingHorizontal: scaler(16),
    borderWidth: 1,
    borderColor: colors.gray,
    padding: scaler(12),
    flexDirection: 'row',
  },
  textLabel: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(16),
    lineHeight: scaler(19),
    color: colors.textColor,
    marginLeft: scaler(12),
  },
  viewSelected: {
    backgroundColor: colors.gray,
    borderRadius: scaler(8),
  },
});
