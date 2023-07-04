import React from 'react';
import {
  ColorValue,
  Linking,
  StyleProp,
  TextProps,
  TextStyle,
} from 'react-native';
import ParsedText from 'react-native-parsed-text';
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
  const handleUrlPress = (url: string) => {
    Linking.openURL(url);
    // if (url.startsWith(DEEP_LINK)) {
    //   console.log('handleDeepLink: ', url);
    //   handleDeepLink(url);
    // } else {
    // }
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
