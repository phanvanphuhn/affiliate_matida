import React, {useEffect} from 'react';
import {AppState, Platform, StatusBar} from 'react-native';
import NavigationApp from './src/navigation/StackContainer';

import {GlobalUI, ToastCustom, ToastCustomPost} from '@component';
import {NavigationUtils} from '@navigation';
import {GlobalService} from '@services';
import moment from 'moment';
import {LogBox, Text, TextInput, View} from 'react-native';
import appsFlyer from 'react-native-appsflyer';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import {clearDataLiveTalk} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {KEY_UXCAM, MERCHANT_IDENTIFIER, STRIPE_KEY} from '@env';
import {initI18n} from '@i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, {
  ToastConfig,
  ToastConfigParams,
} from 'react-native-toast-message';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
} from 'react-native-track-player';
import {AppNotification} from '@util';
import messaging from '@react-native-firebase/messaging';
import '@images';
import {scaler} from '@stylesCommon';
import RNUxcam from 'react-native-ux-cam';

//Disable yellow box warning
LogBox.ignoreAllLogs();
initI18n();
import KeepAwake from 'react-native-keep-awake';

import {StripeProvider} from '@stripe/stripe-react-native';

const setupPlayer = async (
  options: Parameters<typeof TrackPlayer.setupPlayer>[0],
) => {
  const setup = async () => {
    try {
      await TrackPlayer.setupPlayer(options);
    } catch (error) {
      return (error as Error & {code?: string}).code;
    }
  };
  while ((await setup()) === 'android_cannot_setup_player_in_background') {
    // A timeout will mostly only execute when the app is in the foreground,
    // and even if we were in the background still, it will reject the promise
    // and we'll try again:
    await new Promise<void>(resolve => setTimeout(resolve, 1));
  }
};

const App = () => {
  messaging().setBackgroundMessageHandler(async notification => {});

  RNUxcam.optIntoSchematicRecordings();
  const configuration = {
    userAppKey: KEY_UXCAM,
    enableAutomaticScreenNameTagging: false,
    enableAdvancedGestureRecognition: true, // default is true
    enableImprovedScreenCapture: true, // for improved screen capture on Android
  };
  RNUxcam.startWithConfiguration(configuration);

  const initTrackingApp = () => {
    const androidConfig = {
      devKey: 'Ez8yDawVpmfmiY7VEtJyC9',
      isDebug: true,
    };
    const iosConfig = {
      devKey: 'Ez8yDawVpmfmiY7VEtJyC9',
      isDebug: true,
      appId: '1671957732',
    };
    appsFlyer.initSdk(
      Platform.OS === 'ios' ? iosConfig : androidConfig,
      result => {},
      error => {
        console.error(error);
      },
    );
  };

  const saveDataStartTracking = async () => {
    const timeStartTracking = moment().format('HH:mm:ss DD/MM/YYYY');
    let data = await AsyncStorage.setItem('TIME_START', `${timeStartTracking}`);
  };

  const initPlayer = async () => {
    await await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      // This flag is now deprecated. Please use the above to define playback mode.
      // stoppingAppPausesPlayback: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  };

  const trackingTimeUseApp = async () => {
    let data: any = await AsyncStorage.getItem('TIME_START');
    const time_start = moment(data);
    const time_end = moment();
    const duration = moment.duration(time_end.diff(time_start));
    const eventName = `APPLICATION_USAGE_TIME_${duration
      .asMinutes()
      .toFixed(2)}_MINUTE`;
    appsFlyer.logEvent(
      eventName,
      {},
      res => {},
      err => {},
    );
  };

  const changeColorStatusBar = async () => {};

  useEffect(() => {
    KeepAwake.activate();
    initPlayer();
    changeColorStatusBar();
    getLocalize();
    initTrackingApp();
    //@ts-ignore
    Text.defaultProps = Text.defaultProps || {};
    //@ts-ignore
    Text.defaultProps.allowFontScaling = false;
    //@ts-ignore
    TextInput.defaultProps = TextInput.defaultProps || {};
    //@ts-ignore
    TextInput.defaultProps.allowFontScaling = false;
    //@ts-ignore
    TextInput.defaultProps.autoCorrect = false;
    //@ts-ignore
    TextInput.defaultProps.spellCheck = false;
    //@ts-ignore
    View.defaultProps = View.defaultProps || {};
    //@ts-ignore
    View.defaultProps.allowFontScaling = false;

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        saveDataStartTracking();
      } else if (nextAppState === 'background') {
        trackingTimeUseApp();
        const infoRoom = store.getState()?.liveTalk?.info?.room?.id;
        if (infoRoom) {
          store.dispatch(clearDataLiveTalk());
          NavigationUtils.navigate(ROUTE_NAME.TAB_HOME);
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const setLanguage = async (language: string) => {
    let data = await AsyncStorage.setItem('LANGUAGE', language);
  };

  const getLocalize = async () => {
    let data = await AsyncStorage.getItem('LANGUAGE');
    if (data) {
    } else {
      setLanguage('vi');
    }
  };

  const toastConfig: ToastConfig = {
    customToast: ({text1, props}: ToastConfigParams<any>) => (
      <ToastCustom id={props.id} onPressUndo={props.onPressUndo} />
    ),
    customToastPost: ({text1, props}: ToastConfigParams<any>) => (
      <ToastCustomPost onPress={props.onPress} />
    ),
  };

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor="transparent"
      />
      <StripeProvider
        publishableKey={STRIPE_KEY}
        merchantIdentifier={MERCHANT_IDENTIFIER}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationApp
              ref={(navigatorRef: any) =>
                NavigationUtils.setTopLevelNavigator(navigatorRef)
              }
            />
          </PersistGate>
        </Provider>
      </StripeProvider>
      <FlashMessage
        position="top"
        floating={true}
        hideStatusBar={false}
        style={{marginTop: Platform.OS === 'ios' ? 0 : scaler(16)}}
      />
      <Toast
        position="bottom"
        bottomOffset={40}
        config={toastConfig}
        autoHide
      />
      <GlobalUI ref={GlobalService.globalUIRef} />
    </>
  );
};

export default App;

//NOTE:
//Turn on log redux: check src/redux/store.tsx
//Turn on log api request: check src/services/logger.tsx
//Tất cả đã được tích hợp locate typeScript

//======> src/assets ======>  : font chữ của app
//======> src/component ======> : Các thành phần đc sử dụng trong app như button, input, modal ...
//======> src/images ======> : Các ảnh và icon được dùng trong app
//======> src/lib ======> : Nơi chứa các lib được custom lại
//======> src/navigation ======> : Nơi chứa Route name và các file thành phần điều hướng trong app
//======> src/redux ======> : Nơi chứa khá nhiều tầng logic và các biến được quản lý trong app
//======> src/screens ======> : Nơi chứa các UI màn hình
//======> src/services ======> : Nơi chứa các request tới server
//======> src/stylesCommon ======> : Nơi chứa các style chung của app như font chữ và màu sắc
//======> src/util ======> : Nơi chứa các hàm logic hỗ trợ và các dịch vụ của bên api thứ 3 được sử dụng trong app
