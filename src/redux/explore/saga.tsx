import {getArticleMost, getPodcastMost, getVideoMost} from '@services';
import {put, takeEvery} from 'redux-saga/effects';
import {
  changeStatusExplore,
  changeStatusLoadMore,
  getDataArticleSuccess,
  getDataPodcastSuccess,
  getDataVideoSuccess,
  loadingArticleDone,
  loadingPodcastDone,
  loadingVideoDone,
} from './action';
import {Option, Page} from './state';
import {typeExplore} from './type';

interface ResponseGenerator {
  result?: any;
  data?: any;
  code?: any;
}

export function* changePageExploreSaga(action: any) {
  const {page, trimesters, topics, option, expert, pageExplore} =
    action?.payload;

  yield put(changeStatusLoadMore(false));
  try {
    yield put(
      changeStatusExplore({pageExplore, expert, option, trimesters, topics}),
    );

    switch (pageExplore) {
      case Page.ARTICLE:
        yield getDataArticles(page, option, trimesters, topics);
        break;
      case Page.PODCAST:
        yield getDataPodcast(page, option, trimesters, topics);
        break;
      case Page.VIDEOS:
        yield getDataVideo(page, option, expert);
        break;
      default:
        break;
    }
  } catch (e) {
  } finally {
    // yield put(loadingDone());
    yield put(changeStatusLoadMore(true));
  }
}

function* getDataArticles(
  page: number,
  option: Option,
  trimesters: number[],
  topics: number[],
) {
  try {
    const isRecent = option === Option.RECENT;
    const res: ResponseGenerator = yield getArticleMost(
      page,
      trimesters,
      topics,
      isRecent,
    );
    yield put(getDataArticleSuccess({result: res?.data, page: page}));
  } catch (e) {
  } finally {
    yield put(loadingArticleDone());
  }
}

function* getDataPodcast(
  page: number,
  option: Option,
  trimesters: number[],
  topics: number[],
) {
  try {
    const isRecent = option === Option.RECENT;
    const res: ResponseGenerator = yield getPodcastMost(
      page,
      trimesters,
      topics,
      isRecent,
    );
    yield put(getDataPodcastSuccess({result: res?.data, page: page}));
  } catch (e) {
  } finally {
    yield put(loadingPodcastDone());
  }
}

function* getDataVideo(page: number, option: Option, expert: string) {
  try {
    const isRecent = option === Option.RECENT;
    const res: ResponseGenerator = yield getVideoMost(page, isRecent, expert);
    yield put(getDataVideoSuccess({result: res?.data, page: page}));
  } catch (e) {
  } finally {
    yield put(loadingVideoDone());
  }
}

export function* exploreSaga() {
  yield takeEvery(typeExplore.CHANGE_PAGE_EXPLORE, changePageExploreSaga);
}
