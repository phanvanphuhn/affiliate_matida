export enum OptionComparison {
  BABY_SIZE = 1,
  EMBRYO = 2,
  MOM = 3,
}

export enum TypeRoom {
  PRIVATE = 1,
  PUBLIC = 2,
}

export enum ETypeHost {
  EXPERT = 1,
  MOM = 2,
}

export enum ERoomStatusType {
  PENDING = 1,
  LIVE = 2,
  ENDED = 3,
}

export enum EStatusShareArticleUser {
  PENDING,
  SENDING,
  DONE,
}

export enum TypeDeepLink {
  ARTICLE = 'article',
  FEED = 'feed',
  ROOM = 'room',
}

export enum OPTION_SHARE {
  COPY,
  NET_WORK,
  USER,
}

export enum OPTION_NOTIFICATION {
  ALL,
  UNREAD,
}

export enum TYPE_LIST_TEST {
  PERIODIC,
  HISTORY,
}

export enum EButtonTest {
  LEFT,
  RIGHT,
}

export enum EPreRoute {
  PERIODIC = 'PERIODIC',
  HISTORY = 'HISTORY',
  TEST_DETAIL = 'TEST_DETAIL',
}

export enum ETypeUser {
  USER = 1,
  EXPERT = 2,
  ADMIN = 3,
}

export enum EDailyQuiz {
  CORRECT,
  FALSE,
}

export enum EPaymentType {
  VIDEO = 3,
  POD_CAST = 2,
  ARTICLE = 1,
  COURSE_MASTER_CLASS = 5,
  VIDEO_MASTER_CLASS = 6,
  ROOM_RECORD = 4,
}

export enum ETypeRedirectBroadcast {
  PODCAST = 1,
  VIDEO = 2,
  ROOM = 3,
  ARTICLE = 4,
  RECORD_ROOM = 5,
}

export enum EVideoType {
  VIDEO,
  RECORD,
  MASTER_CLASS,
}

export enum EChatOption {
  CHAT,
  USER,
}

export enum EContentType {
  ARTICLE = 'article',
  VIDEO = 'video',
  VIDEO_MASTER_CLASS = 'video_master_class',
  VIDEO_RECORD = 'video_record',
  PODCAST = 'podcast',
}

export enum FeedBack {
  HELP = 6,
  TOPIC = 5,
}

export enum ETopicFeedBack {
  MEDICAL_KNOWLEDGE,
  NUTRITION,
  FINANCES,
  MAKING_MONEY,
  SHOPPING_AND_HOT_DEALS,
  RELATIONSHIP,
}

export enum ETabForum {
  ALL_POSTS,
  YOUR_POSTS,
  WEEK_1_TO_13,
  WEEK_14_TO_27,
  WEEK_28_TO_37,
  NUTRITION,
  SHOPPING,
  MENTAL_HEALTH,
  MEDICAL,
  MATIDA_TEAM,
  MATIDA_EXPERTS,
}

export enum TRouteDeepLink {
  REPORT_BIRTH = 'report-birth',
  USER_SETTINGS = 'user-settings',
  TAB_EXPLORE = 'tab-explore',
  TAB_COMMUNITY = 'tab-community',
  TAB_DEAL = 'tab-deal',
  TAB_LIVE_TALK = 'tab-live-talk',
}
