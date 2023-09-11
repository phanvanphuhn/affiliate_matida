import {ROUTE_NAME} from '@routeName';
import {EmitterSubscription, Linking} from 'react-native';
import reactotron from 'reactotron-react-native';

export default class LinkingService {
  static addLinkingListener = (
    onReceiveURL: (event: {url: string}) => void,
  ) => {
    return Linking.addEventListener('url', onReceiveURL);
  };

  static removeLinkingListener = (subscription: EmitterSubscription) => {
    Linking.removeSubscription(subscription);
  };

  static getInitialURL = async () => {
    return await Linking.getInitialURL();
  };
}

export const handleURL = (event: {url: string}) => {
  // const {path, queryParams} = Linking.parse(url);
  // Linking.
  reactotron.log?.('url');
};
const config = {
  screens: {
    [ROUTE_NAME.HOME]: {
      path: '/home',
    },
    [ROUTE_NAME.SCREEN_TAB]: {
      screens: {
        [ROUTE_NAME.TAB_HOME]: {
          path: '/homeTab',
        },
        [ROUTE_NAME.TAB_COMMUNITY]: {
          path: '/forumTab',
        },
        [ROUTE_NAME.TAB_FEED]: {
          path: '/feed',
        },
        [ROUTE_NAME.TAB_LIVETALK]: {
          path: '/live',
        },
      },
    },
    [ROUTE_NAME.SETTING_SCREEN]: {
      path: '/setting',
    },
    [ROUTE_NAME.DETAIL_ARTICLE]: {
      path: '/article/:idArticle',
    },
    [ROUTE_NAME.SIZE_COMPARISON]: {
      path: '/size-comparison',
    },
    [ROUTE_NAME.TIME_LINE]: {
      path: '/timeline',
    },
  },
};

export const linking = {
  prefixes: [
    'matida://app',
    'https://matida.app.link',
    'https://matida-alternate.app.link',
  ],
  config,
};
