import {IDataListFeed} from '../Feed/type';

export interface IState {
  data: IDataListFeed[];
  page: number;
  size: number;
  total: number;
  refreshing: boolean;
  isLoading: boolean;
  isLoadMore: boolean;
}
