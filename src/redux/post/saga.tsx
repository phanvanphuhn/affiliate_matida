import {put, takeEvery, select} from 'redux-saga/effects';
import {
  getListUserPostApi,
  GlobalService,
  deletePost,
  getListPostApi,
  getPostInfo,
  getListCommentPost,
  getReplyMessage,
  getInfoComment,
  getInfoReply,
  getListPostPopularApi,
  getListUserPostPopularApi,
} from '@services';
import {
  getListUserPostSuccess,
  deleteListUserPostSuccess,
  getDetailPostSuccess,
  getListCommentSuccess,
  getDataReplySuccess,
  updateCommentPostSocketSuccess,
  getDetailPost,
  updateReplyCommentSocketSuccess,
  updateLikeCommentSocketSuccess,
  updateLikeReplyCommentSocketSuccess,
  finishLoading,
  startLoading,
} from './action';
import {typePost} from './type';
import {showMessage} from 'react-native-flash-message';
import {t} from 'i18next';
import {colors} from '@stylesCommon';
import {deletePostForum} from '../forum';

interface ResponseGenerator {
  result?: any;
  data?: any;
}

function* getListMyPostSaga(action: any) {
  try {
    if (action?.payload?.typePost === 1) {
      const res: ResponseGenerator = yield getListUserPostApi(
        action?.payload?.userId,
        action?.payload?.page,
      );
      yield put(
        getListUserPostSuccess({...res?.data, page: action?.payload?.page}),
      );
    } else {
      const res: ResponseGenerator = yield getListUserPostPopularApi(
        action?.payload?.userId,
        action?.payload?.page,
      );
      yield put(
        getListUserPostSuccess({...res?.data, page: action?.payload?.page}),
      );
    }
    GlobalService.hideLoading();
  } catch (error) {
    GlobalService.hideLoading();
  } finally {
    GlobalService.hideLoading();
  }
}

function* getListUserPostSaga(action: any) {
  try {
    if (action?.payload?.typePost === 1) {
      const res: ResponseGenerator = yield getListPostApi(
        action?.payload?.page,
      );
      yield put(
        getListUserPostSuccess({...res?.data, page: action?.payload?.page}),
      );
    } else {
      const res: ResponseGenerator = yield getListPostPopularApi(
        action?.payload?.page,
      );
      yield put(
        getListUserPostSuccess({...res?.data, page: action?.payload?.page}),
      );
    }
    GlobalService.hideLoading();
  } catch (error) {
    GlobalService.hideLoading();
  } finally {
    GlobalService.hideLoading();
  }
}

function* deleteUserPostSaga(action: any) {
  try {
    GlobalService.showLoading();
    const res: ResponseGenerator = yield deletePost(action.payload);
    showMessage({
      message: res?.data?.message
        ? res?.data?.message
        : t('post.message_success_post_delete'),
      type: 'default',
      backgroundColor: colors.success_message,
    });
    yield put(deleteListUserPostSuccess(action.payload));
    yield put(deletePostForum(action.payload));
    GlobalService.hideLoading();
  } catch (error) {
  } finally {
    GlobalService.hideLoading();
  }
}

function* getDetailPostSaga(action: any) {
  try {
    // yield put(startLoading());
    const res: ResponseGenerator = yield getPostInfo(action.payload);
    yield put(getDetailPostSuccess(res?.data));
  } catch (error) {
  } finally {
    yield put(finishLoading());
  }
}

function* getListCommentSaga(action: any) {
  try {
    const res: ResponseGenerator = yield getListCommentPost(
      action?.payload?.id,
      action?.payload?.page,
    );
    yield put(
      getListCommentSuccess({...res?.data, page: action?.payload?.page}),
    );
  } catch (error) {
  } finally {
  }
}

function* getDataRepLySaga(action: any) {
  try {
    const res: ResponseGenerator = yield getReplyMessage(action?.payload);
    yield put(
      getDataReplySuccess({
        dataReply: res?.data?.data,
        idComment: action?.payload,
      }),
    );
  } catch (error) {
  } finally {
  }
}

function* callbackGetDetailPost() {
  try {
    //@ts-ignore
    const state: any = yield select();
    const res: ResponseGenerator = yield getPostInfo(
      state?.post?.detailPost?.id,
    );
    yield put(getDetailPostSuccess(res?.data));
  } catch (error) {
  } finally {
  }
}

function* updateCommentPostSocketSaga(action: any) {
  try {
    //@ts-ignore
    const state: any = yield select();
    const res: ResponseGenerator = yield getInfoComment(action?.payload);
    yield put(updateCommentPostSocketSuccess([{...res?.data}]));
    yield put(getDetailPost(state?.post?.detailPost?.id));
  } catch (error) {
  } finally {
  }
}

function* updateReplyCommentPostSocketSaga(action: any) {
  try {
    //@ts-ignore
    const state: any = yield select();
    const res: ResponseGenerator = yield getInfoReply(
      action?.payload?.replyCommentId,
    );
    yield put(
      updateReplyCommentSocketSuccess({
        data: [{...res?.data}],
        idCmt: action?.payload?.commentId,
      }),
    );
  } catch (error) {
  } finally {
  }
}

function* updateLikePostSaga(action: any) {
  yield put(getDetailPost(action?.payload));
}

function* updateLikeCommentPostSocketSaga(action: any) {
  try {
    const res: ResponseGenerator = yield getInfoComment(action?.payload);
    yield put(updateLikeCommentSocketSuccess(res?.data));
  } catch (error) {
  } finally {
  }
}

function* updateLikeReplyCommentPostSocketSaga(action: any) {
  try {
    const res: ResponseGenerator = yield getInfoReply(
      action?.payload?.replyCommentId,
    );
    yield put(
      updateLikeReplyCommentSocketSuccess({
        data: res?.data,
        idCmt: action?.payload?.commentId,
      }),
    );
  } catch (error) {
  } finally {
  }
}

export function* postSaga() {
  yield takeEvery(typePost.GET_LIST_MY_POST, getListMyPostSaga);
  yield takeEvery(typePost.GET_LIST_USER_POST, getListUserPostSaga);
  yield takeEvery(typePost.DELETE_LIST_USER_POST, deleteUserPostSaga);

  yield takeEvery(typePost.GET_DETAIL_POST, getDetailPostSaga);
  yield takeEvery(typePost.GET_LIST_COMMENT, getListCommentSaga);

  yield takeEvery(typePost.GET_DATA_REPLY, getDataRepLySaga);
  yield takeEvery(typePost.ADD_COMMENT_TO_LIST, callbackGetDetailPost);

  yield takeEvery(
    typePost.UPDATE_COMMENT_POST_SOCKET,
    updateCommentPostSocketSaga,
  );
  yield takeEvery(
    typePost.UPDATE_REPLY_COMMENT_SOCKET,
    updateReplyCommentPostSocketSaga,
  );
  yield takeEvery(typePost.UPDATE_LIKE_POST_SOCKET, updateLikePostSaga);
  yield takeEvery(
    typePost.UPDATE_LIKE_COMMENT_SOCKET,
    updateLikeCommentPostSocketSaga,
  );
  yield takeEvery(
    typePost.UPDATE_LIKE_REPLY_COMMENT_SOCKET,
    updateLikeReplyCommentPostSocketSaga,
  );
}
