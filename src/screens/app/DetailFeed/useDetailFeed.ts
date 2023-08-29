import {useRoute} from '@react-navigation/native';
import {RefObject, useEffect, useReducer} from 'react';
import {getListFeedApi} from '../../../services/feed';
import {IDataListFeed} from '../Feed/type';
import {IStateVideo} from './types';
import Swiper from './SwiperFlatlist/Swiper';

export const SIZE_DEFAULT = 20;
const useDetailFeed = (pagerViewRef: RefObject<Swiper>) => {
  const route = useRoute<any>();

  const [state, setState] = useReducer(
    (preState: IStateVideo, newState: Partial<IStateVideo>) => ({
      ...preState,
      ...newState,
    }),
    {
      data: [],
      page: route.params?.currentPage || 1,
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
  useEffect(() => {
    const getIndex = (size: number) => {
      return route.params?.index >= (size || SIZE_DEFAULT)
        ? route.params?.index -
            (route.params?.currentPage - 1) * (size || SIZE_DEFAULT)
        : route.params?.index;
    };
    setState({currentIndex: getIndex(SIZE_DEFAULT)});
  }, [route.params?.index, route.params?.currentPage]);

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

      console.log('=>(useDetailFeed.ts:65) error', error);
    }
  };
  const handlerData = (arr: IDataListFeed[]) => {
    console.log(
      '=>(useDetailFeed.ts:65) route.params?.currentPage',
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
        isLoadLess: false,
      });
    }
  };
  const handleLoadLess = () => {
    if (route.params?.currentPage > 1 && state.page > 1) {
      setState({
        page: state.page - 1,
        isLoadMore: false,
        isLoadLess: true,
      });
    }
  };
  const onPageSelected = (pageNumber: number) => {
    const firstSlide = pageNumber == 0;
    const lastSlide = pageNumber == state.data.length - 1;
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
    if (!state.refreshing) {
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
