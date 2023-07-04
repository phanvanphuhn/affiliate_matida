/* eslint-disable react-hooks/exhaustive-deps */
import {LogoApp} from '@images';
import {useCallback, useEffect, useRef} from 'react';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
interface Props {
  onPress?: () => void;
  title?: any;
  podcast?: string;
  artist?: string;
}

export const useVideoController = ({title, podcast, artist}: Props) => {
  const {position: progress, duration} = useProgress();
  const playerState = usePlaybackState() === State.Playing;
  const refTrackNumber = useRef<any>(0);

  const initPlayer = async () => {
    if (!podcast) {
      return;
    }
    // Add a track to the queue
    refTrackNumber.current = await TrackPlayer.add({
      id: 'trackId',
      url: podcast,
      title: title || 'Matida Track',
      artist: artist || 'Matida',
      artwork: LogoApp,
    });
  };

  useEffect(() => {
    initPlayer();
    return () => {
      TrackPlayer.remove(refTrackNumber.current);
    };
  }, [podcast, title]);

  const start = useCallback(async () => {
    if (!podcast) {
      return;
    }
    // Start playing it
    await TrackPlayer.play();
  }, [podcast]);

  useEffect(() => {
    return () => {
      TrackPlayer.remove(0);
    };
  }, []);

  const onStart = () => {
    start();
  };

  const onPause = () => {
    TrackPlayer.pause();
  };

  const onReset = () => {
    TrackPlayer.reset();
  };

  return {
    progress,
    duration,
    playerState,
    onStart,
    onPause,
    onReset,
  };
};
