export type ContentTypeFeed =
  | 'podcast'
  | 'article'
  | 'video'
  | 'daily_quizz'
  | 'package_quizz'
  | 'deal';

export interface IDataListFeed
  extends IPackageQuizz,
    IVideoFeed,
    IArticleFeed,
    IDailyQuizz,
    IPodcastFeed {
  content_type: ContentTypeFeed;
  contentid: string;
  created_at: string;
  is_payment: string;
  lang: 'vi';
  price_vn: number;
  id: string;
  rank: number;
  image?: string;
  trimester: string;
  updated_at: string;
  title: string;
  topic: string;
  expert_id?: string;
  expert_name?: string;
  expert_image?: string;
  is_liked?: boolean;
  total_favorites?: number;
  is_favorite?: boolean;
  total_comments?: number;
}

export interface IPodcastFeed {
  audio?: string;
  desc: string;
  durations: number;
  speaker_bio: string;
  speaker_name: string;
  total_views: number;
  durationsString: string;
  url?: string;
}
export interface IDailyQuizz {
  answers: IAnswers[];
  date_show: string;
  is_passed: number;
  package_id?: string;
  question_en: string;
  question_vi: string;
  type: number;
}
export interface IPackageQuizzList {
  answers: IAnswersPackage[];
  id: number;
  is_answered: boolean;
  is_correct: boolean;
  question: string;
}
export interface IArticleFeed {
  content: string;
  is_popular: number;
  is_show: number;
  mood: string;
  podcast: string;
  week: string;
}
export interface IVideoFeed {
  description: string;
  durations: number;
  expert_image?: string;
  expert_name?: string;
  thumbnail?: string;
  thumbnails?: string[];
  durationsString: string;
  views: number;
}
export interface IPackageQuizz {
  badge: IBadge;
  condition: number;
  description_en: string;
  description_vi: string;
  is_active: boolean;
  is_start: boolean;
  maxScore: number;
  milestone: number;
  month: string;
  name_en: string;
  name_vi: string;
  total_questions: number;
  type_condition: number;
}
export interface IBadge {
  condition: number;
  created_at: string;
  id: number;
  image: string;
  name_en: string;
  name_vi: string;
  type: number;
  updated_at: string;
}
export interface IAnswers {
  answer_en: string;
  answer_vi: string;
  created_at: string;
  id: number;
  is_correct: boolean;
  question_id: number;
  updated_at: string;
}
export interface IAnswersPackage {
  answer: string;
  id: number;
  is_correct: boolean;
  selected: boolean;
}

export interface IStateSearchFeed {
  dataAll: IDataListFeed[];
  dataVideo: IDataListFeed[];
  dataPodcast: IDataListFeed[];
  dataArticle: IDataListFeed[];
  currentIndex: number;
  page: number;
  size: number;
  total: number;
  keyword?: string;
  refreshing: boolean;
  isLoading: boolean;
  isLoadMore?: boolean;
}
