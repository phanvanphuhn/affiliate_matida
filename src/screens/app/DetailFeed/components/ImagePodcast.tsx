import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, heightScreen, widthScreen} from '@stylesCommon';
import {IDataListFeed} from '../../Feed/type';

interface ImagePodcastProps {
  item: IDataListFeed;
  isPause?: boolean;
}
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useEvent,
  useHandler,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
const AnimatedImage = Animated.createAnimatedComponent(FastImage);
const ImagePodcast = (props: ImagePodcastProps) => {
  const transform = useSharedValue(0);
  const transformStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: interpolate(transform.value, [0, 1], [0, 360]) + 'deg'},
      ],
    };
  });
  useEffect(() => {
    if (!props.isPause) {
      transform.value = withRepeat(
        withTiming(1, {
          duration: 25000,
        }),
        -1,
      );
    } else {
      cancelAnimation(transform);
    }
  }, [props.isPause]);
  return (
    <View style={styles.container}>
      <AnimatedImage
        source={{uri: props.item.image}}
        style={[styles.imgPodcast, transformStyle]}
      />
      <View style={styles.dot} />
    </View>
  );
};

export default ImagePodcast;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgPodcast: {
    width: widthScreen / 1.5,
    height: widthScreen / 1.5,
    borderRadius: widthScreen,
  },
  dot: {
    backgroundColor: colors.white,
    height: 12,
    width: 12,
    borderRadius: 10,
    position: 'absolute',
  },
});
