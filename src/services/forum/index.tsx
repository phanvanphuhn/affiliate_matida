import api from '../api';

const CATEGORIES = 'categories';
const POSTS = 'posts';

export const getListTopTab: any = async () => {
  const response = await api.get(CATEGORIES);
  return response;
};

export const getApiListForumByTab: any = async (
  label: string,
  page: number,
) => {
  const response = await api.get(`${POSTS}?label=${label}&page=${page}`);
  return response;
};
