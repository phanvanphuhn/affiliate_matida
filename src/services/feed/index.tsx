import api from '../api';

const GET_LIST_FEED = 'feeds';
const API_COMMENTS = 'comments';
const GET_LIST_COMMENT_FEED = 'comments/feed';
const API_LIKE_COMMENT_FEED = 'likes/comment';
const API_REPLY_COMMENT_FEED = 'reply-comments/feed';

export const getListFeedApi: any = async (page: number, limit: number = 10) => {
  const response = await api.get(
    `${GET_LIST_FEED}?page=${page}&limit=${limit}`,
  );
  return response;
};
export const getListCommentFeedApi: any = async (
  feedType: string,
  feedId: string,
  page: number,
  limit: number = 10,
) => {
  const response = await api.get(
    `${GET_LIST_COMMENT_FEED}/${feedType}/${feedId}?page=${page}&limit=${limit}`,
  );
  return response;
};
export const commentFeedApi: any = async (
  content: string,
  feed_type: string,
  feed_id: string,
) => {
  const response = await api.post(`${API_COMMENTS}`, {
    content,
    feed_type,
    feed_id,
  });
  return response;
};
export const likeCommentFeedApi: any = async (comment_id: string) => {
  const response = await api.post(`${API_LIKE_COMMENT_FEED}`, {
    comment_id,
  });
  return response;
};
export const repliesCommentFeedApi: any = async (
  comment_id: string,
  content: string,
) => {
  const response = await api.post(`${API_REPLY_COMMENT_FEED}`, {
    comment_id,
    content,
  });
  return response;
};
export const getRepliesCommentFeedApi: any = async (comment_id: string) => {
  const response = await api.get(`${API_REPLY_COMMENT_FEED}/${comment_id}`);
  return response;
};
