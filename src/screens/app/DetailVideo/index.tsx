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
import {event, eventType, trackingAppEvent, useContentView, useUXCam} from '@util';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import MediaControls from '../../../lib/react-native-media-controls';
import {TextDescriptionVideo} from './component';
import {trackRecordedLivestream} from '@services/webengageManager.tsx';
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

const DetailVideo = (props: any) => {
  const dispatch = useDispatch();

  const videoPlayer = useRef<any>(null);
  const {route} = props;
  const lang = useSelector((state: any) => state?.auth?.lang);

  const {id, type} = route?.params;
  const navigation = useNavigation<any>();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [data, setData] = useState<any>({});

  useUXCam(ROUTE_NAME.DETAIL_VIDEO);

  useContentView(id, getContentTypeVideo(type));

  const isPayment = data?.is_payment && !data?.is_paid;

  useEffect(() => {
    getData();
    postAddView();
    trackingAppEvent(event.SCREEN.DETAIL_VIDEO, {}, eventType.AFF_FLYER);
    return () => {
      setPaused(true);
    };
  }, []);

  const getData = async () => {
    try {
      const res = await getSwitchVideo();
      setData(res?.data);
      trackRecordedLivestream(res?.data?.title_en);
    } catch (e) {
      console.log('e');
    }
  };

  const getSwitchVideo = async () => {
    try {
      switch (type) {
        case EVideoType.VIDEO:
          return await getVideoDetail(id);
        case EVideoType.RECORD:
          return await getRecordRoomDetail(id);
        case EVideoType.MASTER_CLASS:
          return await getVideoMasterClassDetail(id);
        default:
          return new Error('Error type video!');
      }
    } catch (e) {}
  };

  const postAddView = async () => {
    try {
      switch (type) {
        case EVideoType.VIDEO:
          await postVideoView(id);
          break;
        case EVideoType.RECORD:
          await postRecordView(id);
          break;
        default:
          break;
      }
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: 'transparent',
      });
    }
  };

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
    if (!isPayment) {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPaused(false);
    }
  };

  const onLoadStart = (data: any) => setLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onSeeking = (currentTime: any) => setCurrentTime(currentTime);

  const onPay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    setPaused(false);
    if (type === EVideoType.VIDEO) {
      dispatch(payVideoHome({id: +id}));
      dispatch(payVideoExplore({id: +id}));
    }
  };

  const getURLVideo = () => {
    switch (type) {
      case EVideoType.VIDEO:
        return data?.url;
      case EVideoType.RECORD:
        return data?.link;
      case EVideoType.MASTER_CLASS:
        return lang === 2 ? data?.url_vn : data?.url_en;
      default:
        return null;
    }
  };

  const getTypePaymentVideo = () => {
    switch (type) {
      case EVideoType.RECORD:
        return EPaymentType.ROOM_RECORD;
      case EVideoType.MASTER_CLASS:
        return EPaymentType.VIDEO_MASTER_CLASS;
      default:
        return EPaymentType.VIDEO;
    }
  };

  const getTitleVideo = () => {
    switch (type) {
      case EVideoType.VIDEO:
        return data?.title;
      case EVideoType.MASTER_CLASS:
      case EVideoType.RECORD:
        return lang === 2 ? data?.title_vn : data?.title_en;
      default:
        return '';
    }
  };

  const getDescriptionVideo = () => {
    switch (type) {
      case EVideoType.VIDEO:
        return data?.description;
      case EVideoType.MASTER_CLASS:
      case EVideoType.RECORD:
        return lang === 2 ? data?.description_vn : data?.description_en;
      default:
        return '';
    }
  };

  const titleVideo = getTitleVideo();

  if (isPayment) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        {data?.thumbnail ? (
          <AppImage uri={data?.thumbnail} style={styles.thumbnail} />
        ) : null}

        <ViewPayment
          isPay={data?.is_payment && !data?.is_paid}
          id={data?.id}
          price={data?.price_vn}
          type={getTypePaymentVideo()}
          onCallBack={onPay}
        />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        {getURLVideo() ? (
          <Video
            source={{uri: getURLVideo()}}
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
          onSeeking={onSeeking}
          playerState={playerState}
          progress={currentTime}
        />
        {getDescriptionVideo()?.length > 0 && paused ? (
          <View
            style={{
              position: 'absolute',
              bottom: scaler(40),
              left: 0,
              right: 0,
              paddingHorizontal: scaler(20),
              maxHeight: scaler(200),
            }}>
            <TextDescriptionVideo
              title={titleVideo}
              text={getDescriptionVideo()}
            />
          </View>
        ) : null}

        <View style={styles.viewHeaderImage}>
          <TouchableOpacity onPress={goBack}>
            <SvgArrowLeft />
          </TouchableOpacity>
          <View style={styles.viewTxt}>
            <Text style={styles.txtTitle} numberOfLines={1}>
              {titleVideo}
            </Text>
          </View>
          <View style={styles.viewRight} />
        </View>
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

export {DetailVideo};
