import api from '../api';

const VIDEO = 'videos';
const VIEW_VIDEO = 'videos/increment-views';

export const getVideoMost: any = async (
  page: number,
  //   trimester: number[],
  //   topic: number[],
  recent: boolean = false,
) => {
  const sort = recent
    ? '{"videos.created_at":"DESC"}'
    : '{"videos.views":"DESC"}';
  const response = await api.get(`${VIDEO}?page=${page}&size=10&sort=${sort}`);
  return response;
};

export const postVideoView: any = async (id: number | string | null) => {
  const response = await api.put(`${VIEW_VIDEO}/${id}`);
  return response;
};
