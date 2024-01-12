import {AppImage, ViewPayment} from '@component';
import {EContentType, EPaymentType, EVideoType} from '@constant';
import {SvgArrowLeft} from '@images';
import {useNavigation} from '@react-navigation/native';
import {payVideoExplore, payVideoHome} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {
  getRecordRoomDetail,
  getVideoDetail,
  getVideoMasterClassDetail,
  postRecordView,
  postVideoView,
} from '@services';
import {
  colors,
  heightScreen,
  scaler,
  stylesCommon,
  widthScreen,
} from '@stylesCommon';
import {
  event,
  eventType,
  trackingAppEvent,
  useContentView,
  useUXCam,
} from '@util';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import MediaControls from '../../../../lib/react-native-media-controls';
const PLAYER_STATES = {
  PLAYING: 0,
  PAUSED: 1,
  ENDED: 2,
};

const getContentTypeVideo = (type: EVideoType) => {
  switch (type) {
    case EVideoType.RECORD:
      return EContentType.VIDEO_RECORD;
    case EVideoType.MASTER_CLASS:
      return EContentType.VIDEO_MASTER_CLASS;
    default:
      return EContentType.VIDEO;
  }
};
interface ItemVideoProps {
  url: string;
}
const ItemVideo = (props: ItemVideoProps) => {
  const dispatch = useDispatch();

  const videoPlayer = useRef<any>(null);
  const lang = useSelector((state: any) => state?.auth?.lang);

  const navigation = useNavigation<any>();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    return () => {
      setPaused(true);
    };
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

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current?.seek(0);
  };

  const onProgress = (data: any) => {
    if (!loading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: any) => {
    setDuration(data?.duration);
    setLoading(false);
  };

  const onLoadStart = (data: any) => setLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onSeeking = (currentTime: any) => setCurrentTime(currentTime);

  const onPay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    setPaused(false);
  };

  return (
    <>
      <View style={styles.container}>
        {props?.url ? (
          <Video
            source={{uri: props?.url}}
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
        ) : null}

        {/* @ts-ignore */}
        <MediaControls
          duration={duration}
          isLoading={loading}
          mainColor="#333"
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onFullScreen={() => {
            videoPlayer.current.presentFullscreenPlayer();
          }}
          onSeeking={onSeeking}
          playerState={playerState}
          progress={currentTime}
        />
      </View>
    </>
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
    height: heightScreen / 2,
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
  txtDes: {
    fontSize: scaler(13),
    marginTop: scaler(5),
    color: colors.borderColor,
  },
});

export default ItemVideo;
