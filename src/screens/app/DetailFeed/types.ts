import {IDataListFeed} from '../Feed/type';
export interface IDetailParams {
  index: number;
  currentPage: number;
}
export interface IStateVideo {
  data: IDataListFeed[];
  page: number;
  size: number;
  total: number;
  currentIndex: number;
  refreshing: boolean;
  isOpen: boolean;
  isLoading: boolean;
  isLoadMore: boolean;
}

export interface IDataComment {
  name: string;
  avatarUrl: string;
  comment: string;
  likeCount: number;
  commentCount: number;
}
