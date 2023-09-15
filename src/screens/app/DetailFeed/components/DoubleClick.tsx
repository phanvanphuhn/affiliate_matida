import React, {useRef} from 'react';
import {
  Alert,
  Image,
  PanResponder,
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {getPlayerStateIcon} from '../../../../lib/react-native-media-controls/src/utils';
import {PLAYER_STATES} from '../../../../lib/react-native-media-controls';
import {useVideo} from './Container';
import {likeFeedApi} from '../../../../services/feed';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {heightScreen} from '@stylesCommon';

interface DoubleClick {
  isShowButtonPlay?: boolean;
  children: React.ReactNode;
  onSingleClick?: () => void;
  playerState?: PLAYER_STATES;
}
const DoubleClick = ({
  children,
  playerState,
  onSingleClick,
  isShowButtonPlay,
}: DoubleClick) => {
  const {state, setState} = useVideo();
  const clickCount = useRef<number>(0);
  const singleClickTimer = useRef<any>();
  const onDoubleTapEvent = async () => {
    try {
      if (!state.feed || state.is_liked) {
        return;
      }
      const res = await likeFeedApi(state.feed?.content_type, state.feed?.id);
      if (res.success) {
        setState({
          is_liked: res.data?.is_liked,
        });
      }
    } catch (error: any) {}
  };
  function handleClicks() {
    clickCount.current++;
    if (clickCount.current === 1) {
      singleClickTimer.current = setTimeout(function () {
        clickCount.current = 0;
        onSingleClick && onSingleClick();
      }, 300);
    } else if (clickCount.current === 2) {
      clearTimeout(singleClickTimer.current);
      clickCount.current = 0;
      onDoubleTapEvent();
    }
  }
  return (
    <TouchableWithoutFeedback onPress={handleClicks}>
      <View style={{flex: 1}}>
        {children}
        {!!isShowButtonPlay && playerState == PLAYER_STATES.PAUSED && (
          <View style={styles.containerPlay}>
            <View style={styles.buttonPlay}>
              <Image source={getPlayerStateIcon(playerState)} />
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
export default React.memo(DoubleClick);
const styles = StyleSheet.create({
  buttonPlay: {
    padding: 10,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F090',
    borderRadius: 50,
  },
  containerPlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
});
