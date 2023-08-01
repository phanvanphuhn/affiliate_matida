import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
//@ts-ignore
import {
  ZegoUIKitPrebuiltCall,
  GROUP_VOICE_CALL_CONFIG,
  //@ts-ignore
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
//@ts-ignore
import {ZegoLayoutMode} from '@zegocloud/zego-uikit-rn';
import {APPID_ZEGO_KEY, APP_SIGN_ZEGO_KEY, useUXCam} from '@util';
import {useNavigation} from '@react-navigation/native';
import {InfoRoom} from './InfoRoom';
import {scaler} from '@stylesCommon';
import {iconThreeDot} from '@images';
import {ModalRaiseHand} from '@component';
import {useDispatch, useSelector} from 'react-redux';
import {leaveRoomMeeting} from '@redux';
import {AppSocket} from '@util';
import {trackingAppEvent, event} from '@util';
import {ROUTE_NAME} from '@routeName';
// import {APPID_ZEGO_KEY, APP_SIGN_ZEGO_KEY} from '@env';

const CallDetail = (props: any) => {
  const {route} = props;
  const {idRoom} = route?.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {getSocket} = AppSocket;
  const socket = getSocket();
  const [showInfo, setShowInfo] = useState(false);
  const [modalRaiseHand, setModalRaiseHand] = useState(false);
  const me = useSelector((state: any) => state?.auth?.userInfo?.id);
  const name = useSelector((state: any) => state?.auth?.userInfo?.name);
  const user = useSelector((state: any) => state?.auth?.userInfo);

  useUXCam(ROUTE_NAME.CALL_DETAIL);

  useEffect(() => {
    socket.emit('joinRoom', {
      roomId: idRoom,
      userId: me,
    });
    socket.emit('add-user', {
      userId: me,
    });
    return () => {
      socket.emit('leaveRoom', {
        roomId: idRoom,
        userId: me,
      });
    };
  }, []);

  const renderRandomID = () => {
    return Math.floor(Math.random() * 100000000).toString();
  };

  const renderIDuser = () => {
    return `${me.toString()}`;
  };

  const renderName = () => {
    return `${name.toString()}`;
  };

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={+APPID_ZEGO_KEY}
        appSign={APP_SIGN_ZEGO_KEY}
        userID={renderIDuser()} // userID can be something like a phone number or the user id on your own user system.
        userName={renderName()}
        callID={`${idRoom}`} // callID can be any unique string.
        config={{
          // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
          ...GROUP_VOICE_CALL_CONFIG,
          onOnlySelfInRoom: () => {},
          onHangUp: () => {
            if (user?.role === 3) {
              navigation.goBack();
            } else {
              dispatch(leaveRoomMeeting(idRoom));
              navigation.goBack();
            }
          },
          turnOnCameraWhenJoining: false,
          turnOnMicrophoneWhenJoining: false,
          useSpeakerWhenJoining: true,
          layout: {
            mode: ZegoLayoutMode.gallery,
            config: {
              addBorderRadiusAndSpacingBetweenView: true,
            },
          },
        }}
      />
      <TouchableOpacity
        style={styles.buttonInfo}
        onPress={() => setShowInfo(true)}>
        <Image source={iconThreeDot} style={styles.iconInfo} />
      </TouchableOpacity>
      {showInfo === true ? (
        <InfoRoom
          onClose={() => setShowInfo(false)}
          onLeaveRoom={() => {
            setShowInfo(false);
            if (user?.role === 3) {
              navigation.goBack();
            } else {
              dispatch(leaveRoomMeeting(idRoom));
              navigation.goBack();
            }
          }}
          onPressRaiseHand={() => {
            setShowInfo(false);
            setModalRaiseHand(true);
          }}
          idRoom={idRoom}
          showInfo={showInfo}
        />
      ) : null}
      <ModalRaiseHand
        visible={modalRaiseHand}
        onConfirm={() => {
          setModalRaiseHand(false);
          socket.emit('raiseHand', {
            roomId: idRoom,
            userId: me,
            userName: name,
          });
        }}
        onCancel={() => setModalRaiseHand(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  buttonInfo: {
    width: scaler(40),
    height: scaler(40),
    borderRadius: scaler(40 / 2),
    backgroundColor: 'rgba(0.4,0.4,0.4, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: scaler(20),
    top: scaler(45),
  },
  iconInfo: {
    width: scaler(20),
    height: scaler(20),
  },
});

export {CallDetail};
