import {typeListChat} from './type';

const INITIAL_LIST_CHAT = {
  list: [],
  notification: false,
};

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
