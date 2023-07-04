import {typeTab} from './type';
import {INITIAL_STATE_TAB} from './state';

export default function tabReducer(state = INITIAL_STATE_TAB, action: any) {
  switch (action.type) {
    case typeTab.HOME:
      return {
        ...state,
        home: !state.home,
      };
    case typeTab.EXPLORER:
      return {
        ...state,
        explore: !state.explore,
      };

    case typeTab.EXPLORER:
      return {
        ...state,
        liveTalk: !state.liveTalk,
      };
    default:
      return state;
  }
}
