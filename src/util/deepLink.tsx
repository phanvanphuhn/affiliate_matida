import {TRouteDeepLink, TypeDeepLink} from '@constant';
import {navigate, NavigationUtils} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {DEEP_LINK, OLD_DEEP_LINK, ROUTE_LINK, WEB_API_KEY} from '@services';
import axios from 'axios';
//@ts-ignore
import dynamicLinks from '@react-native-firebase/dynamic-links';
import useCheckPregnancy from './hooks/useCheckPregnancy';

export const buildDeepLink = async (type: string, id: string | number) => {
  try {
    // const link: any = await axios({
    //   method: 'POST',
    //   url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${WEB_API_KEY}`,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   data: {
    //     dynamicLinkInfo: {
    //       domainUriPrefix: DEEP_LINK,
    //       link: `${DEEP_LINK}/${type}/${id}`,
    // androidInfo: {
    //   androidPackageName: 'com.growth.levers.matida',
    // },
    // iosInfo: {
    //   iosBundleId: 'com.growth.levers.matida',
    // },
    //     },
    //   },
    // });

    // if (link.status === 200) {
    //   return link.data?.shortLink;
    // }

    const link = await dynamicLinks().buildShortLink(
      {
        link: `${DEEP_LINK}/${type}/${id}`,
        domainUriPrefix: DEEP_LINK,
        android: {
          packageName: 'com.growth.levers.matida',
        },
        ios: {
          bundleId: 'com.growth.levers.matida',
        },
      },
      dynamicLinks.ShortLinkType.UNGUESSABLE,
    );
    return link;
  } catch (e) {
    throw e;
  }
};

export const handleDeepLink = (link: string, inApp?: boolean) => {
  if (!link) {
    return;
  }
  if (!inApp) {
    navigate(ROUTE_NAME.TAB_HOME);
  }
  let afterLink = link;
  if (link.startsWith(DEEP_LINK)) {
    afterLink = link.replace(new RegExp(`^${DEEP_LINK}/`), '');
  } else if (link.startsWith(OLD_DEEP_LINK)) {
    afterLink = link.replace(new RegExp(`^${OLD_DEEP_LINK}/`), '');
  } else if (link.startsWith(ROUTE_LINK)) {
    afterLink = link.replace(new RegExp(`^${ROUTE_LINK}/`), '');
  }
  const arrayParamsLink = afterLink.split('/');
  if (arrayParamsLink?.length < 2) {
    switch (arrayParamsLink[0]) {
      case TRouteDeepLink.REPORT_BIRTH:
        navigate(ROUTE_NAME.NEW_BORN);
        break;
      case TRouteDeepLink.USER_SETTINGS:
        navigate(ROUTE_NAME.SETTING_SCREEN);
        break;
      case TRouteDeepLink.TAB_EXPLORE:
        navigate(ROUTE_NAME.TAB_FEED);
        break;
      case TRouteDeepLink.TAB_COMMUNITY:
        navigate(ROUTE_NAME.TAB_COMMUNITY);
        break;
      case TRouteDeepLink.TAB_DEAL:
        navigate(ROUTE_NAME.TAB_DEAL);
        break;
      case TRouteDeepLink.TAB_LIVE_TALK:
        navigate(ROUTE_NAME.TAB_LIVETALK);
        break;
      case TRouteDeepLink.TAB_MASTERCLASS:
        navigate(ROUTE_NAME.PREGNANCY_PROGRAM);
        break;
      default:
        break;
    }
  }
  switch (arrayParamsLink[0]) {
    case TypeDeepLink.ARTICLE:
      navigate(ROUTE_NAME.DETAIL_ARTICLE, {
        article: {id: arrayParamsLink[1], topic: [], mood: []},
      });
      break;
    case TypeDeepLink.FEED:
      navigate(ROUTE_NAME.DETAIL_FEED, {
        id: arrayParamsLink[2],
        content_type: arrayParamsLink[1],
      });
      break;
    case TypeDeepLink.ROOM:
      navigate(ROUTE_NAME.DETAIL_MEETING_ROOM, {
        id: arrayParamsLink[1],
      });
      break;
    case TypeDeepLink.DEAL:
      navigate(ROUTE_NAME.TAB_DEAL, {
        id: arrayParamsLink[1],
      });
      break;
    default:
      break;
  }
};
