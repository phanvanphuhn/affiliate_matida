import {ButtonCreateTalk, Header} from '@component';
import {SvgArrowLeft} from '@images';
import {useFocusEffect} from '@react-navigation/native';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {event, eventType, trackingAppEvent, useUXCam} from '@util';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Item} from './component/Item';
import {ViewButton} from './component/ViewButton';

import {ROUTE_NAME} from '@routeName';
import {
  getAllMyRoom,
  getAllRoom,
  getAllRoomJoined,
  getAllSavedRoom,
  GlobalService,
} from '@services';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {useSelector} from 'react-redux';

const AllMeetingRoom = () => {
  const {t} = useTranslation();
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const [statusButton, setStatusButton] = useState(1);
  const [data, setData] = useState([]);
  const [dataJoined, setDataJoined] = useState([]);

  useUXCam(ROUTE_NAME.ALL_MEETING_ROOM);

  useEffect(() => {
    trackingAppEvent(event.SCREEN.ALL_MEETING_ROOM, {}, eventType.AFF_FLYER);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (statusButton === 1) {
        getDataAll();
      } else if (statusButton === 2) {
        getDataAllMyRoom();
      } else if (statusButton === 3) {
        getDataSaved();
      }
    }, [statusButton]),
  );

  const getDataSaved = async () => {
    try {
      GlobalService.showLoading();
      const res = await getAllSavedRoom();
      setData(res?.data?.data);
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const getDataAll = async () => {
    try {
      GlobalService.showLoading();
      const res = await getAllRoom();
      setData(res?.data?.data);
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const getDataAllMyRoom = async () => {
    try {
      GlobalService.showLoading();
      const res = await getAllMyRoom();
      setData(res?.data?.data);
      const resJoin = await getAllRoomJoined();
      setDataJoined(resJoin?.data?.data);
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const reloadData = () => {
    if (statusButton === 1) {
      getDataAll();
    } else if (statusButton === 2) {
      getDataAllMyRoom();
    } else if (statusButton === 3) {
      getDataSaved();
    }
  };

  const renderItem = ({item, index}: any) => {
    return <Item item={item} index={index} callBackDataSave={reloadData} />;
  };

  return (
    <View style={styles.container}>
      <Header
        title={`${t('talk.momTalk')}`}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      <ViewButton
        statusButton={statusButton}
        onChange={(value: any) => setStatusButton(value)}
      />
      <View style={styles.viewContent}>
        <FlatList
          data={[1]}
          contentContainerStyle={{paddingBottom: scaler(80)}}
          renderItem={() => {
            return (
              <>
                {statusButton === 2 ? (
                  <Text style={styles.txtHeaderList}>
                    {t('allRoomMetting.hosted')}
                  </Text>
                ) : null}
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  ListEmptyComponent={() => {
                    return (
                      <View style={styles.viewEmpty}>
                        <Text style={styles.txtEmpty}>
                          {t('allRoomMetting.no_data')}
                        </Text>
                      </View>
                    );
                  }}
                  //@ts-ignore
                  listKey={(item, index) => 'A' + index.toString()}
                />
                {statusButton === 2 ? (
                  <Text style={[styles.txtHeaderList, {marginTop: scaler(16)}]}>
                    {t('allRoomMetting.joined')}
                  </Text>
                ) : null}
                {statusButton === 2 ? (
                  <FlatList
                    data={dataJoined}
                    renderItem={renderItem}
                    ListEmptyComponent={() => {
                      return (
                        <View style={styles.viewEmpty}>
                          <Text style={styles.txtEmpty}>
                            {t('allRoomMetting.no_data')}
                          </Text>
                        </View>
                      );
                    }}
                    //@ts-ignore
                    listKey={(item, index) => 'B' + index.toString()}
                  />
                ) : null}
              </>
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={reloadData}
              tintColor={Platform.OS === 'ios' ? colors.primary : undefined}
            />
          }
          keyExtractor={(index: any) => index?.toString()}
        />
      </View>
      {user?.role !== 1 && <ButtonCreateTalk />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewContent: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingTop: scaler(16),
  },
  txtHeaderList: {
    color: colors.textColor,
    fontSize: scaler(20),
    ...stylesCommon.fontPlus600,
    lineHeight: scaler(28),
    marginLeft: scaler(16),
    marginBottom: scaler(16),
  },
  viewEmpty: {
    alignItems: 'center',
    marginTop: scaler(16),
  },
  txtEmpty: {
    ...stylesCommon.fontWeight500,
    color: '#515151',
    fontSize: scaler(14),
  },
  viewCreate: {
    width: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: getBottomSpace() + scaler(10),
    alignItems: 'center',
  },
  buttonCreate: {
    width: scaler(136),
    flexDirection: 'row',
    paddingHorizontal: scaler(12),
    height: scaler(45),
    borderRadius: scaler(200),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtCreate: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    color: '#FFFFFF',
    marginLeft: scaler(10),
  },
});

export {AllMeetingRoom};
