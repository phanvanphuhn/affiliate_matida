import {AppTabBar, FLoatingAIButton} from '@component';
import {getListTabForum} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {colors} from '@stylesCommon';
import {event, eventType, trackingAppEvent, useUXCam} from '@util';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderForum, ListPost, ListTopTab} from './components';
import {ForumTab} from './components/ForumTab';
import {ListActivePeople} from './components/ListActivePeople';
import {ListPostHorizontal} from './components/ListPostHorizontal';
import {styles} from './Forum.style';

export const Forum = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state?.forum?.loading);

  const [tab, setTab] = useState(0);

  useEffect(() => {
    trackingAppEvent(event.TAB.CLICK_TAB_COMMUNITY, {}, eventType.AFF_FLYER);
  }, []);

  useUXCam(ROUTE_NAME.TAB_COMMUNITY);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    dispatch(getListTabForum());
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <HeaderForum />
      {/* <ForumTab tab={tab} onChange={(item, index) => setTab(index)} />
      <ListActivePeople />
      <ListPostHorizontal /> */}
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
      <FLoatingAIButton />
    </View>
  );
};
