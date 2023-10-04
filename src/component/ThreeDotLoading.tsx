import {colors} from '@stylesCommon';
import React from 'react';
import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';

const SIZE = 7;
const MARGIN = 5;
const BG = 'rgb(172, 172, 172)';
const ACTIVE_BG = '#808184';
const dots = [1, 2, 3];
const INTERVAL = 500;
const ANIMATION_DURATION = 500;
const ANIMATION_SCALE = 1.4;

const Dot = (props: any) => {
  const {active} = props;
  const scale = React.useRef(new Animated.Value(1)).current;

  const scaleDown = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  };

  const scaleUp = () => {
    Animated.timing(scale, {
      toValue: ANIMATION_SCALE,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => {
    if (active) {
      scaleUp();
    } else {
      scaleDown();
    }
  }, [active]);

  const {size, background, activeBackground, dotMargin} = {
    size: SIZE,
    background: BG,
    activeBackground: ACTIVE_BG,
    dotMargin: MARGIN,
  };

  const style = {
    height: size,
    width: size,
    borderRadius: size / 2,
    marginHorizontal: dotMargin,
    backgroundColor: active ? activeBackground : background,
  };

  return <Animated.View style={[style, {transform: [{scale}]}]} />;
};

const ThreeDotLoading = () => {
  const [active, setActive] = React.useState(1);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActive(prevActive => (prevActive > 2 ? 1 : prevActive + 1));
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {dots.map(i => (
        <Dot key={i} active={i === active} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThreeDotLoading;
