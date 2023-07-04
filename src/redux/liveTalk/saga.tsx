import {put, takeLatest, select, takeEvery, call} from 'redux-saga/effects';

import {typeLiveTalk} from './type';
import {
  getDetailRoomMeeting,
  getDetailInRoomMeeting,
  leaveRoomMeetingApi,
} from '@services';
import {
  getInfoRoomSuccess,
  getInfoInRoomSuccess,
  showModalReview,
} from './action';
import {showMessage} from 'react-native-flash-message';
import {NavigationUtils} from '@navigation';

interface ResponseGenerator {
  result?: any;
  data?: any;
  code?: any;
}

export function* getDetailRoom(action: any) {
  try {
    const result: ResponseGenerator = yield getDetailRoomMeeting(
      action?.payload,
    );
    yield put(getInfoRoomSuccess(result?.data));
  } catch (error) {
  } finally {
  }
}

export function* getDetailInRoom(action: any) {
  try {
    const result: ResponseGenerator = yield getDetailInRoomMeeting(
      action?.payload,
    );
    yield put(getInfoInRoomSuccess(result?.data));
  } catch (error) {
  } finally {
  }
}

export function* leaveRoomMeetingSaga(action: any) {
  try {
    const result: ResponseGenerator = yield leaveRoomMeetingApi(
      action?.payload,
    );
    if (result?.data?.check_reviewed === false) {
      yield put(showModalReview(true));
    }
  } catch (error) {
  } finally {
  }
}

export function* liveTalkSaga() {
  yield takeEvery(typeLiveTalk.GET_DETAIL_ROOM_MEETING, getDetailRoom);
  yield takeEvery(typeLiveTalk.GET_DETAIL_INROOM_MEETTING, getDetailInRoom);
  yield takeEvery(typeLiveTalk.LEAVE_ROOM_MEETING, leaveRoomMeetingSaga);
}
