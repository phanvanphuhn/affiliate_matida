import {StyleSheet, Platform, Dimensions} from 'react-native';
//@ts-ignore
import {create} from 'react-native-pixel-perfect';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const designResolution = {
  width: 375,
  height: 812,
};
const perfectSize = create(designResolution);

const colors = {
  primary: '#FB8484',
  textColor: '#252525',
  textOpacityColor: 'rgba(37, 40, 49, 0.7)',
  backgroundOpacity: 'rgba(232, 108, 108, 0.1)',
  backgroundOpacityDisable: 'rgba(232, 108, 108, 0.5)',
  backgroundDefault: '#FCFCFC',
  textBoldColor: '#180A05',
  textSmallColor: '#7C7C7C',
  textPlaceHolder: '#424242',
  borderColor: '#A8A8A8',
  white: '#FFFFFF',
  gray: '#EAEAEA',
  gray50: '#9D9D9D',
  gray100: '#F6F4F6',
  gray150: '#FDF1F1',
  gray200: '#515151',
  gray250: '#F7F7F7',
  gray300: '#1C272D',
  gray350: '#F6F6F6',
  facebook: '#2875D0',
  zalo: '#2395FF',
  brandMainPinkRed: '#E86C6C',
  pink50: '#C75555',
  pink100: '#B94747',
  pink150: '#FAE2E2',
  red: '#FF0000',
  red50: '#E66D6E',
  red100: '#FF0909',
  black: '#000000',
  black10: '#050505',
  purple: '#654AC9',
  purple50: '#F3F1FD',
  purple100: '#433771',
  green: '#10B1A8',
  green50: '#E8F8F7',
  green100: '#EAF8EE',
  green150: '#57B1AD',
  yellow: '#F5BC65',
  yellow50: '#FFF9F0',

  success_message: '#28B4AE',
  error_message: '#A67481',
  yellow100: '#FFF5F4',
  transparent: 'transparent',
};

//Font chữ được sử dụng trong app
const stylesCommon = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  fontWeight100: {
    fontFamily: 'Inter-Thin',
  },
  fontWeight200: {
    fontFamily: 'Inter-ExtraLight',
  },
  fontWeight300: {
    fontFamily: 'Inter-Light',
  },
  fontWeight400: {
    fontFamily: 'Inter-Regular',
  },
  fontWeight500: {
    fontFamily: 'Inter-Medium',
  },
  fontWeight600: {
    fontFamily: 'Inter-SemiBold',
  },
  fontWeight700: {
    fontFamily: 'Inter-Bold',
  },
  fontWeight800: {
    fontFamily: 'Inter-ExtraBold',
  },
  fontWeightPPF400: {
    fontFamily: 'PPFragment-TextRegular',
  },
  fontWeightPP500: {
    fontFamily: 'Poppins-Medium',
  },
  fontWeightLOGO700: {
    fontFamily: 'MavenPro-Bold',
  },
  fontDaily400: {
    fontFamily: 'Trocchi-Regular',
  },
  fontPlus500: {
    fontFamily: 'PlusJakartaSans-Medium',
  },
  fontPlus600: {
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});

const scaler = (size: any) => perfectSize(size);

export {colors, stylesCommon, scaler, widthScreen, heightScreen};
