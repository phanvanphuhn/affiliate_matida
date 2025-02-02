type IPost = {
  data: any[];
  total: number;
  loading: boolean;
};

export type IItemTab = {
  id: number;
  created_at: string;
  updated_at: string;
  name_en: string;
  name_vi: string;
  short_code: string;
  ranking: number;
  type: string;
  total: number;
};
export type ForumState = {
  listTab: IItemTab[];
  tab: IItemTab | null;
  forum: any[];
  tabAll: any[];
  loading: boolean;
  loadMore: boolean;
  loadList: boolean;
  total: number;
};

export const INITIAL_STATE_FORUM: ForumState = {
  listTab: [],
  tab: null,
  forum: [],
  tabAll: [],
  loading: true,
  loadMore: true,
  loadList: true,
  total: 0,
};
