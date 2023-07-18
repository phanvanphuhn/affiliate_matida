export type CheckState = {
  showStripe: boolean;
  deepLink: boolean;
};

// deepLink là true thì mới chạy vào hàm getInitialLink()
export const INITIAL_STATE_CHECK: CheckState = {
  showStripe: false,
  deepLink: true,
};
