import {colors} from '@stylesCommon';
import React from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';

const ItemFloatingComment = (props: any) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    fadeIn();

    const tout = setTimeout(() => {
      clearTimeout(tout);
      fadeOut();
    }, 3000);

    return () => fadeOut();
  }, []);

  return (
    <Animated.View
      style={[
        styles.fadingContainer,
        {
          //Bind opacity to animated value
          opacity: fadeAnim,
        },
      ]}>
      <Text style={styles.title}>{props.item.user}</Text>
      <Text style={styles.description}>{props.item.content}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fadingContainer: {
    padding: 20,
    flexDirection: 'row',
  },
  title: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '700',
    marginRight: 12,
  },
  description: {
    fontWeight: '400',
    fontSize: 12,
    color: colors.white,
  },
});

export default ItemFloatingComment;
