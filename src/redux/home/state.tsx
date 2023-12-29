type IData = {
  articles: any[];
  videos: any[];
  posts: any[];
  babyProgress: any | undefined;
  quote: any | undefined;
  user: any;
  podcast: any[];
  rooms: any[];
  dailyQuizz: any | undefined;
  masterClasses: any[];
};

const initData: IData = {
  articles: [],
  videos: [],
  posts: [],
  babyProgress: {},
  quote: {},
  user: {},
  podcast: [],
  rooms: [],
  dailyQuizz: {},
  masterClasses: [],
};

export type HomeState = {
  data: IData;
  weekPregnant: {weeks: number; days: number};
  week: number;
  weekUserTask: number;
  loading: boolean;
};

export const INITIAL_STATE_HOME: HomeState = {
  data: initData,
  weekPregnant: {weeks: 1, days: 1},
  week: 1,
  weekUserTask: 4,
  loading: true,
};
