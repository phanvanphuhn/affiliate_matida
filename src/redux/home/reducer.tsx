import {produce} from 'immer';
import {HomeState, INITIAL_STATE_HOME} from './state';
import {typeHome} from './type';
import {changeWeekUserTask} from './action';

export default function homeReducer(state = INITIAL_STATE_HOME, action: any) {
  switch (action.type) {
    case typeHome.GET_DATA_HOME_SUCCESS:
    case typeHome.UPDATE_DATA_HOME:
      return {
        ...state,
        data: {...action.payload},
      };

    case typeHome.CHANGE_WEEK_PREGNANT:
      return {
        ...state,
        weekPregnant: action.payload,
      };
    case typeHome.CHANGE_WEEK_USER_TASK:
      return {
        ...state,
        weekUserTask: action.payload,
      };
    case typeHome.CHANGE_WEEK:
      return {
        ...state,
        week: action.payload,
      };
    case typeHome.LOADING_DONE:
      return {
        ...state,
        loading: false,
      };
    case typeHome.PAY_VIDEO:
      return produce(state, (draft: HomeState) => {
        const video = draft.data?.videos?.find(
          v => +v?.id === +action.payload?.id,
        );
        if (video && !video?.is_paid) {
          video.is_paid = true;
        }
      });

    case typeHome.PAY_ARTICLE:
      return produce(state, (draft: HomeState) => {
        const article = draft.data?.articles?.find(
          a => +a?.id === +action.payload?.id,
        );
        if (article && !article?.is_paid) {
          article.is_paid = true;
        }
      });

    case typeHome.PAY_PODCAST:
      return produce(state, (draft: HomeState) => {
        const podcast = draft.data?.podcast?.find(
          p => +p?.id === +action.payload?.id,
        );
        if (podcast && !podcast?.is_paid) {
          podcast.is_paid = true;
        }
      });

    case typeHome.PAY_MASTER_CLASS:
      return produce(state, (draft: HomeState) => {
        const masterClass = draft.data?.masterClasses?.find(
          mc => +mc?.id === +action.payload?.id,
        );
        if (masterClass && !masterClass?.is_paid) {
          masterClass.is_paid = true;
        }
      });
    case typeHome.CLEAR_HOME:
      return INITIAL_STATE_HOME;
    default:
      return state;
  }
}
