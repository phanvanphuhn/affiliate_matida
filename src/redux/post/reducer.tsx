import {typePost} from './type';
import {INITIAL_STATE_POST, PostState} from './state';
import {convertArrUnique} from '@util';
import {produce} from 'immer';

export default function postReducer(state = INITIAL_STATE_POST, action: any) {
  function toggleLike(state: PostState, id: number) {
    return produce(state, (draft: PostState) => {
      const posts = draft.userPost.posts.find(post => +post?.id === +id);

      if (posts) {
        if (posts?.is_liked) {
          posts.is_liked = false;
          posts.post_like =
            posts?.post_like > 0 ? +posts?.post_like - 1 + '' : '0';
        } else {
          posts.is_liked = true;
          posts.post_like =
            posts?.post_like > -1 ? +posts?.post_like + 1 + '' : '0';
        }
      }
    });
  }

  switch (action.type) {
    case typePost.GET_LIST_USER_POST_SUCCESS:
      return {
        ...state,
        userPost: {
          posts:
            action.payload?.page === 1
              ? action.payload?.posts
              : convertArrUnique(
                  state?.userPost?.posts?.concat(action.payload?.posts),
                  'id',
                ),
          total: action.payload?.total,
        },
      };
    case typePost.DELETE_LIST_USER_POST_SUCCESS:
      let dataUserPostDelete = [...state?.userPost?.posts];
      const indexUP = dataUserPostDelete.findIndex(
        (element: any) => element?.id == action?.payload,
      );
      if (indexUP > -1) {
        dataUserPostDelete.splice(indexUP, 1);
      }
      return {
        ...state,
        userPost: {
          ...state?.userPost,
          posts: dataUserPostDelete,
        },
      };
    case typePost.GET_DETAIL_POST_SUCCESS:
      return {
        ...state,
        detailPost: action?.payload,
      };

    case typePost.GET_LIST_COMMENT_SUCCESS:
      return {
        ...state,
        listComment:
          action.payload?.page === 1
            ? convertArrUnique(action.payload?.data, 'id')
            : convertArrUnique(
                state?.listComment?.concat(action.payload?.data),
                'id',
              ),
        total: action?.payload?.total,
      };
    case typePost.GET_DATA_REPLY_SUCCESS:
      const arrayListComment = [...state?.listComment];
      const indexReply = arrayListComment.findIndex(
        (element: any) => element?.id == action.payload.idComment,
      );
      if (indexReply > -1) {
        arrayListComment[indexReply].reply_comments = action.payload.dataReply;
      }
      return {
        ...state,
        listComment: arrayListComment,
      };
    case typePost.ADD_COMMENT_TO_LIST:
      return {
        ...state,
        listComment: state?.listComment?.concat(action?.payload),
      };
    case typePost.ADD_REPLY_COMMENT_TO_LIST:
      const arrayListCM = [...state?.listComment];
      const indexReplyCM = arrayListCM.findIndex(
        (element: any) => element?.id == action.payload.idCmt,
      );
      if (indexReplyCM > -1) {
        arrayListCM[indexReplyCM].reply_comments = arrayListCM[
          indexReplyCM
        ].reply_comments?.concat(action.payload?.data);
      }
      return {
        ...state,
        listComment: arrayListCM,
      };

    case typePost.UPDATE_COMMENT_POST_SOCKET_SUCCESS:
      return {
        ...state,
        listComment: action?.payload?.concat(state?.listComment),
      };
    case typePost.UPDATE_REPLY_COMMENT_SOCKET_SUCCESS:
      const arrayListCMSC = [...state?.listComment];
      const indexReplyCMSC = arrayListCMSC.findIndex(
        (element: any) => element?.id == action.payload.idCmt,
      );
      if (indexReplyCMSC > -1) {
        arrayListCMSC[indexReplyCMSC].reply_comments =
          action.payload?.data?.concat(
            arrayListCMSC[indexReplyCMSC].reply_comments,
          );
      }
      return {
        ...state,
        listComment: arrayListCMSC,
      };
    case typePost.UPDATE_LIKE_COMMENT_SOCKET_SUCCESS:
      const dataListComment = [...state?.listComment];
      const indexLikeCMSC = dataListComment.findIndex(
        (element: any) => element?.id == action.payload.id,
      );
      if (indexLikeCMSC > -1) {
        const object = {
          ...action?.payload,
          reply_comments: dataListComment[indexLikeCMSC].reply_comments,
        };
        dataListComment[indexLikeCMSC] = object;
      }
      return {
        ...state,
        listComment: dataListComment,
      };
    case typePost.UPDATE_LIKE_REPLY_COMMENT_SOCKET_SUCCESS:
      const dataListCMSC = [...state?.listComment];
      const indexLikeReplyCMSC = dataListCMSC.findIndex(
        (element: any) => element?.id == action.payload.idCmt,
      );
      if (indexLikeReplyCMSC > -1) {
        const dataReplyComment = [
          ...dataListCMSC[indexLikeReplyCMSC].reply_comments,
        ];
        const indexDataLikeReplyCMSC = dataReplyComment.findIndex(
          (element: any) => element?.id == action.payload.data?.id,
        );
        if (indexDataLikeReplyCMSC > -1) {
          dataReplyComment[indexDataLikeReplyCMSC] = action.payload.data;
        }
        dataListCMSC[indexLikeReplyCMSC].reply_comments = dataReplyComment;
      }
      return {
        ...state,
        listComment: dataListCMSC,
      };
    case typePost.CLEAR_DATA_DETAIL_POST:
      return {
        ...state,
        detailPost: null,
        listComment: [],
        loading: true,
      };

    case typePost.LOADING_FINISH:
      return {
        ...state,
        loading: false,
      };
    case typePost.LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case typePost.CHANGE_STATUS_LIKE:
      return toggleLike(state, action.payload?.id);

    default:
      return state;
  }
}
