export type UnreadState = {
  unread: number;
  unread_notification: number;
};

export const INITIAL_STATE_UNREAD: UnreadState = {
  unread: 0,
  unread_notification: 0,
};
