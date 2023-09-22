import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {colors} from '@stylesCommon';
import RNSlider from 'react-native-slider';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
let AnimSlider = Animated.createAnimatedComponent(RNSlider);
interface SliderFeedProps {
  onSeek?: (value: number) => void;
  onSeeking?: (value: number) => void;
  progress: number;
  duration: number;
}

const SliderFeed = (props: SliderFeedProps) => {
  const onSeekData = (value: number) => {
    props.onSeek && props.onSeek(value);
  };
  const onSeekingData = (value: number) => {
    props.onSeeking && props.onSeeking(value);
  };
  return (
    <View style={styles.container}>
      <RNSlider
        maximumValue={props.duration}
        value={props.progress}
        trackStyle={[styles.track]}
        thumbStyle={[styles.thumb]}
        style={{height: 20}}
        minimumTrackTintColor={colors.red50}
        maximumTrackTintColor={'#141414'}
        onSlidingComplete={onSeekData}
        onValueChange={onSeekingData}
      />
    </View>
  );
};

export default React.memo(SliderFeed);

const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
    width: '100%',
  },
  thumb: {
    backgroundColor: '#141414',
    borderRadius: 50,
    borderWidth: 2,
    height: 12,
    width: 12,
    borderColor: colors.red50,
  },
  track: {
    height: 3,
    borderRadius: 2,
  },
});
