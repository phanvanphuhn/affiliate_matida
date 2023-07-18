import api from '../api';

const ROOM = 'room';
const LIVE_TALK = 'room/live-talks';
const BANNER = 'banner';
const LIST_RECORD = 'record-room';
const VIEWS_RECORD = 'record-room/increment-views';

export const postCreateRoom: any = async (data: any) => {
  const response = await api.post(ROOM, data);
  return response;
};

export const getLiveTalk: any = async () => {
  const response = await api.get(LIVE_TALK);
  return response;
};

export const putUpdateRoom: any = async (id: string, data: any) => {
  const response = await api.put(`${ROOM}/${id}`, data);
  return response;
};

export const getListBannerApi: any = async () => {
  const response = await api.get(`${BANNER}?page=1&limit=30&status=true`);
  return response;
};

export const getListRecord: any = async (page: number, search: string) => {
  const response = await api.get(
    `${LIST_RECORD}?page=${page}&limit=10&search=${search}&is_active=1`,
  );
  return response;
};

export const postRecordView: any = async (id: number | string | null) => {
  const response = await api.put(`${VIEWS_RECORD}/${id}`);
  return response;
};

export const getRecordRoomDetail: any = async (id: any) => {
  const response = await api.get(`${LIST_RECORD}/${id}`);
  return response;
};
