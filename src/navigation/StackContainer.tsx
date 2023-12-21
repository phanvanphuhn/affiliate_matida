/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {saveIsReview} from '@redux';
import {AppSocket} from '@util';
import * as React from 'react';
import {Alert, DevSettings, Platform} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import InAppReview from 'react-native-in-app-review';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {screens} from '../screens';
import {linking} from './Linking';
import {ROUTE_NAME} from './routeName';
import StackTab from './StackTab';
import UpdateInformation from '../screens/app/PregnancyProgram/UpdateInformation';
import Onboarding from '../screens/app/./OnboardingStep';
import VerifyPayment from '../screens/app/PregnancyProgram/VerifyPayment';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import RNRestart from 'react-native-restart';
import {useTranslation} from 'react-i18next';

let {init, endConnect} = AppSocket;
const Stack = createNativeStackNavigator();

const NavigationApp = React.forwardRef((props: any, ref: any) => {
  const screenOptions = {
    headerShown: false,
  };
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const {t} = useTranslation();

  const lang = useSelector((state: any) => state?.auth?.lang);
  const isLogin: any = useSelector((state: any) => state?.auth?.statusLogin);
  let token = useSelector((state: any) => state?.auth?.token);
  const isDoneDaily = useSelector(
    (state: RootState) => state?.auth?.isDoneDaily,
  );
  const isSeenComment = useSelector(
    (state: RootState) => state?.auth?.isSeenComment,
  );
  const isReview = useSelector((state: RootState) => state?.auth?.isReview);

  const tryAgainPress = () => {
    if (__DEV__) {
      DevSettings.reload();
    }
    RNRestart.Restart();
  };

  const noInternetAlert = () =>
    Alert.alert(t('common.networkSystem'), t('common.noInternet') as string, [
      {text: t('common.tryAgain') as string, onPress: tryAgainPress},
    ]);

  React.useEffect(() => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        noInternetAlert();
      }
    });
  }, [netInfo]);

  React.useEffect(() => {
    if (token) {
      init(token);
      return () => {
        endConnect();
      };
    }
  }, [token]);

  React.useEffect(() => {
    if (
      ((!!isDoneDaily && !isSeenComment) ||
        (!isDoneDaily && !!isSeenComment)) &&
      !isReview &&
      Platform.OS === 'android'
    ) {
      if (isSeenComment) {
        setTimeout(() => {
          InAppReview.isAvailable() &&
            InAppReview.RequestInAppReview().then(
              hasFlowFinishedSuccessfully => {},
            );
          dispatch(saveIsReview(true));
        }, 10000);
      } else if (isDoneDaily) {
        InAppReview.isAvailable() &&
          InAppReview.RequestInAppReview().then(
            hasFlowFinishedSuccessfully => {},
          );
        dispatch(saveIsReview(true));
      }
    }
  }, [isDoneDaily, isSeenComment]);

  const renderIntro = () => {
    if (lang) {
      return (
        <>
          <Stack.Screen name={ROUTE_NAME.INTRO} component={screens.Intro} />
        </>
      );
    } else {
      return (
        <>
          <Stack.Screen
            name={ROUTE_NAME.CHANGE_LANGUAGE}
            component={screens.ChangeLanguage}
          />
        </>
      );
    }
  };

  const renderScreenSigned = () => {
    if (isLogin) {
      return (
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name={ROUTE_NAME.SCREEN_TAB}
            component={StackTab}
          />
          <Stack.Screen
            name={ROUTE_NAME.PROFILE_SETTINGS}
            component={screens.ProfileSettingsScreen}
          />
          <Stack.Screen
            name={ROUTE_NAME.CHOOSE_DUE_DATE_APP}
            component={screens.ChooseDueDateScreenApp}
          />
          <Stack.Screen
            name={ROUTE_NAME.CALCULATE_DUE_DATE_APP}
            component={screens.CalculateDueDateScreenApp}
          />
          <Stack.Screen
            name={ROUTE_NAME.RESULT_DUE_DATE_APP}
            component={screens.ResultDueDateScreenApp}
          />
          <Stack.Screen
            name={ROUTE_NAME.SIZE_COMPARISON}
            component={screens.SizeComparison}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen
            name={ROUTE_NAME.DAILY_READS}
            component={screens.DailyReadsScreen}
          />
          <Stack.Screen
            name={ROUTE_NAME.VIDEO_LIST}
            component={screens.VideoList}
          />
          <Stack.Screen
            name={ROUTE_NAME.TIME_LINE}
            component={screens.TimeLine}
          />
          <Stack.Screen
            name={ROUTE_NAME.WEEKLY_ARTICLES}
            component={screens.WeeklyArticles}
          />
          <Stack.Screen
            name={ROUTE_NAME.DETAIL_ARTICLE}
            component={screens.DetailArticle}
          />
          <Stack.Screen
            name={ROUTE_NAME.NEW_FEED}
            component={screens.NewFeed}
          />
          <Stack.Screen
            name={ROUTE_NAME.MY_NEWFEED}
            component={screens.MyNewFeed}
          />
          <Stack.Screen
            name={ROUTE_NAME.DETAIL_NEWFEED}
            component={screens.DetailNewFeed}
          />
          <Stack.Screen
            name={ROUTE_NAME.DETAIL_VIDEO}
            component={screens.DetailVideo}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name={ROUTE_NAME.CHANGE_LANG_AUTH}
            component={screens.ChangeLanguageAuth}
          />
          <Stack.Screen
            name={ROUTE_NAME.SETTING_SCREEN}
            component={screens.Setting}
            options={{
              animationTypeForReplace: 'pop',
              // animation: 'slide_from_left',
              gestureDirection: 'horizontal',
            }}
          />
          <Stack.Screen
            name={ROUTE_NAME.CREATE_NEWPOST}
            component={screens.CreateNewPost}
          />
          <Stack.Screen
            name={ROUTE_NAME.NOTIFICATION_LIST}
            component={screens.NotificationList}
          />
          <Stack.Screen
            name={ROUTE_NAME.LIST_PODCAST}
            component={screens.ListPodcast}
          />
          <Stack.Screen
            name={ROUTE_NAME.DETAIL_PODCAST}
            component={screens.DetailPodCast}
          />
          <Stack.Screen
            name={ROUTE_NAME.SAVED_ARTICLES}
            component={screens.SaveArticles}
          />
          <Stack.Screen
            name={ROUTE_NAME.MY_NEWFEED_SETTING}
            component={screens.MyNewFeedSetting}
          />
          <Stack.Screen
            name={ROUTE_NAME.PRIVACY_POLICY}
            component={screens.PrivacyPolicy}
          />
          <Stack.Screen
            name={ROUTE_NAME.EDIT_POST}
            component={screens.EditPost}
          />
          <Stack.Screen
            name={ROUTE_NAME.LIST_BLOCKED_USER}
            component={screens.BlockUser}
          />
          <Stack.Screen
            name={ROUTE_NAME.DETAIL_USER}
            component={screens.DetaiUser}
          />
          <Stack.Screen
            name={ROUTE_NAME.LIST_MESSAGE}
            component={screens.ListMessage}
          />
          <Stack.Screen
            name={ROUTE_NAME.DETAIL_CHAT}
            component={screens.DetailChat}
          />
          <Stack.Screen
            name={ROUTE_NAME.CALL_DETAIL}
            component={screens.CallDetail}
          />
          <Stack.Screen
            name={ROUTE_NAME.ALL_MEETING_ROOM}
            component={screens.AllMeetingRoom}
          />
          <Stack.Screen
            name={ROUTE_NAME.DETAIL_MEETING_ROOM}
            component={screens.DetailMeetingRoom}
          />
          <Stack.Screen
            name={ROUTE_NAME.CREATE_ROOM}
            component={screens.CreateRoom}
          />

          <Stack.Screen
            name={ROUTE_NAME.CHAT_GPT}
            component={screens.ChatGPT}
          />

          <Stack.Screen
            name={ROUTE_NAME.EDIT_ROOM}
            component={screens.EditRoom}
          />
          <Stack.Screen
            name={ROUTE_NAME.LIVE_STREAM}
            component={screens.LiveStreamDetail}
          />
          <Stack.Screen
            name={ROUTE_NAME.AUDIO_LIVE}
            component={screens.AudioLive}
          />
          <Stack.Screen
            name={ROUTE_NAME.MOM_PREP_TEST}
            component={screens.MomPrepTest}
          />
          <Stack.Screen
            name={ROUTE_NAME.TEST_DETAIL}
            component={screens.TestDetail}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name={ROUTE_NAME.TEST_RESULT}
            options={{
              gestureEnabled: false,
            }}
            component={screens.TestResult}
          />
          <Stack.Screen
            name={ROUTE_NAME.LIST_RECORD}
            component={screens.ListRecord}
          />

          <Stack.Screen
            name={ROUTE_NAME.MASTER_CLASS}
            component={screens.MasterClass}
          />

          <Stack.Screen
            options={{
              presentation: 'modal',
              gestureDirection: 'vertical',
              contentStyle: {
                backgroundColor: 'transparent',
              },
              gestureEnabled: true,
            }}
            name={ROUTE_NAME.DATE_PICKER_SCREEN}
            component={screens.DatePickerScreen}
          />
          <Stack.Screen
            name={ROUTE_NAME.LIST_MASTER_CLASS}
            component={screens.ListMasterClass}
          />
          <Stack.Screen
            name={ROUTE_NAME.SEARCH_FEED}
            component={screens.SearchFeed}
          />
          <Stack.Screen
            name={ROUTE_NAME.DETAIL_FEED}
            component={screens.DetailFeed}
          />
          <Stack.Screen
            name={ROUTE_NAME.LIST_DETAIL_POST}
            component={screens.ListDetailPost}
          />
          <Stack.Screen
            name={ROUTE_NAME.DETAIL_DEAL}
            component={screens.DetailDeal}
          />
          <Stack.Screen
            name={ROUTE_NAME.NEW_BORN}
            component={screens.NewBornScreen}
          />
          <Stack.Screen
            name={ROUTE_NAME.DETAIL_NEW_BORN}
            component={screens.DetailNewBorn}
          />
          <Stack.Screen
            name={ROUTE_NAME.EDIT_NEW_BORN}
            component={screens.EditNewBorn}
          />
          <Stack.Screen
            name={ROUTE_NAME.ADD_BABY}
            component={screens.AddBaby}
          />
          <Stack.Screen
            name={ROUTE_NAME.ADD_NEW_BABY}
            component={screens.AddNewBaby}
          />
          <Stack.Screen
            name={ROUTE_NAME.NEW_BORN_TRACKER}
            component={screens.NewBornTracker}
          />
          <Stack.Screen
            name={ROUTE_NAME.ADD_BABY_SUCCESS}
            component={screens.AddBabySuccess}
          />
          <Stack.Screen
            name={ROUTE_NAME.SOURCE}
            component={screens.SourceOfRecommendation}
          />
          <Stack.Screen
            name={ROUTE_NAME.WEEKLY_CHALLENGE_COMPLETE}
            component={screens.WeeklyChallengeComplete}
          />
          <Stack.Screen
            name={ROUTE_NAME.UPDATE_INFORMATION}
            component={screens.UpdateInformation}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name={ROUTE_NAME.COMPLETE_PAYMENT}
            component={screens.CompletePayment}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name={ROUTE_NAME.ONBOARDING_STEP}
            component={screens.OnboardingStep}
          />
          <Stack.Screen
            name={ROUTE_NAME.ONBOARDING_FINISHED}
            component={screens.OnboardingFinished}
          />
          <Stack.Screen
            name={ROUTE_NAME.DETAIL_TASK_PROGRAM}
            component={screens.DetailTaskProgram}
          />
          <Stack.Screen
            name={ROUTE_NAME.TEASER_PROGRAM}
            component={screens.TeaserProgram}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name={ROUTE_NAME.VERIFY_PAYMENT}
            component={screens.VerifyPayment}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name={ROUTE_NAME.ABOUT_PROGRAM}
            component={screens.AboutProgram}
          />
          <Stack.Screen
            name={ROUTE_NAME.MOM_DIARY}
            component={screens.MomDiary}
          />
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator screenOptions={screenOptions}>
          {renderIntro()}
          <Stack.Screen
            name={ROUTE_NAME.CHOOSE_DUE_DATE}
            component={screens.ChooseDueDateScreen}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen
            name={ROUTE_NAME.CALCULATE_DUE_DATE}
            component={screens.CalculateDueDateScreen}
          />
          <Stack.Screen
            name={ROUTE_NAME.RESULT_DUE_DATE}
            component={screens.ResultDueDateScreen}
          />
          <Stack.Screen
            name={ROUTE_NAME.ON_BOARDING}
            component={screens.Onboarding}
          />
          <Stack.Screen
            name={ROUTE_NAME.SELECT_DOB}
            component={screens.SelectDOB}
          />
          <Stack.Screen
            name={ROUTE_NAME.QUESTION2_ONBOARDING}
            component={screens.Question2}
          />
          <Stack.Screen
            name={ROUTE_NAME.QUESTION3_ONBOARDING}
            component={screens.Question3}
          />
          <Stack.Screen
            name={ROUTE_NAME.SLIDE_INTRO}
            component={screens.SlideIntro}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name={ROUTE_NAME.ONBOARDING_V2}
            component={screens.OnboardingV2}
          />
          <Stack.Screen
            name={ROUTE_NAME.AUTH_ADD_BABY_SUCCESS}
            component={screens.AuthAddBabySuccess}
          />
          {/* <Stack.Screen
            name={ROUTE_NAME.SELECT_DOB}
            component={screens.SelectDOB}
          /> */}
        </Stack.Navigator>
      );
    }
  };
  return (
    <NavigationContainer
      ref={ref}
      linking={linking}
      onReady={() => RNBootSplash.hide({fade: true, duration: 500})}>
      {renderScreenSigned()}
    </NavigationContainer>
  );
});

export default NavigationApp;
