import {FLoatingAIButton} from '@component';
import {getListTabForum} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {colors} from '@stylesCommon';
import {event, eventType, trackingAppEvent, useUXCam} from '@util';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './Forum.style';
import {HeaderForum, ListPost, ListTopTab} from './components';

export const Forum = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state?.forum?.loading);
  const user = useSelector((state: any) => state?.auth?.userInfo);

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
      {user?.id !== 18257 && user?.id !== 89 && <FLoatingAIButton />}
    </View>
  );
};
