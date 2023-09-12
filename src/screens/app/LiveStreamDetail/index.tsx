import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ZegoUIKitPrebuiltLiveStreaming, {
  HOST_DEFAULT_CONFIG,
  AUDIENCE_DEFAULT_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import {
  APPID_ZEGO_KEY_LIVESTREAM,
  APP_SIGN_ZEGO_KEY_LIVESTREAM,
  eventType,
  useUXCam,
} from '@util';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {leaveRoomMeeting} from '@redux';
import {AppSocket} from '@util';
import {ViewStartRecordLive} from '@component';
import {checkStatusRecordApi} from '@services';
import {showMessage} from 'react-native-flash-message';
import * as ZIM from 'zego-zim-react-native';
import {trackingAppEvent, event} from '@util';
import {ROUTE_NAME} from '@routeName';
// import {APP_SIGN_ZEGO_KEY_LIVESTREAM, APPID_ZEGO_KEY_LIVESTREAM} from '@env';

const LiveStreamDetail = (props: any) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {getSocket} = AppSocket;
  const socket = getSocket();
  const {route} = props;
  const {idRoom, isHost} = route?.params;

  const user = useSelector((state: any) => state?.auth?.userInfo);
  const me = useSelector((state: any) => state?.auth?.userInfo?.id);
  const name = useSelector((state: any) => state?.auth?.userInfo?.name);

  const [stt, setStt] = useState<any>(null);

  useUXCam(ROUTE_NAME.LIVE_STREAM);

  const callApiCheckStatus = async () => {
    try {
      const body = {
        roomId: idRoom,
      };
      const res = await checkStatusRecordApi(body);
      setStt(res?.data?.Data?.Status === 2 ? 'started' : 'start');
    } catch (err: any) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: 'transparent',
      });
      setStt('start');
    }
  };

  useEffect(() => {
    socket.emit('joinRoom', {
      roomId: idRoom,
      userId: me,
    });
    socket.emit('add-user', {
      userId: me,
    });
    trackingAppEvent(event.SCREEN.LIVE_STREAM, {}, eventType.AFF_FLYER);
    return () => {
      socket.emit('leaveRoom', {
        roomId: idRoom,
        userId: me,
      });
    };
  }, []);

  const renderIDuser = () => {
    return `${me.toString()}`;
  };

  const renderName = () => {
    return `${name.toString()}`;
  };

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltLiveStreaming
        appID={+APPID_ZEGO_KEY_LIVESTREAM}
        appSign={APP_SIGN_ZEGO_KEY_LIVESTREAM}
        userID={renderIDuser()} // userID can be something like a phone number or the user id on your own user system.
        userName={renderName()}
        liveID={`${idRoom}`}
        config={{
          ...(isHost === true ? HOST_DEFAULT_CONFIG : AUDIENCE_DEFAULT_CONFIG),
          onLeaveLiveStreaming: () => {
            if (user?.role === 3) {
              navigation.goBack();
            } else {
              dispatch(leaveRoomMeeting(idRoom));
              navigation.goBack();
            }
          },
          onStartLiveButtonPressed: () => {
            callApiCheckStatus();
          },
          translationText: {
            startLiveStreamingButton: `${t(
              'liveStream.startLiveStreamingButton',
            )}`,
            noHostOnline: `${t('liveStream.noHostOnline')}`,
            memberListTitle: `${t('liveStream.memberListTitle')}`,
            // Other translation text
          },
        }}
        plugins={[ZIM]}
      />
      {isHost === true && stt?.length > 0 ? (
        <ViewStartRecordLive stt={stt} idRoom={idRoom} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});

export {LiveStreamDetail};
