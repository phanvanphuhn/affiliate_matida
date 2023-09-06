import {AppHeader, FLoatingAIButton, ItemArticles, ItemVideo} from '@component';
import {SvgArticleExplore, SvgMediaExplore, SvgPodcastExplore} from '@images';
import {navigate} from '@navigation';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {changePageExplore} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {event, eventType, trackingAppEvent, useUXCam} from '@util';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  ComponentPage,
  FilterExpert,
  FilterExplore,
  FilterMost,
  ItemPodCast,
  NoResultsFound,
} from './components';
import {IPage, Option, Page} from './type';

const Explore = () => {
  const navigation = useNavigation<any>();
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const explore = useSelector((state: any) => state?.explore);
  const filter = useSelector((state: any) => state?.explore?.filter);
  const loadMoreRedux = useSelector((state: any) => state?.explore?.loadMore);
  const isFocus = useSelector((state: any) => state?.tab?.explore);

  const pageExplore = explore?.pageExplore;

  const firstRef = useRef(false);
  const refFlatList = useRef<FlatList>(null);
  const pageRef = useRef<number>(1);

  const listPage: IPage[] = [
    {
      id: 1,
      label: t('explore.article'),
      onPress: () => handleChangePage(Page.ARTICLE),
      icon: (
        <SvgArticleExplore
          stroke={
            pageExplore === Page.ARTICLE
              ? colors.white
              : colors.brandMainPinkRed
          }
        />
      ),
      value: Page.ARTICLE,
      color: colors.brandMainPinkRed,
    },
    {
      id: 2,
      label: 'Podcast',
      onPress: () => handleChangePage(Page.PODCAST),
      icon: (
        <SvgPodcastExplore
          stroke={
            pageExplore === Page.PODCAST ? colors.white : colors.success_message
          }
        />
      ),
      value: Page.PODCAST,
      color: colors.success_message,
    },
    {
      id: 3,
      label: 'Videos',
      onPress: () => handleChangePage(Page.VIDEOS),
      icon: (
        <SvgMediaExplore
          stroke={pageExplore === Page.VIDEOS ? colors.white : colors.purple}
        />
      ),
      value: Page.VIDEOS,
      color: colors.purple,
    },
  ];

  useUXCam(ROUTE_NAME.TAB_EXPLORE);

  useEffect(() => {
    if (firstRef.current) {
      handlePressLogo();
    } else {
      firstRef.current = true;
    }
  }, [isFocus]);

  const getData = (isNew: boolean) => {
    dispatch(
      changePageExplore({
        page: isNew ? 1 : pageRef.current,
        pageExplore: pageExplore,
        expert: isNew ? '' : filter?.expert,
        option: isNew ? Option.RECENT : filter?.option,
        trimesters: isNew ? [] : filter?.filterTopic?.trimesters,
        topics: isNew ? [] : filter?.filterTopic?.topics,
      }),
    );
  };

  const handleLoadMore = () => {
    let length = 0;
    let total = 0;
    switch (pageExplore) {
      case Page.ARTICLE:
        length = explore?.articles?.data?.length;
        total = explore?.articles?.total;
        break;
      case Page.PODCAST:
        length = explore?.podcasts?.data?.length;
        total = explore?.podcasts?.total;
        break;
      case Page.VIDEOS:
        length = explore?.videos?.data?.length;
        total = explore?.videos?.total;
        break;
      default:
        length = 0;
        total = 0;
        break;
    }
    if (length >= total) {
      null;
    } else {
      setTimeout(() => {
        if (loadMoreRedux) {
          pageRef.current++;
          getData(false);
        }
      }, 100);
    }
  };

  const onRefresh = useCallback(async () => {
    pageRef.current = 1;
    getData(false);
  }, [pageRef.current, pageExplore, filter]);

  const navigateUser = () => {
    navigate(ROUTE_NAME.PROFILE_SETTINGS);
  };

  const navigateSetting = () => {
    navigation.navigate(ROUTE_NAME.SETTING_SCREEN);
  };

  const navigateNotification = () => {
    navigation.navigate(ROUTE_NAME.NOTIFICATION_LIST);
  };

  const handleChangePage = (page: Page) => {
    pageRef.current = 1;
    dispatch(
      changePageExplore({
        page: 1,
        pageExplore: page,
        expert: '',
        option: Option.RECENT,
        trimesters: [],
        topics: [],
      }),
    );
  };

  const handlePressLogo = () => {
    setTimeout(() => {
      refFlatList?.current?.scrollToOffset({animated: true, offset: 0});
    }, 0);
  };

  const handleCallBack = () => {
    pageRef.current = 1;
    trackingAppEvent(event.EXPLORE.CLICK_EXPLORE, {}, eventType.AFF_FLYER);
  };

  const getLoadingPage = () => {
    switch (pageExplore) {
      case Page.ARTICLE:
        return explore?.articles?.loading;
      case Page.PODCAST:
        return explore?.podcasts?.loading;
      case Page.VIDEOS:
        return explore?.videos?.loading;
      default:
        return false;
    }
  };

  const renderItem = ({item}: {item: any}) => {
    switch (pageExplore) {
      case Page.ARTICLE:
        return (
          <View style={{paddingHorizontal: scaler(16)}}>
            <ItemArticles item={item} />
          </View>
        );
      case Page.PODCAST:
        return (
          <View style={{paddingHorizontal: scaler(16)}}>
            <ItemPodCast item={item} />
          </View>
        );
      case Page.VIDEOS:
        return <ItemVideo item={item} />;
      default:
        return <></>;
    }
  };

  const switchData = () => {
    switch (pageExplore) {
      case Page.ARTICLE:
        return explore?.articles?.data;
      case Page.PODCAST:
        return explore?.podcasts?.data;
      case Page.VIDEOS:
        return explore?.videos?.data;
      default:
        return [];
    }
  };

  const navigationMessage = () => {
    navigation.navigate(ROUTE_NAME.LIST_MESSAGE);
  };

  return (
    <View style={{flex: 1}}>
      <AppHeader
        onPressAvatar={navigateUser}
        onPressMenu={navigateSetting}
        onPressNotification={navigateNotification}
        onPressMessage={navigationMessage}
        onPressLogo={handlePressLogo}
      />
      <View style={{padding: scaler(16), backgroundColor: colors.white}}>
        <View style={{flexDirection: 'row'}}>
          {listPage.map(item => {
            return (
              <ComponentPage item={item} page={pageExplore} key={item.id} />
            );
          })}
        </View>
        <View style={{flexDirection: 'row', marginTop: scaler(12)}}>
          <FilterMost pageExplore={pageExplore} onCallback={handleCallBack} />

          {pageExplore === Page.VIDEOS ? (
            <FilterExpert
              onCallback={handleCallBack}
              pageExplore={pageExplore}
            />
          ) : (
            <FilterExplore
              onCallback={handleCallBack}
              pageExplore={pageExplore}
            />
          )}
        </View>
      </View>
      <FlatList
        ref={refFlatList}
        data={switchData()}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.01}
        key={pageExplore.toString()}
        onEndReached={handleLoadMore}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: scaler(240),
          paddingTop: scaler(16),
        }}
        keyExtractor={(_: any, index: number) => _?.id?.toString()}
        ListEmptyComponent={() => {
          return !getLoadingPage() ? (
            <NoResultsFound />
          ) : (
            <View style={[styles.viewLoadMore, {marginTop: scaler(20)}]}>
              <ActivityIndicator color={colors.primary} size="small" />
            </View>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          <>
            {loadMoreRedux === false && !getLoadingPage() ? (
              <View style={styles.viewLoadMore}>
                <ActivityIndicator color={colors.primary} size="small" />
              </View>
            ) : null}
          </>
        }
      />
      <FLoatingAIButton />
    </View>
  );
};

const styles = StyleSheet.create({
  viewEmpty: {
    alignItems: 'center',
    marginTop: scaler(20),
    flex: 1,
    flexGrow: 1,
  },
  txtEmpty: {
    ...stylesCommon.fontWeight500,
    color: colors.borderColor,
    fontSize: scaler(14),
  },
  viewLoadMore: {
    alignItems: 'center',
    marginBottom: scaler(8),
  },
});

export {Explore};
