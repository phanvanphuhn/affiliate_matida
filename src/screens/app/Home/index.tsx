import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import {
  Animated,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
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
  getListBaby,
} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {
  answerDailyQuiz,
  getUserInfoApi,
  GlobalService,
  updateBaby,
  updateUserInfo,
} from '@services';
import {colors, scaler} from '@stylesCommon';
import {
  ChatGPTComponent,
  PregnancyProgress,
  SizeComparisonComponent,
  ViewQuiz,
  WeeksPregnant,
} from './components';
import {styles} from './styles';
import {IArticles, IBabyProgress, IPosts, IQuote, IVideo} from './types';

import {imageBackgroundOpacity} from '@images';
import {
  APPID_ZEGO_KEY,
  AppNotification,
  APP_SIGN_ZEGO_KEY,
  eventType,
  handleDeepLink,
  isShowForReviewer,
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
import {FloatingNewBornButton} from '@component/FloatingNewBornButton';
import ListMonth from './components/ListMonth';
import useDetailFeed from '../DetailFeed/useDetailFeed';
import useDetailPost from '../Forum/components/useDetailPost';
import BottomSheetModal from '@component/BottomSheetModal';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import NewBornContainer from './components/NewBornContainer';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetNewBorn, {TBaby} from './components/BottomSheetNewBorn';
import {navigate} from '@navigation';

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

export type TState = {
  filter: string;
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
  const [state, setState] = useDetailPost({
    filter: 'w1',
    isShowNewBorn: false,
  });
  // const [loading, setLoading] = useState<boolean>(true);

  const scrollRef = useRef<ScrollView>(null);
  const firstRef = useRef(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['30%', '50%'], []);

  const isFocus = useSelector((state: any) => state?.tab?.home);
  const lang = useSelector((state: any) => state?.auth?.lang);
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const data = useSelector((state: any) => state?.home?.data);
  const weekPregnant = useSelector((state: any) => state?.home?.weekPregnant);
  const loading = useSelector((state: any) => state?.home?.loading);
  const deepLink = useSelector((state: any) => state?.check?.deepLink);
  const isDoneDaily = useSelector((state: RootState) => state.auth.isDoneDaily);
  const newBorn = useSelector((state: RootState) => state.newBorn.list);

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
      trackingAppEvent(event.SYSTEM.START, {}, eventType.MIX_PANEL, user);
      trackingAppEvent(event.SCREEN.HOME, {}, eventType.AFF_FLYER);
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
      dispatch(getListBaby());
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

  const onNavigateNewBorn = () => {
    navigation.navigate(ROUTE_NAME.NEW_BORN);
  };

  const onNavigateDetailNewBorn = async (item: TBaby) => {
    handleCloseScheduleOrderBottomSheet();
    const params = {
      id: item.id,
      body: {selected: true},
    };
    try {
      const res = await updateBaby(params);
      if (res.success) {
        getData();
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const onPressNewBornTracker = () => {
    navigation.navigate(ROUTE_NAME.NEW_BORN_TRACKER);
  };

  const openNewBorn = useCallback(() => {
    handleScheduleOrderSheetChanges(0);
  }, []);

  const handleScheduleOrderSheetChanges = useCallback((index: number) => {
    bottomSheetRef.current?.collapse();
  }, []);

  const handleCloseScheduleOrderBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const onNavigateAddBaby = () => {
    handleCloseScheduleOrderBottomSheet();
    navigate(ROUTE_NAME.ADD_BABY);
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
    <GestureHandlerRootView style={styles.container}>
      {/* <Animated.Image
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
      /> */}
      <AppHeader
        onPressMenu={navigateSetting}
        onPressNotification={navigateNotification}
        onPressLogo={handlePressLogo}
        bgc={colors.white}
        rightNoti={navigateNotification}
        openNewBorn={openNewBorn}
      />

      <View
        style={{
          backgroundColor: colors.white,
          paddingBottom: scaler(16),
          paddingHorizontal: scaler(16),
        }}>
        <ListMonth state={state} setState={setState} />
      </View>

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
        <View
          style={{
            // paddingHorizontal: scaler(20),
            marginBottom: scaler(16),
          }}>
          <ChatGPTComponent />
        </View>

        <View
          style={{
            // paddingHorizontal: scaler(20),
            marginBottom: scaler(16),
          }}>
          <NewBornContainer
            onPress={onPressNewBornTracker}
            data={data?.babyProgress}
          />
        </View>

        {/* {!!user?.is_skip || weekPregnant?.days < 0 ? null : (
          <>
            {isShowForReviewer(user) && (
              <View>
                <WeeksPregnant />
              </View>
            )}
            <View
              style={{
                // paddingHorizontal: scaler(20),
                marginBottom: scaler(30),
              }}>
              {isShowForReviewer(user) && <SizeComparisonComponent />}
              <ChatGPTComponent />

              <View
                style={{
                  paddingHorizontal: scaler(20),
                }}>
                <PregnancyProgress />
              </View>
            </View>
          </>
        )} */}

        {/* <View>
          <ListPostComponent posts={data?.posts} />

          <TouchableOpacity
            style={styles.createPostButton}
            onPress={() => navigation.navigate(ROUTE_NAME.CREATE_NEWPOST)}>
            <SvgMessages3 />
            <Text style={styles.titleButton}>{t('home.createPost')}</Text>
          </TouchableOpacity>
        </View> */}

        {data?.dailyQuizz && isShowForReviewer(user) ? (
          <ViewQuiz onAnswer={onAnswerQuiz} />
        ) : null}

        {/* <BannerTestQuiz /> */}

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
      {/* {isShowForReviewer(user) && <FLoatingAIButton />} */}
      {isShowForReviewer(user) && (
        <FloatingNewBornButton onPress={onNavigateNewBorn} />
      )}
      {isShowForReviewer(user) && (
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          onChange={handleScheduleOrderSheetChanges}
          animateOnMount={false}
          onClose={handleCloseScheduleOrderBottomSheet}
          enablePanDownToClose={true}>
          <BottomSheetNewBorn
            onPress={onNavigateAddBaby}
            onNavigateDetailNewBorn={onNavigateDetailNewBorn}
          />
        </BottomSheetModal>
      )}
    </GestureHandlerRootView>
  );
};

export {Home};
