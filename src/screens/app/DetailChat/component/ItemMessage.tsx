import {AppButton, AppImage, AppTextUrl} from '@component';
import {avatarDefault, iconCalendar} from '@images';
import {navigate} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {acceptJoinRoom, acceptJoinRoomRequest, GlobalService} from '@services';
import {colors, scaler} from '@stylesCommon';
import {convertLangMonth, isSameDay} from '@util';
import moment from 'moment';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './styleItemChat';

const ItemMessage = React.memo((props: any) => {
  const {t} = useTranslation();
  const navigation = useNavigation<any>();
  const user_id = useSelector((state: any) => state.auth.userInfo.id);
  const lang = useSelector((state: any) => state.auth.lang);
  const {user, text, images, createdAt, invite, request} = props.currentMessage;
  const [showSTT, setShowSTT] = useState(invite?.status ? invite?.status : 1);
  const [showSTTrequest, setShowSTTrequest] = useState(
    request?.status ? request?.status : 1,
  );
  const {viewImage} = props;

  const renderDay = () => {
    const {currentMessage, previousMessage} = props;
    if (currentMessage && !isSameDay(currentMessage, previousMessage)) {
      return (
        <View style={styles.viewCenter}>
          <View style={styles.viewRowLeft} />
          <Text style={styles.txtDateCenter} numberOfLines={2}>
            {moment(createdAt, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY')}
          </Text>
          <View style={styles.viewRowRight} />
        </View>
      );
    }
    return null;
  };

  const renderViewStatus = useCallback((stt: any) => {
    switch (stt) {
      case 1:
        return t('allRoomMetting.pending');
      case 2:
        return t('allRoomMetting.accept');
      case 3:
        return t('allRoomMetting.reject');
    }
  }, []);

  const renderBackgroundColor = useCallback((stt: any) => {
    switch (stt) {
      case 1:
        return '#F5BC65';
      case 2:
        return '#28B4AE';
      case 3:
        return colors.primary;
    }
  }, []);

  const onAccept = async () => {
    try {
      GlobalService.showLoading();
      const body = {
        status: 2,
      };
      const res = await acceptJoinRoom(invite?.id, body);
      setShowSTT(2);
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const onReject = async () => {
    try {
      GlobalService.showLoading();
      const body = {
        status: 3,
      };
      const res = await acceptJoinRoom(invite?.id, body);
      setShowSTT(3);
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const onAcceptRequest = async () => {
    try {
      GlobalService.showLoading();
      const body = {
        status: 2,
      };
      const res = await acceptJoinRoomRequest(request?.id, body);
      setShowSTTrequest(2);
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const onRejectRequest = async () => {
    try {
      GlobalService.showLoading();
      const body = {
        status: 3,
      };
      const res = await acceptJoinRoomRequest(request?.id, body);
      setShowSTTrequest(3);
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const navigateToDetailMetting = (id: any) => {
    navigation.navigate(ROUTE_NAME.DETAIL_MEETING_ROOM, {id: id});
  };

  const renderSpecialMessage = () => {
    return (
      <TouchableOpacity
        style={styles.viewSpecialMessage}
        onPress={() => navigateToDetailMetting(invite?.invitation?.room_id)}>
        {user?._id == user_id ? null : (
          <Text style={styles.txtSpecialTop}>
            {lang === 2
              ? invite?.invitation?.title_vi
              : invite?.invitation?.title_en}
            {/* <Text style={styles.txtSpecialTopBold}>Mom’s Talk</Text> room */}
          </Text>
        )}
        <View style={styles.containerMessageSpecial}>
          <Text style={styles.txtSpecialTitle} numberOfLines={2}>
            {invite?.invitation?.room?.title}
          </Text>
          <View style={styles.viewRow}>
            <Image source={iconCalendar} style={styles.iconCalendar} />
            <Text style={styles.txtTimeSpecial}>
              {moment(
                invite?.invitation?.room?.start_time,
                'YYYY/MM/DD hh:mm:ss',
              ).format('DD ')}
              {convertLangMonth(
                moment(invite?.invitation?.room?.start_time).format('MMMM'),
              )}{' '}
              {moment(invite?.invitation?.room?.start_time).format('YYYY')}{' '}
              {moment(
                invite?.invitation?.room?.start_time,
                'YYYY/MM/DD hh:mm:ss',
              ).format(', HH:mm a')}
            </Text>
            <View style={styles.viewColumn} />
            <Text style={styles.txtSpecialHostTitleName}>
              Host:{' '}
              <Text style={styles.txtSpecialHostName}>
                {invite?.invitation?.room?.host?.name}
              </Text>
            </Text>
          </View>
          {user?._id == user_id ? (
            <View style={[styles.viewRow, {marginVertical: scaler(10)}]}>
              <Text style={styles.txtSpecialTopBold}>Status:</Text>
              <View
                style={[
                  styles.viewStatus,
                  {backgroundColor: renderBackgroundColor(showSTT)},
                ]}>
                <Text style={styles.txtType}>{renderViewStatus(showSTT)}</Text>
              </View>
            </View>
          ) : (
            <>
              {showSTT === 1 ? (
                <View style={styles.viewButtonSpecial}>
                  <AppButton
                    titleButton={t('allRoomMetting.accept_join_room')}
                    customStyleButton={styles.buttonSpecial}
                    onClick={onAccept}
                  />
                  <AppButton
                    titleButton={t('allRoomMetting.cancle_accept_join_room')}
                    customStyleButton={[
                      styles.buttonSpecial,
                      styles.backgroundGray,
                    ]}
                    customStyleText={styles.txtButtonSpecial}
                    onClick={onReject}
                  />
                </View>
              ) : (
                <View style={[styles.viewRow, {marginVertical: scaler(10)}]}>
                  <Text style={styles.txtSpecialTopBold}>Status:</Text>
                  <View
                    style={[
                      styles.viewStatus,
                      {backgroundColor: renderBackgroundColor(showSTT)},
                    ]}>
                    <Text style={styles.txtType}>
                      {renderViewStatus(showSTT)}
                    </Text>
                  </View>
                </View>
              )}
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderSpecialMessageRequest = () => {
    return (
      <TouchableOpacity
        style={styles.viewSpecialMessage}
        onPress={() => navigateToDetailMetting(request?.room_id)}>
        {user?._id == user_id ? null : (
          <Text style={styles.txtSpecialTop}>
            {lang === 2 ? request?.title_vi : request?.title_en}
            {/* <Text style={styles.txtSpecialTopBold}>Mom’s Talk</Text> room */}
          </Text>
        )}
        <View style={styles.containerMessageSpecial}>
          <Text style={styles.txtSpecialTitle} numberOfLines={2}>
            {request?.room?.title}
          </Text>
          <View style={styles.viewRow}>
            <Image source={iconCalendar} style={styles.iconCalendar} />
            <Text style={styles.txtTimeSpecial}>
              {moment(request?.room?.start_time, 'YYYY/MM/DD hh:mm:ss').format(
                'DD ',
              )}
              {convertLangMonth(
                moment(request?.room?.start_time).format('MMMM'),
              )}{' '}
              {moment(request?.room?.start_time).format('YYYY')}{' '}
              {moment(request?.room?.start_time, 'YYYY/MM/DD hh:mm:ss').format(
                ', HH:mm a',
              )}
            </Text>
            <View style={styles.viewColumn} />
            <Text style={styles.txtSpecialHostTitleName}>
              Host:{' '}
              <Text style={styles.txtSpecialHostName}>
                {request?.room?.host?.name}
              </Text>
            </Text>
          </View>
          {user?._id == user_id ? (
            <View style={[styles.viewRow, {marginVertical: scaler(10)}]}>
              <Text style={styles.txtSpecialTopBold}>Status:</Text>
              <View
                style={[
                  styles.viewStatus,
                  {backgroundColor: renderBackgroundColor(showSTTrequest)},
                ]}>
                <Text style={styles.txtType}>
                  {renderViewStatus(showSTTrequest)}
                </Text>
              </View>
            </View>
          ) : (
            <>
              {showSTTrequest === 1 ? (
                <View style={styles.viewButtonSpecial}>
                  <AppButton
                    titleButton={t('allRoomMetting.accept_join_room')}
                    customStyleButton={styles.buttonSpecial}
                    onClick={onAcceptRequest}
                  />
                  <AppButton
                    titleButton={t('allRoomMetting.cancle_accept_join_room')}
                    customStyleButton={[
                      styles.buttonSpecial,
                      styles.backgroundGray,
                    ]}
                    customStyleText={styles.txtButtonSpecial}
                    onClick={onRejectRequest}
                  />
                </View>
              ) : (
                <View style={[styles.viewRow, {marginVertical: scaler(10)}]}>
                  <Text style={styles.txtSpecialTopBold}>Status:</Text>
                  <View
                    style={[
                      styles.viewStatus,
                      {backgroundColor: renderBackgroundColor(showSTTrequest)},
                    ]}>
                    <Text style={styles.txtType}>
                      {renderViewStatus(showSTTrequest)}
                    </Text>
                  </View>
                </View>
              )}
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {invite || request ? (
        <>{invite ? renderSpecialMessage() : renderSpecialMessageRequest()}</>
      ) : (
        <View
          style={[
            user?._id == user_id ? styles.containerCurrent : styles.container,
          ]}>
          {renderDay()}
          <View style={styles.chat}>
            {user?._id == user_id ? (
              <>
                {text?.length > 0 ? (
                  <View style={styles.viewMessageCurrent}>
                    <AppTextUrl
                      color={colors.brandMainPinkRed}
                      style={styles.txtMsgCurrent}>
                      {text}
                    </AppTextUrl>
                  </View>
                ) : (
                  <>
                    {images?.length > 0 ? (
                      <TouchableOpacity
                        onPress={() => viewImage(images[0]?.url)}>
                        <AppImage
                          style={[styles.imageMessageItem]}
                          uri={images[0]?.url}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </>
                )}
              </>
            ) : (
              <>
                {user?.avatar?.length > 0 ? (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      navigate(ROUTE_NAME.DETAIL_USER, {
                        id: user?.id,
                      })
                    }>
                    <AppImage
                      user
                      uri={user?.avatar}
                      style={styles.imageAvatar}
                    />
                  </TouchableOpacity>
                ) : (
                  <Image source={avatarDefault} style={styles.imageAvatar} />
                )}
                <>
                  {text?.length > 0 ? (
                    <View style={styles.viewMessage}>
                      {/* <Text style={styles.txtMsg}>{text}</Text> */}
                      <AppTextUrl color={colors.white} style={styles.txtMsg}>
                        {text}
                      </AppTextUrl>
                    </View>
                  ) : (
                    <>
                      {images?.length > 0 ? (
                        <TouchableOpacity
                          onPress={() => viewImage(images[0]?.url)}
                          style={{marginLeft: 4}}>
                          <AppImage
                            style={[styles.imageMessageItem]}
                            uri={images[0]?.url}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </>
                  )}
                </>
              </>
            )}
          </View>
          {text?.length > 0 && images && images[0]?.url?.length > 0 ? (
            <TouchableOpacity
              onPress={() => viewImage(images[0]?.url)}
              style={
                user?._id == user_id
                  ? styles.imageMessageCurrent
                  : styles.imageMessage
              }>
              {images?.length > 0 ? (
                <AppImage
                  style={styles.imageMessageItem}
                  uri={images[0]?.url}
                />
              ) : null}
            </TouchableOpacity>
          ) : null}
          {createdAt ? (
            <Text style={styles.txtDate}>
              {moment(createdAt, 'YYYY/MM/DD hh:mm:ss').format('HH:mm')}
            </Text>
          ) : null}
        </View>
      )}
    </>
  );
});

export {ItemMessage};
