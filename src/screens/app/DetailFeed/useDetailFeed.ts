import React, {useEffect, useReducer, useRef, useState} from 'react';
import {getListVideoOfWeek, GlobalService} from '@services';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import {IState} from './types';

const useDetailFeed = () => {
  const [state, setState] = useReducer(
    (preState: IState, newState: Partial<IState>) => ({
      ...preState,
      ...newState,
    }),
    {
      data: [],
      page: 1,
      size: 10,
      total: 0,
      refreshing: false,
      isLoading: false,
      isLoadMore: false,
    },
    (preState: IState) => ({
      ...preState,
    }),
  );
  console.log('=>(useDetailFeed.ts:26) state', state);
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
      if (state.page === 1) {
        setState({data: res?.data?.data.map(e => ({...e, type: 'video'}))});
      } else {
        setState({data: state.data.concat(res?.data?.data)});
      }
      setState({total: res?.data?.total, isLoadMore: false});
    } catch (error: any) {
    } finally {
      GlobalService.hideLoading();
    }
  };

  useEffect(() => {
    getListVideo(week ?? 40);
  }, []);
  return {state};
};

export default useDetailFeed;
