/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sparse-arrays */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  FlatList,
  LayoutChangeEvent,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {colors, scaler, widthScreen} from '@stylesCommon';
import reactotron from 'reactotron-react-native';

type TabItem<T> = {
  item: T;
  index: number;
  active: boolean;
};

type Position = {
  index: number;
  width: number;
};

type Props<T> = {
  data: T[];
  renderTab: (tab: TabItem<T>) => ReactNode | ReactElement;
  animated?: boolean;
  onPressItem?: (item: T, index: number) => void;
  underLineStyle?: StyleProp<ViewStyle>;
};

const generateListPosition = (length: number) => {
  const newList: number[] = new Array(length).fill(0, 0);
  return newList;
};

export function AppTabBar<T = any>(props: Props<T>) {
  const {data, animated, renderTab, onPressItem} = props;
  const [active, setActive] = useState(0);

  const [listPosition, setListPosition] = useState(
    generateListPosition(data.length),
  );
  const listRef = useRef<ScrollView>(null);
  const underLineAnimated = useRef(new Animated.Value(0)).current;
  const underLineWidth = useRef(new Animated.Value(0)).current;

  const getLeftUnderline = (index: number) => {
    if (index === 0) {
      return 0;
    }
    const leftPosition = listPosition
      .slice(0, index)
      .reduce((previous, current) => previous + current, 0);
    return leftPosition ?? 0;
  };

  const onPress = (item: T, index: number) => {
    setActive(index);
    const leftPosition = getLeftUnderline(index) + 10;

    Animated.timing(underLineAnimated, {
      toValue: leftPosition,
      duration: 250,
      delay: 50,
      useNativeDriver: false,
    }).start();
    onPressItem && onPressItem(item, index);

    Animated.timing(underLineWidth, {
      toValue: listPosition[index],
      duration: 250,
      useNativeDriver: false,
    }).start();
    onPressItem && onPressItem(item, index);

    //caculate offset
    const offsetRequire = (widthScreen - listPosition[index]) / 2;
    let finalOffset = 0;
    if (leftPosition > offsetRequire) {
      finalOffset = leftPosition - offsetRequire;
    }
    reactotron.log?.('OFFSET', finalOffset);
    listRef.current?.scrollTo({y: finalOffset, animated: true});
  };

  const renderItem = (propsItem: {item: T; index: number}) => (
    <Item {...propsItem} />
  );

  const Item = useCallback(
    ({item, index}: {item: T; index: number}) => {
      const tab = {item, index, active: active === index};

      const onLayoutItem = (event: LayoutChangeEvent) => {
        const width = event.nativeEvent.layout.width;
        setListPosition(prev => {
          prev[index] = width;
          return [...prev];
        });
      };

      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onLayout={onLayoutItem}
          onPress={() => onPress(item, index)}>
          {renderTab(tab)}
        </TouchableOpacity>
      );
    },
    [active],
  );

  return (
    <View>
      {/* <FlatList
        data={data}
        ref={listRef}
        renderItem={renderItem}
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        horizontal
      /> */}
      <ScrollView
        style={styles.container}
        ref={listRef}
        contentContainerStyle={{paddingHorizontal: 10}}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {data.map((item, index) => renderItem({item, index}))}
        <Animated.View
          style={[
            styles.underLine,
            {
              left: underLineAnimated,
              width: underLineWidth,
            },
            ,
          ]}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 6,
  },
  underLine: {
    height: scaler(2),
    width: 10,
    position: 'absolute',
    bottom: -5,
    left: 0,
    backgroundColor: colors.primary,
  },
});
