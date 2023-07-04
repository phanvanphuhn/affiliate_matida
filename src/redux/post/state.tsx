export type PostState = {
  userPost: {
    posts: any[];
    total: any;
  };
  detailPost: any;
  listComment: any;
  total: any;
  loading: boolean;
};

export const INITIAL_STATE_POST: PostState = {
  userPost: {
    posts: [],
    total: null,
  },
  detailPost: null,
  listComment: [],
  total: null,
  loading: true,
};
