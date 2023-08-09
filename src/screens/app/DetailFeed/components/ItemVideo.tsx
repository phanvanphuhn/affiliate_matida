import {colors, heightScreen, widthScreen} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Video, {OnProgressData} from 'react-native-video';
import {PLAYER_STATES} from '../../../../lib/react-native-media-controls';
import {getPlayerStateIcon} from '../../../../lib/react-native-media-controls/src/utils';
import {IDataListFeed} from '../../Feed/type';
import TitleFeed from './TitleFeed';
import {useVideo} from './Container';
import DoubleClick from './DoubleClick';

interface ItemVideoProps {
  item: IDataListFeed;
  isFocused: boolean;
  isPause: boolean;
  isAudio: boolean;
}

const duration = 100;
const ItemVideo = (props: ItemVideoProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [playerState, setPlayerState] = useState<PLAYER_STATES>(
    PLAYER_STATES.PLAYING,
  );
  const {state, setState} = useVideo();
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
      const percent = parseInt(
        String((data.currentTime * 100) / data.seekableDuration),
        10,
      );
      setState({progress: percent, duration});
    }
  };

  const onPause = () => {
    setPlayerState(player =>
      player == PLAYER_STATES.PLAYING
        ? PLAYER_STATES.PAUSED
        : PLAYER_STATES.PLAYING,
    );
  };
  return (
    <DoubleClick
      onSingleClick={onPause}
      playerState={playerState}
      isShowButtonPlay={true}
      onDoubleClick={() => {
        console.log('=>(ItemVideo.tsx:148) onDoubleClick');
      }}>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          {!!props?.isAudio && (
            <ImageBackground
              source={{uri: props.item.thumbnail}}
              blurRadius={5}
              style={styles.imgBackground}>
              <Image
                source={{uri: props.item.thumbnail}}
                style={styles.imgPodcast}
              />
              <View style={styles.dot} />
            </ImageBackground>
          )}
          {!!props.item.url && (
            <Video
              source={{uri: props.item.url}}
              style={styles.video}
              resizeMode="contain"
              // @ts-ignore
              ref={videoPlayer}
              audioOnly={props.isAudio}
              preferredForwardBufferDuration={1}
              poster={props.item.thumbnail}
              playInBackground={props.isAudio}
              reportBandwidth={true}
              onReadyForDisplay={() => {
                setIsLoading(false);
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
          {!!isLoading && state.progress == 0 && (
            <View style={styles.loading}>
              <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
          )}
        </View>

        <TitleFeed item={props.item} />
      </View>
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
    height: heightScreen - 45,
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
    aspectRatio: widthScreen / heightScreen,
    width: widthScreen,
  },
});
