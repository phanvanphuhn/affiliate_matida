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
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {goBack} from '@navigation';

import {SvgArrowLeft} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {ROUTE_NAME} from '@routeName';

interface HeaderProps {
  IconLeft?: JSX.Element;
  hideLeftButton?: boolean;
  ComponentRight?: JSX.Element | React.ReactNode;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  styleContainer?: StyleProp<ViewStyle>;
  styleButtonLeft?: StyleProp<ViewStyle>;
  styleButtonRight?: StyleProp<ViewStyle>;
  routeName?: string;
}

const HeaderFeed = ({
  IconLeft = <SvgArrowLeft />,
  hideLeftButton = false,
  ComponentRight = <></>,
  onPressLeft = () => goBack(),
  onPressRight,
  styleContainer,
  styleButtonLeft,
  styleButtonRight,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {top: insets.top}, styleContainer]}>
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
  );
};
export default HeaderFeed;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    zIndex: 100,
    justifyContent: 'space-between',
    marginBottom: scaler(10),
    paddingHorizontal: scaler(20),
  },
  buttonLeft: {
    backgroundColor: colors.white,
    padding: 6,
    borderRadius: 13,
  },
  buttonRight: {
    backgroundColor: colors.white,
    padding: 6,
    borderRadius: 13,
  },
});
