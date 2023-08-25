import {getHome, getHomeByWeeks} from '@services';
import {put, takeEvery} from 'redux-saga/effects';
import {
  changeWeek,
  changeWeekPregnant,
  getDataHome,
  getDataHomeSuccess,
  loadingDone,
} from './action';
import {typeHome} from './type';

interface ResponseGenerator {
  result?: any;
  data?: any;
  code?: any;
}

export function* getDataHomeSaga() {
  try {
    const res: ResponseGenerator = yield getHome();
    yield put(getDataHomeSuccess(res?.data));
    yield put(
      changeWeekPregnant(
        res?.data?.user?.pregnantWeek?.weekPregnant ?? {weeks: 40, days: 1},
      ),
    );
    yield put(changeWeek(res?.data?.babyProgress?.baby?.week ?? 40));
  } catch (e) {
  } finally {
    yield put(loadingDone());
  }
}

export function* getDataHomeByWeekSaga(action: any) {
  try {
    const res: ResponseGenerator = yield getHomeByWeeks({
      weeks: action?.payload?.week,
    });

    yield put(getDataHomeSuccess(res?.data));
    yield put(
      changeWeekPregnant(
        res?.data?.user?.pregnantWeek?.weekPregnant ?? {weeks: 40, days: 1},
      ),
    );
    yield put(changeWeek(res?.data?.babyProgress?.baby?.week ?? 40));
  } catch (e) {
  } finally {
    yield put(loadingDone());
  }
}

export function* homeSaga() {
  yield takeEvery(typeHome.GET_DATA_HOME, getDataHomeSaga);
  yield takeEvery(typeHome.GET_DATA_HOME_BY_WEEK, getDataHomeByWeekSaga);
}
