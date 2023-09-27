import {getApiListForumByTab, getListTotalPost, getPostAllTab} from '@services';
import {put, takeEvery} from 'redux-saga/effects';
import {
  changeStatusLoadListForum,
  changeStatusLoadMoreForum,
  changeTabForum,
  getForumByTabSuccess,
  getListTabForumSuccess,
  loadingDoneForum,
  reloadListTabSuccess,
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
    let res: ResponseGenerator;
    if (short_code === 'all') {
      res = yield getPostAllTab();
    } else {
      res = yield getApiListForumByTab(short_code, page);
    }
    yield put(
      getForumByTabSuccess({
        result: res?.data,
        page: page,
        isAll: short_code === 'all',
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

export function* reloadListTabSaga() {
  try {
    const res: ResponseGenerator = yield getListTotalPost();
    yield put(reloadListTabSuccess(res?.data));
  } catch (error) {}
}

export function* getListTabForumSaga(action: any) {
  const reload = action?.payload?.reload;
  try {
    const res: ResponseGenerator = yield getListTotalPost();
    yield put(getListTabForumSuccess(res?.data));
    if (res?.data?.length > 0 && !reload) {
      yield put(changeTabForum(res?.data[0]));
    }
  } catch (e) {
  } finally {
    yield put(loadingDoneForum());
    reload && put(changeStatusLoadListForum(false));
  }
}

export function* forumSaga() {
  yield takeEvery(typeForum.GET_FORUM_BY_TAB, getForumByTabSaga);
  yield takeEvery(typeForum.GET_LIST_TAB_FORUM, getListTabForumSaga);
  yield takeEvery(typeForum.RELOAD_LIST_TAB, reloadListTabSaga);
}
