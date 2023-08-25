import {colors, heightScreen, widthScreen} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video, {OnProgressData} from 'react-native-video';
import {PLAYER_STATES} from '../../../../lib/react-native-media-controls';
import {IDataListFeed} from '../../Feed/type';
import {useVideo} from './Container';
import DoubleClick from './DoubleClick';
import SliderFeed from './SliderFeed';
import TitleFeed from './TitleFeed';

interface ItemVideoProps {
  item: IDataListFeed;
  isFocused: boolean;
  isPause: boolean;
  isAudio: boolean;
}

const duration = 100;
const ItemVideo = (props: ItemVideoProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playerState, setPlayerState] = useState<PLAYER_STATES>(
    PLAYER_STATES.PLAYING,
  );
  const {state, setState} = useVideo();
  // useContentView(
  //   props.item.contentid,
  //   props.item.content_type == 'podcast'
  //     ? EContentType.PODCAST
  //     : EContentType.VIDEO,
  // );
  const videoPlayer = useRef<Video>();
  const onReset = () => {
    videoPlayer.current?.seek(0);

    setState({progress: 0});
    setPlayerState(PLAYER_STATES.PLAYING);
  };
  useEffect(() => {
    if (!props.isFocused) {
      onReset();
    } else {
      setState({feed: props.item});
    }
    return () => {
      onReset();
    };
  }, [props.isFocused]);
  const onEnd = () => {};
  const onProgress = (data: OnProgressData) => {
    if (data.seekableDuration) {
      setProgress(data.currentTime);
      setDuration(data.seekableDuration);
      // setState({progress: data.currentTime, duration: data.seekableDuration});
    }
  };

  const onPause = () => {
    if (state.isShowComment) {
      setState({isShowComment: false});
    } else {
      setPlayerState(player =>
        player == PLAYER_STATES.PLAYING
          ? PLAYER_STATES.PAUSED
          : PLAYER_STATES.PLAYING,
      );
    }
  };
  const onSeek = (value: number) => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current?.seek(value || 0);
  };
  const onSeeking = (value: number) => {
    setPlayerState(PLAYER_STATES.PAUSED);
    setProgress(value);
  };
  const getUrl = () => {
    let url = '';
    switch (props.item.content_type) {
      case 'video':
        url = props.item.url || '';
        break;
      case 'podcast':
        url = props.item.audio || '';
        break;
    }
    return url;
  };
  const getThumbnail = () => {
    let url = '';
    switch (props.item.content_type) {
      case 'video':
        url = props.item.thumbnail || '';
        break;
      case 'podcast':
        url = props.item.image || '';
        break;
    }
    return url;
  };
  return (
    <DoubleClick
      onSingleClick={onPause}
      playerState={playerState}
      isShowButtonPlay={true}>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          {!!props?.isAudio && (
            <ImageBackground
              source={{uri: props.item.image}}
              blurRadius={10}
              style={styles.imgBackground}>
              <View
                style={{
                  backgroundColor: '#00000070',
                  height: '100%',
                  width: '100%',
                  ...StyleSheet.absoluteFillObject,
                }}
              />
              <FastImage
                source={{uri: props.item.image}}
                style={styles.imgPodcast}
              />
              <View style={styles.dot} />
            </ImageBackground>
          )}
          {!!getUrl() && (
            <Video
              source={{uri: getUrl()}}
              style={styles.video}
              resizeMode="contain"
              // @ts-ignore
              ref={videoPlayer}
              audioOnly={props.isAudio}
              preferredForwardBufferDuration={1}
              poster={isVisible && !props.isAudio ? getThumbnail() : undefined}
              playInBackground={props.isAudio}
              reportBandwidth={true}
              onReadyForDisplay={() => {
                setIsLoading(false);
                setIsVisible(false);
              }}
              onLoadStart={() => {
                setIsLoading(true);
              }}
              onBuffer={buffer => {
                setIsLoading(buffer.isBuffering);
              }}
              onEnd={onEnd}
              selectedVideoTrack={{
                type: 'resolution',
                value: '144',
              }}
              onProgress={onProgress}
              repeat={true}
              paused={
                props.isPause ||
                (playerState == PLAYER_STATES.PAUSED && props.isFocused) ||
                !props.isFocused
              }
              volume={10}
            />
          )}
          {!!isLoading && progress == 0 && (
            <View style={styles.loading}>
              <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
          )}
        </View>

        <TitleFeed item={props.item} />
      </View>
      <SliderFeed
        progress={progress || 0}
        duration={duration || 0}
        onSeek={onSeek}
        onSeeking={onSeeking}
      />
    </DoubleClick>
  );
};

export default ItemVideo;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },

  imgPodcast: {
    width: widthScreen / 1.5,
    height: widthScreen / 1.5,
    borderRadius: widthScreen,
  },
  imgBackground: {
    width: widthScreen,
    aspectRatio: Platform.select({
      android: widthScreen / (heightScreen - 33),
      ios: widthScreen / (heightScreen - 71),
    }),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    backgroundColor: colors.white,
    height: 12,
    width: 12,
    borderRadius: 10,
    position: 'absolute',
  },
  container: {
    flex: 1,
  },
  video: {
    aspectRatio: Platform.select({
      android: widthScreen / (heightScreen - 27),
      ios: widthScreen / (heightScreen - 65),
    }),
    width: widthScreen,
    ...StyleSheet.absoluteFillObject,
    top: 45,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
