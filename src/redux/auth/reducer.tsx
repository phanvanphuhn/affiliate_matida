import {typeAuth} from './type';
import {INITIAL_STATE_AUTH} from './state';

export default function authReducer(state = INITIAL_STATE_AUTH, action: any) {
  switch (action.type) {
    case typeAuth.SAVE_LANG:
      return {
        ...state,
        lang: action.payload,
      };
    case typeAuth.SAVE_LOGIN_INFO:
      return {
        ...state,
        token: action.payload?.access_token,
        userInfo: action.payload?.user,
      };
    case typeAuth.CHANGE_STATUS_LOGIN:
      return {
        ...state,
        statusLogin: action?.payload,
      };
    case typeAuth.LOG_OUT:
      return {
        ...state,
        token: null,
        userInfo: null,
        statusLogin: false,
      };
    case typeAuth.SAVE_USER_INFO:
      return {
        ...state,
        userInfo: action?.payload,
      };
    case typeAuth.SAVE_DATA_LOGIN_FACEBOOK:
      return {
        ...state,
        token: action.payload?.access_token,
        userInfo: action.payload?.data,
      };
    //state?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks
    case typeAuth.CHANGE_WEEK:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          pregnantWeek: {
            ...state.userInfo.pregnantWeek,
            weekPregnant: {
              ...state.userInfo.pregnantWeek.weekPregnant,
              weeks: action.payload,
            },
          },
        },
      };
    default:
      return state;
  }
}
