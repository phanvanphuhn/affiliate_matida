import {useRoute} from '@react-navigation/native';
import {useEffect, useReducer} from 'react';
import {getListFeedApi} from '../../../services/feed';
import {IDataListFeed} from '../Feed/type';
import {IStateVideo} from '../DetailFeed/types';

const SIZE_DEFAULT = 10;
const useListFeed = () => {
  const [state, setState] = useReducer(
    (preState: IStateVideo, newState: Partial<IStateVideo>) => ({
      ...preState,
      ...newState,
    }),
    {
      data: [],
      page: 1,
      size: SIZE_DEFAULT,
      total: 0,
      currentIndex: undefined,
      refreshing: false,
      isOpen: false,
      isLoading: false,
      isLoadMore: undefined,
      isLoadLess: undefined,
    },
    (preState: IStateVideo) => ({
      ...preState,
    }),
  );
  const getListVideo = async () => {
    try {
      const res = await getListFeedApi(state.page, state.size);
      if (res.success) {
        let data = res?.data?.feeds;
        setState({total: res?.data?.total});
        handlerData(data);
      }
      setState({isLoadMore: false, refreshing: false});
    } catch (error: any) {
      setState({isLoadMore: false, refreshing: false});
    }
  };
  const handlerData = (arr: IDataListFeed[]) => {
    if (arr?.length == 0) {
      if (state.page == 1) {
        setState({data: []});
      }
    } else {
      if (state.page == 1) {
        setState({data: arr});
      } else {
        setState({
          data: [...state.data, ...arr],
        });
      }
    }
  };

  const handleLoadMore = () => {
    if (state.page * state.size <= state.total) {
      setState({
        page: state.page + 1,
        isLoadMore: true,
        isLoadLess: false,
      });
    }
  };
  const onRefresh = () => {
    setState({page: 1, refreshing: true});
  };
  useEffect(() => {
    if (state.refreshing) {
      getListVideo();
    }
  }, [state.refreshing]);
  useEffect(() => {
    if (!state.refreshing) {
      getListVideo();
    }
  }, [state.page]);
  return {
    state,
    setState,
    handleLoadMore,
    onRefresh,
  };
};

export default useListFeed;
