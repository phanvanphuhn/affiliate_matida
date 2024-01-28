import React from 'react';
import {
  ColorValue,
  Linking,
  StyleProp,
  TextProps,
  TextStyle,
} from 'react-native';
import ParsedText from 'react-native-parsed-text';
//@ts-ignore
import {DEEP_LINK, OLD_DEEP_LINK} from '@services';
import {event, eventType, handleDeepLink, trackingAppEvent} from '@util';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {useSelector} from 'react-redux';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {TRouteDeepLink} from '@constant';
interface Props extends TextProps {
  children: string;
  style?: StyleProp<TextStyle>;
  color?: ColorValue;
  isForum?: boolean;
  onCallback?: () => void;
}

export const AppTextUrl = ({
  children,
  style,
  color,
  onCallback,
  isForum,
  ...props
}: Props) => {
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const handleUrlPress = async (url: string) => {
    if (isForum) {
      trackingAppEvent(
        event.FORUM.FORUM_CLICK_LINK_RECOMMENDATION,
        {id: user?.id},
        eventType.MIX_PANEL,
      );
    }

    let afterLink = url;
    if (url.startsWith(DEEP_LINK)) {
      afterLink = url.replace(new RegExp(`^${DEEP_LINK}/`), '');
    } else if (url.startsWith(OLD_DEEP_LINK)) {
      afterLink = url.replace(new RegExp(`^${OLD_DEEP_LINK}/`), '');
    } else {
      Linking.openURL(url);
    }

    const arrayParamsLink = afterLink.split('/');

    if (arrayParamsLink?.length > 2) {
      handleDeepLink(url, true);
    } else if (arrayParamsLink[0] == TRouteDeepLink.TAB_MASTERCLASS) {
      if (user?.user_subscriptions?.some(e => e.code == 'PP')) {
        navigate(ROUTE_NAME.PREGNANCY_PROGRAM);
      } else {
        navigate(ROUTE_NAME.NEW_USER_PROGRAM);
      }
    } else if (url.indexOf(DEEP_LINK) >= 0 || url.indexOf(OLD_DEEP_LINK) >= 0) {
      const link = await dynamicLinks().resolveLink(url);
      if (link?.url) {
        handleDeepLink(link?.url, true);
      }
      // handleDeepLink(url, true);
    }
    !!onCallback && onCallback();
  };
  return (
    <ParsedText
      {...props}
      style={style}
      parse={[
        {
          type: 'url',
          style: [
            {
              textDecorationLine: 'underline',
            },
            !!color && {color: color},
          ],
          onPress: handleUrlPress,
        },
      ]}>
      {children}
    </ParsedText>
  );
};
