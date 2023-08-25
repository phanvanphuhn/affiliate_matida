import {TGetPostByWeekParams} from '@type';
import api from '../api';

const GET_LIST_POST = 'posts';
const GET_LIST_POPULAR_POST = 'posts/most-popular';
const GET_LIST_USER_POST = 'posts/user';
const GET_LIST_USER_POPULAR_POST = 'posts/user/most-popular';
const CREATE_POST = 'posts';
const DELETE_POST = 'posts/mypost';
const GET_POST_INFO = 'posts/infor';
const GET_LIST_COMMENT = 'comments/post';
const ADD_COMMENT = 'comments';
const ADD_LIKE_POST = 'likes/post';
const UNLIKE_POST = 'likes/post';
const LIKE_COMMENT = 'likes/comment';
const UN_LIKE_COMMENT = 'likes/comment';
const CREATE_REPLY_COMMENT = 'reply-comments';
const GET_REPLY_MESSAGE = 'reply-comments/comment';
const LIKE_REPLY_MESSAGE = 'likes/reply_comment';
const UNLIKE_REPLY_MESSAGE = 'likes/reply_comment';
const REPLY_INFO = 'reply-comments';
const COMMENT_INFO = 'comments';
const EDIT_POST = 'posts';
const REPORT_POST = 'reports';
const GET_POST = 'posts';

export const getListPostApi: any = async (page: any) => {
  const response = await api.get(`${GET_LIST_POST}?page=${page}`);
  return response;
};

export const getListPostPopularApi: any = async (page: any) => {
  const response = await api.get(`${GET_LIST_POPULAR_POST}?page=${page}`);
  return response;
};

export const getListUserPostApi: any = async (useId: any, page: any) => {
  const response = await api.get(`${GET_LIST_USER_POST}/${useId}?page=${page}`);
  return response;
};

export const getListUserPostPopularApi: any = async (useId: any, page: any) => {
  const response = await api.get(`${GET_LIST_USER_POPULAR_POST}?page=${page}`);
  return response;
};

export const createPostApi: any = async (body: any) => {
  const response = await api.post(CREATE_POST, body);
  return response;
};

export const deletePost: any = async (id: any) => {
  const response = await api.delete(`${DELETE_POST}/${id}`);
  return response;
};

export const getPostInfo: any = async (id: any) => {
  const response = await api.get(`${GET_POST_INFO}/${id}`);
  return response;
};

export const getPostByWeek = async (params: TGetPostByWeekParams) => {
  const response = await api.get(`${GET_POST}`, {
    params,
  });
  return response;
};

export const getListCommentPost: any = async (id: any, page: any) => {
  const response = await api.get(
    `${GET_LIST_COMMENT}/${id}?page=${page}&limit=10`,
  );
  return response;
};

export const addCommentApi: any = async (body: any) => {
  const response = await api.post(ADD_COMMENT, body);
  return response;
};

export const addLikePost: any = async (body: any) => {
  const response = await api.post(ADD_LIKE_POST, body);
  return response;
};

export const addUnLikePost: any = async (id: any) => {
  const response = await api.delete(`${UNLIKE_POST}/${id}`);
  return response;
};

export const likeComment: any = async (body: any) => {
  const response = await api.post(LIKE_COMMENT, body);
  return response;
};

export const unLikeComment: any = async (id: any) => {
  const response = await api.delete(`${UN_LIKE_COMMENT}/${id}`);
  return response;
};

export const createReplyComment: any = async (body: any) => {
  const response = await api.post(CREATE_REPLY_COMMENT, body);
  return response;
};

export const getReplyMessage: any = async (id: any) => {
  const response = await api.get(`${GET_REPLY_MESSAGE}/${id}?page=1&limit=100`);
  return response;
};

export const likeReplyMessage: any = async (body: any) => {
  const response = await api.post(LIKE_REPLY_MESSAGE, body);
  return response;
};

export const unLikeReplyMessage: any = async (id: any) => {
  const response = await api.delete(`${UNLIKE_REPLY_MESSAGE}/${id}`);
  return response;
};

export const getInfoReply: any = async (id: any) => {
  const response = await api.get(`${REPLY_INFO}/${id}`);
  return response;
};

export const getInfoComment: any = async (id: any) => {
  const response = await api.get(`${COMMENT_INFO}/${id}`);
  return response;
};

export const editPostApi: any = async (id: any, data: any) => {
  const response = await api.post(`${EDIT_POST}/${id}`, data);
  return response;
};

export const reportPostApi: any = async (data: any) => {
  const response = await api.post(REPORT_POST, data);
  return response;
};
