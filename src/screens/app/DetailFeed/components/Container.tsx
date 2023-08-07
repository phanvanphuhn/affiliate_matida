import React, {useContext, useReducer} from 'react';
import {StyleSheet, View} from 'react-native';
import FooterFeed from './FooterFeed';
import SliderFeed from './SliderFeed';
import {IState} from '../types';
import {IDataListFeed} from '../../Feed/type';
import CommentFeed from './CommentFeed';

interface ContainerProps {
  children: React.ReactNode;
}

interface IState {
  progress?: number;
  feed?: IDataListFeed;
  duration?: number;
  isShowComment?: boolean;
}

interface IVideoContext {
  state: IState;
  setState: (value: IState) => void;
}

const VideoContext = React.createContext<IVideoContext>({
  state: {
    progress: 0,
    duration: 0,
    feed: undefined,
    isShowComment: false,
  },
  setState: (value: IState) => value,
});
export const useVideo = () => useContext(VideoContext);
const Container: React.FC<ContainerProps> = props => {
  const [state, setState] = useReducer(
    (preState: IState, newState: Partial<IState>) => ({
      ...preState,
      ...newState,
    }),
    {
      duration: 0,
      progress: 0,
      feed: undefined,
      isShowComment: false,
    },
    (preState: IState) => ({
      ...preState,
    }),
  );
  return (
    <VideoContext.Provider value={{state, setState}}>
      <View style={styles.container}>
        {props.children}
        <View>
          <SliderFeed
            progress={state.progress || 0}
            duration={state.duration || 0}
          />
        </View>
        {state.isShowComment ? (
          <CommentFeed />
        ) : (
          <View style={{height: 65, zIndex: -1000}}>
            <FooterFeed />
          </View>
        )}
      </View>
    </VideoContext.Provider>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#141414'},
});
