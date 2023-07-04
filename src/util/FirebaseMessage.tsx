import messaging from '@react-native-firebase/messaging';
import {colors} from '@stylesCommon';
import {showMessage} from 'react-native-flash-message';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Platform} from 'react-native';
import {getSystemVersion} from 'react-native-device-info';
// import {registerToken} from '@services';
import {store} from '../redux/store';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {
  getCheckMessageUnread,
  postUserDevice,
  putReadMessage,
  readNotification,
} from '@services';
import {changeWeekUser, updateTotalUnread, uploadListChat} from '@redux';
// import {convertString} from '@util';
import notifee, {EventType} from '@notifee/react-native';
import appsFlyer from 'react-native-appsflyer';
import DeviceInfo from 'react-native-device-info';

export enum NOTIFICATION {
  BROAD_CAST = 1,
  LIKE = 2,
  CHECKUP = 3,
  CREATE_NEW_TALK = 4,
  CHAT = 5,
  COMMENT = 6,
  REPLY_COMMENT = 7,
  LIST_ARTICLE = 8,
  REMINDER_ROOM = 9,
  INVITE_TO_ROOM = 10,
  REQUEST_TO_ROOM = 11,
}

function createAppNotification() {
  let fcmToken = '';
  let lastMessageId = '';

  const initFB = async () => {
    requestUserPermission();
    messaging().onTokenRefresh((newFcmToken: string) => {
      saveDeviceToken(newFcmToken);
    });

    messaging()
      .getInitialNotification()
      .then(async notification => {
        if (!notification) {
          return;
        }
        if (notification.messageId !== lastMessageId) {
          lastMessageId = notification.messageId || '';
        }
        handleUserInteractionNotification(notification);
      })
      .catch(error => {
        throw error;
      });

    messaging().onMessage(async notification => {
      if (notification.messageId !== lastMessageId) {
        lastMessageId = notification.messageId || '';
        handleNotiOnForeground(notification);
      }
    });

    // messaging().onNotificationOpenedApp(async notification => {
    //   notifee.displayNotification({
    //     title: 'Your order has been shipped',
    //     body: `Your order was shipped at!`,
    //     android: {
    //       channelId: 'orders',
    //       pressAction: {
    //         launchActivity: 'default',
    //         id: 'default',
    //       },
    //     },
    //   });
    //   // onDisplayNotification();
    //   // notifee.displayNotification;
    //   console.error('1212122: ', notification);

    //   if (notification.messageId !== lastMessageId) {
    //     lastMessageId = notification.messageId || '';
    //   }
    //   // await notifee.decrementBadgeCount();
    //   handleUserInteractionNotification(notification);
    // });

    // messaging().setBackgroundMessageHandler(async notification => {
    //   notifee.displayNotification({
    //     title: 'Your order has been shipped',
    //     body: `Your order was shipped at!`,
    //     android: {
    //       channelId: 'orders',
    //       pressAction: {
    //         launchActivity: 'default',
    //         id: 'default',
    //       },
    //     },
    //   });
    //   // onDisplayNotification();
    //   if (notification.messageId !== lastMessageId) {
    //     lastMessageId = notification.messageId || '';
    //   }
    //   console.log('setBackgroundMessageHandler: ', notification);
    //   // await notifee
    //   //   .incrementBadgeCount()
    //   //   .then(() => notifee.getBadgeCount())
    //   //   .then(count => {});
    //   handleUserInteractionNotification(notification);
    // });

    notifee.onBackgroundEvent(async ({type, detail}: any) => {
      const {notification} = detail;
      if (notification.messageId !== lastMessageId) {
        lastMessageId = notification.messageId || '';
      }
      // const {notification, pressAction} = detail;
      // if (type === EventType.ACTION_PRESS && pressAction?.id === 'mark-as-read') {
      //   await notifee.decrementBadgeCount();
      //   await notifee.cancelNotification(notification?.id);
      // }
    });

    notifee.onForegroundEvent(async ({type, detail}: any) => {
      const {notification} = detail;
      if (notification?.remote?.messageId !== lastMessageId) {
        lastMessageId = notification?.remote?.messageId || '';
      }
      // const {notification, pressAction} = detail;
      // if (type === EventType.ACTION_PRESS && pressAction?.id === 'mark-as-read') {
      //   await notifee.decrementBadgeCount();
      //   await notifee.cancelNotification(notification?.id);
      // }
      handleUserInteractionNotification(notification);
    });
    // onDisplayNotification();
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    await messaging().registerDeviceForRemoteMessages();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const newFcmToken = await messaging().getToken();

      fcmToken = newFcmToken;
      saveDeviceToken(newFcmToken);
    }
  };

  const handleNotiOnForeground = async (message: any) => {
    let {notification, data} = message;
    let title = '';
    let bodyMessage = '';
    if (!store.getState().chat?.topic_id) {
      try {
        title = notification.title;
        bodyMessage = notification.body;
        showMessage({
          backgroundColor: colors.success_message,
          duration: 5000,
          message: title,
          description: bodyMessage,
          color: '#FFFFFF',
          //@ts-ignore
          onPress: async () => {
            handleUserInteractionNotification(message);
          },
        });
      } catch (error) {}
    }

    if (+message?.data?.type === NOTIFICATION.CHAT) {
      const dataNewChat = JSON.parse(message?.data?.data_message);
      store.dispatch(uploadListChat(dataNewChat));
      getCheck();
    }
  };

  const getCheck = async () => {
    try {
      const res = await getCheckMessageUnread();
      store.dispatch(updateTotalUnread(res?.data));
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: colors.transparent,
        color: '#FFFFFF',
      });
    }
  };

  const handleUserInteractionNotification = (message: any) => {
    let {notification, data} = message;
    // let title = '';
    // let bodyMessage = '';
    try {
      // title = notification.title;
      // bodyMessage = notification?.title;
      switch (+data?.type) {
        case NOTIFICATION.BROAD_CAST:
          break;
        case NOTIFICATION.LIKE:
          handleNotificationLike(message);
          break;
        case NOTIFICATION.CHECKUP:
          handleNotificationCheckUp(message);
          break;
        case NOTIFICATION.REQUEST_TO_ROOM:
        case NOTIFICATION.REMINDER_ROOM:
        case NOTIFICATION.INVITE_TO_ROOM:
        case NOTIFICATION.CREATE_NEW_TALK:
          handleCreateNewTalk(message);
          break;
        case NOTIFICATION.CHAT:
          handleNotificationChat(message);
          break;
        case NOTIFICATION.COMMENT:
          handleNotificationComment(message);
          break;
        case NOTIFICATION.REPLY_COMMENT:
          handleNotificationReplyComment(message);
          break;
        case NOTIFICATION.LIST_ARTICLE:
          handleNotificationArticle(message);
          break;
        default:
          return;
      }
    } catch (error) {}
  };

  const handleNotificationLike = async (message: any) => {
    let {data} = message;
    try {
      if (data) {
        navigate(ROUTE_NAME.DETAIL_NEWFEED, {id: +data?.table_id});
        await readNotification(+data?.noti_id);
      }
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: 'transparent',
      });
    }
  };

  // const handleNotificationChangeWeek = (message: any) => {
  //   // let {notification, data} = message;
  //   console.log('handleNotificationChangeWeek: ', message);

  //   navigate(ROUTE_NAME.SIZE_COMPARISON, {option: 1});
  // };

  const handleNotificationChat = async (message: any) => {
    let {data} = message;
    try {
      if (data) {
        navigate(ROUTE_NAME.DETAIL_CHAT, {
          topic_id: +data?.topic_id,
          receiver_id: +data?.sender_id,
        });
        const res = await putReadMessage(+data?.topic_id);
      }
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: 'transparent',
      });
    }
  };

  const handleCreateNewTalk = async (message: any) => {
    let {data} = message;
    try {
      if (data) {
        navigate(ROUTE_NAME.DETAIL_MEETING_ROOM, {id: +data?.table_id});
        await readNotification(+data?.noti_id);
      }
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: 'transparent',
      });
    }
  };

  const handleNotificationComment = async (message: any) => {
    let {data} = message;
    try {
      if (data) {
        navigate(ROUTE_NAME.DETAIL_NEWFEED, {id: +data?.table_id});
        await readNotification(+data?.noti_id);
      }
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: 'transparent',
      });
    }
  };

  const handleNotificationReplyComment = async (message: any) => {
    // console.log('handleNotificationReplyComment: ', message);
    // let {data} = message;
    // navigate(ROUTE_NAME.DETAIL_NEWFEED, {id: +data?.table_id});

    let {data} = message;
    try {
      if (data) {
        navigate(ROUTE_NAME.DETAIL_NEWFEED, {id: +data?.table_id});
        await readNotification(+data?.noti_id);
      }
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: 'transparent',
      });
    }
  };

  const handleNotificationCheckUp = (message: any) => {
    const {data} = message;
    store.dispatch(changeWeekUser(+data?.week));
    setTimeout(() => {
      navigate(ROUTE_NAME.TIME_LINE);
    }, 100);
  };

  const handleNotificationArticle = (message: any) => {
    const {data} = message;
    store.dispatch(changeWeekUser(+data?.week));
    setTimeout(() => {
      navigate(ROUTE_NAME.WEEKLY_ARTICLES);
    }, 100);
  };

  // navigate(ROUTE_NAME.WEEKLY_ARTICLES)}
  const saveDeviceToken = async (newFcmToken: string) => {
    try {
      const data = {
        device_token: newFcmToken,
        // os_version: getSystemVersion(),
        // os_name: Platform.OS,
      };
      if (Platform.OS === 'android') {
        appsFlyer.updateServerUninstallToken(newFcmToken, success => {
          //...
        });
      } else {
        DeviceInfo.getDeviceToken().then(deviceToken => {
          appsFlyer.updateServerUninstallToken(deviceToken, success => {
            //...
          });
        });
      }
      const res = await postUserDevice(data);
    } catch (error) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: 'transparent',
      });
    }
  };

  // const removeBadge = () => {
  //   notifee.setBadgeCount(0);
  // };

  return {
    requestUserPermission,
    fcmToken,
    initFB,
    // removeBadge,
  };
}

export const AppNotification = createAppNotification();
