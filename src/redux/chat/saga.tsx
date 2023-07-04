import {put, takeLatest, select, takeEvery, call} from 'redux-saga/effects';
import {addMessageToList, getListChatSuccess, changeStatusMute} from './action';

import {typeChat} from './type';
import {
  getListMessageApi,
  getDetailMessageApi,
  putReadMessage,
} from '@services';
import {showMessage} from 'react-native-flash-message';

interface ResponseGenerator {
  result?: any;
  data?: any;
  code?: any;
}

export function* getListChatSaga(action: any) {
  try {
    const result: ResponseGenerator = yield getListMessageApi(
      action?.payload?.id,
      action?.payload?.page,
    );
    yield put(getListChatSuccess(result?.data));
    yield put(changeStatusMute(result?.data?.is_mute));
  } catch (error) {
  } finally {
  }
}

export function* getDetailMessageSaga(action: any) {
  try {
    //@ts-ignore
    const state: any = yield select();
    const result: ResponseGenerator = yield getDetailMessageApi(
      action?.payload,
    );
    if (state?.chat?.topic_id) {
      // putReadMessageDetail(result?.data?.topic_id);
      const res: ResponseGenerator = yield putReadMessage(
        result?.data?.topic_id,
      );
    }
    if (result?.data?.topic_id === state?.chat?.topic_id) {
      yield put(addMessageToList([{...result?.data}]));
    }
  } catch (error) {
  } finally {
  }
}

function* putReadMessageDetail(id: any) {
  try {
  } catch (e) {
    showMessage({
      message: '',
      type: 'default',
      backgroundColor: 'transparent',
    });
  }
}

export function* chatSaga() {
  yield takeEvery(typeChat.GET_LIST_MESSAGE_CHAT, getListChatSaga);
  yield takeEvery(typeChat.GET_DETAIL_MESSAGE, getDetailMessageSaga);
}
