import {typeCheck} from './type';

export const getCheckingPaymentRedux = () => ({
  type: typeCheck.GET_CHECKING,
});

export const checkPaymentSuccess = (payload: any) => ({
  type: typeCheck.CHECKING_SUCCESS,
  payload,
});

export const updateStatusDeepLink = () => ({
  type: typeCheck.UPDATE_STATUS_DEEP_LINK,
});
