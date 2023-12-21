import {Dimensions, StyleSheet} from 'react-native';
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
  gray2: '#F0F0F5',
  gray3: '#E1E2E8',
  gray7: '#82848C',
  gray50: '#9D9D9D',
  gray100: '#F6F4F6',
  gray150: '#FDF1F1',
  gray200: '#515151',
  gray250: '#F7F7F7',
  gray300: '#1C272D',
  gray350: '#F6F6F6',
  gray400: '#33302E',
  gray450: '#F9F9FB',
  gray500: '#82848C',
  gray550: '#A1A2AB',
  facebook: '#2875D0',
  zalo: '#2395FF',
  brandMainPinkRed: '#E86C6C',
  pink4: '#FD91FD',
  pink50: '#C75555',
  pink100: '#B94747',
  pink150: '#FAE2E2',
  pink200: '#FD91FD',
  pink250: '#FFDBFF',
  pink300: '#F764F7',
  pink350: '#FFC2FF',
  red: '#FF0000',
  red50: '#E66D6E',
  red100: '#FF0909',
  red150: '#AE5151',
  black: '#000000',
  black10: '#050505',
  purple: '#654AC9',
  purple50: '#F3F1FD',
  purple100: '#433771',
  green: '#10B1A8',
  green50: '#E8F8F7',
  green100: '#EAF8EE',
  green150: '#57B1AD',
  green200: '#B1D39D',
  green250: '#56D2CF',
  yellow: '#F5BC65',
  yellow50: '#FFF9F0',
  yellow100: '#FFF5F4',
  yellow150: '#FFF6F3',
  yellow200: '#FFF66E',
  backgroundFeed: '#FFFFFF',
  backgroundPackage: '#FBFBFF',

  success_message: '#28B4AE',
  error_message: '#A67481',
  transparent: 'transparent',
  primaryBackground: '#EE6566',
  cancelBackground: '#F8F7F8',
  labelColor: '#39383D',
  blue: '#8FA0FF',
  blue50: '#B0BCFF',
  blue100: '#DBE0FF',
  borderColor2: '#F1F0F5',
  purple4: '#8FA0FF',
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
    fontFamily: 'Cabin-Regular',
  },
  fontWeight500: {
    fontFamily: 'Cabin-Medium',
  },
  fontWeight600: {
    fontFamily: 'Cabin-SemiBold',
  },
  fontWeight700: {
    fontFamily: 'Cabin-Bold',
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
  fontSarabun700: {
    fontFamily: 'Sarabun-Bold',
  },
  fontSarabunItalic: {
    fontFamily: 'Sarabun-Italic',
  },
  fontSarabun500: {
    fontFamily: 'Sarabun-Medium',
  },
  fontSarabun400: {
    fontFamily: 'Sarabun-Regular',
  },
  fontSarabun600: {
    fontFamily: 'Sarabun-Semibold',
  },
});

const scaler = (size: any) => perfectSize(size);

export {colors, heightScreen, scaler, stylesCommon, widthScreen};
