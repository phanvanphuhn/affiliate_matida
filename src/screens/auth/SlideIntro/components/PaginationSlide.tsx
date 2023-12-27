import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {ITEM_WIDTH_SLIDE_INTRO} from '../SlideIntro';
import {PaginationSlideProps} from '../SlideIntro.props';

export const PaginationSlide = ({size, scrollX}: PaginationSlideProps) => {
  return (
    <Animated.View style={[styles.container]}>
      {Array.from({length: size}).map((_, index) => {
        const width = scrollX.interpolate({
          inputRange: [
            ITEM_WIDTH_SLIDE_INTRO * (index - 1),
            ITEM_WIDTH_SLIDE_INTRO * index,
            ITEM_WIDTH_SLIDE_INTRO * (index + 1),
          ],
          outputRange: [scaler(10), scaler(48), scaler(10)],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange: [
            ITEM_WIDTH_SLIDE_INTRO * (index - 1),
            ITEM_WIDTH_SLIDE_INTRO * index,
            ITEM_WIDTH_SLIDE_INTRO * (index + 1),
          ],
          outputRange: [1, 1, 1],
          extrapolate: 'clamp',
        });
        const backgroundColor = scrollX.interpolate({
          inputRange: [
            ITEM_WIDTH_SLIDE_INTRO * (index - 1),
            ITEM_WIDTH_SLIDE_INTRO * index,
            ITEM_WIDTH_SLIDE_INTRO * (index + 1),
          ],
          outputRange: ['#D0D1D9', colors.pink4, '#D0D1D9'],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.normalDot,
              {
                // width,
                backgroundColor: backgroundColor,
                opacity,
              },
            ]}
          />
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scaler(40),
  },
  normalDot: {
    height: scaler(10),
    width: scaler(10),
    borderRadius: scaler(10) / 2,
    backgroundColor: colors.gray400,
    marginRight: scaler(8),
  },
});
