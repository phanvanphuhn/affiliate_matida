import api from '../api';

const GET_LIST_SUGGEST = '/chat-gpt/questions';
const SEND_MESSAGE_GPT = '/chat-gpt/send-message';
const GET_LIST_MESSAGE_GPT = '/chat-gpt';
const GET_DAILY_QUESTION = '/chat-gpt/ask-user';

export const getListMessageGPTApi: any = async (page: any) => {
  const response = await api.get(
    `${GET_LIST_MESSAGE_GPT}?page=${page}&limit=20`,
  );
  return response;
};

export const sendMessageGPTApi: any = async (body: any) => {
  const response = await api.post(SEND_MESSAGE_GPT, body);
  return response;
};

export const getListSuggestGPT: any = async () => {
  const response = await api.get(`${GET_LIST_SUGGEST}?page=1&limit=50`);
  return response;
};

export const getDailyQuestion: any = async () => {
  const response = await api.get(GET_DAILY_QUESTION);
  return response;
};

export const postDailyQuestion: any = async (body: any) => {
  const params = {
    message: body,
  };
  const response = await api.post(GET_DAILY_QUESTION, params);
  return response;
};
