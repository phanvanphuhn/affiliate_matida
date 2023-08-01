export enum Option {
  RECENT,
  POPULAR,
}

export enum Page {
  ARTICLE,
  PODCAST,
  VIDEOS,
}

type IData = {
  data: any[];
  total: number;
  loading: boolean;
};

type IFilterTopic = {
  trimesters: number[];
  topics: number[];
};

type IFilter = {
  option: Option;
  filterTopic: IFilterTopic;
  expert: string;
};

export type ExploreState = {
  articles: IData;
  videos: IData;
  podcasts: IData;
  pageExplore: Page;
  filter: IFilter;
  loadMore: boolean;
};

export const INITIAL_STATE_EXPLORE: ExploreState = {
  articles: {
    data: [],
    total: 0,
    loading: true,
  },
  videos: {
    data: [],
    total: 0,
    loading: true,
  },
  podcasts: {
    data: [],
    total: 0,
    loading: true,
  },
  pageExplore: Page.ARTICLE,
  filter: {
    option: Option.RECENT,
    filterTopic: {
      trimesters: [],
      topics: [],
    },
    expert: '',
  },
  loadMore: true,
};
