import {FLoatingAIButton} from '@component';
import {getListTabForum} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {colors} from '@stylesCommon';
import {event, trackingAppEvent, useUXCam} from '@util';
import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderForum, ListPost, ListTopTab} from './components';
import {styles} from './Forum.style';

export const Forum = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state?.forum?.loading);

  useEffect(() => {
    trackingAppEvent(event.TAB.CLICK_TAB_COMMUNITY, {});
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
