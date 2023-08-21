import {ContentTypeFeed, IDataListFeed} from '../Feed/type';
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
export interface IStateComment {
  data: IDataComment[];
  page: number;
  size: number;
  total: number;
  content: string;
  currentIndex: number;
  refreshing: boolean;
  isOpen: boolean;
  isLoading: boolean;
  isLoadMore: boolean;
}
export interface IStateActionComment {
  data: IDataComment[];
  content: string;
  isOpen: boolean;
  isLoading: boolean;
  isLoadMore: boolean;
}
export interface IUser {
  active: boolean;
  active_code: string;
  apple_id?: string;
  avatar: string;
  baby_name?: string;
  calling_code?: string;
  country_code?: string;
  created_at: string;
  created_room: number;
  current_lang: string;
  date_of_birth?: string;
  deleted_at?: string;
  due_date: string;
  email?: string;
  facebook_id: string;
  id: number;
  is_skip: boolean;
  last_login: boolean;
  login_type: number;
  name: string;
  phone_number?: number;
  pregnant_type: number;
  role: number;
  updated_at: string;
  username: string;
  zalo_id: string;
}
export interface IDataComment {
  content: string;
  created_at: string;
  feed_id: number;
  feed_type: ContentTypeFeed;
  id: number;
  is_liked?: number;
  post_id?: number;
  reply_comments: IDataComment[];
  total_likes: number;
  total_reply_comment: number;
  type_user: number;
  updated_at: string;
  user: IUser;
  user_id: number;
}
