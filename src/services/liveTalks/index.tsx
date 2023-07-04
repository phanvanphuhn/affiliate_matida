import api from '../api';

const ALL_ROOM = 'room';
const ALL_MY_ROOM = 'room/own';
const ALL_MY_ROOM_JOINED = 'room/joined';
const ALL_SAVED_ROOM = 'room/saved-room';
const SAVE_ROOM = 'room/save-room';
const UN_SAVE_ROOM = 'room/unsaved-room';
const DETAIL_ROOM = 'room';
const DETAIL_IN_ROOM = 'room/live';
const ACCEPT_JOIN_ROOM = 'invitations/action';
const JOIN_ROOM = 'room/join';
const REMINDER_TIME = 'room/reminder-time';
const KICK_USER = 'room/kick';
const LEAVE_ROOM_MEETING_API = 'room/leave';
const REVIEW = 'review-room';

const CHECKSTATUS_RECORD = 'zegocloud/record/check-status';
const START_RECORD = 'zegocloud/record/start';
const END_RECORD = 'zegocloud/record/end';

const REQUEST_JOIN_ROOM = 'room/request';
const ACCEPT_REQUEST_ROOOM = 'room/request-join-room/action';
const GET_ROOM_USER = 'room/own';

export const getAllRoom: any = async () => {
  const response = await api.get(`${ALL_ROOM}?limit=30`);
  return response;
};

export const getAllMyRoom: any = async () => {
  const response = await api.get(`${ALL_MY_ROOM}?limit=30`);
  return response;
};

export const getAllRoomJoined: any = async () => {
  const response = await api.get(`${ALL_MY_ROOM_JOINED}?limit=30`);
  return response;
};

export const getAllSavedRoom: any = async () => {
  const response = await api.get(`${ALL_SAVED_ROOM}?limit=30`);
  return response;
};

export const saveRoom: any = async (id: any) => {
  const response = await api.post(`${SAVE_ROOM}/${id}`);
  return response;
};

export const unSaveRoom: any = async (id: any) => {
  const response = await api.post(`${UN_SAVE_ROOM}/${id}`);
  return response;
};

export const getDetailRoomMeeting: any = async (id: any) => {
  const response = await api.get(`${DETAIL_ROOM}/${id}`);
  return response;
};

export const getDetailInRoomMeeting: any = async (id: any) => {
  const response = await api.get(`${DETAIL_IN_ROOM}/${id}`);
  return response;
};

export const acceptJoinRoom: any = async (id: any, body: any) => {
  const response = await api.put(`${ACCEPT_JOIN_ROOM}/${id}`, body);
  return response;
};

export const joinRoom: any = async (id: any) => {
  const response = await api.post(`${JOIN_ROOM}/${id}`);
  return response;
};

export const reminderTime: any = async (id: any) => {
  const response = await api.post(`${REMINDER_TIME}/${id}`);
  return response;
};

export const kickUser: any = async (id: any, body: any) => {
  const response = await api.post(`${KICK_USER}/${id}`, body);
  return response;
};

export const leaveRoomMeetingApi: any = async (id: any) => {
  const response = await api.post(`${LEAVE_ROOM_MEETING_API}/${id}`);
  return response;
};

export const reviewMeeting: any = async (body: any) => {
  const response = await api.post(`${REVIEW}`, body);
  return response;
};

export const requestJoinRoomApi: any = async (id: any) => {
  const response = await api.post(`${REQUEST_JOIN_ROOM}/${id}`);
  return response;
};

export const acceptJoinRoomRequest: any = async (id: any, body: any) => {
  const response = await api.post(`${ACCEPT_REQUEST_ROOOM}/${id}`, body);
  return response;
};

export const getRoomUser: any = async (id: any, type: any) => {
  const response = api.get(`${GET_ROOM_USER}/${id}?type_room=${type}`);
  return response;
};

export const checkStatusRecordApi: any = async (body: any) => {
  const response = await api.post(CHECKSTATUS_RECORD, body);
  return response;
};

export const startRecordApi: any = async (body: any) => {
  const response = await api.post(START_RECORD, body);
  return response;
};

export const endRecordApi: any = async (body: any) => {
  const response = await api.post(END_RECORD, body);
  return response;
};
