import {all, fork} from 'redux-saga/effects';

import {authSaga} from './auth';
import {postSaga} from './post';
import {chatSaga} from './chat';
import {liveTalkSaga} from './liveTalk';
import {chatGptSaga} from './chatGPT';
import {homeSaga} from './home';

//Khai báo các root saga ở đây
function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(postSaga),
    fork(chatSaga),
    fork(liveTalkSaga),
    fork(chatGptSaga),
    fork(homeSaga),
  ]);
}

export default rootSaga;
