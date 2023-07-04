import {ColorValue} from 'react-native';

export enum Option {
  RECENT,
  POPULAR,
}

export enum Page {
  ARTICLE,
  PODCAST,
  VIDEOS,
}

export type IFilterTopic = {
  trimesters: number[];
  topics: number[];
};
export type IPage = {
  id: number;
  label: string;
  onPress: () => void;
  icon: React.ReactNode;
  value: Page;
  color: ColorValue;
};

export type PropsPage = {
  item: IPage;
  page: Page;
};

export type IOption = {
  id: number;
  label: string;
  value: Option;
};
