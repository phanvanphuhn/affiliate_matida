import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ZegoUIKitPrebuiltLiveAudioRoom, {
  HOST_DEFAULT_CONFIG,
  AUDIENCE_DEFAULT_CONFIG,
  //@ts-ignore
} from '@zegocloud/zego-uikit-prebuilt-live-audio-room-rn';
import {
  APPID_ZEGO_KEY_AUDIOLIVE,
  APP_SIGN_ZEGO_KEY_AUDIOLIVE,
  useUXCam,
} from '@util';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {leaveRoomMeeting} from '@redux';
import {AppSocket} from '@util';
import {liveTalkBackground} from '@images';
import {
  colors,
  scaler,
  widthScreen,
  stylesCommon,
  heightScreen,
} from '@stylesCommon';
import {trackingAppEvent, event} from '@util';
import {ROUTE_NAME} from '@routeName';
// import {APPID_ZEGO_KEY_AUDIOLIVE, APP_SIGN_ZEGO_KEY_AUDIOLIVE} from '@env';

const AudioLive = (props: any) => {
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
  const infoRoom = useSelector(
    (state: any) => state?.liveTalk?.info?.room?.title,
  );

  useUXCam(ROUTE_NAME.AUDIO_LIVE);

  useEffect(() => {
    socket.emit('joinRoom', {
      roomId: idRoom,
      userId: me,
    });
    socket.emit('add-user', {
      userId: me,
    });
    trackingAppEvent(event.SCREEN.AUDIO_LIVE, {});
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

  const background = () => {
    return (
      <View style={styles.backgroundView}>
        <Image source={liveTalkBackground} style={styles.image} />
        <View style={styles.titleBar}>
          <Text style={styles.title}>{infoRoom}</Text>
        </View>
      </View>
    );
  };

  const foregroundBuilder = ({userInfo}: any) => {
    return (
      <View style={styles.builder}>
        <Text style={styles.name} numberOfLines={1}>
          {userInfo.userName}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltLiveAudioRoom
        appID={+APPID_ZEGO_KEY_AUDIOLIVE}
        appSign={APP_SIGN_ZEGO_KEY_AUDIOLIVE}
        userID={renderIDuser()} // userID can be something like a phone number or the user id on your own user system.
        userName={renderName()}
        roomID={`${idRoom}`}
        config={{
          ...(isHost === true ? HOST_DEFAULT_CONFIG : AUDIENCE_DEFAULT_CONFIG),
          onLeaveConfirmation: () => {
            if (user?.role === 3) {
              navigation.goBack();
            } else {
              dispatch(leaveRoomMeeting(idRoom));
              navigation.goBack();
            }
          },
          seatConfig: {
            foregroundBuilder,
          },
          background: background,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  backgroundView: {
    zIndex: -1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    width: widthScreen,
    height: heightScreen,
  },
  titleBar: {
    position: 'absolute',
    top: 55,
    paddingLeft: 18,
    width: '100%',
    height: 54,
  },
  title: {
    fontSize: scaler(16),
    lineHeight: scaler(33),
    color: colors.textColor,
    ...stylesCommon.fontWeight500,
  },
  builder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarBox: {
    alignItems: 'center',
    width: 54,
    height: 54,
  },
  name: {
    position: 'absolute',
    bottom: 0,
    lineHeight: 14,
    fontSize: 12,
    color: colors.textColor,
    zIndex: 3,
    maxWidth: '90%',
  },
  imageAvatar: {
    width: 54,
    height: 54,
    borderRadius: 54 / 2,
  },
  iconIsAdmin: {
    width: scaler(32),
    height: scaler(32),
    position: 'absolute',
    bottom: scaler(-5),
    right: scaler(-10),
  },
});

export {AudioLive};
