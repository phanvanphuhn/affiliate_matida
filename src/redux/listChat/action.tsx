import {typeListChat} from './type';

export const uploadListChat = (payload: any) => ({
  type: typeListChat.UPLOAD_LIST_CHAT,
  payload,
});

export const createListChat = (payload: any) => ({
  type: typeListChat.CREATE_LIST_CHAT,
  payload,
});

export const getListUserChat = (payload: any) => ({
  type: typeListChat.GET_LIST_USER_CHAT,
  payload,
});

export const getSearch = (payload: any) => ({
  type: typeListChat.GET_SEARCH,
  payload,
});

export const changeOption = (payload: any) => ({
  type: typeListChat.CHANGE_OPTION,
  payload,
});

export const clearListChat = () => ({
  type: typeListChat.CLEAR_LIST_CHAT,
});
