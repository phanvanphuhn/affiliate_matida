import {State, TapGestureHandler} from 'react-native-gesture-handler';
import {useRef} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {getPlayerStateIcon} from '../../../../lib/react-native-media-controls/src/utils';
import {PLAYER_STATES} from '../../../../lib/react-native-media-controls';
import {useVideo} from './Container';
import {likeFeedApi} from '../../../../services/feed';
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
  const doubleTapRef = useRef(null);
  const {state, setState} = useVideo();

  const onSingleTapEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onSingleClick && onSingleClick();
    }
  };

  const onDoubleTapEvent = async (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
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
    }
  };

  return (
    <TapGestureHandler
      onHandlerStateChange={onSingleTapEvent}
      waitFor={doubleTapRef}>
      <TapGestureHandler
        ref={doubleTapRef}
        onHandlerStateChange={onDoubleTapEvent}
        numberOfTaps={2}>
        <View style={{flex: 1, zIndex: 999}}>
          {children}
          {!!isShowButtonPlay && playerState == PLAYER_STATES.PAUSED && (
            <View style={styles.containerPlay}>
              <View style={styles.buttonPlay}>
                <Image source={getPlayerStateIcon(playerState)} />
              </View>
            </View>
          )}
        </View>
      </TapGestureHandler>
    </TapGestureHandler>
  );
};
export default DoubleClick;
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
