import {
  defaultSystemFonts,
  MixedStyleDeclaration,
} from 'react-native-render-html';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {Platform} from 'react-native';
export const systemFonts = [
  ...defaultSystemFonts,
  'Inter-Regular',
  'Inter-SemiBold',
];
export const tagsStyles: Readonly<Record<string, MixedStyleDeclaration>> = {
  ul: {
    fontSize: scaler(12),
    color: '#515151',
    ...stylesCommon.fontWeight400,
  },
  ol: {
    fontSize: scaler(12),
    color: '#515151',
    ...stylesCommon.fontWeight400,
  },
  p: {
    fontSize: scaler(12),
    color: '#515151',

    ...stylesCommon.fontWeight400,
  },
  h2: {
    fontSize: scaler(12),
    color: '#515151',
    ...(Platform.OS === 'android' && {fontWeight: '600'}), // 🎉 Huzzah! displays font on Android 🎉
  },
  strong: {
    ...stylesCommon.fontWeight700,
    fontSize: scaler(12),
    ...(Platform.OS === 'android' && {fontWeight: '600'}),
    fontWeight: '700',
    // 🎉 Huzzah! displays font on Android 🎉
  },
  span: {
    // fontSize: scaler(14),
    // color: colors.gray200,
    // ...stylesCommon.fontWeight400,
    color: '#515151',
  },
  li: {
    justifyContent: 'center',
    position: 'absolute',
    marginTop: -scaler(1),
    color: colors.gray200,
  },
  em: {
    fontStyle: 'italic',
    // fontSize: scaler(16),
  },
  h1: {
    fontSize: scaler(12),
    color: colors.textColor,
    // ...stylesCommon.fontWeight400,
    fontWeight: '600',
    ...(Platform.OS === 'android' && {fontWeight: '400'}), // 🎉 Huzzah! displays font on Android 🎉
  },
};
