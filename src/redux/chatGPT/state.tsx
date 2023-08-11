export type ChatGPTState = {
  detailChat: any;
  pagingDetail: any;
  suggestMessageID: string | null;
  suggestMessagePosted: boolean;
};

export const INITIAL_STATE_CHAT_GPT: ChatGPTState = {
  detailChat: null,
  pagingDetail: null,
  suggestMessageID: null,
  suggestMessagePosted: false,
};
