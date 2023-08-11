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
    return route.params?.index >= 11
      ? route.params?.index - 11
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

  const getListVideo = async () => {
    try {
      const res = await getListFeedApi(state.page, state.size);
      if (res.success) {
        let data = res?.data;
        // ?.map(e => e.id)
        // ?.filter((item, index, arr) => arr.indexOf(item))
        // .map(item => {
        //   return res?.data.find(e => e.id == item);
        // });
        // const firstSlide = data[0];
        // const lastSlide = data[data.length - 1];
        // const loopingSlides = [lastSlide, ...data, firstSlide];
        handlerData(data);
      }
      setState({isLoadMore: false});
    } catch (error: any) {}
  };
  const handlerData = (arr: IDataListFeed[]) => {
    console.log('=>(useDetailFeed.ts:62) arr', arr);
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
    console.log('=>(useDetailFeed.ts:58)handleLoadMore state.page', state.page);
    console.log(
      '=>(useDetailFeed.ts:59)handleLoadMore state.currentIndex',
      state.currentIndex,
    );
    if (state.page * (state.size + 1) <= state.data.length) {
      setState({page: state.page + 1, isLoadMore: true});
    }
  };
  const handleLoadLess = () => {
    console.log('=>(useDetailFeed.ts:58)handleLoadMore state.page', state.page);
    console.log(
      '=>(useDetailFeed.ts:59)handleLoadMore state.currentIndex',
      state.currentIndex,
    );
    if (route.params?.currentPage > 1 && state.page > 1) {
      setState({page: state.page - 1, isLoadMore: false});
    }
  };
  const onPageSelected = (pageNumber: number) => {
    console.log('=>(useDetailFeed.ts:100) pageNumber', pageNumber);
    const firstSlide = pageNumber === 0;
    const lastSlide = pageNumber === state.data.length - 2;
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
    console.log('=>(useDetailFeed.ts:88) state.page', state.page);
    getListVideo();
  }, [state.page]);
  return {state, onPageSelected, setState, handleLoadMore};
};

export default useDetailFeed;
