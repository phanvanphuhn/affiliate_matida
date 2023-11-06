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
      value: 'w1',
      label: 'Week 1',
    },
    {
      value: 'w2',
      label: 'Week 2',
    },
    {
      value: 'w3',
      label: 'Week 3',
    },
    {
      value: 'w4',
      label: 'Week 4',
    },
    {
      value: 'w5',
      label: 'Week 5',
    },
    {
      value: 'w6',
      label: 'Week 6',
    },
    {
      value: 'w7',
      label: 'Week 7',
    },
    {
      value: 'w8',
      label: 'Week 8',
    },
    {
      value: 'm3',
      label: 'Month 3',
    },
    {
      value: 'm4',
      label: 'Month 4',
    },
    {
      value: 'm5',
      label: 'Month 5',
    },
    {
      value: 'm6',
      label: 'Month 6',
    },
    {
      value: 'm7',
      label: 'Month 7',
    },
    {
      value: 'm8',
      label: 'Month 8',
    },
    {
      value: 'm9',
      label: 'Month 9',
    },
  ];

  const onSelectFilter = (item: TData) => {
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
        onPress={() => onSelectFilter(item)}>
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
      data={data}
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
