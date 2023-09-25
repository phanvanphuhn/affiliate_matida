import {Platform} from 'react-native';

const WEEK_MAX = 42;
export {WEEK_MAX};
export {lengthListPreAnswer};
export const listPreAnswer = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'K',
  'L',
  'N',
  'M',
  'O',
];

const lengthListPreAnswer = listPreAnswer.length;

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

export const VERSION_APP = '1.1.5';
