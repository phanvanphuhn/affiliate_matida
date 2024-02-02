import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import {
  ActivityIndicator,
  Animated,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
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
  getDataHomeByWeek,
} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {
  answerDailyQuiz,
  calendarCheckups,
  getProgramCheck,
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
  getTrimester,
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
  trackEventBranch,
} from '@util';
//@ts-ignore
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {event, trackingAppEvent} from '@util';
//@ts-ignore
import {EVideoType, TRouteDeepLink} from '@constant';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';
import RNUxcam from 'react-native-ux-cam';
import {RootState} from 'src/redux/rootReducer';
import {FloatingNewBornButton} from '@component/FloatingNewBornButton';
import ListMonth, {
  TData,
  dataInitListMonth,
  dataInitPregnantWeek,
} from './components/ListMonth';
import useDetailFeed from '../DetailFeed/useDetailFeed';
import useDetailPost from '../Forum/components/useDetailPost';
import BottomSheetModal from '@component/BottomSheetModal';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import NewBornContainer from './components/NewBornContainer';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetNewBorn, {TBaby} from './components/BottomSheetNewBorn';
import {navigate} from '@navigation';
import MomProgram from './components/MomProgram';
import ContainerProvider from '@component/ContainerProvider';
import {useContainerContext} from '@component/ContainerProvider';
import AddInformation from './components/AddInformation';
import {trackUser} from '@services/webengageManager';
import ContentUpdate from './components/ContentUpdate';
import {trackCustomEvent} from '@services/webengageManager';
import moment from 'moment';
import TeaserProgram from './components/TeaserProgram';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ProductCarousel from './components/ProductCarousel';

const screenWidth = Dimensions.get('screen').width;
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
  filter: TData;
  data: any;
  isShowNewBorn: boolean;
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

  // const [refreshing, setRefreshing] = useState(false);
  // const [isSignUp, setIsSignUp] = useState();

  const [state, setState] = useDetailPost({
    filter: {id: 1, value: 'week_1', label: 'Week 1', intVal: 1},
    isShowNewBorn: false,
    data: [],
    isShowContent: [],
    isSignUp: '',
    refreshing: true,
  });
  const [activeSlide, setActiveSlide] = useState();

  const scrollRef = useRef<ScrollView>(null);
  const firstRef = useRef(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const carouselRef = useRef(null);

  const snapPoints = useMemo(() => ['30%', '50%'], []);

  const isFocus = useSelector((state: any) => state?.tab?.home);
  const lang = useSelector((state: any) => state?.auth?.lang);
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const data = useSelector((state: any) => state?.home?.data);
  const weekPregnant = useSelector((state: any) => state?.home?.weekPregnant);
  const week = useSelector((state: any) => state?.home?.week);
  const loading = useSelector((state: any) => state?.home?.loading);
  const deepLink = useSelector((state: any) => state?.check?.deepLink);
  const isDoneDaily = useSelector((state: RootState) => state.auth.isDoneDaily);
  const newBorn = useSelector((state: RootState) => state.newBorn.list);

  const isSelectProfileNewBorn = newBorn.filter(
    item =>
      // item?.type !== 'pregnant' &&
      // item?.type !== 'pregnant-overdue' &&
      // item?.type !== 'unknown' &&
      item.selected == true,
  );

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

  useEffect(() => {
    trackCustomEvent('User_Info', {
      info: user,
      due_date: formatDate(new Date()),
    });
  }, []);

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
    }, [user?.baby_type]),
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
        let type = handleDeepLink(link?.url);
        handleLinkScreen(type);
      }
    },
    [navigation],
  );

  const handleLinkScreen = (type: string) => {
    switch (type) {
      case TRouteDeepLink.TAB_MASTERCLASS:
        if (user?.user_subscriptions?.some(e => e.code == 'PP')) {
          navigate(ROUTE_NAME.PREGNANCY_PROGRAM);
        } else {
          navigate(ROUTE_NAME.NEW_USER_PROGRAM);
        }
        break;
      default:
        break;
    }
  };

  const fetchScreen = async () => {
    const getInitialLink = await dynamicLinks().getInitialLink();
    if (getInitialLink !== null && getInitialLink?.url && deepLink) {
      //handle navigation
      let type = handleDeepLink(getInitialLink?.url);
      handleLinkScreen(type);
      dispatch(updateStatusDeepLink());
    }
  };

  const getDataUser = async () => {
    try {
      const res = await getUserInfoApi();
      dispatch(saveDataUser(res?.data?.data));
      return res?.data?.data;
    } catch (error) {}
  };

  const getData = async () => {
    // GlobalService.showLoading();
    setState({refreshing: true});
    let initFilter;
    try {
      const userInfo = await getDataUser();
      const {months, weeks, days, years} = userInfo?.pregnantWeek?.weekPregnant;
      if (
        user?.baby_type == 'pregnant' ||
        user?.baby_type == 'pregnant-overdue' ||
        user?.baby_type == 'unknown'
      ) {
        initFilter = dataInitPregnantWeek.filter(
          item => item.intVal == weeks && item.value.includes('week'),
        );
      } else if (months == 0 && days == 0) {
        initFilter = dataInitListMonth.filter(
          item => item.intVal == weeks && item.value.includes('week'),
        );
      } else if (months == 0 && days > 0) {
        initFilter = dataInitListMonth.filter(
          item => item.intVal == weeks + 1 && item.value.includes('week'),
        );
      } else if (months == 1 && weeks == 0 && days == 0) {
        initFilter = dataInitListMonth.filter(
          item => item.intVal == 4 && item.value.includes('week'),
        );
      } else if (months == 1 && weeks == 0 && days > 0) {
        initFilter = dataInitListMonth.filter(
          item => item.intVal == 5 && item.value.includes('week'),
        );
      } else if (months == 1 && weeks > 0) {
        initFilter = dataInitListMonth.filter(
          item => item.intVal == weeks + 4 && item.value.includes('week'),
        );
      } else if (months == 2 && weeks == 0 && days == 0) {
        initFilter = dataInitListMonth.filter(
          item => item.intVal == 8 && item.value.includes('week'),
        );
      } else if (months == 2 && (weeks > 0 || days > 0)) {
        initFilter = dataInitListMonth.filter(
          item => item.intVal == 3 && item.value.includes('month'),
        );
      } else if (months < 7 && (weeks > 0 || days > 0)) {
        initFilter = dataInitListMonth.filter(
          item => item.intVal == months + 1 && item.value.includes('month'),
        );
      } else if (months < 7 && weeks == 0 && days == 0) {
        initFilter = dataInitListMonth.filter(
          item => item.intVal == months && item.value.includes('month'),
        );
      } else if (months > 6) {
        initFilter = [{}];
      } else {
        initFilter = dataInitListMonth.filter(
          item => item.intVal == months && item.value.includes('month'),
        );
      }
      checkProgram();
      // dispatch(getDataHome());
      dispatch(getListBaby());
      const res = await calendarCheckups();
      setState({
        data: res?.data,
        filter:
          initFilter && initFilter?.length > 0
            ? initFilter[0]
            : {id: 1, value: 'week_1', label: 'Week 1', intVal: 1},
        isShowContent: [],
        refreshing: false,
      });
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    } finally {
      setState({refreshing: false});
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
    trackingAppEvent(
      event.NEW_BORN.CLICK_REPORT_BIRTH,
      {id: user?.id},
      eventType.MIX_PANEL,
    );
    navigation.navigate(ROUTE_NAME.NEW_BORN);
  };

  const onSwitchBaby = async (item: TBaby) => {
    // GlobalService.showLoading();
    handleCloseScheduleOrderBottomSheet();
    trackingAppEvent(
      event.NEW_BORN.NEW_BORN_HOMEPAGE_CHANGE_BABY,
      {},
      eventType.MIX_PANEL,
    );
    const params = {
      id: item.id,
      body: {selected: true},
    };
    try {
      const res = await updateBaby(params);
      if (res.success) {
        getData();
      } else {
        GlobalService.hideLoading();
        console.log('error');
      }
    } catch (error) {
      GlobalService.hideLoading();
      console.log('error: ', error);
    }
  };

  const onPressNewBornTracker = () => {
    trackingAppEvent(
      event.NEW_BORN.NEW_BORN_CLICK_VIEW_MORE,
      {id: user?.id},
      eventType.MIX_PANEL,
    );
    navigation.navigate(ROUTE_NAME.NEW_BORN_TRACKER, {
      state,
      setState,
    });
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
    navigate(ROUTE_NAME.ADD_BABY, {
      isAddNewBaby: true,
    });
  };

  const handlePressItemArticle = (article: IArticles) => {
    navigation.navigate(ROUTE_NAME.DETAIL_ARTICLE, {article: article});
  };
  const onRefresh = () => {
    setState({refreshing: true});
    getData();
  };

  const handlePressLogo = () => {
    setTimeout(() => {
      scrollRef?.current?.scrollTo({x: 0, y: 0, animated: true});
    }, 0);
    // handleChangeWeeks(week);
  };

  const scrollY = useRef(new Animated.Value(0)).current;

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

  const checkProgram = async () => {
    const res = await getProgramCheck();
    if (res?.success) {
      setState({isSignUp: res?.data});
    }
  };

  const renderItemCarousel = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={{
          paddingHorizontal: scaler(16),
          borderRadius: scaler(16),
        }}
        onPress={() => {
          Linking.canOpenURL(item?.productLink).then(supported => {
            if (supported) {
              Linking.openURL(item?.productLink);
            } else {
              return;
            }
          });
        }}>
        <Image
          source={{uri: item?.productImage}}
          style={{height: scaler(264), width: '100%', borderRadius: scaler(16)}}
          resizeMode="center"
        />
      </TouchableOpacity>
    );
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={productListByTrimester?.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
          marginHorizontal: -4,
          backgroundColor: colors.pink4,
        }}
        inactiveDotStyle={{
          backgroundColor: '#D0D1D9',
        }}
        inactiveDotScale={1}
        containerStyle={{paddingVertical: scaler(12)}}
      />
    );
  };

  useEffect(() => {
    trackUser(user);
    if (
      user?.payments?.length > 0 &&
      user?.payments[0]?.status == 'completed'
    ) {
      trackCustomEvent(event.MASTER_CLASS.USER_PURCHASED_MASTERCLASS, {});
      trackEventBranch(event.MASTER_CLASS.USER_PURCHASED_MASTERCLASS, {});
    }
  }, []);

  useEffect(() => {
    GlobalService.showLoading();
    if (state.filter.value?.indexOf('week') != -1) {
      dispatch(getDataHomeByWeek({week: state.filter.intVal, month: 0}));
    } else {
      dispatch(getDataHomeByWeek({week: 1, month: state.filter.intVal}));
    }
    GlobalService.hideLoading();
  }, [state.filter.value]);

  const renderNewBornContent = () => {
    if (
      data?.babyProgress?.baby?.month > 6 ||
      data?.babyProgress?.baby?.year > 0
    ) {
      return (
        <View style={{paddingHorizontal: scaler(16)}}>
          <ContentUpdate
            dataNewBorn={isSelectProfileNewBorn}
            user={data?.user}
            data={data?.babyProgress}
          />
        </View>
      );
    } else if (
      isSelectProfileNewBorn.length > 0 &&
      isSelectProfileNewBorn[0]?.type !== 'pregnant' &&
      isSelectProfileNewBorn[0]?.type !== 'pregnant-overdue' &&
      isSelectProfileNewBorn[0]?.type !== 'unknown'
    ) {
      return (
        <View
          style={{
            // paddingHorizontal: scaler(20),
            marginBottom: scaler(16),
          }}>
          <NewBornContainer
            onPress={onPressNewBornTracker}
            data={data?.babyProgress}
            user={data?.user}
            state={state}
            setState={setState}
            isSelectProfileNewBorn={isSelectProfileNewBorn}
          />
        </View>
      );
    } else if (!!user?.is_skip || weekPregnant?.days < 0) {
      return (
        <View style={{paddingHorizontal: scaler(16), marginBottom: scaler(16)}}>
          <AddInformation onPress={onNavigateNewBorn} />
        </View>
      );
    } else {
      return (
        <View
          style={{
            // paddingHorizontal: scaler(20),
            marginBottom: scaler(16),
          }}>
          {isShowForReviewer(user) && <SizeComparisonComponent />}

          <View
            style={{
              paddingHorizontal: scaler(16),
            }}>
            <PregnancyProgress />
          </View>
        </View>
      );
    }
  };

  return (
    <ContainerProvider state={state} setState={setState}>
      <GestureHandlerRootView style={styles.container}>
        <AppHeader
          onPressMenu={navigateSetting}
          onPressNotification={navigateNotification}
          onPressLogo={handlePressLogo}
          bgc={colors.white}
          rightNoti={navigateNotification}
          openNewBorn={openNewBorn}
          onPressMessage={navigationMessage}
        />

        {isShowForReviewer(user) && (
          <View
            style={{
              backgroundColor: colors.white,
              paddingBottom: scaler(16),
              paddingHorizontal: scaler(16),
            }}>
            <ListMonth />
          </View>
        )}

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
          // refreshControl={
          //   <RefreshControl
          //     refreshing={state?.refreshing}
          //     onRefresh={onRefresh}
          //   />
          // }
          contentContainerStyle={{
            paddingBottom: scaler(30),
            paddingTop: scaler(18),
          }}>
          {isShowForReviewer(user) &&
            (user?.baby_type == 'pregnant' ||
              user?.baby_type == 'pregnant-overdue' ||
              user?.baby_type == 'unknown') &&
            (!user?.payments?.length ||
              user?.payments?.some(e => e.status == 'processing')) && (
              <View style={{marginHorizontal: 16}}>
                <TeaserProgram data={state?.isSignUp} isHome={true} />
              </View>
            )}

          {state?.refreshing ? (
            <View style={styles.wrapLoadingContainer}>
              <ActivityIndicator size={'small'} color={'red'} />
            </View>
          ) : (
            isShowForReviewer(user) && renderNewBornContent()
          )}

          {data?.dailyQuizz && isShowForReviewer(user) ? (
            <ViewQuiz onAnswer={onAnswerQuiz} />
          ) : null}

          {isShowForReviewer(user) && <ChatGPTComponent value={scrollY} />}

          {isShowForReviewer(user) && user?.baby_type !== 'newborn' && (
            <ProductCarousel />
          )}

          {/* {isShowForReviewer(user) &&
            (user?.baby_type == 'pregnant' ||
              user?.baby_type == 'pregnant-overdue' ||
              user?.baby_type == 'unknown') && (
              <MomProgram data={state?.isSignUp} />
            )} */}
        </ScrollView>
        {/* {isShowForReviewer(user) && <FLoatingAIButton />} */}
        {isShowForReviewer(user) &&
          weekPregnant?.weeks > 29 &&
          (isSelectProfileNewBorn[0]?.type == 'pregnant' ||
            isSelectProfileNewBorn[0]?.type == 'pregnant-overdue' ||
            isSelectProfileNewBorn[0]?.type == 'unknown') && (
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
              onSwitchBaby={onSwitchBaby}
            />
          </BottomSheetModal>
        )}
      </GestureHandlerRootView>
    </ContainerProvider>
  );
};

export {Home};
