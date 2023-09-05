import {useRoute} from '@react-navigation/native';
import {useEffect, useReducer} from 'react';
import {searchListFeedApi} from '../../../services/feed';
import {IDataListFeed, IStateSearchFeed} from '../Feed/type';

export const SIZE_DEFAULT = 20;
const useSearchFeed = () => {
  const route = useRoute<any>();

  const [state, setState] = useReducer(
    (preState: IStateSearchFeed, newState: Partial<IStateSearchFeed>) => ({
      ...preState,
      ...newState,
    }),
    {
      dataAll: [],
      dataVideo: [],
      dataPodcast: [],
      dataArticle: [],
      page: route.params?.currentPage || 1,
      size: SIZE_DEFAULT,
      currentIndex: 0,
      keyword: '',
      total: 0,
      refreshing: false,
      isLoading: false,
      isLoadMore: undefined,
    },
    (preState: IStateSearchFeed) => ({
      ...preState,
    }),
  );
  const searchListVideo = async () => {
    try {
      setState({refreshing: true});
      const res = await searchListFeedApi(state.keyword);
      if (res.success) {
        let dataAll = res?.data;
        let dataVideo = res?.data.filter(
          (e: IDataListFeed) => e.content_type == 'video',
        );
        let dataArticle = res?.data.filter(
          (e: IDataListFeed) => e.content_type == 'article',
        );
        let dataPodcast = res?.data.filter(
          (e: IDataListFeed) => e.content_type == 'podcast',
        );
        setState({
          dataAll,
          dataVideo,
          dataArticle,
          dataPodcast,
        });
      }
      setState({isLoadMore: false, refreshing: false});
    } catch (error: any) {
      setState({isLoadMore: false, refreshing: false});

      console.log('=>(useSearchFeed.ts:65) error', error);
    }
  };
  const handlerData = (arr: IDataListFeed[]) => {
    console.log(
      '=>(useSearchFeed.ts:65) route.params?.currentPage',
      route.params?.currentPage,
    );
    if (arr?.length == 0) {
      if (state.page == 1 && route.params?.currentPage == 1) {
        setState({data: []});
      }
    } else {
      if (
        state.page == 1 &&
        (route.params?.currentPage == undefined ||
          route.params?.currentPage == 1)
      ) {
        setState({data: arr});
      } else {
        if (state.isLoadMore) {
          setState({
            data: [...state.data, ...arr],
          });
        } else {
          setState({
            data: [...arr, ...state.data],
            // currentIndex: state.size,
          });
        }
      }
    }
  };

  const handleLoadMore = () => {
    if (state.page * state.size <= state.total) {
      setState({
        page: state.page + 1,
        isLoadMore: true,
      });
    }
  };
  const onRefresh = () => {
    setState({page: 1, refreshing: true});
  };
  useEffect(() => {
    let timeout = setTimeout(() => {
      searchListVideo();
    }, 200);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [state.keyword]);
  return {
    state,
    setState,
    handleLoadMore,
    onRefresh,
  };
};

export default useSearchFeed;
