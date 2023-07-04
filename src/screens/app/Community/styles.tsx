import {StyleSheet} from 'react-native';
import {stylesCommon, scaler, colors} from '@stylesCommon';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
    backgroundColor: '#F6F6F6',
  },
  buttonRight: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    color: colors.primary,
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
  viewCreate: {
    width: '100%',
  },
  viewRow: {
    width: '100%',
    paddingHorizontal: scaler(17),
    paddingVertical: scaler(13),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF1F1',
    borderRadius: scaler(8),
  },
  txtCreate: {
    color: colors.primary,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight600,
    marginLeft: scaler(9),
  },
  containerCreate: {
    paddingHorizontal: scaler(20),
    paddingTop: scaler(16),
    backgroundColor: '#FFFFFF',
    marginBottom: scaler(16),
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  viewOut: {
    flex: 1,
    backgroundColor: 'transparent',
  },
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

export {styles};
