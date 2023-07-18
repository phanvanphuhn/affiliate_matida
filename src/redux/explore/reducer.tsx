import {produce} from 'immer';
import {ExploreState, INITIAL_STATE_EXPLORE} from './state';
import {typeExplore} from './type';

export default function exploreReducer(
  state = INITIAL_STATE_EXPLORE,
  action: any,
) {
  switch (action.type) {
    case typeExplore.GET_DATA_ARTICLE_SUCCESS:
      return produce(state, (draft: ExploreState) => {
        if (action.payload?.page === 1) {
          draft.articles.data = action.payload?.result?.data;
        } else {
          draft.articles.data = draft.articles.data?.concat(
            action.payload?.result?.data,
          );
        }
        draft.articles.total = action.payload?.result?.total;
      });

    case typeExplore.GET_DATA_PODCAST_SUCCESS:
      return produce(state, (draft: ExploreState) => {
        if (action.payload?.page === 1) {
          draft.podcasts.data = action.payload?.result?.data;
        } else {
          draft.podcasts.data = draft.podcasts.data?.concat(
            action.payload?.result?.data,
          );
        }
        draft.podcasts.total = action.payload?.result?.total;
      });

    case typeExplore.GET_DATA_VIDEO_SUCCESS:
      return produce(state, (draft: ExploreState) => {
        if (action.payload?.page === 1) {
          draft.videos.data = action.payload?.result?.data;
        } else {
          draft.videos.data = draft.videos.data?.concat(
            action.payload?.result?.data,
          );
        }
        draft.videos.total = action.payload?.result?.total;
      });

    case typeExplore.LOADING_ARTICLE_DONE:
      return produce(state, (draft: ExploreState) => {
        draft.articles.loading = false;
      });

    case typeExplore.LOADING_PODCAST_DONE:
      return produce(state, (draft: ExploreState) => {
        draft.podcasts.loading = false;
      });

    case typeExplore.LOADING_VIDEO_DONE:
      return produce(state, (draft: ExploreState) => {
        draft.videos.loading = false;
      });

    case typeExplore.CHANGE_FILTER_EXPLORE:
      return produce(state, (draft: ExploreState) => {
        draft.pageExplore = action.payload?.pageExplore;
        draft.filter.expert = action.payload?.expert;
        draft.filter.option = action.payload?.option;
        draft.filter.filterTopic.trimesters = action.payload?.trimesters;
        draft.filter.filterTopic.topics = action.payload?.topics;
      });

    case typeExplore.LIKE_PODCAST_EXPLORE:
      return produce(state, (draft: ExploreState) => {
        const podcast = draft.podcasts?.data?.find(
          p => +p?.id === +action.payload?.id,
        );
        if (podcast) {
          podcast.is_liked = action.payload?.isLike;
          podcast.total_likes = action.payload?.totalLike;
        }
      });

    case typeExplore.PAY_ARTICLE_EXPLORE:
      return produce(state, (draft: ExploreState) => {
        const article = draft.articles?.data?.find(
          a => +a?.id === +action.payload?.id,
        );
        if (article && !article?.is_paid) {
          article.is_paid = true;
        }
      });

    case typeExplore.PAY_PODCAST_EXPLORE:
      return produce(state, (draft: ExploreState) => {
        const podcast = draft.podcasts?.data?.find(
          p => +p?.id === +action.payload?.id,
        );
        if (podcast && !podcast?.is_paid) {
          podcast.is_paid = true;
        }
      });

    case typeExplore.PAY_VIDEO_EXPLORE:
      return produce(state, (draft: ExploreState) => {
        const video = draft.videos?.data?.find(
          mc => +mc?.id === +action.payload?.id,
        );
        if (video && !video?.is_paid) {
          video.is_paid = true;
        }
      });

    case typeExplore.FETCH_DATA_REQUEST:
      return produce(state, (draft: ExploreState) => {
        draft.loadMore = action.payload;
      });

    case typeExplore.CLEAR_EXPLORE:
      return INITIAL_STATE_EXPLORE;

    default:
      return state;
  }
}
