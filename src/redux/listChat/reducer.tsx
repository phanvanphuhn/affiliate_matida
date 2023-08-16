import {produce} from 'immer';
import {INITIAL_LIST_CHAT, ListChatState} from './state';
import {typeListChat} from './type';

export default function authReducer(state = INITIAL_LIST_CHAT, action: any) {
  switch (action.type) {
    case typeListChat.CREATE_LIST_CHAT:
      let page = action.payload?.page ?? 1;
      return {
        ...state,
        list:
          page === 1
            ? [...action.payload?.data]
            : [...state.list.concat(action.payload?.data)],
      };
    case typeListChat.UPLOAD_LIST_CHAT:
      return {
        ...state,
        list: getUploadListChat(state.list, action.payload),
        notification: true,
      };

    case typeListChat.SEEN_CHAT:
      return {
        ...state,
        notification: false,
      };

    case typeListChat.GET_LIST_USER_CHAT:
      return produce(state, (draft: ListChatState) => {
        draft.listUser =
          action?.payload?.page === 1
            ? action?.payload?.data
            : draft?.listUser?.concat(action?.payload?.data);
      });

    case typeListChat.GET_SEARCH:
      return produce(state, (draft: ListChatState) => {
        draft.search = action?.payload;
      });

    case typeListChat.CHANGE_OPTION:
      return produce(state, (draft: ListChatState) => {
        draft.option = action?.payload;
      });

    case typeListChat.CLEAR_LIST_CHAT:
      return INITIAL_LIST_CHAT;
    default:
      return state;
  }
}

const getUploadListChat = (array: any[], newItem: any) => {
  const index = array.findIndex(item => item?.topic_id === item?.topic_id);
  if (index === -1) {
    return [newItem, ...array];
  } else {
    return [...array.slice(0, index), newItem, ...array.slice(index + 1)];
  }
};
