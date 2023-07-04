import {typeLiveTalk} from './type';

export const getInfoRoom = (payload: any) => ({
  type: typeLiveTalk.GET_DETAIL_ROOM_MEETING,
  payload,
});

export const getInfoRoomSuccess = (payload: any) => ({
  type: typeLiveTalk.GET_DETAIL_ROOM_MEETING_SUCCESS,
  payload,
});

export const getInfoInRoom = (payload: any) => ({
  type: typeLiveTalk.GET_DETAIL_INROOM_MEETTING,
  payload,
});

export const getInfoInRoomSuccess = (payload: any) => ({
  type: typeLiveTalk.GET_DETAIL_INROOM_MEETTING_SUCCESS,
  payload,
});

export const leaveRoomMeeting = (payload: any) => ({
  type: typeLiveTalk.LEAVE_ROOM_MEETING,
  payload,
});

export const showModalReview = (payload: any) => ({
  type: typeLiveTalk.SHOW_MODAL_REVIEW,
  payload,
});

export const clearDataLiveTalk = () => ({
  type: typeLiveTalk.CLEAR_DATA_LIVETALK,
});
