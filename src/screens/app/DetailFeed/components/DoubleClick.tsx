import {State, TapGestureHandler} from 'react-native-gesture-handler';
import {useRef} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {getPlayerStateIcon} from '../../../../lib/react-native-media-controls/src/utils';
import {PLAYER_STATES} from '../../../../lib/react-native-media-controls';
interface DoubleClick {
  isShowButtonPlay?: boolean;
  children: React.ReactNode;
  onSingleClick: () => void;
  onDoubleClick: () => void;
  playerState: PLAYER_STATES;
}
const DoubleClick = ({
  children,
  playerState,
  onSingleClick,
  onDoubleClick,
  isShowButtonPlay,
}: DoubleClick) => {
  const doubleTapRef = useRef(null);

  const onSingleTapEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onSingleClick && onSingleClick();
    }
  };

  const onDoubleTapEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onDoubleClick && onDoubleClick();
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
