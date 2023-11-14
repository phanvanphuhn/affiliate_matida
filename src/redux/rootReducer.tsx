import {combineReducers} from 'redux';
import auth from './auth/reducer';
import tab from './main/tab/reducer';
import post from './post/reducer';
import chat from './chat/reducer';
import listChat from './listChat/reducer';
import liveTalk from './liveTalk/reducer';
import chatGPT from './chatGPT/reducer';
import unread from './main/unread/reducer';
import home from './home/reducer';
import explore from './explore/reducer';
import check from './check/reducer';
import forum from './forum/reducer';
import newBorn from './newBorn/reducer';

//Khai báo các root reducer ở đây
const appReducer = combineReducers({
  auth,
  tab,
  post,
  chat,
  listChat,
  liveTalk,
  chatGPT,
  unread,
  home,
  explore,
  check,
  forum,
  newBorn,
});

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;
