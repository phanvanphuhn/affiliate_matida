import {StyleSheet} from 'react-native';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
    backgroundColor: '#F6F6F6',
  },
  headerView: {
    // paddingHorizontal: scaler(20),
    backgroundColor: colors.brandMainPinkRed,
  },
  circleBackground: {
    height: 603 * (widthScreen / 390),
    width: widthScreen,
    position: 'absolute',
  },
  createPostButton: {
    marginHorizontal: scaler(20),
    width: undefined,
    backgroundColor: colors.white,
    marginBottom: scaler(40),
    flexDirection: 'row',
    height: scaler(48),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaler(8),
  },
  titleButton: {
    fontSize: scaler(14),
    ...stylesCommon.fontWeight600,
    lineHeight: scaler(21),
    color: colors.primary,
    marginLeft: scaler(11),
  },
  wrapLoadingContainer: {
    paddingHorizontal: scaler(16),
    marginHorizontal: scaler(16),
    paddingVertical: scaler(16),
    borderRadius: scaler(16),
    backgroundColor: colors.white,
    marginBottom: scaler(16),
    height: scaler(280),
    justifyContent: 'center',
  },
});

export {styles};
