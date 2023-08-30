/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {scaler, stylesCommon} from '@stylesCommon';
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
          tab !== index && {
            opacity: 0.5,
          },
        ]}>
        <Text style={styles.textItem}>{item}</Text>
        {/* <ImageBackground /> */}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={['All', 'Nutrition', 'Baby', 'Shopping', 'Mental Health']}
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
  },
  contentContainer: {
    paddingHorizontal: scaler(16),
  },
  itemTab: {
    width: scaler(131),
    height: scaler(166),
    marginRight: scaler(10),
    borderRadius: scaler(16),
    backgroundColor: 'blue',
  },
  textItem: {
    color: 'white',
    fontSize: scaler(14),
    ...stylesCommon.fontWeight700,
    marginTop: scaler(16),
    marginLeft: scaler(16),
  },
});
