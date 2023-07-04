export type ChatState = {
  detailChat: any;
  pagingDetail: any;
  topic_id: any;
  is_mute: any;
};

export const INITIAL_STATE_CHAT: ChatState = {
  detailChat: null,
  pagingDetail: null,
  topic_id: null,
  is_mute: false,
};
