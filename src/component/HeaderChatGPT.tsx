import {DefaultTFuncReturn} from 'i18next';
import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {goBack} from '@navigation';

import {SvgArrowLeft, TidaAIWhite} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {useSelector} from 'react-redux';

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
  dataUser: any;
}

export const HeaderChatGPT = ({routeName, ...props}: HeaderProps) => {
  return <HeaderDefault {...props} />;
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
  dataUser,
}: HeaderProps) => {
  const is_mute = useSelector((state: any) => state?.chat?.is_mute);

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
        <View style={styles.viewUser}>
          <Image source={TidaAIWhite} style={styles.imageAvatar} />
          <Text style={[styles.titleText]} numberOfLines={1}>
            Tida AI
          </Text>
        </View>
        <TouchableOpacity
          onPress={onPressLeft}
          activeOpacity={0.9}
          style={[styles.buttonLeft, styleButtonLeft]}
          disabled={hideLeftButton}>
          {IconLeft}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // marginTop: scaler(32),
    alignItems: 'center',
    paddingLeft: scaler(20),
    marginBottom: scaler(10),
    marginTop: scaler(20),
  },
  viewUser: {
    flexDirection: 'row',
    marginLeft: scaler(26),
    alignItems: 'center',
  },
  titleText: {
    fontSize: scaler(16),
    color: '#1C272D',
    ...stylesCommon.fontWeight600,
    maxWidth: '70%',
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
  imageAvatar: {
    width: scaler(40),
    height: scaler(40),
    borderRadius: scaler(20),
    marginRight: scaler(12),
    backgroundColor: colors.white,
  },
  iconThreeDot: {
    width: scaler(24),
    height: scaler(24),
  },
  iconMute: {
    width: scaler(20),
    height: scaler(20),
    marginLeft: scaler(12),
  },
});
