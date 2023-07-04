import {typeUnread} from './type';

//Action login
export const updateTotalUnread = (payload: any) => ({
  type: typeUnread.UPDATE,
  payload,
});

export const updateTotalUnreadNotification = (payload: any) => ({
  type: typeUnread.UPDATE_NOTIFICATION,
  payload,
});

export const deleteTotalUnread = () => ({
  type: typeUnread.DELETE,
});

export const deleteTotalUnreadNotification = () => ({
  type: typeUnread.DELETE_NOTIFICATION,
});
