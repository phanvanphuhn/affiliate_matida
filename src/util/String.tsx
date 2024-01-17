import {EEnvironment} from '@enum';

//KEY ZEGOCLOUND
export const APP_SIGN_ZEGO_KEY =
  '6e7a776aaeb497664906585505817f83d8c19788ac006565cc0a3de4884a77c1';
export const APPID_ZEGO_KEY = 1157482893;
export const APP_SIGN_ZEGO_KEY_LIVESTREAM =
  '1a1594ad1275a838b195a703c0e931596f3dc5152295f117b250e091c1fd48f2';
export const APPID_ZEGO_KEY_LIVESTREAM = 2084634726;
export const APP_SIGN_ZEGO_KEY_AUDIOLIVE =
  '78abc4b818b26f8f85074f68228e34d68e25ad956d7929f191872b6c18cb1707';
export const APPID_ZEGO_KEY_AUDIOLIVE = 74380430;

export const MERCHANT_IDENTIFIER = 'merchant.com.growth.levers.matida';

// const environment: EEnvironment = EEnvironment.DEVERLOPMENT;
const environment: EEnvironment = EEnvironment.PRODUCT;

export const VERSION_APP = '1.13.1';
export const VERSION_CODE_PUSH = `v6.5${
  environment === EEnvironment.PRODUCT ? '' : '(staging)'
}`;

// DOMAIN DEV
// export const BASEURL = 'https://baby-nation-api-dev.adamo.tech/api/'; //Domain dev
// export const socketURL = 'https://baby-nation-api-dev.adamo.tech'; //SOCKET dev
// export const KEY_UXCAM = '9rr2pitkauc2liv';
// export const STRIPE_KEY =
//   'pk_test_51NN5F6EZXr4feaDmXdY60loywUjSNUHz8VAYfiK4hL2hWed4lsPlHCEzJeA8PUy5DgucigO3hBd5At6zWwaoyebh00VDKioM01';

//DOMAIN PRODUCT
export const BASEURL =
  environment === EEnvironment.PRODUCT
    ? 'https://api.matida.app/api/' //Domain product
    : 'https://api.matida.dev/api/'; //DOMAIN DEV
export const socketURL =
  environment === EEnvironment.PRODUCT
    ? 'https://socket.matida.app' //SOCKET product
    : 'https://api.matida.dev'; //SOCKET DEV
export const KEY_UXCAM = 'ayds69vc0q4shqf';
export const STRIPE_KEY =
  'pk_live_51NN5F6EZXr4feaDmhnC29iKRzFMbJDs5apgAB0KmFiEXyz32aJujFa5f8aE4mCfL2z1MMjT9qzzu3MlUXvZtdtcd00WYiPY7HL';
