import {colors, scaler} from '@stylesCommon';
import React, {useEffect, useRef} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {TState} from '../index';

type TProps = {
  state: TState;
  setState: ({}) => void;
};

type TData = {
  id: number;
  value: string;
  label: string;
};

const ListMonth = (props: TProps) => {
  const {state, setState} = props;

  const flatListRef = useRef(null);

  const data: TData[] = [
    {
      id: 1,
      value: 'week_1',
      label: 'Week 1',
    },
    {
      id: 2,
      value: 'week_2',
      label: 'Week 2',
    },
    {
      id: 3,
      value: 'week_3',
      label: 'Week 3',
    },
    {
      id: 4,
      value: 'week_4',
      label: 'Week 4',
    },
    {
      id: 5,
      value: 'week_5',
      label: 'Week 5',
    },
    {
      id: 6,
      value: 'week_6',
      label: 'Week 6',
    },
    {
      id: 7,
      value: 'week_7',
      label: 'Week 7',
    },
    {
      id: 8,
      value: 'week_8',
      label: 'Week 8',
    },
    {id: 9, value: 'month_3', label: 'Month 3'},
    {
      id: 10,
      value: 'month_4',
      label: 'Month 4',
    },
    {
      id: 11,
      value: 'month_5',
      label: 'Month 5',
    },
    {
      id: 12,
      value: 'month_6',
      label: 'Month 6',
    },
    {
      id: 13,
      value: 'month_7',
      label: 'Month 7',
    },
    {
      id: 14,
      value: 'month_8',
      label: 'Month 8',
    },
    {
      id: 15,
      value: 'month_9',
      label: 'Month 9',
    },
  ];

  const dataListMonth = data.filter(item =>
    Object.keys(state.data)?.includes(item.value),
  );

  const onSelectFilter = (item: TData) => {
    setState({filter: item.value});
  };

  const scrollToWeek = () => {
    console.log('123');
    const index = data.findIndex(
      (element: any) => element?.value == state.filter,
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
  }, [state?.filter]);

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
