import {typeHome} from './type';

export const getDataHome = () => ({
  type: typeHome.GET_DATA_HOME,
});

export const getDataHomeByWeek = (payload: any) => ({
  type: typeHome.GET_DATA_HOME_BY_WEEK,
  payload,
});

export const updateDataHome = (payload: any) => ({
  type: typeHome.UPDATE_DATA_HOME,
  payload,
});

export const getDataHomeSuccess = (payload: any) => ({
  type: typeHome.GET_DATA_HOME_SUCCESS,
  payload,
});

export const changeWeekPregnant = (payload: any) => ({
  type: typeHome.CHANGE_WEEK_PREGNANT,
  payload,
});

export const changeWeek = (payload: any) => ({
  type: typeHome.CHANGE_WEEK,
  payload,
});

export const loadingDone = () => ({
  type: typeHome.LOADING_DONE,
});

export const payVideoHome = (payload: any) => ({
  type: typeHome.PAY_VIDEO,
  payload,
});

export const payArticleHome = (payload: any) => ({
  type: typeHome.PAY_ARTICLE,
  payload,
});

export const payPodcastHome = (payload: any) => ({
  type: typeHome.PAY_PODCAST,
  payload,
});

export const payMasterClassHome = (payload: any) => ({
  type: typeHome.PAY_MASTER_CLASS,
  payload,
});

export const cleanHome = () => ({
  type: typeHome.CLEAR_HOME,
});
