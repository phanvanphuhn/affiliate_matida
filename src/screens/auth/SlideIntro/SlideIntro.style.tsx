import {
  colors,
  heightScreen,
  scaler,
  stylesCommon,
  widthScreen,
} from '@stylesCommon';
import {StyleSheet} from 'react-native';
import {ITEM_WIDTH_SLIDE_INTRO} from './SlideIntro';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yellow150,
  },
  scroll: {
    flexGrow: 1,
    width: widthScreen,
    height: heightScreen,
  },
  button: {
    width: widthScreen,
    flex: 1,
  },
  indexImageContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: scaler(15),
    paddingVertical: scaler(4),
    borderRadius: 20,
  },
  viewPagination: {
    width: ITEM_WIDTH_SLIDE_INTRO,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: scaler(24),
    justifyContent: 'space-between',
    paddingLeft: scaler(30),
  },
  btnSkip: {
    paddingRight: scaler(30),
    padding: scaler(10),
    height: scaler(44),
  },

  textSkip: {
    fontSize: scaler(15),
    color: colors.labelColor,
    ...stylesCommon.fontWeight600,
  },
  textBold: {
    fontSize: scaler(26),
    color: colors.gray400,
    ...stylesCommon.fontWeight700,
    lineHeight: scaler(30),
  },
  textNormal: {
    fontSize: scaler(16),
    color: colors.gray400,
    ...stylesCommon.fontWeight300,
    lineHeight: scaler(30),
  },
});
