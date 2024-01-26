import {colors, scaler, stylesCommon} from '@stylesCommon';
import {convertArrayScroll} from '@util';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

const ITEM_WIDTH = scaler(73);
const MARGIN_HORIZONTAL = scaler(6);

const PickerWeek = React.memo((props: any) => {
  const flatList: any = useRef(null);
  const {customStyleContainer, onSelect, weekNotifi} = props;
  const data = convertArrayScroll();
  const colorSelect = colors.purple4;
  const weekPregnant =
    useSelector(
      (state: any) => state?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks,
    ) ?? 40;
  const week = weekNotifi ? weekNotifi : weekPregnant ?? 40;

  const [select, setSelect] = useState<any>(null);

  const onSelectWeek = useCallback((value: number) => {
    setSelect(value);
    onSelect(value);
    const index = data.findIndex((element: any) => element?.value == value);
    if (index >= 0) {
      const wait = new Promise((resolve: any) => setTimeout(resolve, 500));
      wait.then(() => {
        flatList?.current?.scrollToIndex({
          index: index,
          animated: true,
          viewPosition: 0.5,
        });
      });
    }
  }, []);

  const scrollToWeek = () => {
    setSelect(week);
    const index = data.findIndex((element: any) => element?.value == week);
    if (index >= 0) {
      const wait = new Promise((resolve: any) => setTimeout(resolve, 500));
      wait.then(() => {
        flatList?.current?.scrollToIndex({
          index: index === 0 ? 0 : index,
          animated: true,
          viewPosition: 0.5,
        });
      });
    }
  };

  useEffect(() => {
    if (week) {
      scrollToWeek();
    }
  }, [week]);

  return (
    <View style={[styles.container, customStyleContainer]}>
      <FlatList
        ref={flatList}
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              key={item?.value}
              style={[
                styles.item,
                {
                  backgroundColor:
                    select === item?.value ? colorSelect : 'transparent',
                },
              ]}
              onPress={() => onSelectWeek(item?.value)}>
              <Text
                style={[
                  styles.value,
                  {color: select === item?.value ? '#FFFFFF' : colors.gray550},
                ]}>
                {item?.label} {item?.value}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item: any) => item.value}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={0}
        onScrollToIndexFailed={info => {
          const wait = new Promise((resolve: any) => setTimeout(resolve, 500));
          wait.then(() => {
            flatList.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH + 2 * MARGIN_HORIZONTAL,
          offset: (ITEM_WIDTH + 2 * MARGIN_HORIZONTAL) * index,
          index,
        })}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingBottom: scaler(10),
  },
  item: {
    width: ITEM_WIDTH,
    height: scaler(32),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: MARGIN_HORIZONTAL,
    borderRadius: scaler(40),
    borderColor: colors.white,
  },
  value: {
    ...stylesCommon.fontSarabun500,
    fontSize: scaler(13),
    lineHeight: scaler(18),
  },
});

export {PickerWeek};
