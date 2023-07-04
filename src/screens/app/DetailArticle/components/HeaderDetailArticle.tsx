import {
  SvgArrowLeft,
  SvgBookMark,
  SvgIconPause,
  SvgIconPlay,
  SvgShare,
} from '@images';
import {goBack} from '@navigation';
import {colors, scaler} from '@stylesCommon';
import React, {useState} from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  scrollY: Animated.Value;
  bookmark: boolean;
  onPressBookmark: () => void;
  onPressShare: () => void;
  onPressPodcast: () => void;
  paused: boolean;
  podcast: boolean;
  isTimeline: boolean;
}

export const HeaderDetailArticle = ({
  scrollY,
  bookmark,
  onPressBookmark,
  onPressShare,
  onPressPodcast,
  paused,
  podcast,
  isTimeline,
}: Props) => {
  const insets = useSafeAreaInsets();
  const marginTop = insets.top * 2 || scaler(32);
  const inputRange = [
    0,
    scaler(158) - marginTop,
    scaler(300) - marginTop,
    scaler(316) - marginTop,
  ];

  const opacitySecond = scrollY.interpolate({
    inputRange: inputRange,
    outputRange: [0, 0, 0, 1],
    extrapolate: 'clamp',
  });

  const indexAnimated = scrollY.interpolate({
    inputRange: inputRange,
    outputRange: [-1, -1, -1, 0],
    extrapolate: 'clamp',
  });

  const handlePressBookmark = () => {
    onPressBookmark();
  };

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
      }}>
      <Animated.View style={{paddingTop: insets.top}}>
        <TouchableOpacity
          style={{
            paddingHorizontal: scaler(20),
            paddingVertical: scaler(10),
            alignSelf: 'flex-start',
          }}
          onPress={() => goBack()}>
          <SvgArrowLeft />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          flex: 1,
          position: 'absolute',
          opacity: opacitySecond,
          backgroundColor: colors.white,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: insets.top,
          justifyContent: 'space-between',
          zIndex: indexAnimated,
        }}>
        <TouchableOpacity
          style={{
            paddingHorizontal: scaler(20),
            paddingVertical: scaler(10),
          }}
          onPress={() => goBack()}>
          <SvgArrowLeft stroke={colors.textColor} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          {!isTimeline && (
            <>
              {podcast && (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: scaler(10),
                    paddingVertical: scaler(10),
                  }}
                  onPress={onPressPodcast}>
                  {paused ? <SvgIconPause /> : <SvgIconPlay />}
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={{
                  paddingHorizontal: scaler(10),
                  paddingVertical: scaler(10),
                }}
                activeOpacity={0.8}
                onPress={handlePressBookmark}>
                <SvgBookMark
                  fill={bookmark ? colors.red50 : 'none'}
                  stroke={bookmark ? colors.red50 : undefined}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingRight: scaler(20),
                  paddingLeft: scaler(10),
                  paddingVertical: scaler(10),
                }}
                onPress={onPressShare}>
                <SvgShare />
              </TouchableOpacity>
            </>
          )}
        </View>
      </Animated.View>
    </View>
  );
};
