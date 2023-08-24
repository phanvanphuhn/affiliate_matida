import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import {getListVideoOfWeek, GlobalService} from '@services';
import {useSelector} from 'react-redux';
import {FlatList, NativeSyntheticEvent} from 'react-native';
import {IDetailParams, IStateVideo} from './types';
import {OnPageSelectedEventData} from 'react-native-pager-view/src/PagerViewNativeComponent';
import {getListFeedApi} from '../../../services/feed';
import {IDataListFeed} from '../Feed/type';
import {useRoute} from '@react-navigation/native';

export const SIZE_DEFAULT = 10;
const useDetailFeed = () => {
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
      isLoadMore: false,
    },
    (preState: IStateVideo) => ({
      ...preState,
    }),
  );
  console.log('=>(useDetailFeed.ts:41) state', state);
  useEffect(() => {
    const getIndex = (size: number) => {
      return route.params?.index >= (size || SIZE_DEFAULT)
        ? route.params?.index -
            (route.params?.currentPage - 1) * (size || SIZE_DEFAULT)
        : route.params?.index;
    };
    console.log('=>(useDetailFeed.ts:48) getIndex(10)', getIndex(SIZE_DEFAULT));
    setState({currentIndex: getIndex(SIZE_DEFAULT)});
  }, [route.params?.index, route.params?.currentPage]);

  const getListVideo = async () => {
    try {
      const res = await getListFeedApi(state.page, state.size);
      if (res.success) {
        let data = res?.data?.feeds;
        setState({total: res.data?.total});
        handlerData(data);
      }
      setState({isLoadMore: false});
    } catch (error: any) {}
  };
  const handlerData = (arr: IDataListFeed[]) => {
    if (arr?.length == 0) {
      if (state.page == 1 && route.params?.currentPage == 1) {
        setState({data: []});
      }
    } else {
      if (state.page == 1 && route.params?.currentPage == 1) {
        setState({data: arr});
      } else {
        if (state.isLoadMore) {
          setState({
            data: [...state.data, ...arr],
          });
        } else {
          setState({
            data: [...arr, ...state.data],
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
  const handleLoadLess = (pageNumber: number) => {
    if (route.params?.currentPage > 1 && state.page > 1) {
      setState({
        page: state.page - 1,
        isLoadMore: false,
        currentIndex: (pageNumber ?? state.currentIndex) + state.size,
      });
    }
  };
  const onPageSelected = (pageNumber: number) => {
    console.log('=>(useDetailFeed.ts:100) pageNumber', pageNumber);
    const firstSlide = pageNumber == 0;
    console.log('=>(useDetailFeed.ts:108) firstSlide', firstSlide);
    const lastSlide = pageNumber == state.data.length - 1;
    console.log('=>(useDetailFeed.ts:111) lastSlide', lastSlide);
    if (firstSlide) {
      handleLoadLess(pageNumber);
    } else if (lastSlide) {
      // handleLoadMore();
      setState({
        currentIndex: pageNumber,
      });
    } else {
      setState({
        currentIndex: pageNumber,
      });
    }
  };
  useEffect(() => {
    getListVideo();
  }, [state.page]);
  return {state, onPageSelected, setState, handleLoadMore};
};

export default useDetailFeed;
