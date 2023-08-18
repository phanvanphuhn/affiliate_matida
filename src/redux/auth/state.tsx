export type AuthState = {
  token: any;
  userInfo: any;
  lang: any;
  statusLogin: any;
  isDoneDaily: boolean;
  isSeenComment: boolean;
};

export const INITIAL_STATE_AUTH: AuthState = {
  token: null,
  userInfo: null,
  lang: null,
  statusLogin: false,
  isDoneDaily: false,
  isSeenComment: false,
};
