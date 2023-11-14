import api from '../api';

const GET_LIST_BABY = 'babies';
const CREATE_BABY = 'babies';
const UPDATE_BABY = 'babies';

export const getListBaby: any = async () => {
  const response = await api.get(`/${GET_LIST_BABY}`);
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
