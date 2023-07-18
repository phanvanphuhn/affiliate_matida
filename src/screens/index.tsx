//auth
import {Login} from './auth/Login';
import {Intro} from './auth/Intro';
import {ChangeLanguage} from './auth/ChangeLanguage';
import ChooseDueDateScreen from './auth/DueDate/ChooseDueDate';
import CalculateDueDateScreen from './auth/DueDate/Calculate';
import ResultDueDateScreen from './auth/DueDate/ResultDueDate';
import {ProfileSettingsScreen} from './app/ProfileSettings';

import {Home} from './app/Home';
import {Explore} from './app/Explore';
import {LiveTalk} from './app/LiveTalk';
import {Community} from './app/Community';
import ChooseDueDateScreenApp from './app/DueDate/ChooseDueDate';
import CalculateDueDateScreenApp from './app/DueDate/Calculate';
import ResultDueDateScreenApp from './app/DueDate/ResultDueDate';

import {DailyReadsScreen} from './app/DailyReads';
import {SizeComparison} from './app/SizeComparison';
import {VideoList} from './app/VideoList';
import {TimeLine} from './app/TimeLine';
import {WeeklyArticles} from './app/WeeklyArticles';
import {NewFeed} from './app/NewFeed';
import {DetailNewFeed} from './app/DetailNewFeed';
import {DetailArticle} from './app/DetailArticle';
import {DetailVideo} from './app/DetailVideo';
import {MyNewFeed} from './app/MyNewFeed';
import {ChangeLanguageAuth} from './app/ChangeLanguageAuth';
import {Setting} from './app/Setting';
import {CreateNewPost} from './app/CreateNewPost';
import {NotificationList} from './app/NotificationList';
import {ListPodcast} from './app/ListPodcast';
import {DetailPodCast} from './app/DetailPodCast';
import {SaveArticles} from './app/SaveArticles';
import {MyNewFeedSetting} from './app/MyNewFeedSetting';
import {EditPost} from './app/EditNewFeed';
import {PrivacyPolicy} from './app/PrivacyPolicy';
import {BlockUser} from './app/BlockUser';
import {DetaiUser} from './app/DetailUser';
import {ListMessage} from './app/ListMessage';
import {DetailChat} from './app/DetailChat';
import {CallDetail} from './app/CallDetail';
import {AllMeetingRoom} from './app/AllMeetingRoom';
import {CreateRoom} from './app/CreateRoom';
import {DetailMeetingRoom} from './app/DetailMeetingRoom';
import {EditRoom} from './app/EditRoom';
import {DatePickerScreen} from './app/DatePickerScreen';
import {LiveStreamDetail} from './app/LiveStreamDetail';
import {ChatGPT} from './app/ChatGPT';
import {AudioLive} from './app/AudioLive';
import {MomPrepTest, TestDetail, TestResult} from './app/MomTest';
import {ListRecord} from './app/ListRecord';
import {MasterClass} from './app/MasterClass';
import {ListMasterClass} from './app/ListMasterClass';
import {Onboarding} from './auth/Onboarding';

//Nhóm các màn hình vào 1 file index
const screens = {
  Intro,
  Login,
  ChangeLanguage,
  ChooseDueDateScreen,
  CalculateDueDateScreen,
  ResultDueDateScreen,
  ProfileSettingsScreen,
  Home,
  Explore,
  LiveTalk,
  ChooseDueDateScreenApp,
  CalculateDueDateScreenApp,
  ResultDueDateScreenApp,
  DailyReadsScreen,
  SizeComparison,
  VideoList,
  TimeLine,
  WeeklyArticles,
  NewFeed,
  DetailNewFeed,
  DetailArticle,
  DetailVideo,
  MyNewFeed,
  ChangeLanguageAuth,
  Setting,
  CreateNewPost,
  NotificationList,
  ListPodcast,
  DetailPodCast,
  SaveArticles,
  Community,
  MyNewFeedSetting,
  PrivacyPolicy,
  EditPost,
  BlockUser,
  DetaiUser,
  ListMessage,
  DetailChat,
  CallDetail,
  AllMeetingRoom,
  CreateRoom,
  EditRoom,
  DetailMeetingRoom,
  DatePickerScreen,
  LiveStreamDetail,
  ChatGPT,
  AudioLive,
  MomPrepTest,
  TestDetail,
  TestResult,
  ListRecord,
  MasterClass,
  ListMasterClass,
  Onboarding,
};

export {screens};
