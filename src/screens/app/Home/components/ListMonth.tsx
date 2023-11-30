import {colors, scaler, stylesCommon} from '@stylesCommon';
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

export const dataInitListMonth: TData[] = [
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

export const dataInitPregnantWeek: TData[] = [
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
    value: 'week_9',
    labelEn: 'Week 9',
    labelVi: 'Tuần 9',
    intVal: 9,
  },
  {
    id: 10,
    value: 'week_10',
    labelEn: 'Week 10',
    labelVi: 'Tuần 10',
    intVal: 10,
  },
  {
    id: 11,
    value: 'week_11',
    labelEn: 'Week 11',
    labelVi: 'Tuần 11',
    intVal: 11,
  },
  {
    id: 12,
    value: 'week_12',
    labelEn: 'Week 12',
    labelVi: 'Tuần 12',
    intVal: 12,
  },
  {
    id: 13,
    value: 'week_13',
    labelEn: 'Week 13',
    labelVi: 'Tuần 13',
    intVal: 13,
  },
  {
    id: 14,
    value: 'week_14',
    labelEn: 'Week 14',
    labelVi: 'Tuần 14',
    intVal: 14,
  },
  {
    id: 15,
    value: 'week_15',
    labelEn: 'Week 15',
    labelVi: 'Tuần 15',
    intVal: 15,
  },
  {
    id: 16,
    value: 'week_16',
    labelEn: 'Week 16',
    labelVi: 'Tuần 16',
    intVal: 16,
  },
  {
    id: 17,
    value: 'week_17',
    labelEn: 'Week 17',
    labelVi: 'Tuần 17',
    intVal: 17,
  },
  {
    id: 18,
    value: 'week_18',
    labelEn: 'Week 18',
    labelVi: 'Tuần 18',
    intVal: 18,
  },
  {
    id: 19,
    value: 'week_19',
    labelEn: 'Week 19',
    labelVi: 'Tuần 19',
    intVal: 19,
  },
  {
    id: 20,
    value: 'week_20',
    labelEn: 'Week 20',
    labelVi: 'Tuần 20',
    intVal: 20,
  },
  {
    id: 21,
    value: 'week_21',
    labelEn: 'Week 21',
    labelVi: 'Tuần 21',
    intVal: 21,
  },
  {
    id: 22,
    value: 'week_22',
    labelEn: 'Week 22',
    labelVi: 'Tuần 22',
    intVal: 22,
  },
  {
    id: 23,
    value: 'week_23',
    labelEn: 'Week 23',
    labelVi: 'Tuần 23',
    intVal: 23,
  },
  {
    id: 24,
    value: 'week_24',
    labelEn: 'Week 24',
    labelVi: 'Tuần 24',
    intVal: 24,
  },
  {
    id: 25,
    value: 'week_25',
    labelEn: 'Week 25',
    labelVi: 'Tuần 25',
    intVal: 25,
  },
  {
    id: 26,
    value: 'week_26',
    labelEn: 'Week 26',
    labelVi: 'Tuần 26',
    intVal: 26,
  },
  {
    id: 27,
    value: 'week_27',
    labelEn: 'Week 27',
    labelVi: 'Tuần 27',
    intVal: 27,
  },
  {
    id: 28,
    value: 'week_28',
    labelEn: 'Week 28',
    labelVi: 'Tuần 28',
    intVal: 28,
  },
  {
    id: 29,
    value: 'week_29',
    labelEn: 'Week 29',
    labelVi: 'Tuần 29',
    intVal: 29,
  },
  {
    id: 30,
    value: 'week_30',
    labelEn: 'Week 30',
    labelVi: 'Tuần 30',
    intVal: 30,
  },
  {
    id: 31,
    value: 'week_31',
    labelEn: 'Week 31',
    labelVi: 'Tuần 31',
    intVal: 31,
  },
  {
    id: 32,
    value: 'week_32',
    labelEn: 'Week 32',
    labelVi: 'Tuần 32',
    intVal: 32,
  },
  {
    id: 33,
    value: 'week_33',
    labelEn: 'Week 33',
    labelVi: 'Tuần 33',
    intVal: 33,
  },
  {
    id: 34,
    value: 'week_34',
    labelEn: 'Week 34',
    labelVi: 'Tuần 34',
    intVal: 34,
  },
  {
    id: 35,
    value: 'week_35',
    labelEn: 'Week 35',
    labelVi: 'Tuần 35',
    intVal: 35,
  },
  {
    id: 36,
    value: 'week_36',
    labelEn: 'Week 36',
    labelVi: 'Tuần 36',
    intVal: 36,
  },
  {
    id: 37,
    value: 'week_37',
    labelEn: 'Week 37',
    labelVi: 'Tuần 37',
    intVal: 37,
  },
  {
    id: 38,
    value: 'week_38',
    labelEn: 'Week 38',
    labelVi: 'Tuần 38',
    intVal: 38,
  },
  {
    id: 39,
    value: 'week_39',
    labelEn: 'Week 39',
    labelVi: 'Tuần 39',
    intVal: 39,
  },
  {
    id: 40,
    value: 'week_40',
    labelEn: 'Week 40',
    labelVi: 'Tuần 40',
    intVal: 40,
  },
];

const ListMonth = (props: TProps) => {
  const {callback, filterVal} = props;
  const {state, setState} = useContainerContext();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const flatListRef = useRef(null);

  const dataListMonth =
    user?.baby_type == 'pregnant' ||
    user?.baby_type == 'pregnant-overdue' ||
    user?.baby_type == 'unknown'
      ? dataInitPregnantWeek
      : dataInitListMonth.filter(item =>
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
    const index = dataListMonth.findIndex(
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
    ...stylesCommon.fontWeight500,
  },
});

export default ListMonth;
