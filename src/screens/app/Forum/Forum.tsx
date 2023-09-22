/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {FLoatingAIButton} from '@component';
import {getListTabForum} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {colors} from '@stylesCommon';
import {event, eventType, isShowForReviewer, trackingAppEvent, useUXCam} from '@util';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderForum, ListPost, ListTopTab} from './components';
import {styles} from './Forum.style';

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
