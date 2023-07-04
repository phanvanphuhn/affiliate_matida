import {typeUnread} from './type';
import {INITIAL_STATE_UNREAD} from './state';

export default function unreadReducer(
  state = INITIAL_STATE_UNREAD,
  action: any,
) {
  switch (action.type) {
    case typeUnread.UPDATE:
      return {
        ...state,
        unread: action.payload,
      };
    case typeUnread.UPDATE_NOTIFICATION:
      return {
        ...state,
        unread_notification: action.payload,
      };
    case typeUnread.DELETE:
      return {
        ...state,
        unread: 0,
      };

    case typeUnread.DELETE_NOTIFICATION:
      return {
        ...state,
        unread_notification: 0,
      };
    default:
      return state;
  }
}
