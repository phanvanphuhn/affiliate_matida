import {
  AppButton,
  AppImage,
  Header,
  IModalShare,
  ModalEndRoomCall,
  ModalRating,
  ModalShareComponent,
} from '@component';
import {ERoomStatusType, ETypeHost, TypeDeepLink, TypeRoom} from '@constant';
import {iconPen, iconShare, SvgArrowLeft, SvgCalendar} from '@images';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {clearDataLiveTalk, getInfoRoom} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {
  GlobalService,
  joinRoom,
  putUpdateRoom,
  reminderTime,
  requestJoinRoomApi,
} from '@services';
import {colors, scaler} from '@stylesCommon';
import {
  AppSocket,
  convertLangMonth,
  event,
  eventType,
  getTimeEndRoom,
  getTimeStartRoom,
  trackingAppEvent,
  useUXCam,
} from '@util';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  LayoutChangeEvent,
  Linking,
  Platform,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {ViewDeleteUser} from '../CallDetail/InfoRoom/component/ViewDeleteUser';
import {ItemColumn} from './component/ItemColumn';
import {ReminderTime} from './component/ReminderTime';
import {TicketPrice} from './component/TicketPrice';
import {ViewInfoHost} from './component/ViewInfoHost';
import {styles} from './styles';
import {
  trackExpertWorkshop,
  trackMomsTalk,
} from '@services/webengageManager.tsx';

const DetailMeetingRoom = (props: any) => {
  const dispatch = useDispatch();
  const {route} = props;
  const {id} = route?.params;
  const {getSocket} = AppSocket;
  const socket = getSocket();
  const navigation = useNavigation<any>();
  const {t} = useTranslation();

  const user = useSelector((state: any) => state?.auth?.userInfo);
  const infoRoom = useSelector((state: any) => state?.liveTalk?.info);

  const [noti, setNoti] = useState<any>(null);
  const [showMore, setShowMore] = useState(false);
  const [timeCurrent, setTimeCurrent] = useState<number>(-1);
  const [heightText, setHeightText] = useState<number>(0);
  const [modalDelete, setModalDelete] = useState(false);
  const [dataUserKick, setDataUserKick] = useState<any>(null);
  const [modalEndRoom, setModalEndRoom] = useState<any>(false);

  const refShare = useRef<IModalShare>(null);

  const isCanEdit = infoRoom?.host?.id === user?.id;
  const heightMax = 31;
  var isEventTracked = false; // to tackle refreshing of screen twice or thrice

  useUXCam(ROUTE_NAME.DETAIL_MEETING_ROOM);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getInfoRoom(id));
      return () => {};
    }, [id]),
  );

  useEffect(() => {
    trackingAppEvent(event.SCREEN.DETAIL_MEETING_ROOM, {}, eventType.AFF_FLYER);
    socket.emit('add-user', {
      userId: user?.id,
    });
  }, []);

  useEffect(() => {
    setNoti(infoRoom?.set_reminder);
  }, [infoRoom?.set_reminder]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (infoRoom?.room?.status !== ERoomStatusType.ENDED) {
        const getTime =
          infoRoom?.room?.status === ERoomStatusType.PENDING
            ? getTimeStartRoom(infoRoom?.room?.start_time)
            : getTimeEndRoom(
                infoRoom?.room?.start_time,
                infoRoom?.room?.type_room,
              );
        setTimeCurrent(getTime);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [infoRoom?.room?.start_time]);

  const changeStatusNoti = async () => {
    try {
      const res = await reminderTime(id);
      setNoti(!noti);
    } catch (error) {}
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const layoutItem: number = event?.nativeEvent?.layout?.height || 0;
    setHeightText(layoutItem);
    console.log('#!# infoRoom type : ', infoRoom?.room?.media_type);
    if (!isEventTracked) {
      if (infoRoom?.room?.media_type == 1) {
        trackMomsTalk(infoRoom?.room?.title);
      } else if (infoRoom?.room?.media_type == 2) {
        trackExpertWorkshop(infoRoom?.room?.title, infoRoom?.room?.start_time);
      }
      isEventTracked = true;
    }
  };

  const onKickUser = (user: any) => {
    setDataUserKick(user);
    setModalDelete(true);
  };

  const onKick = async () => {
    try {
      GlobalService.showLoading();
      const params = {
        user_ids: infoRoom.participants
          .map((item: any) => item?.user_id ?? item?.user?.id)
          .filter((idUser: any) => idUser !== dataUserKick?.id),
      };
      const res = await putUpdateRoom(infoRoom?.room?.id, params);
      onRefresh();
      setModalDelete(false);
      // goBack();
    } catch (error) {
    } finally {
      GlobalService.hideLoading();
    }
  };

  const renderItemUserColumn = ({item}: any) => {
    return <ItemColumn item={item} onKickUser={onKickUser} />;
  };

  const renderStausLive = () => {
    if (infoRoom?.room?.status === 2) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: scaler(16),
          }}>
          <View style={styles.viewRowStatusLive}>
            <Image
              source={require('../../../images/live.gif')}
              style={styles.imageLive}
            />
            <Text style={styles.txtLive}>{t('allRoomMetting.live')}</Text>
          </View>
          {infoRoom?.room?.type_room === 1 &&
          infoRoom?.room?.media_type !== 1 ? (
            <View style={styles.viewExp}>
              <Text style={styles.txtExp}>{t('talk.workshop')}</Text>
            </View>
          ) : null}
        </View>
      );
    } else if (infoRoom?.room?.status === 1) {
      return (
        <View style={[styles.viewRow, {justifyContent: 'space-between'}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SvgCalendar color={colors.brandMainPinkRed} />
            <Text style={styles.txtDateTime}>
              {moment(infoRoom?.room?.start_time, 'YYYY/MM/DD hh:mm:ss').format(
                'DD ',
              )}
              {convertLangMonth(
                moment(infoRoom?.room?.start_time).format('MMMM'),
              )}{' '}
              {moment(infoRoom?.room?.start_time).format('YYYY')}{' '}
              {moment(infoRoom?.room?.start_time, 'YYYY/MM/DD hh:mm:ss').format(
                'HH:mm A',
              )}
            </Text>
          </View>
          {infoRoom?.room?.type_room === 1 &&
          infoRoom?.room?.media_type !== 1 ? (
            <View style={styles.viewExp}>
              <Text style={styles.txtExp}>{t('talk.workshop')}</Text>
            </View>
          ) : null}
        </View>
      );
    } else if (infoRoom?.room?.status === 3) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: scaler(16),
          }}>
          <View
            style={[styles.viewRowStatusLive, {backgroundColor: colors.gray}]}>
            <Text style={[styles.txtLive, {color: colors.textColor}]}>
              {t('allRoomMetting.end')}
            </Text>
          </View>
          {infoRoom?.room?.type_room === 1 &&
          infoRoom?.room?.media_type !== 1 ? (
            <View style={styles.viewExp}>
              <Text style={styles.txtExp}>{t('talk.workshop')}</Text>
            </View>
          ) : null}
        </View>
      );
    }
  };

  const getTimeCurrent = () => {
    switch (infoRoom?.room?.status) {
      case ERoomStatusType.PENDING:
        return (
          <Text style={styles.textEnded}>
            {t('talk.timeStart', {time: timeCurrent})}
          </Text>
        );
      case ERoomStatusType.LIVE:
        return (
          <Text style={styles.textEnded}>
            {t('talk.timeEnded', {time: timeCurrent})}
          </Text>
        );
      default:
        return <></>;
    }
  };

  const renderItem = () => {
    return (
      <View style={styles.viewItem}>
        {infoRoom?.room?.type_room === 1 ? (
          <View style={styles.viewImageAvatar}>
            <AppImage
              user
              uri={infoRoom?.host?.avatar}
              style={styles.imageHost}
            />
          </View>
        ) : null}
        {renderStausLive()}
        <View style={styles.viewTitle}>
          {timeCurrent > 0 && timeCurrent < 180 ? getTimeCurrent() : null}
          <Text style={styles.txtTitle}>{infoRoom?.room?.title}</Text>
          {infoRoom?.room?.description ? (
            <>
              <View style={{paddingTop: scaler(8)}}>
                <Text
                  style={[
                    styles.txtContent,
                    {
                      position: 'absolute',
                      top: scaler(8),
                      opacity: 0,
                      zIndex: -1,
                    },
                  ]}
                  onLayout={handleLayout}>
                  {infoRoom?.room?.description}
                </Text>
                <Text
                  style={styles.txtContent}
                  numberOfLines={showMore ? undefined : 2}
                  ellipsizeMode="tail">
                  {infoRoom?.room?.description}
                </Text>
              </View>

              <View style={{alignItems: 'flex-end'}}>
                {heightText >= heightMax ? (
                  <TouchableOpacity
                    onPress={() => {
                      setShowMore(!showMore);
                    }}>
                    <Text style={styles.txtViewMore}>
                      {showMore === true
                        ? t('allRoomMetting.compact')
                        : t('allRoomMetting.view_more')}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              {infoRoom?.room?.type_room === ETypeHost.EXPERT ? (
                <TicketPrice />
              ) : null}
            </>
          ) : null}
        </View>
        {isShowReminderTime(
          infoRoom?.participants,
          user?.id,
          infoRoom?.room?.type,
          infoRoom?.room?.status,
          infoRoom?.not_edit,
        ) && <ReminderTime noti={noti} changeStatusNoti={changeStatusNoti} />}
        <ViewInfoHost />
        <View style={styles.viewListUser}>
          {infoRoom?.participants ? (
            <FlatList
              data={infoRoom?.participants}
              renderItem={renderItemUserColumn}
              numColumns={3}
              keyExtractor={index => index.toString()}
            />
          ) : null}
        </View>
      </View>
    );
  };

  const requestJoin = async () => {
    try {
      GlobalService.showLoading();
      const res = await requestJoinRoomApi(infoRoom?.room?.id);
      showMessage({
        message: res?.data?.message,
        type: 'default',
        backgroundColor: colors.success_message,
      });
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const onRefresh = () => {
    dispatch(getInfoRoom(id));
  };

  const joinRoomFunc = async () => {
    if (infoRoom?.room?.type_room === 1) {
      try {
        GlobalService.showLoading();
        const res = await joinRoom(id);
        if (infoRoom?.room?.media_type === 1) {
          navigation.navigate(ROUTE_NAME.AUDIO_LIVE, {
            idRoom: id,
            isHost: user?.id === infoRoom?.host?.id ? true : false,
          });
        } else {
          // Linking.openURL(
          //   'https://www.tiktok.com/@matida.app?_t=8gp1GoMZytu&_r=1',
          // );
          navigation.navigate(ROUTE_NAME.LIVE_STREAM, {
            idRoom: id,
            isHost: user?.id === infoRoom?.host?.id ? true : false,
          });
        }
        GlobalService.hideLoading();
      } catch (error) {
        GlobalService.hideLoading();
      }
    } else {
      try {
        GlobalService.showLoading();
        const res = await joinRoom(id);
        navigation.navigate(ROUTE_NAME.AUDIO_LIVE, {
          idRoom: id,
          isHost: user?.id === infoRoom?.host?.id ? true : false,
        });
        GlobalService.hideLoading();
      } catch (error) {
        GlobalService.hideLoading();
      }
    }
  };

  const joinRoomFuncAdmin = () => {
    if (user?.id === infoRoom?.host?.id) {
      joinRoomFunc();
    } else {
      if (infoRoom?.room?.media_type === 1) {
        navigation.navigate(ROUTE_NAME.AUDIO_LIVE, {
          idRoom: id,
          isHost: user?.id === infoRoom?.host?.id ? true : false,
        });
      } else {
        navigation.navigate(ROUTE_NAME.LIVE_STREAM, {
          idRoom: id,
          isHost: user?.id === infoRoom?.host?.id ? true : false,
        });
      }
    }
  };

  const onBack = () => {
    navigation.goBack();
    dispatch(clearDataLiveTalk());
  };

  const showModalEndRoom = () => {
    setModalEndRoom(true);
  };

  const onEndRoom = async () => {
    try {
      GlobalService.showLoading();
      setModalEndRoom(false);
      const params = {
        status: 3,
      };
      const res = await putUpdateRoom(id, params);
      showMessage({
        message: res?.data?.message,
        type: 'default',
        backgroundColor: colors.success_message,
      });
      onRefresh();
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Header
          onPressLeft={onBack}
          IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
          routeName={ROUTE_NAME.DETAIL_MEETING_ROOM}
          ComponentRight={
            <View style={[styles.viewRow, {paddingRight: 0}]}>
              {isCanEdit && infoRoom?.room?.status !== 3 ? (
                <>
                  <TouchableOpacity
                    style={styles.viewHeader}
                    activeOpacity={0.9}
                    onPress={() =>
                      navigation.navigate(ROUTE_NAME.EDIT_ROOM, {
                        data: infoRoom,
                      })
                    }>
                    <Image source={iconPen} style={styles.iconEdit} />
                  </TouchableOpacity>
                </>
              ) : null}
              <TouchableOpacity
                style={styles.viewHeader}
                activeOpacity={0.9}
                onPress={() => refShare.current?.open()}>
                <Image source={iconShare} style={styles.iconEdit} />
              </TouchableOpacity>
            </View>
          }
        />
        <>
          {!infoRoom?.room?.id ? (
            <View style={styles.viewLoading}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : (
            <View style={styles.content}>
              <FlatList
                data={[1]}
                renderItem={renderItem}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={onRefresh}
                    tintColor={
                      Platform.OS === 'ios' ? colors.primary : undefined
                    }
                  />
                }
                keyExtractor={index => index.toString()}
              />
              <>
                {user?.role === 3 ? (
                  <>
                    {infoRoom?.room?.status === 3 ? null : (
                      <View style={styles.viewButton}>
                        <>
                          {infoRoom?.host?.id === user?.id &&
                          infoRoom?.room?.status === 2 ? (
                            <>
                              <TouchableOpacity
                                style={styles.buttonEnd}
                                onPress={showModalEndRoom}>
                                <View style={styles.viewRectage} />
                                <Text style={styles.txtEnd}>
                                  {t('allRoomMetting.end')}
                                </Text>
                              </TouchableOpacity>
                              <View style={styles.viewSpace} />
                            </>
                          ) : null}
                          <AppButton
                            titleButton={
                              infoRoom?.host?.id === user?.id
                                ? t('allRoomMetting.join_room')
                                : infoRoom?.room?.status === 2
                                ? t('allRoomMetting.join_room')
                                : t('allRoomMetting.open_message')
                            }
                            onClick={joinRoomFunc}
                            disable={
                              user?.id === infoRoom?.host?.id
                                ? infoRoom?.join_room_earlier === false
                                : infoRoom?.room?.status === 1
                            }
                            customStyleButton={styles.buttonStart}
                          />
                        </>
                      </View>
                    )}
                  </>
                ) : (
                  <>
                    {infoRoom?.room?.type === 2 ? (
                      <>
                        {infoRoom?.room?.status === 3 ? null : (
                          <View style={styles.viewButton}>
                            <>
                              {infoRoom?.host?.id === user?.id &&
                              infoRoom?.room?.status === 2 ? (
                                <>
                                  <TouchableOpacity
                                    style={styles.buttonEnd}
                                    onPress={showModalEndRoom}>
                                    <View style={styles.viewRectage} />
                                    <Text style={styles.txtEnd}>
                                      {t('allRoomMetting.end')}
                                    </Text>
                                  </TouchableOpacity>
                                  <View style={styles.viewSpace} />
                                </>
                              ) : null}
                              <AppButton
                                titleButton={
                                  infoRoom?.host?.id === user?.id
                                    ? t('allRoomMetting.join_room')
                                    : infoRoom?.room?.status === 2
                                    ? t('allRoomMetting.join_room')
                                    : t('allRoomMetting.open_message')
                                }
                                onClick={joinRoomFunc}
                                disable={
                                  user?.id === infoRoom?.host?.id
                                    ? infoRoom?.join_room_earlier === false
                                    : infoRoom?.room?.status === 1
                                }
                                customStyleButton={styles.buttonStart}
                              />
                            </>
                          </View>
                        )}
                      </>
                    ) : (
                      <>
                        {infoRoom?.room?.status === 3 ? null : (
                          <View style={styles.viewButton}>
                            {infoRoom?.is_joined === false ? (
                              <AppButton
                                titleButton={t('allRoomMetting.request_join')}
                                onClick={requestJoin}
                              />
                            ) : (
                              <>
                                {infoRoom?.host?.id === user?.id &&
                                infoRoom?.room?.status === 2 ? (
                                  <>
                                    <TouchableOpacity
                                      style={styles.buttonEnd}
                                      onPress={showModalEndRoom}>
                                      <View style={styles.viewRectage} />
                                      <Text style={styles.txtEnd}>
                                        {t('allRoomMetting.end')}
                                      </Text>
                                    </TouchableOpacity>
                                    <View style={styles.viewSpace} />
                                  </>
                                ) : null}
                                <AppButton
                                  titleButton={t('allRoomMetting.join_room')}
                                  onClick={joinRoomFunc}
                                  disable={
                                    user?.id === infoRoom?.host?.id
                                      ? infoRoom?.join_room_earlier === false
                                      : infoRoom?.room?.status === 1
                                  }
                                  customStyleButton={styles.buttonStart}
                                />
                              </>
                            )}
                          </View>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            </View>
          )}
        </>
        <ModalRating onRejoin={joinRoomFunc} />
        <ModalShareComponent
          typeShare={TypeDeepLink.ROOM}
          ref={refShare}
          id={id}
        />
        {modalDelete === true ? (
          <ViewDeleteUser
            closeModal={() => setModalDelete(false)}
            dataUserKick={dataUserKick}
            onKick={onKick}
          />
        ) : null}
        <ModalEndRoomCall
          onCancel={() => setModalEndRoom(false)}
          onConfirm={onEndRoom}
          visible={modalEndRoom}
        />
      </View>
    </>
  );
};

const isShowReminderTime = (
  array: any[],
  idUser: any,
  type: number,
  status: number,
  isNotEdit: boolean,
) => {
  if (isNotEdit) {
    return false;
  }
  if (type === TypeRoom.PUBLIC) {
    return true;
  }
  if (!array || !idUser || status !== 1) {
    return false;
  }
  return array?.some(item => item?.user_id === idUser);
};

export {DetailMeetingRoom};
