/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useRef} from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

type Props = {
  onChange: (item: any, index: number) => void;
  tab: number;
};

export const ForumTab = (props: Props) => {
  const {onChange, tab} = props;

  const listRef = useRef<FlatList>(null);

  const onChangeTab = (item: any, index: number) => {
    onChange && onChange(item, index);
    listRef.current?.scrollToIndex({
      index: index,
      viewPosition: 0.5,
    });
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onChangeTab(item, index)}
        key={index}
        disabled={tab === index}
        style={[
          styles.itemTab,
          tab !== index ? styles.itemInActive : styles.itemActive,
        ]}>
        <Text style={[styles.textItem, tab !== index && styles.textInActive]}>
          {item}
        </Text>
        <Text style={[styles.txtCount, tab !== index && styles.textInActive]}>
          {'20'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={[
        'All',
        'Nutrition',
        'Week 1-13',
        'Week 14-27',
        'Week 28-42',
        'Baby',
        'Shopping',
        'Mental Health',
      ]}
      renderItem={renderItem}
      horizontal
      ref={listRef}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingHorizontal: scaler(16),
  },
  itemTab: {
    width: scaler(80),
    height: scaler(60),
    marginRight: scaler(10),
    borderRadius: scaler(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaler(10),
  },
  itemActive: {
    backgroundColor: '#E56D6F',
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: scaler(4),
    shadowOffset: {
      height: 4,
      width: 2,
    },
  },
  itemInActive: {
    borderColor: '#F4F4F4',
    borderWidth: scaler(1),
    backgroundColor: 'white',
  },
  textItem: {
    color: 'white',
    fontSize: scaler(10),
    ...stylesCommon.fontWeight400,
  },
  txtCount: {
    color: 'white',
    fontSize: scaler(16),
    ...stylesCommon.fontWeight700,
    marginTop: scaler(9),
  },
  textInActive: {
    color: colors.textColor,
  },
});
