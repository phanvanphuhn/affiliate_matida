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
import {indexOf} from 'lodash';

const useDetailFeed = () => {
  const route = useRoute<any>();
  const getIndex = useCallback(() => {
    return route.params?.index >= 10
      ? route.params?.index - (route.params?.currentPage - 1) * 10
      : route.params?.index;
  }, [route.params?.index]);
  const [state, setState] = useReducer(
    (preState: IStateVideo, newState: Partial<IStateVideo>) => ({
      ...preState,
      ...newState,
    }),
    {
      data: [],
      page: route.params?.currentPage || 1,
      size: 10,
      total: 0,
      currentIndex: getIndex() || 0,
      refreshing: false,
      isOpen: false,
      isLoading: false,
      isLoadMore: false,
    },
    (preState: IStateVideo) => ({
      ...preState,
    }),
  );
  console.log('=>(useDetailFeed.ts:46) s.state', state);

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
      setState({page: state.page + 1, isLoadMore: true});
    }
  };
  const handleLoadLess = () => {
    if (route.params?.currentPage > 1 && state.page > 1) {
      setState({
        page: state.page - 1,
        isLoadMore: false,
        currentIndex:
          (route.params?.currentPage - (state.currentIndex + 1)) * state.size,
      });
    }
  };
  const onPageSelected = (pageNumber: number) => {
    console.log('=>(useDetailFeed.ts:100) pageNumber', pageNumber);
    const firstSlide = pageNumber >= 0 && pageNumber <= 1;
    console.log('=>(useDetailFeed.ts:108) firstSlide', firstSlide);
    const lastSlide =
      pageNumber >= state.data.length - 2 && pageNumber < state.data.length;
    console.log('=>(useDetailFeed.ts:111) lastSlide', lastSlide);
    if (firstSlide) {
      handleLoadLess();
    } else if (lastSlide) {
      handleLoadMore();
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
