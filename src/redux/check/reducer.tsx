import {produce} from 'immer';
import {CheckState, INITIAL_STATE_CHECK} from './state';
import {typeCheck} from './type';

export default function exploreReducer(
  state = INITIAL_STATE_CHECK,
  action: any,
) {
  switch (action.type) {
    case typeCheck.CHECKING_SUCCESS:
      return produce(state, (draft: CheckState) => {
        draft.showStripe = action?.payload;
      });
    case typeCheck.UPDATE_STATUS_DEEP_LINK:
      return produce(state, (draft: CheckState) => {
        draft.deepLink = false;
      });
    default:
      return state;
  }
}
