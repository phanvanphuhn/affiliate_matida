import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Video, {OnProgressData} from 'react-native-video';
import {IDataListFeed} from '../../Feed/type';
import {colors, heightScreen, widthScreen} from '@stylesCommon';
import TitleFeed from './TitleFeed';
import SliderFeed from './SliderFeed';
import {getPlayerStateIcon} from '../../../../lib/react-native-media-controls/src/utils';
import {PLAYER_STATES} from '../../../../lib/react-native-media-controls';
import {duration} from './ItemPodcast';

interface ItemVideoProps {
  item: IDataListFeed;
  onNext: () => void;
  isFocused: boolean;
  isAudio: boolean;
}

const ItemVideo = (props: ItemVideoProps) => {
  const [progress, setProgress] = useState<number>(0);
  console.log('=>(ItemVideo.tsx:20) progress', progress);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [playerState, setPlayerState] = useState<PLAYER_STATES>(
    PLAYER_STATES.PLAYING,
  );
  const videoPlayer = useRef<Video>();
  useEffect(() => {
    if (props.isFocused) {
    } else {
      videoPlayer.current?.seek(0);
      setProgress(0);
      setPlayerState(PLAYER_STATES.PLAYING);
    }
    return () => {
      setProgress(0);
    };
  }, [props.isFocused]);
  const onEnd = () => {
    onReset();
  };
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
            style={{
              width: widthScreen,
              height: heightScreen - 65,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{uri: props.item.image}}
              style={{
                width: widthScreen / 1.5,
                height: widthScreen / 1.5,
                borderRadius: widthScreen,
              }}
            />
            <View
              style={{
                backgroundColor: colors.white,
                height: 12,
                width: 12,
                borderRadius: 10,
                position: 'absolute',
              }}
            />
          </ImageBackground>
        )}
        {!!props.item.url && (
          <Video
            source={{uri: props.item.url}}
            style={styles.video}
            resizeMode="contain"
            ref={videoPlayer}
            audioOnly={props.isAudio}
            onEnd={onEnd}
            onProgress={onProgress}
            paused={
              (playerState == PLAYER_STATES.PAUSED && props.isFocused) ||
              !props.isFocused
            }
            volume={10}
            ignoreSilentSwitch="ignore"
          />
        )}
        <TouchableOpacity
          onPress={onTooglePlay}
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
          }}>
          <View>
            {isVisible && (
              <TouchableOpacity
                style={{
                  padding: 10,
                  width: 45,
                  height: 45,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F0F0F060',
                  borderRadius: 50,
                }}
                onPress={onPause}>
                <Image source={getPlayerStateIcon(playerState)} />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
        <SliderFeed progress={progress} duration={100} />
      </View>

      <TitleFeed item={props.item} />
    </View>
  );
};

export default ItemVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: widthScreen,
    height: heightScreen - 100,
  },
});
