/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  changeStatusLoadListForum,
  changeTabForum,
  getListTabForum,
} from '@redux';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useEffect, useRef} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import reactotron from 'reactotron-react-native';
import {IItemTab} from '../Forum.props';

type Props = {
  onChange?: (item: any, index: number) => void;
};

export const ForumTab = (props: Props) => {
  const dispatch = useDispatch();
  const {onChange} = props;

  const listTab: IItemTab[] = useSelector(
    (state: any) => state?.forum?.listTab,
  );
  const lang = useSelector((state: any) => state?.auth?.lang);
  const tab: IItemTab | null = useSelector((state: any) => state?.forum?.tab);

  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    const index = listTab?.findIndex(
      val => val?.short_code === tab?.short_code,
    );
    listRef.current?.scrollToIndex({
      index: index >= 0 ? index : 0,
      viewPosition: 0.5,
    });
    reactotron.log?.('CHANGE TAB');
    dispatch(getListTabForum({reload: true}));
  }, [tab]);

  const onChangeTab = (item: any, index: number) => {
    onChange && onChange(item, index);
    dispatch(changeTabForum(item));
    dispatch(changeStatusLoadListForum(true));
    // listRef.current?.scrollToIndex({
    //   index: index,
    //   viewPosition: 0.5,
    // });
  };

  const renderItem = ({item, index}: {item: IItemTab; index: number}) => {
    const isFocus = tab?.short_code === item?.short_code;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onChangeTab(item, index)}
        key={index}
        disabled={isFocus}
        style={[
          styles.itemTab,
          !isFocus ? styles.itemInActive : styles.itemActive,
        ]}>
        <Text style={[styles.textItem, !isFocus && styles.textInActive]}>
          {lang === 2 ? item?.name_vi : item?.name_en}
        </Text>
        <Text style={[styles.txtCount, !isFocus && styles.textInActive]}>
          {item?.total ?? 0}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={listTab}
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
