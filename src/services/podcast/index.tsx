import api from '../api';
const LIKE_PODCAST = 'likes/podcasts';
const PODCAST = 'podcasts';
const PODCAST_POPULAR = 'podcasts/most-popular';

export const likePodCast: any = async (id: number) => {
  const response = await api.post(`${LIKE_PODCAST}/${id}`);
  return response;
};

export const unlikePodCast: any = async (id: number) => {
  const response = await api.delete(`${LIKE_PODCAST}/${id}`);
  return response;
};

export const getListPodCast: any = async (data: any) => {
  const {page, search} = data;
  const response = await api.get(
    `${PODCAST}?page=${page}&limit=10&search=${search || ''}`,
  );
  return response;
};

export const getPodcastDetail: any = async (id: number) => {
  const response = await api.get(`${PODCAST}/${id}`);
  return response;
};

export const getPodcastMost: any = async (
  page: number,
  trimester: number[],
  topic: number[],
  recent: boolean = false,
) => {
  const link = recent
    ? `${PODCAST}?limit=10&page=${page}&payload={"trimester":[${trimester}],"topic":[${topic}]}`
    : `${PODCAST_POPULAR}?page=${page}&size=10&trimester=[${trimester}]&topic=[${topic}]`;
  const response = await api.get(link);
  return response;
};
