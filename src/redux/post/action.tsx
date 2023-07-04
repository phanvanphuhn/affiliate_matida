import {typePost} from './type';

export const getListMyPost = (payload: any) => ({
  type: typePost.GET_LIST_MY_POST,
  payload,
});

export const getListUserPost = (payload: any) => ({
  type: typePost.GET_LIST_USER_POST,
  payload,
});

export const getListUserPostSuccess = (payload: any) => ({
  type: typePost.GET_LIST_USER_POST_SUCCESS,
  payload,
});

export const deleteListUserPost = (payload: any) => ({
  type: typePost.DELETE_LIST_USER_POST,
  payload,
});

export const deleteListUserPostSuccess = (payload: any) => ({
  type: typePost.DELETE_LIST_USER_POST_SUCCESS,
  payload,
});

export const getDetailPost = (payload: any) => ({
  type: typePost.GET_DETAIL_POST,
  payload,
});

export const getDetailPostSuccess = (payload: any) => ({
  type: typePost.GET_DETAIL_POST_SUCCESS,
  payload,
});

export const getListCommentAction = (payload: any) => ({
  type: typePost.GET_LIST_COMMENT,
  payload,
});

export const getListCommentSuccess = (payload: any) => ({
  type: typePost.GET_LIST_COMMENT_SUCCESS,
  payload,
});

export const getDataReply = (payload: any) => ({
  type: typePost.GET_DATA_REPLY,
  payload,
});

export const getDataReplySuccess = (payload: any) => ({
  type: typePost.GET_DATA_REPLY_SUCCESS,
  payload,
});

export const addCommentToList = (payload: any) => ({
  type: typePost.ADD_COMMENT_TO_LIST,
  payload,
});

export const addReplyCommentToList = (payload: any) => ({
  type: typePost.ADD_REPLY_COMMENT_TO_LIST,
  payload,
});

export const changeStatusLike = (payload: any) => ({
  type: typePost.CHANGE_STATUS_LIKE,
  payload,
});

//SOCKET
export const updateCommentPostSocket = (payload: any) => ({
  type: typePost.UPDATE_COMMENT_POST_SOCKET,
  payload,
});

export const updateCommentPostSocketSuccess = (payload: any) => ({
  type: typePost.UPDATE_COMMENT_POST_SOCKET_SUCCESS,
  payload,
});

export const updateReplyCommentSocket = (payload: any) => ({
  type: typePost.UPDATE_REPLY_COMMENT_SOCKET,
  payload,
});

export const updateReplyCommentSocketSuccess = (payload: any) => ({
  type: typePost.UPDATE_REPLY_COMMENT_SOCKET_SUCCESS,
  payload,
});

export const updateLikePostSocket = (payload: any) => ({
  type: typePost.UPDATE_LIKE_POST_SOCKET,
  payload,
});

export const updateLikeCommentSocket = (payload: any) => ({
  type: typePost.UPDATE_LIKE_COMMENT_SOCKET,
  payload,
});

export const updateLikeCommentSocketSuccess = (payload: any) => ({
  type: typePost.UPDATE_LIKE_COMMENT_SOCKET_SUCCESS,
  payload,
});

export const updateLikeReplyCommentSocket = (payload: any) => ({
  type: typePost.UPDATE_LIKE_REPLY_COMMENT_SOCKET,
  payload,
});

export const updateLikeReplyCommentSocketSuccess = (payload: any) => ({
  type: typePost.UPDATE_LIKE_REPLY_COMMENT_SOCKET_SUCCESS,
  payload,
});

export const clearDataDetailPost = () => ({
  type: typePost.CLEAR_DATA_DETAIL_POST,
});

export const finishLoading = () => ({type: typePost.LOADING_FINISH});
export const startLoading = () => ({type: typePost.LOADING_START});
