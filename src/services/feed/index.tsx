import api from '../api';

const GET_LIST_FEED = 'feeds';

export const getListFeedApi: any = async (page: number, limit: number = 10) => {
  const response = await api.get(
    `${GET_LIST_FEED}?page=${page}&limit=${limit}`,
  );
  return response;
};
