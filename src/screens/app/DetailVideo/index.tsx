import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
import MediaControls from '../../../lib/react-native-media-controls';
import {heightScreen, scaler, widthScreen} from '@stylesCommon';
import {iconBack} from '@images';
import {postRecordView, postVideoView} from '@services';
import {showMessage} from 'react-native-flash-message';
import {stylesCommon, colors} from '@stylesCommon';
import {trackingAppEvent, event, useUXCam} from '@util';
import {ROUTE_NAME} from '@routeName';
import {AppImage, ViewPayment} from '@component';
import {useDispatch, useSelector} from 'react-redux';
import {EPaymentType} from '@constant';
import {payVideoHome} from '@redux';

const PLAYER_STATES = {
  PLAYING: 0,
  PAUSED: 1,
  ENDED: 2,
};

const DetailVideo = (props: any) => {
  const dispatch = useDispatch();

  const videoPlayer = useRef<any>(null);
  const {route} = props;
  const lang = useSelector((state: any) => state?.auth?.lang);

  const {url, id, title, isRecord, item = {}} = route?.params;
  const navigation = useNavigation<any>();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [isPaid, setIsPaid] = useState<boolean>(true);

  useUXCam(ROUTE_NAME.DETAIL_VIDEO);

  useEffect(() => {
    postAddView();
    trackingAppEvent(event.SCREEN.DETAIL_VIDEO, {});
    const isPayment = item?.is_payment && !item?.is_paid;
    setIsPaid(isPayment);
  }, []);

  const goBack = useCallback(() => {
    setPlayerState(PLAYER_STATES.ENDED);
    navigation.goBack();
  }, []);

  const onSeek = (seek: any) => {
    videoPlayer.current?.seek(seek);
  };

  const onPaused = (playerState: any) => {
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const postAddView = async () => {
    try {
      !!isRecord ? await postRecordView(id) : await postVideoView(id);
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: 'transparent',
      });
    }
  };

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current?.seek(0);
  };

  const onProgress = (data: any) => {
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: any) => {
    setDuration(data?.duration);
    setIsLoading(false);
    if (!isPaid) {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPaused(false);
    }
  };

  const onLoadStart = (data: any) => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onSeeking = (currentTime: any) => setCurrentTime(currentTime);

  const onPay = () => {
    setIsPaid(false);
    setPlayerState(PLAYER_STATES.PLAYING);
    setPaused(false);
    if (!isRecord) {
      dispatch(payVideoHome({id: +id}));
    }
  };

  if (isPaid) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        {item?.thumbnail ? (
          <AppImage uri={item?.thumbnail} style={styles.thumbnail} />
        ) : null}

        <ViewPayment
          isPay={item?.is_payment && !item?.is_paid}
          id={item?.id}
          price={item?.price_vn}
          type={isRecord ? EPaymentType.ROOM_RECORD : EPaymentType.VIDEO}
          onCallBack={onPay}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Video
        source={{uri: url}}
        style={styles.video}
        resizeMode="contain"
        ref={videoPlayer}
        onEnd={onEnd}
        onLoad={onLoad}
        //@ts-ignore
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        volume={10}
        ignoreSilentSwitch="ignore"
      />

      {/* @ts-ignore */}
      <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}></MediaControls>

      <View style={styles.viewHeaderImage}>
        <TouchableOpacity onPress={goBack}>
          <Image source={iconBack} style={styles.iconClose} />
        </TouchableOpacity>
        <View style={styles.viewTxt}>
          <Text style={styles.txtTitle} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <View style={styles.viewRight} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  viewHeaderImage: {
    width: '100%',
    marginTop: getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaler(16),
    alignItems: 'center',
    position: 'absolute',
    top: getStatusBarHeight(),
  },
  iconDowload: {
    tintColor: '#FFFFFF',
    width: 25,
    height: 25,
  },
  iconClose: {
    tintColor: '#FFFFFF',
  },
  video: {
    flex: 1,
  },
  viewTxt: {
    flex: 1,
    borderColor: '#FFFFFF',
    marginHorizontal: scaler(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewRight: {
    width: 25,
    height: 25,
  },
  txtTitle: {
    fontSize: scaler(16),
    ...stylesCommon.fontPlus600,
    color: '#FFFFFF',
  },
  viewDes: {
    flex: 1,
    height: heightScreen,
    paddingTop: scaler(90),
  },
  txtContent: {
    fontSize: scaler(12),
    color: colors.gray100,
    ...stylesCommon.fontWeight400,
    lineHeight: scaler(20),
  },
  thumbnail: {
    width: widthScreen,
    height: scaler(widthScreen * 0.75),
  },
});

export {DetailVideo};
