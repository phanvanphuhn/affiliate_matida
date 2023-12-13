import {StyleSheet} from 'react-native';
import {
  stylesCommon,
  scaler,
  colors,
  widthScreen,
  heightScreen,
} from '@stylesCommon';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  containerScroll: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    width: widthScreen,
    height: heightScreen + getStatusBarHeight(),
    paddingHorizontal: scaler(16),
    backgroundColor: '#FFFFFF',
  },
  viewBottom: {
    paddingBottom: getBottomSpace() + scaler(20),
  },
  customButton: {
    backgroundColor: '#FFFFFF',
    marginBottom: scaler(16),
    borderColor: colors.primary,
    borderWidth: 1,
  },
  customTextButton: {
    color: colors.textColor,
  },
  viewBottomText: {
    marginTop: scaler(28),
    marginBottom: scaler(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBottomContent: {
    textAlign: 'center',
    width: scaler(275),
    color: colors.textSmallColor,
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    lineHeight: scaler(21),
  },
  txtBottom: {
    ...stylesCommon.fontPlus500,
    color: '#000000',
    fontSize: scaler(28),
    textAlign: 'center',
  },
  imageIntro: {
    width: '100%',
    height: scaler(314),
    borderRadius: scaler(16),
    marginTop: scaler(50),
  },
  imageLogo: {
    width: scaler(44),
    height: scaler(44),
  },
  viewModal: {
    position: 'absolute',
    width: widthScreen,
    height: heightScreen + getStatusBarHeight(),
  },
  imageHeart: {
    width: scaler(30),
    height: scaler(30),
    marginLeft: scaler(8),
    marginTop: scaler(2),
  },
});

export {styles};
