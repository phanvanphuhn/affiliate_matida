import {colors, scaler, stylesCommon} from '@stylesCommon';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  labelComplete: {
    color: colors.textColor,
    ...stylesCommon.fontPlus600,
    fontSize: scaler(24),
    marginTop: scaler(16),
  },
  contentContainerStyle: {
    paddingTop: scaler(64),
    // paddingHorizontal: scaler(16),
    backgroundColor: colors.white,
  },
  containerHeader: {
    alignItems: 'center',
    marginBottom: scaler(8),
  },
  topResult: {
    backgroundColor: colors.purple,
    paddingVertical: scaler(8),
    alignItems: 'center',
    borderTopLeftRadius: scaler(8),
    borderTopRightRadius: scaler(8),
  },
  titleResult: {
    color: colors.white,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(12),
  },
  bottomResult: {
    backgroundColor: colors.purple50,
    paddingVertical: scaler(16),
    alignItems: 'center',
    borderBottomLeftRadius: scaler(8),
    borderBottomRightRadius: scaler(8),
  },
  textMark: {
    color: colors.textColor,
    ...stylesCommon.fontPlus500,
    fontSize: scaler(28),
  },
  textSeeAll: {
    color: colors.success_message,
    textDecorationLine: 'underline',
    fontSize: scaler(14),
    ...stylesCommon.fontWeight500,
    marginTop: scaler(8),
  },
  viewBody: {
    backgroundColor: colors.gray250,
    padding: scaler(16),
  },
  answerList: {
    padding: scaler(16),
    backgroundColor: colors.white,
    borderRadius: scaler(8),
  },
  textList: {
    color: colors.textColor,
    ...stylesCommon.fontPlus600,
    fontSize: scaler(18),
  },
  itemAnswer: {
    padding: scaler(12),
    backgroundColor: colors.gray350,
    borderRadius: scaler(8),
    marginTop: scaler(12),
  },
  textQuestion: {
    color: colors.purple,
    fontSize: scaler(12),
    ...stylesCommon.fontPlus600,
  },
  textNameQuestion: {
    color: colors.textColor,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight500,
    marginVertical: scaler(6),
  },
  textAnswer: {
    color: colors.borderColor,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight500,
  },
  imageReward: {
    width: scaler(32),
    height: scaler(32),
  },
  containerReward: {
    padding: scaler(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.purple50,
    borderRadius: scaler(8),
  },
  textTitleReward: {
    color: colors.gray200,
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    marginBottom: scaler(4),
  },
  textReward: {
    color: colors.purple,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(16),
  },
  viewQuestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
