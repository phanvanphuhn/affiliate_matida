import {
  AppHeader,
  AppImage,
  ButtonCreateTalk,
  ExpertWorkshopsItem,
  FLoatingAIButton,
  HorizontalList,
  MomsTalkItem,
} from '@component';
import {LogoApp} from '@images';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {getListBannerApi, getLiveTalk} from '@services';
import {colors, scaler, widthScreen} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {trackingAppEvent, event, useUXCam} from '@util';

type IData = {
  momLiveTalks: any[];
  expertLiveTalk: any[];
  recordExpertWorkShop: any[];
};

const initData: IData = {
  momLiveTalks: [],
  expertLiveTalk: [],
  recordExpertWorkShop: [],
};

const LiveTalk = () => {
  const dispatch = useDispatch();
  const isFocus = useSelector((state: any) => state?.tab?.liveTalk);

  const navigation = useNavigation<any>();
  const {t} = useTranslation();

  const [data, setData] = useState<IData>(initData);
  const [loading, setLoading] = useState<boolean>(true);
  const [banners, setBanner] = useState<any[]>([]);
  // const [page, setPage] = useState<number>(1);
  const [autoplay, setAutoplay] = useState<boolean>(false);

  const scrollRef = useRef<ScrollView>(null);
  const firstRef = useRef(false);
  // const refTotal = useRef<number>(0);

  useUXCam(ROUTE_NAME.TAB_LIVETALK);

  useFocusEffect(
    React.useCallback(() => {
      firstRef.current = false;
      getData();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      firstRef.current = false;
      getListBanner();
    }, []),
  );

  useEffect(() => {
    if (firstRef.current) {
      handlePressLogo();
    } else {
      firstRef.current = true;
    }
  }, [isFocus]);

  const getData = async () => {
    try {
      const res = await getLiveTalk();
      setData(res?.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const getListBanner = async () => {
    try {
      // setAutoplay(false);
      // const res = await getListBannerApi(page);
      // setData(res?.data);
      const res = await getListBannerApi();
      setBanner(res?.data?.data);
      // if (page === 1) {
      //   setBanner(res?.data?.data);
      // } else {
      //   setBanner(banners.concat(res?.data?.data));
      // }
      // refTotal.current = res?.data?.total;
      // res?.data?.data?.length > 0 && setPage(page + 1);
    } catch (e) {
    } finally {
      setAutoplay(true);
    }
  };

  const navigateSetting = () => {
    navigation.navigate(ROUTE_NAME.SETTING_SCREEN);
  };
  const navigateUser = () => {
    navigation.navigate(ROUTE_NAME.PROFILE_SETTINGS);
  };
  const navigateNotification = () => {
    navigation.navigate(ROUTE_NAME.NOTIFICATION_LIST);
  };
  const navigationMessage = () => {
    navigation.navigate(ROUTE_NAME.LIST_MESSAGE);
  };
  const handlePressLogo = () => {
    setTimeout(() => {
      scrollRef?.current?.scrollTo({x: 0, y: 0, animated: true});
    }, 0);
    // handleChangeWeeks(week);
  };

  const handlePressBanner = (banner: any) => {
    if (banner?.link) {
      navigation.navigate(ROUTE_NAME.DETAIL_MEETING_ROOM, {
        id: +banner?.link,
      });
    }
  };

  const onRefresh = () => {
    // setRefreshing(true);
    getData();
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <AppHeader
        onPressMenu={navigateSetting}
        onPressAvatar={navigateUser}
        onPressNotification={navigateNotification}
        onPressMessage={navigationMessage}
        onPressLogo={handlePressLogo}
      />
      <View style={{flex: 1}}>
        <ScrollView
          ref={scrollRef}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: scaler(90),
            paddingTop: scaler(16),
            // flexGrow: 1,
          }}
          scrollEventThrottle={16}>
          {banners?.length > 0 ? (
            <Swiper
              // dotStyle={styles.dot}
              // activeDotStyle={styles.activeDot}
              style={{height: scaler(173)}}
              loop={true}
              autoplay={autoplay}
              removeClippedSubviews={false}
              showsPagination={false}
              horizontal>
              {/* <FlatList
              contentContainerStyle={{backgroundColor: 'green'}}
              data={Array(10).fill(0)}
              horizontal
              showsHorizontalScrollIndicator={false}
              // pagingEnabled
              // nestedScrollEnabled
              // scrollEventThrottle={16}
              // decelerationRate="fast"
              // snapToInterval={widthScreen}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item}) => (
                <View style={{width: widthScreen}}>
                  <View style={[styles.banner, {backgroundColor: 'red'}]} />
                </View>
              )}
            /> */}
              {banners.map((banner, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: widthScreen,
                      alignItems: 'center',
                    }}
                    activeOpacity={0.9}
                    onPress={() => handlePressBanner(banner)}
                    key={index}>
                    {banner?.images?.length > 0 ? (
                      <AppImage
                        uri={banner?.images[0]?.url}
                        style={styles.banner}
                      />
                    ) : (
                      <Image source={LogoApp} style={styles.banner} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </Swiper>
          ) : null}
          {/* <Image source={LogoApp} style={styles.banner} /> */}
          <HorizontalList
            loading={loading}
            title={t('talk.momTalk')}
            contentContainerStyle={{
              paddingLeft: 0,
              paddingTop: scaler(16),
              paddingRight: scaler(16),
            }}
            styleHeader={{paddingHorizontal: scaler(20)}}
            textSee={t('talk.seeAll')}
            onPressSeeMore={() =>
              navigation.navigate(ROUTE_NAME.ALL_MEETING_ROOM)
            }
            length={data?.momLiveTalks?.length}>
            {data?.momLiveTalks?.map((item, index) => (
              <MomsTalkItem item={item} index={index} key={index} />
            ))}
          </HorizontalList>
          <HorizontalList
            loading={loading}
            title={t('talk.expertWorkshops')}
            contentContainerStyle={{paddingLeft: 0, paddingRight: scaler(16)}}
            styleHeader={{paddingHorizontal: scaler(20)}}
            textSee={t('talk.seeAll')}
            length={data?.expertLiveTalk?.length}
            onPressSeeMore={() =>
              navigation.navigate(ROUTE_NAME.ALL_MEETING_ROOM)
            }>
            {data?.expertLiveTalk?.map((item, index) => (
              <ExpertWorkshopsItem item={item} key={index} />
            ))}
          </HorizontalList>
          <HorizontalList
            loading={loading}
            title={t('talk.recordedExpert')}
            contentContainerStyle={{paddingLeft: 0, paddingRight: scaler(16)}}
            styleHeader={{paddingHorizontal: scaler(20)}}
            textSee={t('talk.seeAll')}
            length={data?.recordExpertWorkShop?.length}
            onPressSeeMore={() => navigation.navigate(ROUTE_NAME.LIST_RECORD)}>
            {data?.recordExpertWorkShop?.map((item, index) => (
              <ExpertWorkshopsItem item={item} recorded key={index} />
            ))}
          </HorizontalList>
        </ScrollView>
      </View>
      <ButtonCreateTalk />
      <FLoatingAIButton />
    </View>
  );
};

export {LiveTalk};
