import {typeChat} from './type';

export const getListChat = (payload: any) => ({
  type: typeChat.GET_LIST_MESSAGE_CHAT,
  payload,
});

export const getListChatSuccess = (payload: any) => ({
  type: typeChat.GET_LIST_MESSAGE_CHAT_SUCCESS,
  payload,
});

export const addMessageToList = (payload: any) => ({
  type: typeChat.ADD_MESSAGE_TO_LIST,
  payload,
});

export const getDetailMessage = (payload: any) => ({
  type: typeChat.GET_DETAIL_MESSAGE,
  payload,
});

export const saveTopicID = (payload: any) => ({
  type: typeChat.SAVE_TOPIC_ID,
  payload,
});

export const clearDataChat = () => ({
  type: typeChat.CLEAR_DATA_CHAT,
});

export const changeStatusMute = (payload: any) => ({
  type: typeChat.CHANGE_STATUS_MUTE,
  payload,
});
