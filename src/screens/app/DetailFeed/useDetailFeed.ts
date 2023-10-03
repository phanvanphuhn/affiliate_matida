import {useRoute} from '@react-navigation/native';
import {RefObject, useEffect, useReducer} from 'react';
import {getDetailFeedApi, getListFeedApi} from '../../../services/feed';
import {IDataListFeed} from '../Feed/type';
import {IStateVideo} from './types';
import Swiper from './SwiperFlatlist/Swiper';
import {useVideo} from './components/Container';
import {Dimensions} from 'react-native';
export const widthFullScreen = Dimensions.get('screen').width;
export const heightFullScreen = Dimensions.get('screen').height;
export const SIZE_DEFAULT = 20;
const useDetailFeed = () => {
  const route = useRoute<any>();

  const {state, setState} = useVideo();

  const getIndex = (index: number, page: number) => {
    return index >= SIZE_DEFAULT ? index - (page - 1) * SIZE_DEFAULT : index;
  };
  const getDetail = async () => {
    if (!route.params?.id && !route.params?.content_type) {
      return;
    }
    const res = await getDetailFeedApi(
      route.params?.content_type,
      route.params?.id,
    );
    if (res.success) {
      let page = Math.ceil((res?.data?.feed_detail?.index + 1) / SIZE_DEFAULT);
      let index = getIndex(res?.data?.feed_detail?.index, page);
      setState({
        is_liked: res?.data?.is_liked,
        totalComment: res?.data?.total_comments,
        page,
        index,
        total: res?.data?.feed_detail?.total,
        currentIndex: index,
      });
    }
  };

  useEffect(() => {
    getDetail();
  }, [route.params?.id, route.params?.content_type]);

  // useEffect(() => {
  //   if (state.data.length && !!state.currentIndex && pagerViewRef) {
  //     pagerViewRef.current?.scrollTo(state.currentIndex, false);
  //   }
  // }, [state.data]);
  const getListVideo = async () => {
    try {
      const res = await getListFeedApi(state.page, state.size);
      if (res.success) {
        let data = res?.data?.feeds;
        setState({total: res.data?.total});
        handlerData(data);
      }
      setState({isLoadMore: false, refreshing: false});
    } catch (error: any) {
      setState({isLoadMore: false, refreshing: false});
    }
  };
  const handlerData = (arr: IDataListFeed[]) => {
    if (arr?.length == 0) {
      if (state.page == 1 && route.params?.currentPage == 1) {
        setState({data: []});
      }
    } else {
      if (
        state.page == 1 &&
        (route.params?.currentPage == undefined ||
          route.params?.currentPage == 1) &&
        state.refreshing
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
    if (state.page * state.size < state.total) {
      setState({
        page: state.page + 1,
        isLoadMore: true,
        isLoadLess: false,
      });
    } else if (state.index + (state.page - 1) * state.size == state.total - 1) {
      setState({
        page: 1,
        isLoadMore: true,
        isLoadLess: false,
      });
    }
  };
  const handleLoadLess = () => {
    if (route.params?.currentPage > 1 && state.page && state.page > 1) {
      setState({
        page: state.page - 1,
        isLoadMore: false,
        isLoadLess: true,
      });
    }
  };
  const onPageSelected = (pageNumber: number) => {
    const firstSlide = pageNumber == 0;
    const lastSlide = pageNumber == (state.data?.length || 0) - 1;
    if (firstSlide) {
      // handleLoadLess();
    } else if (lastSlide) {
      handleLoadMore();
    }
    setState({
      currentIndex: pageNumber,
    });
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
    if (!state.refreshing && state.page) {
      getListVideo();
    }
  }, [state.page]);
  return {
    state,
    onPageSelected,
    setState,
    handleLoadMore,
    handleLoadLess,
    onRefresh,
  };
};

export default useDetailFeed;
