import {produce} from 'immer';
import {INITIAL_LIST_BABY} from './state';
import {typeBaby} from './type';

export default function newBornReducer(state = INITIAL_LIST_BABY, action: any) {
  switch (action.type) {
    case typeBaby.GET_LIST_BABY_SUCCESS:
      return {
        list: action.payload,
      };
    default:
      return state;
  }
}
