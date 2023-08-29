import React, {useContext, useEffect, useReducer} from 'react';
import {StyleSheet, View} from 'react-native';
import FooterFeed from './FooterFeed';
import SliderFeed from './SliderFeed';
import {IDataComment, IStateVideo} from '../types';
import {IDataListFeed} from '../../Feed/type';
import CommentFeed from './CommentFeed';
import KeyboardShift from './KeyboardShift';
import {SIZE_DEFAULT} from '../useDetailFeed';
import {useRoute} from '@react-navigation/native';

interface ContainerProps {
  children: React.ReactNode;
}

interface IState extends IStateVideo {
  progress?: number;
  progressChange?: number;
  feed?: IDataListFeed;
  comment?: IDataComment;
  duration?: number;
  totalComment?: number;
  isShowComment?: boolean;
  is_liked?: boolean;
  is_rated?: boolean;
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
    totalComment: 0,
    feed: undefined,
    comment: undefined,
    isShowComment: false,
    is_liked: false,
    is_rated: false,
    progressStatus: undefined,
    data: [],
    page: undefined,
    size: SIZE_DEFAULT,
    total: 0,
    currentIndex: undefined,
    refreshing: false,
    isOpen: false,
    isLoading: false,
    isLoadMore: undefined,
    isLoadLess: undefined,
  },
  setState: (value: IState) => value,
});
export const useVideo = () => useContext(VideoContext);
const Container: React.FC<ContainerProps> = props => {
  const route = useRoute<any>();

  const [state, setState] = useReducer(
    (preState: IState, newState: Partial<IState>) => {
      console.log('=>(Container.tsx:96) preState', preState);
      console.log('=>(Container.tsx:96) newState', newState);
      return {
        ...preState,
        ...newState,
      };
    },
    {
      duration: 0,
      progress: 0,
      progressChange: 0,
      totalComment: 0,
      feed: undefined,
      comment: undefined,
      progressStatus: undefined,
      isShowComment: false,
      is_liked: false,
      is_rated: false,
      data: [],
      page: undefined,
      size: SIZE_DEFAULT,
      total: 0,
      currentIndex: undefined,
      refreshing: false,
      isOpen: false,
      isLoading: false,
      isLoadMore: undefined,
      isLoadLess: undefined,
    },
    (preState: IState) => ({
      ...preState,
    }),
  );
  console.log('=>(Container.tsx:98) state', state);

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
