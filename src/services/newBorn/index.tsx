import api from '../api';

const GET_LIST_BABY = 'babies';
const GET_BABY = 'babies';
const CREATE_BABY = 'babies';
const UPDATE_BABY = 'babies';
const CALENDAR_CHECKUPS = 'calendar-checkups';

export const getListBaby: any = async () => {
  const response = await api.get(`/${GET_LIST_BABY}`);
  return response;
};

export const getBabyInfo: any = async (id: number) => {
  const response = await api.get(`/${GET_BABY}/${id}`);
  return response;
};

export const createBaby: any = async (params: string) => {
  const response = await api.post(CREATE_BABY, params);
  return response;
};

export const updateBaby: any = async (params: any) => {
  const {id, body} = params;
  const response = await api.put(`${UPDATE_BABY}/${id}`, body);
  return response;
};

export const calendarCheckups: any = async () => {
  const response = await api.get(CALENDAR_CHECKUPS);
  return response;
};
