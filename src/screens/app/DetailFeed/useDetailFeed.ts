import React, {useEffect, useReducer, useRef, useState} from 'react';
import {getListVideoOfWeek, GlobalService} from '@services';
import {useSelector} from 'react-redux';
import {FlatList, NativeSyntheticEvent} from 'react-native';
import {IDetailParams, IStateVideo} from './types';
import {OnPageSelectedEventData} from 'react-native-pager-view/src/PagerViewNativeComponent';
import {getListFeedApi} from '../../../services/feed';
import {IDataListFeed} from '../Feed/type';
import {useRoute} from '@react-navigation/native';

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
      size: 10,
      total: 0,
      currentIndex: route.params?.index || 0,
      refreshing: false,
      isOpen: false,
      isLoading: false,
      isLoadMore: false,
    },
    (preState: IStateVideo) => ({
      ...preState,
    }),
  );
  console.log('=>(useDetailFeed.ts:33) state', state);

  const getListVideo = async () => {
    try {
      const res = await getListFeedApi(state.page, state.size);
      if (res.success) {
        let data = res?.data;
        const firstSlide = data[0];
        const lastSlide = data[data.length - 1];
        const loopingSlides = [lastSlide, ...data, firstSlide];
        handlerData(loopingSlides);
      }
      setState({isLoadMore: false});
    } catch (error: any) {}
  };
  const handlerData = (arr: IDataListFeed[]) => {
    console.log('=>(useDetailFeed.ts:62) arr', arr);
    if (arr?.length == 0) {
      if (state.page == route.params?.currentPage) {
        setState({data: []});
      }
    } else {
      if (state.page == route.params?.currentPage) {
        setState({data: arr});
      } else {
        if (state.isLoadMore) {
          setState({data: [...state.data, ...arr]});
        } else {
          setState({data: [...arr, ...state.data]});
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
  const onPageSelected = (event: NativeSyntheticEvent<any>) => {
    const currentPage = event.nativeEvent.position;
    console.log('=>(index.tsx:54) currentPage', currentPage);
    // const firstSlide = currentPage === 0;
    // const lastSlide = currentPage === state.data.length - 1;
    // if (firstSlide && state.page > 1) {
    //   setState({
    //     page: state.page - 1,
    //     isLoadMore: false,
    //     currentIndex: currentPage,
    //   });
    // } else if (
    //   lastSlide &&
    //   state.page * (state.size + 1) <= state.data.length
    // ) {
    //   setState({
    //     page: state.page + 1,
    //     isLoadMore: true,
    //     currentIndex: currentPage,
    //   });
    // }
    setState({
      currentIndex: currentPage,
    });
  };
  useEffect(() => {
    console.log('=>(useDetailFeed.ts:88) state.page', state.page);
    getListVideo();
  }, [state.page]);
  return {state, onPageSelected, setState, handleLoadMore};
};

export default useDetailFeed;
