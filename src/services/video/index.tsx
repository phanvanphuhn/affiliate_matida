import api from '../api';

const VIDEO = 'videos';
const VIEW_VIDEO = 'videos/increment-views';
const EXPERT_VIDEO = 'videos/experts';

export const getVideoMost: any = async (
  page: number,
  recent: boolean = false,
  expert: string,
) => {
  const sort = recent
    ? '{"videos.created_at":"DESC"}'
    : '{"videos.views":"DESC"}';
  const response = await api.get(
    `${VIDEO}?page=${page}&size=10&sort=${sort}&expert_name=${expert}`,
  );
  return response;
};

export const postVideoView: any = async (id: number | string | null) => {
  const response = await api.put(`${VIEW_VIDEO}/${id}`);
  return response;
};

export const getListExpertVideo: any = async (page: number, search: string) => {
  const response = await api.get(
    `${EXPERT_VIDEO}?page=${page}&size=10&search=${search}`,
  );
  return response;
};

export const getVideoDetail: any = async (id: any) => {
  const response = await api.get(`${VIDEO}/${id}`);
  return response;
};
