import api from '../api';

const USER_DEVICE = 'user-device';
const LIST_NOTIFICATION = 'notification';

export const deleteUserDevice: any = async () => {
  const response = await api.delete(`${USER_DEVICE}`);
  return response;
};

export const postUserDevice: any = async (data: {device_token: string}) => {
  const response = await api.post(`${USER_DEVICE}`, data);
  return response;
};

export const getListNotification: any = async (page: number) => {
  const response = await api.get(`${LIST_NOTIFICATION}?page=${page}&limit=10`);
  return response;
};

export const readNotification: any = async (id: number) => {
  const response = await api.put(`${LIST_NOTIFICATION}/${id}`);
  return response;
};

export const listNotReadNotification: any = async (page: number) => {
  const response = await api.get(
    `${LIST_NOTIFICATION}?page=${page}&limit=10&is_read=2`,
  );
  return response;
};
