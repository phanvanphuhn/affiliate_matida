import {getCheckingPayment} from '@services';
import {put, takeEvery} from 'redux-saga/effects';
import {typeCheck} from '.';
import {checkPaymentSuccess} from './action';
interface ResponseGenerator {
  result?: any;
  data?: any;
  code?: any;
}

export function* getCheckPaymentSaga() {
  try {
    const res: ResponseGenerator = yield getCheckingPayment();
    yield put(checkPaymentSuccess(res?.data));
  } catch (e) {}
}

export function* checkSaga() {
  yield takeEvery(typeCheck.GET_CHECKING, getCheckPaymentSaga);
}
