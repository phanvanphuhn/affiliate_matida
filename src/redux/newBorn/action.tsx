import {typeBaby} from './type';

export const getListBaby = () => ({
  type: typeBaby.GET_LIST_BABY,
});

export const getListBabySuccess = (payload: any) => ({
  type: typeBaby.GET_LIST_BABY_SUCCESS,
  payload,
});
