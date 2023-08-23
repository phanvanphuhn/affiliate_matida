import {useEffect, useReducer, useRef} from 'react';
import {IDataComment, IStateComment} from './types';
import {
  commentFeedApi,
  getListCommentFeedApi,
  getListFeedApi,
  likeCommentFeedApi,
  repliesCommentFeedApi,
} from '../../../services/feed';
import {IDataListFeed} from '../Feed/type';
import {useRoute} from '@react-navigation/native';
import {useVideo} from './components/Container';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {BottomSheetFlatListMethods} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';

const useCommentFeed = () => {
  const route = useRoute<any>();
  const flatlitRef = useRef<BottomSheetFlatListMethods>();
  const [state, setState] = useReducer(
    (preState: IStateComment, newState: Partial<IStateComment>) => ({
      ...preState,
      ...newState,
    }),
    {
      data: [],
      page: 1,
      size: 10,
      total: 0,
      currentIndex: 0,
      content: '',
      refreshing: false,
      isOpen: false,
      isLoading: true,
      isLoadMore: false,
    },
    (preState: IStateComment) => ({
      ...preState,
    }),
  );
  const {state: stateFeed, setState: setStateFeed} = useVideo();
  const actionComment = async () => {
    try {
      if (!state.content) {
        return;
      }
      const res = await commentFeedApi(
        state.content,
        stateFeed.feed?.content_type,
        stateFeed.feed?.id,
      );
      if (res.success) {
        setState({data: state.data.concat([res.data]), content: ''});
        setStateFeed({totalComment: (stateFeed.totalComment || 0) + 1});
        setTimeout(() => {
          flatlitRef.current?.scrollToEnd();
        }, 300);
      }
    } catch (error: any) {}
  };
  const actionLikeComment = async (item: IDataComment) => {
    try {
      const res = await likeCommentFeedApi(item.id);
      if (res.success) {
        item.is_liked = 1;
        setState({data: state.data});
      }
    } catch (error: any) {}
  };
  const actionReliesComment = async (comment_id: number) => {
    try {
      const res = await repliesCommentFeedApi(comment_id, state.content);
      if (res.success) {
        let i = state.data.findIndex(e => e.id === comment_id);
        let data = [...state.data];
        data[i].reply_comments.push(res?.data);
        data[i].total_reply_comment = data[i].total_reply_comment + 1;
        setState({data, content: ''});
      }
    } catch (error: any) {}
  };
  const getListComment = async () => {
    try {
      const res = await getListCommentFeedApi(
        stateFeed.feed?.content_type,
        stateFeed.feed?.id,
        state.page,
        state.size,
      );
      if (res.success) {
        let data = res?.data?.comments;
        setState({total: res.data?.total});
        setStateFeed({totalComment: res.data?.total});

        handlerData(data);
      }
      setState({isLoadMore: false, isLoading: false});
    } catch (error: any) {}
  };
  const handlerData = (arr: IDataComment[]) => {
    if (arr?.length == 0) {
      if (state.page == 1 && route.params?.currentPage == 1) {
        setState({data: []});
      }
    } else {
      if (state.page == 1 && route.params?.currentPage == 1) {
        setState({data: arr});
      } else {
        setState({
          data: [...state.data, ...arr],
        });
      }
    }
  };

  const handleLoadMore = () => {
    if (state.page * state.size <= state?.data?.length) {
      setState({
        page: state.page + 1,
        isLoadMore: true,
      });
    }
  };
  useEffect(() => {
    if (stateFeed.isShowComment && stateFeed.feed) {
      getListComment();
    }
  }, [state.page, stateFeed.feed, stateFeed.isShowComment]);
  return {
    state,
    setState,
    handleLoadMore,
    actionComment,
    flatlitRef,
    actionLikeComment,
    actionReliesComment,
  };
};

export default useCommentFeed;
