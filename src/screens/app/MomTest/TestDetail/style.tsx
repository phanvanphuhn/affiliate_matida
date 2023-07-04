import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: colors.white,
    paddingBottom: scaler(12),
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonHeaderLeft: {
    paddingLeft: scaler(16),
    // paddingBottom: scaler(12),
    flex: 1,
  },
  titleHeader: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    marginBottom: scaler(8),
  },
  viewTitle: {
    flex: 5,
    alignItems: 'center',
  },
  progress: {
    width: scaler(210),
    height: scaler(4),
  },
  containerPage: {
    width: widthScreen,
    backgroundColor: colors.gray250,
  },
  viewQuestion: {
    padding: scaler(24),
    backgroundColor: colors.purple,
    borderRadius: scaler(16),
    alignItems: 'flex-start',
  },
  viewIndexQuestion: {
    borderRadius: scaler(200),
    backgroundColor: colors.purple100,
    // width: scaler(46),
    height: scaler(46),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaler(6),
  },
  textIndexQuestion: {
    fontSize: scaler(16),
    ...stylesCommon.fontWeight600,
    color: colors.white,
  },
  textQuestion: {
    fontSize: scaler(24),
    ...stylesCommon.fontPlus600,
    color: colors.white,
    marginTop: scaler(32),
  },
  itemAnswer: {
    paddingVertical: scaler(24),
    paddingHorizontal: scaler(16),
    backgroundColor: colors.white,
    marginBottom: scaler(12),
    borderWidth: scaler(1),
    borderRadius: scaler(8),
    borderColor: colors.gray,
  },
  textAnswer: {
    fontSize: scaler(16),
    ...stylesCommon.fontWeight600,
    color: colors.textColor,
  },
  containerButton: {
    padding: scaler(16),
    paddingBottom: scaler(32),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: undefined,
    flex: 1,
  },
  buttonRight: {
    marginRight: scaler(8),
    backgroundColor: colors.gray100,
  },
  textButton: {
    color: colors.textSmallColor,
    ...stylesCommon.fontWeight600,
  },
});
