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
  viewCreate: {
    width: '100%',
    paddingHorizontal: scaler(20),
  },
  viewRow: {
    width: '100%',
    paddingHorizontal: scaler(17),
    paddingVertical: scaler(13),
    marginVertical: scaler(20),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF1F1',
    borderRadius: scaler(8)
  },
  txtCreate: {
    color: colors.primary,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight600,
    marginLeft: scaler(9),
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
