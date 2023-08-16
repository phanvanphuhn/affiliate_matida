import {typeChatGPT} from './type';

export const getListChatGPT = (payload: any) => ({
  type: typeChatGPT.GET_LIST_MESSAGE_CHAT_GPT,
  payload,
});

export const getListChatGPTSuccess = (payload: any) => ({
  type: typeChatGPT.GET_LIST_MESSAGE_CHAT_GPT_SUCCESS,
  payload,
});

export const addMessageToListChatGPT = (payload: any) => ({
  type: typeChatGPT.ADD_MESSAGE_TO_LIST,
  payload,
});

export const saveSuggestMessageId = (payload: string) => ({
  type: typeChatGPT.SAVE_SUGGEST_MESSAGE_ID,
  payload,
});

export const saveIsPostSuggestMessage = (payload: boolean) => ({
  type: typeChatGPT.SAVE_IS_POST_SUGGEST_MESSAGE,
  payload,
});
