import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {TState} from '../index';

type TProps = {
  state: TState;
  setState: ({}) => void;
};

type TData = {
  value: string;
  label: string;
};

const ListMonth = (props: TProps) => {
  const {state, setState} = props;
  const data: TData[] = [
    {
      value: 'week_1',
      label: 'Week 1',
    },
    {
      value: 'week_2',
      label: 'Week 2',
    },
    {
      value: 'week_3',
      label: 'Week 3',
    },
    {
      value: 'week_4',
      label: 'Week 4',
    },
    {
      value: 'week_5',
      label: 'Week 5',
    },
    {
      value: 'week_6',
      label: 'Week 6',
    },
    {
      value: 'week_7',
      label: 'Week 7',
    },
    {
      value: 'week_8',
      label: 'Week 8',
    },
    {
      value: 'month_3',
      label: 'Month 3',
    },
    {
      value: 'month_4',
      label: 'Month 4',
    },
    {
      value: 'month_5',
      label: 'Month 5',
    },
    {
      value: 'month_6',
      label: 'Month 6',
    },
    {
      value: 'month_7',
      label: 'Month 7',
    },
    {
      value: 'month_8',
      label: 'Month 8',
    },
    {
      value: 'month_9',
      label: 'Month 9',
    },
  ];

  const dataListMonth = data.filter(item =>
    Object.keys(state.data)?.includes(item.value),
  );

  const onSelectFilter = (item: TData) => {
    console.log('state: ', state, item.value);
    setState({filter: item.value});
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.wrapBtnContainer,
          state.filter == item.value
            ? {backgroundColor: '#FFEBEB'}
            : {backgroundColor: colors.white},
        ]}
        onPress={() => onSelectFilter(item)}
        disabled={state?.filter == item.value}>
        <Text
          style={[
            styles.btnTitle,
            state.filter == item.value
              ? {color: colors.primaryBackground}
              : {color: '#A3A1AB'},
          ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={dataListMonth}
      renderItem={renderItem}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
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
