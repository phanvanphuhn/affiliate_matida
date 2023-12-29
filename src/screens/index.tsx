//auth
import {Login} from './auth/Login';
import {Intro} from './auth/Intro';
import {ChangeLanguage} from './auth/ChangeLanguage';
import ChooseDueDateScreen from './auth/DueDate/ChooseDueDate';
import CalculateDueDateScreen from './auth/DueDate/Calculate';
import ResultDueDateScreen from './auth/DueDate/ResultDueDate';
import {ProfileSettingsScreen} from './app/ProfileSettings';
import {Onboarding} from './auth/Onboarding';
import {SlideIntro} from './auth/SlideIntro';

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
import {Forum} from './app/Forum';
import Feed from './app/Feed';
import SearchFeed from './app/Feed/components/SearchFeed';
import DetailFeed from './app/DetailFeed';
import {SelectDOB} from './auth/DueDate/SelectDOB';
import {Question2} from './auth/DueDate/Question2';
import {Question3} from './auth/DueDate/Question3';
import ListDetailPost from './app/Forum/components/ListDetailPost';
import Deal from './app/Deal/Deal';
import DetailDeal from './app/Deal/components/detailDeal';
import NewBornScreen from './app/NewBorn';
import DetailNewBorn from './app/NewBorn/components/DetailNewBorn';
import EditNewBorn from './app/NewBorn/components/EditNewBorn';
import AddBaby from './app/AddBaby';
import AddNewBaby from './app/AddBaby/components/AddNewBaby';
import NewBornTracker from './app/Home/components/NewBornTracker';
import AddBabySuccess from './app/NewBorn/components/AddBabySuccess';
import OnboardingV2 from './auth/OnboardingV2';
import AuthAddBabySuccess from './auth/OnboardingV2/components/AuthAddBabySuccess';
import SourceOfRecommendation from './app/SourceOfRecommendation';
import PregnancyProgram from './app/PregnancyProgram';
import WeeklyChallengeComplete from './app/PregnancyProgram/WeeklyChallengeComplete';
import UpdateInformation from './app/PregnancyProgram/UpdateInformation';
import CompletePayment from './app/PregnancyProgram/CompletePayment';
import OnboardingStep from './app/OnboardingStep';
import DetailTaskProgram from './app/PregnancyProgram/DetailTaskProgram';
import TeaserProgram from './app/PregnancyProgram/TeaserProgram';
import OnboardingFinished from './app/OnboardingStep/OnboardingFinished';
import VerifyPayment from './app/PregnancyProgram/VerifyPayment';
import AboutProgram from './app/PregnancyProgram/AboutProgram';
import MomDiary from './app/PregnancyProgram/MomDiary';
import MyPurchases from './app/MyPurchases';
import FeedbackTask from './app/PregnancyProgram/FeedbackTask';
import FeedbackSuccess from './app/PregnancyProgram/FeedbackSuccess';

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
  SlideIntro,
  Forum,
  Feed,
  DetailFeed,
  SearchFeed,
  SelectDOB,
  Question2,
  Question3,
  ListDetailPost,
  Deal,
  DetailDeal,
  NewBornScreen,
  DetailNewBorn,
  EditNewBorn,
  AddBaby,
  AddNewBaby,
  NewBornTracker,
  AddBabySuccess,
  OnboardingV2,
  AuthAddBabySuccess,
  SourceOfRecommendation,
  PregnancyProgram,
  WeeklyChallengeComplete,
  UpdateInformation,
  CompletePayment,
  OnboardingStep,
  DetailTaskProgram,
  TeaserProgram,
  OnboardingFinished,
  VerifyPayment,
  AboutProgram,
  MomDiary,
  MyPurchases,
  FeedbackTask,
  FeedbackSuccess,
};

export {screens};
