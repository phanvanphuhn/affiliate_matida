import {colors, scaler} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {TState} from '../index';
import {useContainerContext} from '@component/ContainerProvider';
import {useSelector} from 'react-redux';
import {event, eventType, trackingAppEvent} from '@util';

type TProps = {
  callback?: (a: TData) => void;
  filterVal?: TData;
};

export type TData = {
  id: number;
  value: string;
  labelEn: string;
  labelVi: string;
  intVal: number;
};

const ListMonth = (props: TProps) => {
  const {callback, filterVal} = props;
  const {state, setState} = useContainerContext();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const flatListRef = useRef(null);

  const data: TData[] = [
    {
      id: 1,
      value: 'week_1',
      labelEn: 'Week 1',
      labelVi: 'Tuần 1',
      intVal: 1,
    },
    {
      id: 2,
      value: 'week_2',
      labelEn: 'Week 2',
      labelVi: 'Tuần 2',
      intVal: 2,
    },
    {
      id: 3,
      value: 'week_3',
      labelEn: 'Week 3',
      labelVi: 'Tuần 3',
      intVal: 3,
    },
    {
      id: 4,
      value: 'week_4',
      labelEn: 'Week 4',
      labelVi: 'Tuần 4',
      intVal: 4,
    },
    {
      id: 5,
      value: 'week_5',
      labelEn: 'Week 5',
      labelVi: 'Tuần 5',
      intVal: 5,
    },
    {
      id: 6,
      value: 'week_6',
      labelEn: 'Week 6',
      labelVi: 'Tuần 6',
      intVal: 6,
    },
    {
      id: 7,
      value: 'week_7',
      labelEn: 'Week 7',
      labelVi: 'Tuần 7',
      intVal: 7,
    },
    {
      id: 8,
      value: 'week_8',
      labelEn: 'Week 8',
      labelVi: 'Tuần 8',
      intVal: 8,
    },
    {
      id: 9,
      value: 'month_3',
      labelEn: 'Month 3',
      labelVi: 'Tháng 3',
      intVal: 3,
    },
    {
      id: 10,
      value: 'month_4',
      labelEn: 'Month 4',
      labelVi: 'Tháng 4',
      intVal: 4,
    },
    {
      id: 11,
      value: 'month_5',
      labelEn: 'Month 5',
      labelVi: 'Tháng 5',
      intVal: 5,
    },
    {
      id: 12,
      value: 'month_6',
      labelEn: 'Month 6',
      labelVi: 'Tháng 6',
      intVal: 6,
    },
    {
      id: 13,
      value: 'month_7',
      labelEn: 'Month 7',
      labelVi: 'Tháng 7',
      intVal: 7,
    },
    {
      id: 14,
      value: 'month_8',
      labelEn: 'Month 8',
      labelVi: 'Tháng 8',
      intVal: 8,
    },
    {
      id: 15,
      value: 'month_9',
      labelEn: 'Month 9',
      labelVi: 'Tháng 9',
      intVal: 9,
    },
  ];

  const dataListMonth = data.filter(item =>
    Object.keys(state.data)?.includes(item.value),
  );

  const onSelectFilter = (item: TData) => {
    trackingAppEvent(
      event.NEW_BORN.NEW_BORN_HOMEPAGE_CHANGE_TIME,
      {
        params: {
          userId: user.id,
          week: item.value,
        },
      },
      eventType.MIX_PANEL,
    );
    setState({filter: item});
    callback && callback(item && item);
  };

  const scrollToWeek = () => {
    const index = data.findIndex(
      (element: any) =>
        element?.value == (filterVal ? filterVal?.value : state?.filter.value),
    );
    if (index >= 0) {
      const wait = new Promise((resolve: any) => setTimeout(resolve, 500));
      wait.then(() => {
        flatListRef?.current?.scrollToIndex({
          index: index === 0 ? 0 : index,
          animated: true,
          viewPosition: 0.5,
        });
      });
    }
  };

  useEffect(() => {
    if (state?.filter) {
      scrollToWeek();
    }
  }, [state?.filter.value, filterVal?.value]);

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.wrapBtnContainer,
          (filterVal ? filterVal?.value : state?.filter.value) == item.value
            ? {backgroundColor: '#FFEBEB'}
            : {backgroundColor: colors.white},
        ]}
        onPress={() => onSelectFilter(item)}
        disabled={
          (filterVal ? filterVal?.value : state?.filter.value) == item.value
        }>
        <Text
          style={[
            styles.btnTitle,
            (filterVal ? filterVal?.value : state?.filter.value) == item.value
              ? {color: colors.primaryBackground}
              : {color: '#A3A1AB'},
          ]}>
          {lang == 1 ? item.labelEn : item.labelVi}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={dataListMonth}
      renderItem={renderItem}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={0}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  wrapBtnContainer: {
    paddingVertical: scaler(8),
    paddingHorizontal: scaler(12),
    marginRight: scaler(4),
    borderRadius: scaler(40),
  },
  btnTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ListMonth;
