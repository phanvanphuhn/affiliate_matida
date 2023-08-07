import React, {useEffect, useReducer, useRef, useState} from 'react';
import {getListVideoOfWeek, GlobalService} from '@services';
import {useSelector} from 'react-redux';
import {FlatList, NativeSyntheticEvent} from 'react-native';
import {IStateVideo} from './types';
import {OnPageSelectedEventData} from 'react-native-pager-view/src/PagerViewNativeComponent';

const useDetailFeed = () => {
  const [state, setState] = useReducer(
    (preState: IStateVideo, newState: Partial<IStateVideo>) => ({
      ...preState,
      ...newState,
    }),
    {
      data: [],
      page: 1,
      size: 10,
      total: 0,
      currentIndex: 0,
      refreshing: false,
      isOpen: false,
      isLoading: false,
      isLoadMore: false,
    },
    (preState: IStateVideo) => ({
      ...preState,
    }),
  );
  const weekRedux =
    useSelector(
      (stateRedux: any) =>
        stateRedux?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks,
    ) ?? 40;
  const week = weekRedux < 0 || weekRedux === null ? 40 : weekRedux;
  const getListVideo = async (value: any) => {
    try {
      if (state.page === 1) {
        GlobalService.showLoading();
      }

      const res = await getListVideoOfWeek(value, state.page);
      let data = res?.data?.data.map(e => ({
        ...e,
        type: 'video',
      }));
      const firstSlide = data[0];
      const lastSlide = data[data.length - 1];
      const loopingSlides = [lastSlide, ...data, firstSlide];
      if (state.page === 1) {
        setState({data: loopingSlides});
      } else {
        setState({data: state.data.concat(loopingSlides)});
      }
      setState({total: res?.data?.total, isLoadMore: false});
    } catch (error: any) {
    } finally {
      GlobalService.hideLoading();
    }
  };

  const onPageSelected = (event: NativeSyntheticEvent<any>) => {
    setState({currentIndex: event.nativeEvent.position});
  };
  useEffect(() => {
    getListVideo(week ?? 40);
  }, []);
  return {state, onPageSelected, setState};
};

export default useDetailFeed;
