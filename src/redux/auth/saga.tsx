import {put, takeLatest, select} from 'redux-saga/effects';
import {NavigationUtils} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {typeAuth} from './type';

interface ResponseGenerator {
  result?: any;
  data?: any;
}

export function* logOutSaga(action: any) {
  try {
    
  } catch (error) {
  } finally {
  }
}

export function* authSaga() {
  yield takeLatest(typeAuth.LOG_OUT, logOutSaga);
}
