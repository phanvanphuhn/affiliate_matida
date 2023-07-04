/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Animated} from 'react-native';

import {Dimensions} from 'react-native';
import {colors, scaler} from '@stylesCommon';

const {width, height} = Dimensions.get('window');

export const horizontal = {
  xxSmall: width * 0.0125,
  xSmall: width * 0.025,
  small: width * 0.0375,
  medium: width * 0.05,
  large: width * 0.075,
};

export const vertical = {
  xxSmall: height * 0.0125,
  xSmall: height * 0.025,
  small: height * 0.0375,
  medium: height * 0.05,
  normal: height * 0.065,
  large: height * 0.075,
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
    width: horizontal.small,
    height: horizontal.small,
    borderRadius: scaler(25),
    marginHorizontal: horizontal.xSmall,
  },
  normalDot: {
    height: scaler(6),
    width: scaler(6),
    borderRadius: scaler(6) / 2,
    backgroundColor: colors.brandMainPinkRed,
    marginRight: scaler(4),
  },
});

export const Pagination = ({
  size,
  paginationStyle,
  scrollX,
  windowWidth,
  renderPagination,
  dotStyle,
}: any) => {
  if (renderPagination) {
    return renderPagination(scrollX);
  }
  return (
    <Animated.View style={[styles.container, paginationStyle]}>
      {Array.from({length: size}).map((_, index) => {
        const width = scrollX.interpolate({
          inputRange: [
            windowWidth * (index - 1),
            windowWidth * index,
            windowWidth * (index + 1),
          ],
          outputRange: [scaler(6), scaler(32), scaler(6)],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange: [
            windowWidth * (index - 1),
            windowWidth * index,
            windowWidth * (index + 1),
          ],
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={index}
            style={[styles.normalDot, {width, opacity}, dotStyle]}
          />
        );
      })}
    </Animated.View>
  );
};
Pagination.propTypes = {
  size: PropTypes.number.isRequired,
  paginationIndex: PropTypes.number,
  paginationActiveColor: PropTypes.string,
  paginationDefaultColor: PropTypes.string,
};

Pagination.defaultProps = {
  paginationIndex: 0,
  paginationActiveColor: 'red',
  paginationDefaultColor: 'green',
  paginationStyle: {},
  paginationStyleItem: {},
};
