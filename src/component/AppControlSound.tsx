/* eslint-disable react-hooks/exhaustive-deps */
import {SvgPause, SvgPlay} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useEffect} from 'react';
import {
  ColorValue,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useVideoController} from './TrackPlayer';
interface Props {
  onPress?: () => void;
  title?: any;
  stylesContainer?: StyleProp<ViewStyle>;
  colorTime?: ColorValue | undefined;
  colorProgress?: ColorValue | undefined;
  colorProgressCurrent?: ColorValue | undefined;
  podcast?: string;
  paused?: boolean;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
  titleTracker?: string;
}

export const AppControlSound = ({
  onPress,
  title = 'Nghe audio',
  titleTracker = '',
  stylesContainer,
  colorTime = '#AE5151',
  colorProgress = colors.pink150,
  colorProgressCurrent = colors.red50,
  podcast,
  paused = true,
  setPaused,
}: Props) => {
  const {progress, duration, playerState, onStart, onPause, onReset} =
    useVideoController({title: titleTracker, podcast});

  const handlePress = () => {
    setPaused(!paused);
    onPress && onPress();
    if (paused) {
      onStart();
    } else {
      onPause();
    }
  };

  useEffect(() => {
    setPaused(!playerState);
  }, [playerState]);

  useEffect(() => {
    return () => {
      onReset();
    };
  }, []);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          padding: scaler(16),
          backgroundColor: colors.yellow100,
          borderRadius: scaler(8),
          alignItems: 'center',
          marginVertical: scaler(20),
        },
        stylesContainer,
      ]}>
      <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
        {!paused ? <SvgPlay /> : <SvgPause />}
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          marginLeft: scaler(16),
          justifyContent: 'space-between',
        }}>
        {!!title && (
          <Text
            style={{
              color: colors.textColor,
              ...stylesCommon.fontWeight600,
              fontSize: scaler(14),
            }}>
            {title}
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // height: '100%',
          }}>
          <View
            style={{
              flex: 1,
              marginRight: scaler(8),
              marginTop: title ? scaler(4) : 0,
              backgroundColor: colorProgress,
            }}>
            <View
              style={{
                height: scaler(4),
                backgroundColor: colorProgressCurrent,
                width: `${Math.round((progress / duration) * 100)}%`,
              }}
            />
          </View>
          <Text
            style={{
              ...stylesCommon.fontWeight500,
              fontSize: scaler(14),
              color: colorTime,
              textAlignVertical: 'center',
            }}>
            {getTime(duration - progress)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const getTime = (t: number) => {
  t = t > 0 ? t : 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t) - m * 60;
  return `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
};
