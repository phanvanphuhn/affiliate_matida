import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  RefreshControl,
  NativeSyntheticEvent,
  Platform,
  StatusBar,
} from 'react-native';
import Swiper from '../SwiperFlatlist/Swiper';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {IDataListFeed} from '../../Feed/type';
import ItemVideo from './ItemVideo';
import DailyQuizFeed from './DailyQuizFeed';
import PackageQuizFeed from './PackageQuizFeed';
import ItemArticle from './ItemArticle';
import ItemPurchase from './ItemPurchase';
import useDetailFeed from '../useDetailFeed';
import {useVideo} from './Container';
import {heightScreen} from '@stylesCommon';
import Carousel from 'react-native-snap-carousel';

interface ListFeedProps {
  open: boolean;
}

const ListFeedDetail = (props: ListFeedProps) => {
  const isFocused = useIsFocused();
  const pagerViewRef = useRef<Swiper>();
  const {state, setState, onPageSelected, onRefresh} = useDetailFeed();
  const renderItem = (item: IDataListFeed, index: number) => {
    switch (item.content_type) {
      case 'video':
      case 'podcast':
        return (
          <ItemVideo
            item={item}
            isPause={(props?.open && state.currentIndex == index) || !isFocused}
            isFocused={state.currentIndex == index}
            isAudio={item.content_type == 'podcast'}
          />
        );
      case 'daily_quizz':
        return (
          <DailyQuizFeed item={item} isFocused={state.currentIndex == index} />
        );
      case 'package_quizz':
        return (
          <PackageQuizFeed
            item={item}
            isFocused={state.currentIndex == index}
          />
        );
      case 'article':
        return (
          <ItemArticle item={item} isFocused={state.currentIndex == index} />
        );
      default:
        return null;
    }
  };

  const onPageHandler = (event: NativeSyntheticEvent<any>) => {
    const currentPage = event.nativeEvent.position;
    onPageSelected(currentPage);
  };
  const onPageHandlerFlatlist = (item: {index: number; prevIndex: number}) => {
    onPageSelected(item.index);
  };
  const onPageHandlerSwiper = (index: number) => {
    console.log('=>(ListFeedDetail.tsx:71) index', index);
    onPageSelected(index);
  };
  const renderPurchase = (item: IDataListFeed, index: number) => {
    return <ItemPurchase item={item} />;
  };
  const _getItemLayout = (data, index) => {
    return {
      length:
        Platform.select({
          android: heightScreen - 27,
          ios: heightScreen - 65,
        }) || 0,
      offset:
        (Platform.select({
          android: heightScreen - 27,
          ios: heightScreen - 65,
        }) || 0) * index,
      index,
    };
  };
  return (
    <>
      {!!state?.data?.length && (
        <Carousel
          lockScrollTimeoutDuration={250}
          pagingEnabled={true}
          vertical={true}
          removeClippedSubviews={true}
          nestedScrollEnabled={true}
          bounces={true}
          containerCustomStyle={{flex: 1}}
          activeAnimationType={'timing'}
          slideStyle={{flex: 1}}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          sliderHeight={Platform.select({
            ios: heightScreen - 65,
            android: heightScreen - 27,
          })}
          itemHeight={Platform.select({
            ios: heightScreen - 65,
            android: heightScreen - 27.5,
          })}
          shouldOptimizeUpdates={true}
          // enableSnap={false}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={state.refreshing || false}
              tintColor="#fff"
              titleColor="#fff"
            />
          }
          windowSize={10}
          onSnapToItem={onPageHandlerSwiper}
          onBeforeSnapToItem={i => {
            console.log('=>(ListFeedDetail.tsx:149) i', i);
            setState({totalComment: 0, comment: undefined});
          }}
          lockScrollWhileSnapping={true}
          getItemLayout={_getItemLayout}
          data={state.data}
          // activeSlideOffset={10}
          initialNumToRender={6}
          firstItem={state.index}
          keyExtractor={item => item?.content_type + item?.contentid}
          renderItem={({item, index}) => {
            return (
              <View style={[styles.pagerView]}>{renderItem(item, index)}</View>
            );
          }}
          // ref={pagerViewRef}
        />
      )}
    </>
  );
};

export default ListFeedDetail;

const styles = StyleSheet.create({
  container: {},
  pagerView: {
    flex: 1,
    height: Platform.select({
      ios: heightScreen - 65,
      android: heightScreen - 25,
    }),
  },
});
