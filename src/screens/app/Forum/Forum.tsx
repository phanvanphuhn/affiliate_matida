/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {FLoatingAIButton} from '@component';
import {getListTabForum} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {colors} from '@stylesCommon';
import {
  event,
  eventType,
  isShowForReviewer,
  trackingAppEvent,
  useUXCam,
} from '@util';
import React, {useEffect, useRef} from 'react';
import {ActivityIndicator, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderForum, ListPost, ListTopTab} from './components';
import {styles} from './Forum.style';
import {AppHeader} from '@component';
import {useNavigation} from '@react-navigation/native';

export const Forum = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const scrollRef = useRef<ScrollView>(null);

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
    dispatch(getListTabForum());
  };

  useEffect(() => {
    trackingAppEvent(event.TAB.CLICK_TAB_COMMUNITY, {}, eventType.AFF_FLYER);
  }, []);

  useUXCam(ROUTE_NAME.TAB_COMMUNITY);

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
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
        <>
          <ListTopTab />
          <ListPost />
        </>
      )}
      {isShowForReviewer(user) && <FLoatingAIButton />}
    </View>
  );
};
