import {TypeDeepLink} from '@constant';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {DEEP_LINK, WEB_API_KEY} from '@services';
import axios from 'axios';

export const buildDeepLink = async (type: string, id: string | number) => {
  try {
    const link: any = await axios({
      method: 'POST',
      url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${WEB_API_KEY}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        dynamicLinkInfo: {
          domainUriPrefix: DEEP_LINK,
          link: `${DEEP_LINK}/${type}/${id}`,
          androidInfo: {
            androidPackageName: 'com.growth.levers.matida',
          },
          iosInfo: {
            iosBundleId: 'com.growth.levers.matida',
          },
        },
      },
    });
    if (link.status === 200) {
      return link.data?.shortLink;
    }
  } catch (e) {
    throw e;
  }
};

export const handleDeepLink = (link: string) => {
  if (!link) {
    return;
  }
  let afterLink = link;
  if (link.startsWith(DEEP_LINK)) {
    afterLink = link.replace(new RegExp(`^${DEEP_LINK}/`), '');
  }
  const arrayParamsLink = afterLink.split('/');

  if (arrayParamsLink?.length < 2) {
    return;
  }
  switch (arrayParamsLink[0]) {
    case TypeDeepLink.ARTICLE:
      navigate(ROUTE_NAME.DETAIL_ARTICLE, {
        article: {id: arrayParamsLink[1], topic: [], mood: []},
      });
      break;
    case TypeDeepLink.ROOM:
      navigate(ROUTE_NAME.DETAIL_MEETING_ROOM, {id: arrayParamsLink[1]});
      break;
    default:
      return;
  }
};
