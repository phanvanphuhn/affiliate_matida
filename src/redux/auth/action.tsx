import {typeAuth} from './type';

//Action login
export const login = (payload: any) => ({
  type: typeAuth.LOGIN,
  payload,
});

export const saveLang = (payload: any) => ({
  type: typeAuth.SAVE_LANG,
  payload,
});

export const saveLoginInfo = (payload: any) => ({
  type: typeAuth.SAVE_LOGIN_INFO,
  payload,
});

export const changeStatusLogin = (payload: any) => ({
  type: typeAuth.CHANGE_STATUS_LOGIN,
  payload,
});

export const logOut = () => ({
  type: typeAuth.LOG_OUT,
});

export const saveDataUser = (payload: any) => ({
  type: typeAuth.SAVE_USER_INFO,
  payload,
});

export const saveDataLoginFacebook = (payload: any) => ({
  type: typeAuth.SAVE_DATA_LOGIN_FACEBOOK,
  payload,
});

export const changeWeekUser = (payload: any) => ({
  type: typeAuth.CHANGE_WEEK,
  payload,
});
