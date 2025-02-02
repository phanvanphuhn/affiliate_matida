import {useRoute} from '@react-navigation/native';
import React, {useContext, useReducer} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ContentTypeFeed,
  IDataListFeed,
  IPackageQuizzList,
} from '../../Feed/type';
import {IDataComment, IStateVideo} from '../types';
import {SIZE_DEFAULT} from '../useDetailFeed';
import CommentFeed from './CommentFeed';

interface ContainerProps {
  children: React.ReactNode;
}
export interface ListPackage {
  id: string;
  content_type: ContentTypeFeed;
  maxScore: number;
}
interface IState extends IStateVideo {
  progress?: number;
  progressChange?: number;
  feed?: IDataListFeed;
  comment?: IDataComment;
  questions?: IPackageQuizzList[];
  listPackage?: ListPackage[];
  duration?: number;
  totalComment?: number;
  isShowComment?: boolean;
  isGetComment?: boolean;
  is_liked?: boolean;
  total_favorites?: number;
  total_likes?: number;
  is_favorite?: boolean;
  isShowComment?: boolean;
  isShowInput?: boolean;
  progressStatus?: 'SEEKING' | 'DONE';
}

interface IVideoContext {
  state: IState;
  setState: (value: IState) => void;
}

export const VideoContext = React.createContext<IVideoContext>({
  state: {
    progress: 0,
    progressChange: 0,
    duration: 0,
    totalComment: 0,
    total_likes: 0,
    feed: undefined,
    questions: undefined,
    comment: undefined,
    isShowComment: false,
    isGetComment: false,
    is_liked: false,
    is_favorite: false,
    progressStatus: undefined,
    data: [],
    listPackage: [],
    page: undefined,
    size: SIZE_DEFAULT,
    total: 0,
    currentIndex: undefined,
    index: undefined,
    refreshing: false,
    isOpen: false,
    isLoading: false,
    isShowInput: false,
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
      questions: undefined,
      comment: undefined,
      progressStatus: undefined,
      isShowComment: false,
      isGetComment: false,
      is_liked: false,
      is_favorite: false,
      total_favorites: 0,
      total_likes: 0,
      data: [],
      listPackage: [],
      page: undefined,
      size: SIZE_DEFAULT,
      total: 0,
      currentIndex: undefined,
      index: undefined,
      refreshing: false,
      isShowInput: false,
      isOpen: false,
      isLoading: false,
      isLoadMore: undefined,
      isLoadLess: undefined,
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
