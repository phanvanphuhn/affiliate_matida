import api from '../api';

const GET_LIST_MESSAGE = '/messages/topic';
const SEND_MESSAGE = '/topics/send-message';
const CREATE_TOPIC = '/topics/check-new';
const DETAIL_MESSAGE = '/messages';
const GET_LIST_CHAT = 'topics/user/';
const READ_UNREAD = 'messages/read-unread';
const CHANGE_STATUS_NOTI_CHAT = 'topics/mute-unmute';
const CHECK_UNREAD = 'topics/check-topic-unread';

export const getListMessageApi: any = async (id: any, page: any) => {
  const response = await api.get(
    `${GET_LIST_MESSAGE}/${id}?page=${page}&limit=20`,
  );
  return response;
};

export const sendMessageApi: any = async (body: any) => {
  const response = await api.post(SEND_MESSAGE, body);
  return response;
};

export const createTopic: any = async (id: any) => {
  const response = await api.get(`${CREATE_TOPIC}/${id}`);
  return response;
};

export const getDetailMessageApi: any = async (id: any) => {
  const response = await api.get(`${DETAIL_MESSAGE}/${id}`);
  return response;
};

export const getListChat: any = async (
  id: number | string,
  page: number,
  search: string,
) => {
  const response = await api.get(
    `${GET_LIST_CHAT}${id}?page=${page}&perPage=10&search=${search || ''}`,
  );
  return response;
};

export const putReadMessage: any = async (id: any) => {
  const response = await api.put(`${READ_UNREAD}/${id}`);
  return response;
};

export const changeStatusNotiChat: any = async (id: any) => {
  const response = await api.put(`${CHANGE_STATUS_NOTI_CHAT}/${id}`);
  return response;
};

export const getCheckMessageUnread: any = async () => {
  const response = await api.get(CHECK_UNREAD);
  return response;
};
