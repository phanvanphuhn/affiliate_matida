import {produce} from 'immer';
import reactotron from 'reactotron-react-native';
import {ForumState, INITIAL_STATE_FORUM} from './state';
import {typeForum} from './type';

export default function forumReducer(state = INITIAL_STATE_FORUM, action: any) {
  switch (action.type) {
    case typeForum.GET_LIST_TAB_FORUM_SUCCESS:
      return produce(state, (draft: ForumState) => {
        draft.listTab = action.payload;
      });

    case typeForum.CHANGE_TAB_FORUM:
      return produce(state, (draft: ForumState) => {
        draft.tab = action.payload;
      });

    case typeForum.GET_FORUM_BY_TAB_SUCCESS:
      return produce(state, (draft: ForumState) => {
        if (action.payload?.page === 1) {
          draft.forum = action.payload?.result?.posts;
        } else {
          draft.forum = draft.forum?.concat(action.payload?.result?.posts);
        }
        reactotron.log?.('PAYLOAD POSTS', action.payload);
        draft.total = action.payload?.result?.total;
      });

    case typeForum.LOADING_FORUM_DONE:
      return produce(state, (draft: ForumState) => {
        draft.loading = false;
      });

    case typeForum.LIKE_POST_FORUM:
      return produce(state, (draft: ForumState) => {
        const item = draft.forum.find(p => +p?.id === +action.payload?.id);
        if (item) {
          item.is_liked = action.payload?.isLike;
          item.total_likes = action.payload?.totalLike;
        }
      });

    case typeForum.FETCH_DATA_REQUEST:
      return produce(state, (draft: ForumState) => {
        draft.loadMore = action.payload;
      });

    case typeForum.LOADING_LIST_FORUM:
      return produce(state, (draft: ForumState) => {
        draft.loadList = action.payload;
      });

    case typeForum.DELETE_POST_FORUM:
      return produce(state, (draft: ForumState) => {
        draft.forum = state.forum.filter(p => +p?.id !== +action.payload);
      });

    case typeForum.CLEAR_FORUM:
      return INITIAL_STATE_FORUM;

    default:
      return state;
  }
}
