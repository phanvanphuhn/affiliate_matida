import {typeListChat} from './type';

export const uploadListChat = (payload: any) => ({
  type: typeListChat.UPLOAD_LIST_CHAT,
  payload,
});

export const createListChat = (payload: any) => ({
  type: typeListChat.CREATE_LIST_CHAT,
  payload,
});
