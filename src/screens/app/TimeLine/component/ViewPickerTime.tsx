import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {scaler, widthScreen, stylesCommon, colors} from '@stylesCommon';
import {convertArrayScroll} from '@util';
import {iconArrowLeft, iconArrowRight} from '@images';
import {useSelector} from 'react-redux';

const data = convertArrayScroll();
const ITEM_WIDTH = (widthScreen - scaler(60)) / 3;

const ViewPickerTime = React.memo((props: any) => {
  const {onSelect} = props;
  const flatList: any = useRef(null);
  const week =
    useSelector(
      (state: any) => state?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks,
    ) ?? 40;
  const [select, setSelect] = useState(null);
  const [indexActive, setIndex] = useState<any>(null);

  const selectValue = (value: any) => {
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
  };

  const onViewRef = React.useRef((viewableItems: any) => {
    setIndex(viewableItems?.viewableItems[1]?.index);
  });

  const viewConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: 0,
  });

  const onPrev = () => {
    if (indexActive === 1) {
    } else {
      flatList?.current?.scrollToIndex({
        index: indexActive - 2 > 0 ? indexActive - 2 : 0,
        animated: true,
      });
    }
  };

  const onNext = () => {
    if (data?.length - 3 === indexActive) {
    } else {
      flatList?.current?.scrollToIndex({
        index: indexActive + 2 >= 40 ? 39 : indexActive + 2,
        animated: true,
      });
    }
  };

  const scrollToWeek = () => {
    setSelect(week);
    const index = data.findIndex((element: any) => element?.value == week);
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
  };

  useEffect(() => {
    if (week) {
      scrollToWeek();
    }
  }, [week]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatList}
        data={data}
        renderItem={({item}) => {
          return (
            <View key={item?.value} style={styles.viewItem}>
              <TouchableOpacity
                style={
                  item?.value === select
                    ? styles.viewButtonAT
                    : styles.viewButtonIAT
                }
                onPress={() => selectValue(item?.value)}>
                <Text
                  style={item?.value === select ? styles.txtAT : styles.txtIAT}>
                  {item?.value}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
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
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
      />
      <TouchableOpacity style={styles.viewButtonLeft} onPress={onPrev}>
        <Image source={iconArrowLeft} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.viewButtonRight} onPress={onNext}>
        <Image source={iconArrowRight} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: widthScreen - scaler(60),
    height: scaler(40),
  },
  viewItem: {
    width: ITEM_WIDTH,
    height: scaler(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButtonAT: {
    width: scaler(32),
    height: scaler(32),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.brandMainPinkRed,
    borderRadius: scaler(32 / 2),
  },
  viewButtonIAT: {
    width: scaler(32),
    height: scaler(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtIAT: {
    color: '#F1A7A7',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
  },
  txtAT: {
    color: '#FFFFFF',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight600,
  },
  viewButtonLeft: {
    height: scaler(40),
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    left: 0,
    justifyContent: 'center',
  },
  viewButtonRight: {
    height: scaler(40),
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    right: 0,
    justifyContent: 'center',
  },
});

export {ViewPickerTime};
