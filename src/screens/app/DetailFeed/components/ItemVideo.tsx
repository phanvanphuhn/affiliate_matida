import {colors, heightScreen, widthScreen} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
import {
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
import SliderFeed from './SliderFeed';
import TitleFeed from './TitleFeed';
import {useIsFocused} from '@react-navigation/native';

interface ItemVideoProps {
  item: IDataListFeed;
  isFocused: boolean;
  isPause: boolean;
  isAudio: boolean;
}

const ItemVideo = (props: ItemVideoProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [playerState, setPlayerState] = useState<PLAYER_STATES>(
    PLAYER_STATES.PLAYING,
  );
  const videoPlayer = useRef<Video>();
  useEffect(() => {
    if (!props.isFocused) {
      onReset();
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
      setProgress(percent);
    }
  };

  const onReset = () => {
    videoPlayer.current?.seek(0);

    setProgress(0);
    setPlayerState(PLAYER_STATES.PLAYING);
  };
  const onTooglePlay = () => {
    setIsVisible(!isVisible);
  };
  const onPause = () => {
    setPlayerState(player =>
      player == PLAYER_STATES.PLAYING
        ? PLAYER_STATES.PAUSED
        : PLAYER_STATES.PLAYING,
    );
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        {!!props?.isAudio && (
          <ImageBackground
            source={{uri: props.item.image}}
            blurRadius={5}
            style={styles.imgBackground}>
            <Image source={{uri: props.item.image}} style={styles.imgPodcast} />
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
        <TouchableWithoutFeedback onPress={onTooglePlay}>
          <View style={styles.containerPlay}>
            {(!!isVisible || !!props.isPause) && (
              <TouchableOpacity style={styles.buttonPlay} onPress={onPause}>
                <Image source={getPlayerStateIcon(playerState)} />
              </TouchableOpacity>
            )}
          </View>
        </TouchableWithoutFeedback>
        <SliderFeed progress={progress} duration={100} />
      </View>

      <TitleFeed item={props.item} />
    </View>
  );
};

export default ItemVideo;

const styles = StyleSheet.create({
  buttonPlay: {
    padding: 10,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F090',
    borderRadius: 50,
  },
  containerPlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
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
    width: widthScreen,
    height: heightScreen - 45,
  },
});
