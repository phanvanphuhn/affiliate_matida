import {getApiListForumByTab, getListTopTab, getVideoMost} from '@services';
import {put, takeEvery} from 'redux-saga/effects';
import {
  changeStatusLoadListForum,
  changeStatusLoadMoreForum,
  changeTabForum,
  getForumByTabSuccess,
  getListTabForumSuccess,
  loadingDoneForum,
} from './action';
import {typeForum} from './type';

interface ResponseGenerator {
  result?: any;
  data?: any;
  code?: any;
}

export function* getForumByTabSaga(action: any) {
  const {short_code, page} = action?.payload;

  yield put(changeStatusLoadMoreForum(false));
  if (+page === 1) {
    yield put(changeStatusLoadListForum(true));
  }
  try {
    const res: ResponseGenerator = yield getApiListForumByTab(short_code, page);
    yield put(
      getForumByTabSuccess({
        result: res?.data,
        page: page,
      }),
    );
    //posts, total
  } catch (e) {
  } finally {
    // yield put(loadingDone());
    yield put(changeStatusLoadMoreForum(true));
    if (+page === 1) {
      yield put(changeStatusLoadListForum(false));
    }
  }
}

export function* getListTabForumSaga() {
  try {
    const res: ResponseGenerator = yield getListTopTab();
    yield put(getListTabForumSuccess(res?.data));
    if (res?.data?.length > 0) {
      yield put(changeTabForum(res?.data[0]));
    }
  } catch (e) {
  } finally {
    yield put(loadingDoneForum());
  }
}

export function* forumSaga() {
  yield takeEvery(typeForum.GET_FORUM_BY_TAB, getForumByTabSaga);
  yield takeEvery(typeForum.GET_LIST_TAB_FORUM, getListTabForumSaga);
}
