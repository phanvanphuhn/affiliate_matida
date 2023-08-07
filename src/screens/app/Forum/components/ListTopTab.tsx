import {changeTabForum} from '@redux';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IItemTab} from '../Forum.props';
import {CreateNewPostComponent} from './CreateNewPostComponent';

export const ListTopTab = () => {
  const dispatch = useDispatch();

  const lang = useSelector((state: any) => state?.auth?.lang);
  const listTab: IItemTab[] = useSelector(
    (state: any) => state?.forum?.listTab,
  );
  const tab: IItemTab | null = useSelector((state: any) => state?.forum?.tab);

  const scrollRef = useRef<ScrollView>(null);

  const handlePressItem = (item: IItemTab) => {
    dispatch(changeTabForum(item));
  };
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        bounces={false}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: scaler(16),
          paddingBottom: scaler(10),
        }}
        showsHorizontalScrollIndicator={false}>
        {listTab.map((item: IItemTab) => {
          const isSelect = tab !== null && tab?.short_code === item?.short_code;
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              key={item?.id}
              style={[styles.item, isSelect && styles.itemSelect]}
              onPress={() => handlePressItem(item)}>
              <Text
                style={[styles.textItem, isSelect && styles.textItemSelect]}>
                {lang === 2 ? item?.name_vi : item?.name_en}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <CreateNewPostComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: scaler(16),
    paddingBottom: scaler(10),
    backgroundColor: colors.white,
  },
  item: {
    borderWidth: scaler(1),
    borderRadius: scaler(40),
    borderColor: colors.red50,
    paddingVertical: scaler(8),
    paddingHorizontal: scaler(14),
    marginHorizontal: scaler(5),
    backgroundColor: colors.white,
  },
  itemSelect: {
    backgroundColor: colors.red50,
  },
  textItem: {
    color: colors.red50,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
  },
  textItemSelect: {
    color: colors.white,
    ...stylesCommon.fontWeight700,
  },
});
