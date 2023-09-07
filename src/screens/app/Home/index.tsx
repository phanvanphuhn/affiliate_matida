import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {AppHeader, FLoatingAIButton} from '@component';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {
  clearDataChat,
  getCheckingPaymentRedux,
  getDataHome,
  saveDataUser,
  saveIsDoneDaily,
  updateDataHome,
  updateStatusDeepLink,
} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {
  answerDailyQuiz,
  getUserInfoApi,
  GlobalService,
  updateUserInfo,
} from '@services';
import {scaler} from '@stylesCommon';
import {
  PregnancyProgress,
  SizeComparisonComponent,
  ViewQuiz,
  WeeksPregnant,
} from './components';
import {styles} from './styles';
import {IArticles, IBabyProgress, IPosts, IQuote, IVideo} from './types';

import {imageBackgroundOpacity} from '@images';
import {
  APP_SIGN_ZEGO_KEY,
  APPID_ZEGO_KEY,
  AppNotification,
  eventType,
  handleDeepLink,
  useUXCam,
} from '@util';
//@ts-ignore
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {event, trackingAppEvent} from '@util';
//@ts-ignore
import {EVideoType} from '@constant';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';
import RNUxcam from 'react-native-ux-cam';
import {RootState} from 'src/redux/rootReducer';
// import {APPID_ZEGO_KEY, APP_SIGN_ZEGO_KEY} from '@env';
type IData = {
  articles: IArticles[];
  videos: IVideo[];
  posts: IPosts[];
  babyProgress: IBabyProgress | undefined;
  quote: IQuote | undefined;
  user: any;
  podcast: any[];
  rooms: any[];
  dailyQuizz: any | undefined;
  masterClasses: any[];
};

const Home = () => {
  let {initFB} = AppNotification;

  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  if (route?.name === ROUTE_NAME.TAB_HOME) {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('dark-content');
    }
  }

  const [refreshing, setRefreshing] = useState(false);
  // const [loading, setLoading] = useState<boolean>(true);

  const scrollRef = useRef<ScrollView>(null);
  const firstRef = useRef(false);

  const isFocus = useSelector((state: any) => state?.tab?.home);
  const lang = useSelector((state: any) => state?.auth?.lang);
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const data = useSelector((state: any) => state?.home?.data);
  const weekPregnant = useSelector((state: any) => state?.home?.weekPregnant);
  const loading = useSelector((state: any) => state?.home?.loading);
  const deepLink = useSelector((state: any) => state?.check?.deepLink);
  const isDoneDaily = useSelector((state: RootState) => state.auth.isDoneDaily);

  useUXCam(ROUTE_NAME.HOME);

  useEffect(() => {
    initFB();
    dispatch(getCheckingPaymentRedux());
    const unSubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unSubscribe();
  }, []);

  const updateLangUser = async () => {
    try {
      const body = {
        current_lang: lang === 1 ? 'en' : 'vi',
      };
      const res = await updateUserInfo(body);
    } catch (error) {}
  };

  useEffect(() => {
    updateLangUser();
  }, [lang]);

  useFocusEffect(
    React.useCallback(() => {
      trackingAppEvent(event.SCREEN.HOME, {}, eventType.AFF_FLYER);
      trackingAppEvent(event.SYSTEM.START, {}, eventType.MIX_PANEL, user);
      if (Platform.OS === 'android') {
      }
      firstRef.current = false;
      getDataUser();
      getData();
      dispatch(clearDataChat());
      ZegoUIKitPrebuiltCallService.init(
        +APPID_ZEGO_KEY,
        APP_SIGN_ZEGO_KEY,
        user?.id,
        user?.name,
      );
    }, []),
  );

  useEffect(() => {
    if (firstRef.current) {
      handlePressLogo();
    } else {
      firstRef.current = true;
    }
  }, [isFocus]);

  useEffect(() => {
    fetchScreen();
  }, [navigation]);

  useEffect(() => {
    if (user) {
      RNUxcam.setUserIdentity(user?.name);
      RNUxcam.setUserProperty('id_user_app', `${user?.id}`);
      RNUxcam.setUserProperty('user_name_app', `${user?.username}`);
      RNUxcam.setUserProperty('user_type_app', `${user?.user_type}`);
    }
  }, []);

  const handleDynamicLink = useCallback(
    async (link: any) => {
      if (link?.url) {
        handleDeepLink(link?.url);
      }
    },
    [navigation],
  );

  const fetchScreen = async () => {
    const getInitialLink = await dynamicLinks().getInitialLink();
    if (getInitialLink !== null && getInitialLink?.url && deepLink) {
      //handle navigation
      handleDeepLink(getInitialLink?.url);
      dispatch(updateStatusDeepLink());
    }
  };

  const getDataUser = async () => {
    try {
      const res = await getUserInfoApi();
      dispatch(saveDataUser(res?.data?.data));
    } catch (error) {}
  };

  const getData = async () => {
    try {
      dispatch(getDataHome());
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };

  const navigateUser = () => {
    navigation.navigate(ROUTE_NAME.PROFILE_SETTINGS);
  };

  const navigateSetting = () => {
    navigation.navigate(ROUTE_NAME.SETTING_SCREEN);
  };

  const navigateNotification = () => {
    navigation.navigate(ROUTE_NAME.NOTIFICATION_LIST);
  };

  const navigationMessage = () => {
    navigation.navigate(ROUTE_NAME.LIST_MESSAGE);
  };

  const handlePressItemVideo = (item: any) => {
    navigation.navigate(ROUTE_NAME.DETAIL_VIDEO, {
      id: item?.id ?? 0,
      type: EVideoType.VIDEO,
      // url: item?.url ?? '',
      // title: item?.title ?? '',
      // item: item,
    });
  };

  const handlePressItemArticle = (article: IArticles) => {
    navigation.navigate(ROUTE_NAME.DETAIL_ARTICLE, {article: article});
  };
  const onRefresh = () => {
    setRefreshing(true);
    getData();
  };

  const handlePressLogo = () => {
    setTimeout(() => {
      scrollRef?.current?.scrollTo({x: 0, y: 0, animated: true});
    }, 0);
    // handleChangeWeeks(week);
  };

  const scrollY = new Animated.Value(0);
  const opacityY = scrollY.interpolate({
    inputRange: [0, 60, 80, 100],
    outputRange: [1, 1, 0.6, 0],
    extrapolate: 'clamp',
  });

  const _translateY = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [0, -110, -220],
    extrapolate: 'clamp',
  });

  const _scale = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 1, 0.8],
    extrapolate: 'clamp',
  });

  const onAnswerQuiz = async (value: any) => {
    try {
      GlobalService.showLoading();
      const res = await answerDailyQuiz(value);
      !isDoneDaily && dispatch(saveIsDoneDaily(true));
      dispatch(
        updateDataHome({
          ...data,
          dailyQuizz: {
            ...data?.dailyQuizz,
            ...res?.data,
          },
        }),
      );
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={imageBackgroundOpacity}
        style={[
          styles.circleBackground,
          {
            opacity: opacityY,
            transform: [
              {
                translateY: _translateY,
              },
            ],
          },
        ]}
      />
      <AppHeader
        onPressMenu={navigateSetting}
        onPressAvatar={navigateUser}
        onPressNotification={navigateNotification}
        onPressMessage={navigationMessage}
        onPressLogo={handlePressLogo}
      />

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          paddingBottom: scaler(30),
          paddingTop: scaler(18),
        }}>
        {!!user?.is_skip || weekPregnant?.days < 0 ? null : (
          <>
            <View>
              <WeeksPregnant />
            </View>
            <View
              style={{
                paddingHorizontal: scaler(20),
                marginBottom: scaler(30),
              }}>
              <SizeComparisonComponent />
              <PregnancyProgress />
            </View>
          </>
        )}

        {/* <View>
          <ListPostComponent posts={data?.posts} />

          <TouchableOpacity
            style={styles.createPostButton}
            onPress={() => navigation.navigate(ROUTE_NAME.CREATE_NEWPOST)}>
            <SvgMessages3 />
            <Text style={styles.titleButton}>{t('home.createPost')}</Text>
          </TouchableOpacity>
        </View> */}

        {data?.dailyQuizz && user?.id !== 18257 && user?.id !== 89 ? (
          <ViewQuiz onAnswer={onAnswerQuiz} />
        ) : null}
        {/*
        <BannerTestQuiz />

        <ChatGPTComponent /> */}
        {/*
        <HorizontalList
          loading={loading}
          title={t('home.weeklyVideos')}
          length={data?.videos?.length}
          styleHeader={{paddingHorizontal: scaler(20)}}
          onPressSeeMore={() => {
            navigation.navigate(ROUTE_NAME.VIDEO_LIST);
          }}>
          {data?.videos?.map((video: any) => (
            <WeekVideo
              video={video}
              onPress={handlePressItemVideo}
              key={video.id}
            />
          ))}
        </HorizontalList> */}

        {/* <HorizontalList
          loading={loading}
          length={data?.rooms?.length}
          title={t('home.groupTalks')}
          styleHeader={{paddingHorizontal: scaler(20)}}
          onPressSeeMore={() => navigation.navigate(ROUTE_NAME.TAB_LIVETALK)}>
          {data?.rooms?.map((item: any, index: number) => (
            <ItemTalks item={item} index={index} key={index} />
          ))}
        </HorizontalList> */}

        {/* <HorizontalList
          loading={loading}
          title={t('home.weeklyArticles')}
          length={data?.articles?.length}
          styleHeader={{paddingHorizontal: scaler(20)}}
          contentContainerStyle={{marginBottom: 0}}
          onPressSeeMore={() => navigate(ROUTE_NAME.WEEKLY_ARTICLES)}>
          {data?.articles?.map((article: IArticles) => (
            <NewArticles
              article={article}
              onPress={handlePressItemArticle}
              key={article.id}
            />
          ))}
        </HorizontalList> */}

        {/* <HorizontalList
          loading={loading}
          title={t('home.podcasts')}
          styleHeader={{paddingHorizontal: scaler(20)}}
          length={data?.podcast?.length}
          onPressSeeMore={() => navigation.navigate(ROUTE_NAME.LIST_PODCAST)}>
          {data?.podcast?.map((podcast: any, index: number) => (
            <PodcastItem podcast={podcast} key={podcast.id} />
          ))}
        </HorizontalList> */}

        {/* <HorizontalList
          // IconSvg={<SvgBook />}
          loading={loading}
          title={t('home.masterClass')}
          length={data?.masterClasses?.length}
          styleHeader={{paddingHorizontal: scaler(20)}}
          contentContainerStyle={{marginBottom: 0}}
          onPressSeeMore={() =>
            navigation.navigate(ROUTE_NAME.LIST_MASTER_CLASS)
          }>
          {data?.masterClasses?.map((masterClass: IArticles) => (
            <ItemMasterClass masterClass={masterClass} key={masterClass.id} />
          ))}
        </HorizontalList> */}

        {/* <DailyAffirmation quote={data?.quote} /> */}
      </ScrollView>
      {user?.id !== 18257 && user?.id !== 89 && <FLoatingAIButton />}
    </View>
  );
};

export {Home};
