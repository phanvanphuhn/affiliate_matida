import {put, takeLatest, select, takeEvery, call} from 'redux-saga/effects';

import {typeChatGPT} from './type';
import {getListMessageGPTApi} from '@services';
import {getListChatGPTSuccess} from './action';
import {showMessage} from 'react-native-flash-message';

interface ResponseGenerator {
  result?: any;
  data?: any;
  code?: any;
}

export function* getListChatGPTSaga(action: any) {
  try {
    const result: ResponseGenerator = yield getListMessageGPTApi(
      action?.payload?.page,
    );
    yield put(getListChatGPTSuccess(result?.data));
  } catch (error) {
  } finally {
  }
}

export function* chatGptSaga() {
  yield takeEvery(typeChatGPT.GET_LIST_MESSAGE_CHAT_GPT, getListChatGPTSaga);
}
