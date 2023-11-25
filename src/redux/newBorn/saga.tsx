import {getListBaby} from '@services';
import {put, takeEvery} from 'redux-saga/effects';
import {getListBabySuccess} from './action';
import {typeBaby} from './type';

interface ResponseGenerator {
  result?: any;
  data?: any;
  code?: any;
}

export function* getDataListBaby() {
  try {
    const res: ResponseGenerator = yield getListBaby();
    yield put(getListBabySuccess(res?.data));
  } catch (e) {
  } finally {
  }
}

export function* newBornSaga() {
  yield takeEvery(typeBaby.GET_LIST_BABY, getDataListBaby);
}
