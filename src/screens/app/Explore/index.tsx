import {AppHeader, ItemArticles, ItemPodCast, ItemVideo} from '@component';
import {SvgArticleExplore, SvgMediaExplore, SvgPodcastExplore} from '@images';
import {navigate} from '@navigation';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {getArticleMost, getPodcastMost, getVideoMost} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {event, trackingAppEvent, useUXCam} from '@util';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  ComponentPage,
  FilterExplore,
  FilterMost,
  NoResultsFound,
} from './components';
import {IFilterTopic, IOption, IPage, Option, Page} from './type';

const initFilterTopic: IFilterTopic = {
  trimesters: [],
  topics: [],
};

const Explore = () => {
  const navigation = useNavigation<any>();
  const {t} = useTranslation();
  const [pageExplore, setPageExplore] = useState<Page>(Page.ARTICLE);
  const [option, setOption] = useState<Option>(Option.RECENT);
  const [filterTopic, setFilterTopic] = useState<IFilterTopic>(initFilterTopic);
  const [articles, setArticles] = useState<any>([]);
  const [podcasts, setPodcasts] = useState<any>([]);
  const [videos, setVideos] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const scrollRef = useRef<ScrollView>(null);

  const isFocus = useSelector((state: any) => state?.tab?.explore);
  const firstRef = useRef(false);
  const refLoadMore = useRef<boolean>(true);
  const refFlatList = useRef<FlatList>(null);
  const refChangePage = useRef<boolean>(false);

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

  useFocusEffect(
    React.useCallback(() => {
      handlePressLogo();
      if (refChangePage?.current) {
        getData();
      } else {
        refChangePage.current = true;
      }
    }, [pageExplore, option, filterTopic]),
  );

  const getData = () => {
    switch (pageExplore) {
      case Page.ARTICLE:
        return getDataArticles();
      case Page.PODCAST:
        return getDataPodcast();
      case Page.VIDEOS:
        return getDataVideo();
      default:
        return;
    }
  };

  const getDataArticles = async () => {
    try {
      refLoadMore.current = false;
      const isRecent = option === Option.RECENT;
      const res = await getArticleMost(
        page,
        filterTopic.trimesters,
        filterTopic.topics,
        isRecent,
      );
      if (page === 1) {
        setArticles(res?.data?.data);
      } else {
        setArticles(articles?.concat(res?.data?.data));
      }
      setTotal(res?.data?.total);
      res?.data?.data?.length > 0 && setPage(page + 1);
    } catch (e) {
    } finally {
      setLoadMore(false);
      setLoading(false);
      refLoadMore.current = true;
    }
  };

  const getDataPodcast = async () => {
    try {
      refLoadMore.current = false;
      const isRecent = option === Option.RECENT;
      const res = await getPodcastMost(
        page,
        filterTopic.trimesters,
        filterTopic.topics,
        isRecent,
      );
      if (page === 1) {
        setPodcasts(res?.data?.data);
      } else {
        setPodcasts(podcasts?.concat(res?.data?.data));
      }
      setTotal(res?.data?.total);
      res?.data?.data?.length > 0 && setPage(page + 1);
    } catch (e) {
    } finally {
      setLoadMore(false);
      setLoading(false);
      refLoadMore.current = true;
    }
  };

  const getDataVideo = async () => {
    try {
      refLoadMore.current = false;
      const isRecent = option === Option.RECENT;
      const res = await getVideoMost(page, isRecent);
      if (page === 1) {
        setVideos(res?.data?.data);
      } else {
        setVideos(videos?.concat(res?.data?.data));
      }
      setTotal(res?.data?.total);
      res?.data?.data?.length > 0 && setPage(page + 1);
    } catch (e) {
    } finally {
      setLoadMore(false);
      setLoading(false);
      refLoadMore.current = true;
    }
  };

  const handleLoadMore = () => {
    let length;
    switch (pageExplore) {
      case Page.ARTICLE:
        length = articles?.length;
        break;
      case Page.PODCAST:
        length = podcasts?.length;
        break;
      case Page.VIDEOS:
        length = videos?.length;
        break;
      default:
        length = 0;
        break;
    }
    if (length >= total) {
      null;
    } else {
      // setPage(prevPage => prevPage + 1);
      if (refLoadMore.current) {
        setLoadMore(true);
        getData();
      }
    }
  };

  const onRefresh = useCallback(async () => {
    await setPage(1);
    getData();
  }, [filterTopic, page, pageExplore, option]);

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
    setPage(1);
    setLoading(true);
    setOption(Option.RECENT);
    refChangePage.current = false;
    // setFilterTopic(initFilterTopic);
    setPageExplore(page);
  };

  const handlePressLogo = () => {
    setTimeout(() => {
      refFlatList?.current?.scrollToOffset({animated: true, offset: 0});
    }, 0);
  };

  const handleFilterTopic = (values: IFilterTopic) => {
    setPage(1);
    setFilterTopic({...values});
    trackingAppEvent(event.EXPLORE.CLICK_EXPLORE, {});
  };

  const handlePressOption = (value: IOption) => {
    setPage(1);
    setOption(value.value);
    trackingAppEvent(event.EXPLORE.CLICK_EXPLORE, {});
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
            <ItemPodCast item={item} onCallBack={getData} />
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
        return articles;
      case Page.PODCAST:
        return podcasts;
      case Page.VIDEOS:
        return videos;
      default:
        return [];
    }
  };

  const navigationMessage = () => {
    navigation.navigate(ROUTE_NAME.LIST_MESSAGE);
  };

  return (
    <View>
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
          <FilterMost value={option} onPress={handlePressOption} />
          <FilterExplore
            onPressSave={handleFilterTopic}
            pageExplore={pageExplore}
          />
        </View>
      </View>
      <FlatList
        ref={refFlatList}
        data={switchData()}
        // data={[]}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.01}
        key={pageExplore.toString()}
        onEndReached={handleLoadMore}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: scaler(240),
          paddingTop: scaler(16),
        }}
        keyExtractor={(_: any, index: number) => index?.toString()}
        ListEmptyComponent={() => {
          return !loading ? (
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
            {loadMore === true ? (
              <View style={styles.viewLoadMore}>
                <ActivityIndicator color={colors.primary} size="small" />
              </View>
            ) : null}
          </>
        }
      />
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
