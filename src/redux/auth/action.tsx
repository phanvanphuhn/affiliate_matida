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

export const saveIsDoneDaily = (payload: boolean) => ({
  type: typeAuth.IS_DONE_DAILY,
  payload,
});

export const saveIsSeenComment = (payload: boolean) => ({
  type: typeAuth.IS_SEEN_COMMENT,
  payload,
});

export const saveIsReview = (payload: boolean) => ({
  type: typeAuth.iS_REVIEW,
  payload,
});

export const setIsFromBranch = (payload: boolean) => ({
  type: typeAuth.IS_FROM_BRANCH,
  payload,
});
