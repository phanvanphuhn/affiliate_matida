import {DefaultTFuncReturn} from 'i18next';
import React, {useState} from 'react';
import {
  LayoutChangeEvent,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {goBack} from '@navigation';

import {SvgArrowLeft} from '@images';
import {scaler, stylesCommon} from '@stylesCommon';
import {ROUTE_NAME} from '@routeName';

interface HeaderProps {
  title?: string | DefaultTFuncReturn;
  IconLeft?: JSX.Element;
  hideLeftButton?: boolean;
  ComponentRight?: JSX.Element | React.ReactNode;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  styleContainer?: StyleProp<ViewStyle>;
  styleButtonLeft?: StyleProp<ViewStyle>;
  styleButtonRight?: StyleProp<ViewStyle>;
  styleContainerSafeArea?: StyleProp<ViewStyle>;
  routeName?: string;
}

export const Header = ({routeName, ...props}: HeaderProps) => {
  switch (routeName) {
    case ROUTE_NAME.TIME_LINE:
      return <HeaderLongTitleNotRight {...props} />;
    case 'FILTER':
      return <HeaderShortTitleRight {...props} />;
    case ROUTE_NAME.DETAIL_MEETING_ROOM:
      return <HeaderShortTitleRight {...props} />;
    case ROUTE_NAME.CREATE_NEWPOST:
      return <HeaderShortTitleRight {...props} />;
    default:
      return <HeaderDefault {...props} />;
  }
};

const HeaderDefault = ({
  title,
  IconLeft = <SvgArrowLeft />,
  hideLeftButton = false,
  ComponentRight = <></>,
  onPressLeft = () => goBack(),
  onPressRight,
  styleContainer,
  styleButtonLeft,
  styleButtonRight,
  styleContainerSafeArea,
}: HeaderProps) => {
  return (
    <SafeAreaView edges={['top']} style={styleContainerSafeArea}>
      <View
        style={[
          styles.container,
          !title && {height: 32},
          {
            paddingRight: scaler(52),
            paddingLeft: scaler(52),
          },
          styleContainer,
        ]}>
        <Text style={[styles.titleText, {height: '100%'}]}>{title}</Text>
        <TouchableOpacity
          onPress={onPressLeft}
          activeOpacity={0.9}
          style={[styles.buttonLeft, styleButtonLeft]}
          disabled={hideLeftButton}>
          {IconLeft}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonRight, styleButtonRight]}
          activeOpacity={0.9}
          onPress={onPressRight}>
          {ComponentRight}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const HeaderLongTitleNotRight = ({
  title,
  styleContainer,
  onPressLeft = () => goBack(),
  styleButtonLeft,
  IconLeft = <SvgArrowLeft />,
}: HeaderProps) => {
  return (
    <SafeAreaView edges={['top']}>
      <View
        style={[
          {
            flexDirection: 'row',
            paddingRight: scaler(52),
            marginTop: scaler(20),
          },
          !title && {height: 32},
          styleContainer,
        ]}>
        <TouchableOpacity
          onPress={onPressLeft}
          style={[
            {
              paddingLeft: scaler(20),
              paddingRight: scaler(8),
            },
            styleButtonLeft,
          ]}>
          {IconLeft}
        </TouchableOpacity>
        <Text style={[styles.titleText, {flex: 1}]}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const HeaderShortTitleRight = ({
  title,
  IconLeft = <SvgArrowLeft />,
  hideLeftButton = false,
  ComponentRight = <></>,
  onPressLeft = () => goBack(),
  onPressRight,
  styleContainer,
  styleButtonLeft,
  styleButtonRight,
}: HeaderProps) => {
  return (
    <SafeAreaView edges={['top']}>
      <View
        style={[
          styles.container,
          !title && {height: 32},
          {
            paddingRight: scaler(20),
          },
          styleContainer,
        ]}>
        <Text style={[styles.titleText]}>{title}</Text>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPressLeft}
          style={[styles.buttonLeft, styleButtonLeft]}
          disabled={hideLeftButton}>
          {IconLeft}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.buttonRight, styleButtonRight]}
          onPress={onPressRight}>
          {ComponentRight}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: scaler(32),
    paddingLeft: scaler(20),
    marginBottom: scaler(10),
    marginTop: scaler(20),
  },
  titleText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: scaler(16),
    color: '#000000',
    ...stylesCommon.fontWeight500,
    lineHeight: 32,
  },
  buttonLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    paddingLeft: scaler(20),
  },
  buttonRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: scaler(20),
    justifyContent: 'center',
  },
});
