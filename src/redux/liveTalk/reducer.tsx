import {typeLiveTalk} from './type';
import {INITIAL_STATE_LIVE_TALK} from './state';

export default function liveTalkReducer(
  state = INITIAL_STATE_LIVE_TALK,
  action: any,
) {
  switch (action.type) {
    case typeLiveTalk.GET_DETAIL_ROOM_MEETING_SUCCESS:
      return {
        ...state,
        info: action.payload,
      };
    case typeLiveTalk.GET_DETAIL_INROOM_MEETTING_SUCCESS:
      return {
        ...state,
        infoInRoom: action.payload,
      };
    case typeLiveTalk.SHOW_MODAL_REVIEW:
      return {
        ...state,
        showModalReview: action.payload,
      };
    case typeLiveTalk.CLEAR_DATA_LIVETALK:
      return {
        info: null,
        infoInRoom: null,
        showModalReview: false,
      };
    default:
      return state;
  }
}
