/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ExpertWorkshopsItem,
  ExpertWorkshopsItemV2,
  FLoatingAIButton,
  HorizontalList,
} from '@component';
import {getListTabForum} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {
  event,
  eventType,
  isShowForReviewer,
  trackingAppEvent,
  useUXCam,
} from '@util';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderForum, ListPost, ListTopTab} from './components';
import {styles} from './Forum.style';
import {
  AppHeader,
  FloatingCreateNewPost,
  FloatingCreateNewRoom,
} from '@component';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {getLiveTalk} from '@services';

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

export const Forum = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const scrollRef = useRef<ScrollView>(null);
  const {t} = useTranslation();

  const [data, setData] = useState<IData>(initData);
  // const [loading, setLoading] = useState<boolean>(true);

  const loading = useSelector((state: any) => state?.forum?.loading);
  const user = useSelector((state: any) => state?.auth?.userInfo);

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

  const handlePressLogo = () => {
    setTimeout(() => {
      scrollRef?.current?.scrollTo({x: 0, y: 0, animated: true});
    }, 0);
  };

  const getData = async () => {
    try {
      dispatch(getListTabForum());
      const res = await getLiveTalk();
      setData(res?.data);
    } catch (e) {
    } finally {
      // setLoading(false);
    }
  };

  const onRefresh = () => {
    // setRefreshing(true);
    getData();
  };

  useEffect(() => {
    trackingAppEvent(event.TAB.CLICK_TAB_COMMUNITY, {}, eventType.AFF_FLYER);
  }, []);

  useUXCam(ROUTE_NAME.TAB_COMMUNITY);

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <AppHeader
        onPressMenu={navigateSetting}
        onPressNotification={navigateNotification}
        bgc={colors.white}
        rightNoti={navigateNotification}
        onPressLogo={handlePressLogo}
        onPressMessage={navigationMessage}
      />
      {/* <FlatList
        data={[{}]}
        ListHeaderComponent={
          <ForumTab tab={tab} onChange={(item, index) => setTab(index)} />
        }
        stickyHeaderIndices={[0]}
        renderItem={() => (
          <>
            <ListActivePeople />
            <ListPostHorizontal />
          </>
        )}
      /> */}
      {loading ? (
        <View style={styles.viewLoadMore}>
          <ActivityIndicator color={colors.primary} size="small" />
        </View>
      ) : (
        <ScrollView style={{flex: 1}}>
          {/* <ListTopTab /> */}
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: scaler(24),
                marginBottom: scaler(8),
                paddingHorizontal: scaler(16),
              }}>
              <Text
                style={{
                  fontSize: scaler(18),
                  ...stylesCommon.fontWeight600,
                }}>
                {t('talk.expertWorkshops')}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(ROUTE_NAME.ALL_MEETING_ROOM)
                }>
                <Text
                  style={{
                    ...stylesCommon.fontWeight500,
                    fontSize: scaler(14),
                    color: colors.pink4,
                  }}>
                  {t('talk.seeAll')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{paddingLeft: scaler(16)}}>
              <FlatList
                data={data?.expertLiveTalk}
                renderItem={({item, index}) => {
                  return <ExpertWorkshopsItemV2 item={item} key={index} />;
                }}
                horizontal={true}
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: scaler(18),
                paddingHorizontal: scaler(16),
                marginBottom: scaler(8),
                ...stylesCommon.fontWeight600,
              }}>
              {t('newFeed.titleHeader')}
            </Text>
            <ListPost />
          </View>
        </ScrollView>
      )}
      {isShowForReviewer(user) && (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            position: 'absolute',
            justifyContent: 'center',
            bottom: scaler(16),
            paddingHorizontal: scaler(16),
          }}>
          <FloatingCreateNewPost />
          {user?.role !== 1 && (
            <View style={{marginLeft: scaler(16)}}>
              <FloatingCreateNewRoom />
            </View>
          )}
        </View>
      )}
      {/* {isShowForReviewer(user) && <FLoatingAIButton />} */}
    </View>
  );
};
