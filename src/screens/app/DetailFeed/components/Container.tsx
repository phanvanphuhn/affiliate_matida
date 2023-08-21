import React, {useContext, useReducer} from 'react';
import {StyleSheet, View} from 'react-native';
import FooterFeed from './FooterFeed';
import SliderFeed from './SliderFeed';
import {IState} from '../types';
import {IDataListFeed} from '../../Feed/type';
import CommentFeed from './CommentFeed';
import KeyboardShift from './KeyboardShift';

interface ContainerProps {
  children: React.ReactNode;
}

interface IState {
  progress?: number;
  progressChange?: number;
  feed?: IDataListFeed;
  duration?: number;
  isShowComment?: boolean;
  progressStatus?: 'SEEKING' | 'DONE';
}

interface IVideoContext {
  state: IState;
  setState: (value: IState) => void;
}

const VideoContext = React.createContext<IVideoContext>({
  state: {
    progress: 0,
    progressChange: 0,
    duration: 0,
    feed: undefined,
    isShowComment: false,
    progressStatus: undefined,
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
      progressChange: 0,
      feed: undefined,
      progressStatus: undefined,
      isShowComment: false,
    },
    (preState: IState) => ({
      ...preState,
    }),
  );
  return (
    <VideoContext.Provider value={{state, setState}}>
      <View style={styles.container}>{props.children}</View>
      <CommentFeed />
    </VideoContext.Provider>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#141414', justifyContent: 'flex-end'},
});
