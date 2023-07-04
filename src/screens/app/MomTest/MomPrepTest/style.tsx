import {colors, scaler, stylesCommon} from '@stylesCommon';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    backgroundColor: colors.gray250,
  },
  contentContainerStyle: {
    paddingHorizontal: scaler(16),
    paddingBottom: scaler(30),
  },
  containerPeriodic: {
    backgroundColor: colors.white,
    padding: scaler(16),
    borderRadius: scaler(8),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaler(16),
  },
  imagePeriodic: {
    width: scaler(56),
    height: scaler(56),
  },
  labelPeriodic: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(16),
  },
  textPeriodic: {
    color: colors.gray200,
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
    marginTop: scaler(8),
    marginBottom: scaler(16),
    flex: 1,
  },
  viewProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textProgress: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(12),
  },
  textTimeHistory: {
    color: colors.gray200,
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
    marginBottom: scaler(4),
  },
  line: {
    height: scaler(1),
    width: '100%',
    backgroundColor: colors.gray100,
    marginVertical: scaler(12),
  },
  viewReward: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTitleReward: {
    color: colors.gray200,
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
  },
  textReward: {
    color: colors.purple,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight600,
  },
  btnSeeMore: {
    alignSelf: 'center',
    paddingHorizontal: scaler(12),
    paddingTop: scaler(8),
  },
  textSeeMore: {
    color: colors.brandMainPinkRed,
    fontSize: scaler(16),
    ...stylesCommon.fontWeight600,
    textDecorationLine: 'underline',
  },
});
