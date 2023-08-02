import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors} from '@stylesCommon';
import RNSlider from 'react-native-slider';

interface SliderFeedProps {
  progress: number;
  duration: number;
}

const SliderFeed = (props: SliderFeedProps) => {
  return (
    <View style={{position: 'absolute', bottom: -13, width: '100%'}}>
      <RNSlider
        maximumValue={props.duration}
        value={props.progress}
        trackStyle={[styles.track]}
        thumbStyle={[styles.thumb]}
        minimumTrackTintColor={colors.red50}
        maximumTrackTintColor={'#141414'}
      />
    </View>
  );
};

export default SliderFeed;

const styles = StyleSheet.create({
  container: {},
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
