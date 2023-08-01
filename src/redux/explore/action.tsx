import {typeExplore} from './type';

export const changePageExplore = (payload: any) => ({
  type: typeExplore.CHANGE_PAGE_EXPLORE,
  payload,
});

export const getDataArticleSuccess = (payload: any) => ({
  type: typeExplore.GET_DATA_ARTICLE_SUCCESS,
  payload,
});

export const getDataPodcastSuccess = (payload: any) => ({
  type: typeExplore.GET_DATA_PODCAST_SUCCESS,
  payload,
});

export const getDataVideoSuccess = (payload: any) => ({
  type: typeExplore.GET_DATA_VIDEO_SUCCESS,
  payload,
});

export const clearExplore = () => ({
  type: typeExplore.CLEAR_EXPLORE,
});

export const loadingArticleDone = () => ({
  type: typeExplore.LOADING_ARTICLE_DONE,
});

export const loadingPodcastDone = () => ({
  type: typeExplore.LOADING_PODCAST_DONE,
});

export const loadingVideoDone = () => ({
  type: typeExplore.LOADING_VIDEO_DONE,
});

export const changeStatusExplore = (payload: any) => ({
  type: typeExplore.CHANGE_FILTER_EXPLORE,
  payload,
});

export const changeLikePodcastExplore = (payload: any) => ({
  type: typeExplore.LIKE_PODCAST_EXPLORE,
  payload,
});

export const payArticleExplore = (payload: any) => ({
  type: typeExplore.PAY_ARTICLE_EXPLORE,
  payload,
});

export const payPodcastExplore = (payload: any) => ({
  type: typeExplore.PAY_PODCAST_EXPLORE,
  payload,
});

export const payVideoExplore = (payload: any) => ({
  type: typeExplore.PAY_VIDEO_EXPLORE,
  payload,
});

export const changeStatusLoadMore = (payload: any) => ({
  type: typeExplore.FETCH_DATA_REQUEST,
  payload,
});
