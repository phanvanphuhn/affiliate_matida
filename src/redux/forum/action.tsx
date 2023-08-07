import {typeForum} from './type';

export const changeTabForum = (payload: any) => ({
  type: typeForum.CHANGE_TAB_FORUM,
  payload,
});

export const getDataSuccess = (payload: any) => ({
  type: typeForum.GET_FORUM_BY_TAB_SUCCESS,
  payload,
});

export const getListTabForum = () => ({
  type: typeForum.GET_LIST_TAB_FORUM,
});

export const getListTabForumSuccess = (payload: any) => ({
  type: typeForum.GET_LIST_TAB_FORUM_SUCCESS,
  payload,
});

export const getForumByTab = (payload: any) => ({
  type: typeForum.GET_FORUM_BY_TAB,
  payload,
});

export const getForumByTabSuccess = (payload: any) => ({
  type: typeForum.GET_FORUM_BY_TAB_SUCCESS,
  payload,
});

export const clearForum = () => ({
  type: typeForum.CLEAR_FORUM,
});

export const loadingDoneForum = () => ({
  type: typeForum.LOADING_FORUM_DONE,
});

export const changeLikeForum = (payload: any) => ({
  type: typeForum.LIKE_POST_FORUM,
  payload,
});

export const changeStatusLoadMoreForum = (payload: any) => ({
  type: typeForum.FETCH_DATA_REQUEST,
  payload,
});

export const changeStatusLoadListForum = (payload: any) => ({
  type: typeForum.LOADING_LIST_FORUM,
  payload,
});

export const deletePostForum = (payload: any) => ({
  type: typeForum.DELETE_POST_FORUM,
  payload,
});
