import api from '../api';

const GET_LIST_DEAL = 'provider/deal';
const GET_DEAL_DETAIL = 'provider/deal';
const SUBMIT_DEAL = 'provider/deal';

export const getListDeal: any = async () => {
  const response = await api.get(`/${GET_LIST_DEAL}`);
  return response;
};

export const getDealDetail: any = async (params: string) => {
  const response = await api.get(`${GET_DEAL_DETAIL}/${params}`);
  return response;
};

export const submitDeal: any = async (params: any) => {
  const {id, state} = params;
  const response = await api.post(`${SUBMIT_DEAL}/${id}/collect`, state);
  return response;
};
