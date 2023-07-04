import api from '../api';

const MASTER_CLASS = 'master-classes';
const LIKE_COURSE = 'master-classes/like-unlike';
const LIKE_VIDEO_MASTER_CLASS = 'master-classes/video/like-unlike';

export const getMasterClassDetail: any = async (id: any) => {
  const response = await api.get(`${MASTER_CLASS}/${id}`);
  return response;
};

export const postCourseMasterClass: any = async (id: any) => {
  const response = await api.post(`${LIKE_COURSE}/${id}`);
  return response;
};

export const postVideoMasterClass: any = async (id: any) => {
  const response = await api.post(`${LIKE_VIDEO_MASTER_CLASS}/${id}`);
  return response;
};

export const getListClass: any = async (page: number) => {
  const response = await api.get(`${MASTER_CLASS}?page=${page}&limit=10`);
  return response;
};
