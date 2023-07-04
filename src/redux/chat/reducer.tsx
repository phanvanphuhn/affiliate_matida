import {typeChat} from './type';
import {INITIAL_STATE_CHAT} from './state';
import {convertArrUnique} from '@util';

export default function authReducer(state = INITIAL_STATE_CHAT, action: any) {
  switch (action.type) {
    case typeChat.GET_LIST_MESSAGE_CHAT_SUCCESS:
      let page = action.payload.paging?.current_page;
      return {
        ...state,
        detailChat:
          page === 1
            ? convertArrUnique(action.payload.data, 'id')
            : convertArrUnique(
                state.detailChat.concat(action.payload.data),
                'id',
              ),
        pagingDetail: action.payload.paging,
      };
    case typeChat.ADD_MESSAGE_TO_LIST:
      return {
        ...state,
        detailChat: action.payload.concat(state.detailChat),
      };
    case typeChat.SAVE_TOPIC_ID:
      return {
        ...state,
        topic_id: action.payload,
      };
    case typeChat.CHANGE_STATUS_MUTE:
      return {
        ...state,
        is_mute: action.payload,
      };
    case typeChat.CLEAR_DATA_CHAT:
      return {
        detailChat: null,
        pagingDetail: null,
        topic_id: null,
        is_mute: false,
      };
    default:
      return state;
  }
}
