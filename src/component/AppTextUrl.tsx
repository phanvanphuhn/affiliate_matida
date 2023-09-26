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
import reactotron from 'reactotron-react-native';
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
    if (url.indexOf(DEEP_LINK) >= 0 || url.indexOf(OLD_DEEP_LINK) >= 0) {
      // const link = await dynamicLinks().resolveLink(url);
      // if (link?.url) {
      //   handleDeepLink(link?.url, true);
      // }
      handleDeepLink(url, true);
    } else {
      Linking.openURL(url);
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
