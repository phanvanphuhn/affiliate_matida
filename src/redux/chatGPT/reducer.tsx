import {typeChatGPT} from './type';
import {ChatGPTState, INITIAL_STATE_CHAT_GPT} from './state';
import {convertArrUnique} from '@util';

export default function authReducer(
  state = INITIAL_STATE_CHAT_GPT,
  action: any,
): ChatGPTState {
  switch (action.type) {
    case typeChatGPT.GET_LIST_MESSAGE_CHAT_GPT_SUCCESS:
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
    case typeChatGPT.ADD_MESSAGE_TO_LIST:
      return {
        ...state,
        detailChat: action.payload?.concat(state.detailChat),
      };
    case typeChatGPT.SAVE_SUGGEST_MESSAGE_ID:
      return {
        ...state,
        suggestMessageID: action?.payload,
      };
    case typeChatGPT.SAVE_IS_POST_SUGGEST_MESSAGE:
      return {
        ...state,
        suggestMessagePosted: action?.payload,
      };
    default:
      return state;
  }
}
