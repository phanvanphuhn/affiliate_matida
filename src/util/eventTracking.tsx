export const event = {
  TAB: {
    CLICK_TAB_HOME: 'CLICK_TAB_HOME',
    CLICK_TAB_EXPLORE: 'CLICK_TAB_EXPLORE',
    CLICK_TAB_FEED: 'CLICK_TAB_FEED',
    CLICK_TAB_COMMUNITY: 'CLICK_TAB_COMMUNITY',
    CLICK_TAB_LIVE_TALKS: 'CLICK_TAB_LIVE_TALKS',
    CLICK_TAB_DEAL: 'CLICK_TAB_DEAL',
    CLICK_TAB_MASTERCLASS: 'CLICK_TAB_MASTERCLASS',
  },
  AUTH: {
    CLICK_SIGN_UP: 'signup',
    CLICK_SIGN_UP_SUCCESS: 'complete_registration',
    CLICK_LOGIN: 'login',
  },
  LIVE_ROOM: {
    CLICK_CREATE_NEW_ROOM: 'click_create_room',
    CLICK_CREATE_NEW_ROOM_SUCCESS: 'click_complete_create_room',
  },
  EXPLORE: {
    CLICK_EXPLORE: 'click_filter',
  },
  SCREEN: {
    INTRO: 'screen_intro',
    LOGIN: 'screen_login',
    SIGN_UP: 'screen_signUp',
    CHANGE_LANGUAGE: 'screen_change_language',
    CHOOSE_DUE_DATE: 'screen_choose_due_date',
    CALCULATE_DUE_DATE: 'screen_calculate_due_date',
    RESULT_DUE_DATE: 'screen_result_due_date',

    PROFILE_SETTINGS: 'screen_profile_setting',
    HOME: 'screen_home',
    WEEKLY_ARTICLES: 'screen_weekly_articles',
    DETAIL_ARTICLE: 'screen_detail_articles',
    SIZE_COMPARISON: 'screen_size_comparison',
    DAILY_READS: 'screen_daily_reads',
    VIDEO_LIST: 'screen_video_list',
    TIME_LINE: 'screen_important_dates_of_your_pregnancy',
    NEW_FEED: 'screen_list_post',
    DETAIL_NEWFEED: 'screen_detail_post',
    DETAIL_VIDEO: 'screen_detail_video',
    MY_NEWFEED: 'screen_my_post',
    SETTING_SCREEN: 'screen_setting_screen',
    CREATE_NEWPOST: 'screen_create_post',
    LIST_PODCAST: 'screen_list_podcast',
    DETAIL_PODCAST: 'screen_detail_podcast',
    EDIT_POST: 'screen_edit_post',
    LIST_BLOCKED_USER: 'screen_list_blocked_user',
    DETAIL_USER: 'screen_detail_user',
    CHAT_GPT: 'screen_chatGPT',
    NOTIFICATION_LIST: 'screen_notification_list',
    SAVED_ARTICLES: 'screen_saved_articles',
    MY_NEWFEED_SETTING: 'screen_my_newfeed_setting',
    PRIVACY_POLICY: 'screen_privacy_policy',
    LIST_MESSAGE: 'screen_list_message',
    DETAIL_CHAT: 'screen_detail_chat',
    CALL_DETAIL: 'screen_call_detail',
    ALL_MEETING_ROOM: 'screen_list_meeting',
    CREATE_ROOM: 'screen_create_room_meeting',
    EDIT_ROOM: 'screen_intro',
    DETAIL_MEETING_ROOM: 'screen_detail_meeting',
    DATE_PICKER_SCREEN: 'screen_date_picker',
    LIVE_STREAM: 'screen_live_stream',
    AUDIO_LIVE: 'screen_audio_live',
    MOM_PREP_TEST: 'screen_mom_prep_test',
    TEST_DETAIL: 'screen_test_detail',
    TEST_RESULT: 'screen_test_result',
    LIST_RECORD: 'screen_list_record',
    MASTER_CLASS: 'screen_master_class_detail',
    LIST_MASTER_CLASS: 'screen_list_master_class',
  },
  FORUM: {
    LIKE: 'post_liked',
    COMMENT: 'post_commented',
    CREATE_NEW_POST_BUTTON: 'post_create_new_post_button',
    REPLY: 'post_reply',
    CREATE_NEW_POST_PAGE: 'post_create_new_post_page',
    POST_IN_FORUM: 'post_in_forum',
    POST_ANONYMOUSLY: 'post_click_post_anonymously',
    CLICK_SEE_MORE: 'forum_click_see_more_',
  },
  TIDA: {
    TIDA_OPEN: 'tida_open',
    TIDA_ASK: 'tida_ask_questions',
    TIDA_OPEN_HOMEPAGE: 'tida_ask_homepage_button',
  },
  BABY_TRACKER: {
    BABY_TRACKER_OPEN: 'baby_tracker_open',
    BABY_TRACKER_FORUM_SECTION: 'baby_tracker_forum_section',
    BABY_TRACKER_CHANGE_WEEK: 'baby_tracker_change_week',
    DAILY_QUIZ: 'daily_quiz',
    PODCAST_SCROLL: 'podcast_scroll',
    VIDEO_SCROLL: 'video_scroll',
    ARTICLE_SCROLL: 'article_scroll',
    CHANGE_TO_CALENDAR: 'click_tab_calendar',
    OPEN_ARTICLE: 'open_calendar_article',
    CLICK_POST_FORUM: 'tida_click_post_in_forum',
  },
  MOM_TEST: {
    START: 'MOM_TEST_START',
    DO: 'MOM_DO_DAILY_QUIZ',
  },
  SYSTEM: {
    START: 'APP_LAUNCH',
    LOG_OUT: 'LOG_OUT',
  },
  BRANCH: {
    CLICK_DEEPLINK: 'CLICK_DEEPLINK',
    INSTALL_APP: 'INSTALL _APP',
    LOGIN: 'LOGIN',
    SIGNUP: 'SIGNUP',
    SIGN_OUT: 'SIGN_OUT',
    CLICK_LOGIN: 'CLICK_LOGIN',
    CLICK_SIGN_UP_SUCCESS: 'CLICK_SIGN_UP_SUCCESS',
    CLICK_SIGN_UP_ZALO: 'CLICK_SIGN_UP_ZALO',
    CLICK_SIGN_UP_FB: 'CLICK_SIGN_UP_FB',
    CLICK_SIGN_UP_APPLE: 'CLICK_SIGN_UP_APPLE',
  },
  LOGIN: {
    FACEBOOK: 'login_with_facebook',
    ZALO: 'login_with_zalo',
    APPLE: 'login_with_apple',
    PHONE_NUMBER: 'login_with_phone_number',
    SELECT_DUE_DATE: 'onboarding_select_due_date',
    CONTINUE: 'onboarding_tell_me_more',
    SKIP: 'onboarding_click_skip',
  },
  FEED: {
    SCROLL: 'feed_scroll',
    FEED_COMMENT_PODCAST: 'feed_comment_podcast',
    FEED_COMMENT_VIDEO: 'feed_comment_video',
    FEED_COMMENT_ARTICLE: 'feed_comment_article',
    FEED_LIKE_PODCAST: 'feed_like_podcast',
    FEED_LIKE_VIDEO: 'feed_like_video',
    FEED_LIKE_ARTICLE: 'feed_like_article',
    FEED_DAILY_QUIZ: 'feed_daily_quiz',
    FEED_MOM_TEST: 'feed_mom_test',
    FEED_FINISH_QUIZ: 'feed_finish_quiz',
    FEED_DO_MOMTEST: 'feed_do_momtest',
  },
  DEAL: {
    CLICK_DEAL: 'click_deal',
    CLICK_BUTTON_GET_DEAL: 'click_button_get_deal',
    CLICK_BUTTON_COPY_CODE: 'click_button_copy_code',
    CLICK_BUTTON_CANCEL: 'click_button_cancel',
  },
  NEW_BORN: {
    NEW_BORN_HOMEPAGE_CHANGE_TIME: 'NEW_BORN_HOMEPAGE_CHANGE_TIME',
    NEW_BORN_HOMEPAGE_CHANGE_BABY: 'NEW_BORN_HOMEPAGE_CHANGE_BABY',
    NEW_BORN_CLICK_VIEW_MORE: 'NEW_BORN_CLICK_VIEW_MORE',
    SETTING_ADD_NEW_BABY: 'SETTING_ADD_NEW_BABY',
    CLICK_REPORT_BIRTH: 'CLICK_REPORT_BIRTH',
    REPORT_BIRTH_HAS_YOUR_BABY_BORN: 'REPORT_BIRTH_HAS_YOUR_BABY_BORN',
    REPORT_BIRTH_BIRTH_DAY: 'REPORT_BIRTH_BIRTH_DAY',
    REPORT_BIRTH_BIRTH_TIME: 'REPORT_BIRTH_BIRTH_TIME',
    REPORT_BIRTH_BABY_NAME: 'REPORT_BIRTH_BABY_NAME',
    REPORT_BIRTH_BABY_GENDER: 'REPORT_BIRTH_BABY_GENDER',
    REPORT_BIRTH_BIRTH_METHOD: 'REPORT_BIRTH_BIRTH_METHOD',
    REPORT_BIRTH_BIRTH_WEIGHT: 'REPORT_BIRTH_BIRTH_WEIGHT',
    REPORT_BIRTH_BIRTH_HEIGHT: 'REPORT_BIRTH_BIRTH_HEIGHT',
    REPORT_BIRTH_DONE_TELL_ME_MORE: 'REPORT_BIRTH_DONE_TELL_ME_MORE',
  },
  TEASER: {
    PP_TEASER_ACCEPT_INVITATION: 'PP_TEASER_ACCEPT_INVITATION',
  },
  WEBENGAGE: {
    USER_SIGN_UP: 'USER_SIGNED_UP',
  },
  MASTER_CLASS: {
    USER_FINISH_ONBOARDING_QUESTIONS: 'USER_FINISH_ONBOARDING_QUESTIONS',
    USER_PURCHASED_MASTERCLASS: 'USER_PURCHASED_MASTERCLASS',
    PP_QUESTION: 'PP_QUESTION_',
    PP_LET_WORK_ON_IT_TOGETHER: 'PP_LET_WORK_ON_IT_TOGETHER',
    PP_TEASER_SIGNUP_BUTTON: 'PP_TEASER_SIGNUP_BUTTON',
    PP_TEASER_SCROLL: 'PP_TEASER_SCROLL',
    PP_USER_INFO_NEXT: 'PP_USER_INFO_NEXT',
    PP_PAYMENT_INFO_DOWNLOAD_QR: 'PP_PAYMENT_INFO_DOWNLOAD_QR',
    PP_PAYMENT_INFO_COPY_TRANSACTION_CONTENT:
      'PP_PAYMENT_INFO_COPY_TRANSACTION_CONTENT',
    PP_PAYMENT_INFO_COPY_PRICE: 'PP_PAYMENT_INFO_COPY_PRICE',
    PP_PAYMENT_INFO_COPY_BANK_NUMBER: 'PP_PAYMENT_INFO_COPY_BANK_NUMBER',
    PP_PAYMENT_INFO_I_HAVE_TRANSFERED_MY_PAYMENT:
      'PP_PAYMENT_INFO_I_HAVE_TRANSFERED_MY_PAYMENT',
  },
};
