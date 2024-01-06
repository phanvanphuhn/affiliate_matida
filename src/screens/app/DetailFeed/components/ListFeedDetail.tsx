import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  RefreshControl,
  NativeSyntheticEvent,
} from 'react-native';
import Swiper from '../SwiperFlatlist/Swiper';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {IDataListFeed} from '../../Feed/type';
import ItemVideo from './ItemVideo';
import DailyQuizFeed from './DailyQuizFeed';
import PackageQuizFeed from './PackageQuizFeed';
import ItemArticle from './ItemArticle';
import ItemPurchase from './ItemPurchase';
import useDetailFeed, {heightFullScreen} from '../useDetailFeed';
import {useVideo} from './Container';
import {heightScreen} from '@stylesCommon';
import {useSelector} from 'react-redux';

interface ListFeedProps {
  open: boolean;
}

const ListFeedDetail = (props: ListFeedProps) => {
  const isFocused = useIsFocused();
  const pagerViewRef = useRef<Swiper>();
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const {state, setState, onPageSelected, onRefresh} = useDetailFeed();

  const renderFeed = (item: IDataListFeed, index: number) => {
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

  const renderItem = (item: IDataListFeed, index: number) => {
    if (Number(item.is_payment) == 1) {
      if (user?.user_subscriptions?.some(e => e.code == 'PP')) {
        return renderFeed(item, index);
      } else {
        return <ItemPurchase item={item} />;
      }
    } else {
      return renderFeed(item, index);
    }
  };

  const onPageHandlerSwiper = (index: number) => {
    onPageSelected(index);
  };
  const renderPurchase = (item: IDataListFeed, index: number) => {
    return <ItemPurchase item={item} />;
  };
  return (
    <>
      {!!state?.data?.length && (
        <Swiper
          index={state.index}
          horizontal={false}
          loop={false}
          removeClippedSubviews={true}
          loadMinimal={true}
          loadMinimalSize={10}
          lockScrollTimeoutDuration={250}
          nestedScrollEnabled={true}
          bounces={true}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={state.refreshing || false}
              tintColor="#fff"
              titleColor="#fff"
            />
          }
          onIndexChanged={onPageHandlerSwiper}
          ref={pagerViewRef}>
          {state?.data?.map((item, index) => (
            <View
              style={[styles.pagerView]}
              key={item?.content_type + item?.contentid}>
              {renderItem(item, index)}
            </View>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default ListFeedDetail;

const styles = StyleSheet.create({
  container: {},
  pagerView: {
    flex: 1,
  },
});
