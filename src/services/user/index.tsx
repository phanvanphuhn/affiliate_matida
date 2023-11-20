import api from '../api';

const SELECT_DUE_DATE = 'user/select-due-date';
const GET_DUE_DATE = 'user/get-due-date';
const CALCULATE_DATE = '/user/calculate-due-date';
const UPDATE_BIRTH = 'user/date-of-birth';
const GET_USER_INFO = 'auth/user/infor';
const UPDATE_USER_INFO = 'user/profile';
const UPLOAD_IMAGE = 'clouds/upload';
const DETAIL_USER = 'user';

const GET_POST = 'posts';
const GET_HOME = 'home';
const GET_USER_BY_ID = 'user';
const GET_VIDEO_OF_WEEK = '/videos';
const GET_DATA_SIZE_COMPARISON = 'size-comparison/get-by-week';
const GET_TIME_LINE = 'checkups/timeline';
const DELETE_ACCOUNT = 'user';
const GET_CALENDAR_CHECKUP = 'calendar-checkups';

const BLOCK_USER = 'block-user';
const LIST_USER_BLOCK = 'block-user';

const LIST_USER = 'user';

const SHARE_LINK_USER = 'topics/send-message/users';
const GET_VERSION = 'versions';

export const selectDueDate: any = async (data: any) => {
  const response = await api.post(SELECT_DUE_DATE, data);
  return response;
};

export const getSelectDueDate: any = async (data: any) => {
  const {id, due_date} = data;
  const response = await api.get(`${SELECT_DUE_DATE}/${id}`);
  return response;
};

export const getDetailUser: any = async (id: any) => {
  const response = await api.get(`${DETAIL_USER}/${id}`);
  return response;
};

export const getDueDate: any = async () => {
  const response = await api.get(GET_DUE_DATE);
  return response;
};

export const calculateDate: any = async (data: any) => {
  const response = await api.post(CALCULATE_DATE, data);
  return response;
};

export const getUserInfoApi: any = async () => {
  const response = await api.get(GET_USER_INFO);
  return response;
};

export const updateUserInfo: any = async (data: any) => {
  const response = await api.put(UPDATE_USER_INFO, data);
  return response;
};

export const uploadImage: any = async (data: any) => {
  const response = await api.post(UPLOAD_IMAGE, data);
  return response;
};

export const updateUserBirth: any = async (data: any) => {
  const response = await api.put(UPDATE_BIRTH, data);
  return response;
};

export const getListPostBySize: any = async (data: any) => {
  const {page, size, search} = data;
  const url = search
    ? `${GET_POST}?size=${size}&page=${page}&content=${search}`
    : `${GET_POST}?size=${size}&page=${page}`;
  const response = await api.get(url);
  return response;
};

export const getListPost: any = async () => {
  const response = await api.get(GET_POST);
  return response;
};

export const getHome: any = async () => {
  const response = await api.get(GET_HOME);
  return response;
};

export const getHomeByWeeks: any = async (data: any) => {
  const response = await api.get(`${GET_HOME}?week=${data.weeks}`);
  return response;
};

export const getUserByID: any = async (data: any) => {
  const response = await api.get(GET_USER_BY_ID, data);
  return response;
};

export const getListVideoOfWeek: any = async (data: any, page: any) => {
  const response = await api.get(
    `${GET_VIDEO_OF_WEEK}?week_id=[${data}]&page=${page}&sort={"videos.created_at":"DESC"}`,
  );
  return response;
};

export const getSizeComparison: any = async (data: any) => {
  const response = await api.get(`${GET_DATA_SIZE_COMPARISON}/${data}`);
  return response;
};

export const getCalendarCheckup: any = async () => {
  const response = await api.get(`${GET_CALENDAR_CHECKUP}`);
  return response;
};

export const getValueTimeLine: any = async (data: any) => {
  const response = await api.get(`${GET_TIME_LINE}?week=${data}`);
  return response;
};

export const deleteAccount: any = async (id: any) => {
  const response = await api.delete(`${DELETE_ACCOUNT}/${id}`);
  return response;
};

export const blockUserApi: any = async (id: any) => {
  const response = await api.post(`${BLOCK_USER}/${id}`);
  return response;
};

export const listUserBlockApi: any = async (page: any) => {
  const response = await api.get(`${LIST_USER_BLOCK}?page=${page}`);
  return response;
};

export const getListUserApi: any = async (search: string, page: any) => {
  const response = await api.get(
    `${LIST_USER}?page=${page}&size=10&keyword=${search}&exclude_me=1&exclude_blocked=2`,
  );
  return response;
};

export const postShareLinkUser: any = async (data: any) => {
  const response = await api.post(SHARE_LINK_USER, data);
  return response;
};

export const getVersionApp: any = async () => {
  const response = await api.get(GET_VERSION);
  return response;
};
