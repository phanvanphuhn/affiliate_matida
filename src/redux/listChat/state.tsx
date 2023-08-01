import {EChatOption} from '@constant';

export type ListChatState = {
  list: any[];
  notification: boolean;
  listUser: any[];
  search: string;
  option: EChatOption;
};

export const INITIAL_LIST_CHAT: ListChatState = {
  list: [],
  notification: false,
  listUser: [],
  search: '',
  option: EChatOption.CHAT,
};
