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
import {handleDeepLink} from '@util';
import dynamicLinks from '@react-native-firebase/dynamic-links';
interface Props extends TextProps {
  children: string;
  style?: StyleProp<TextStyle>;
  color?: ColorValue;
  onCallback?: () => void;
}

export const AppTextUrl = ({
  children,
  style,
  color,
  onCallback,
  ...props
}: Props) => {
  const handleUrlPress = async (url: string) => {
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
