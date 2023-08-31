import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {goBack} from '@navigation';

import {SvgArrowLeft} from '@images';
import {colors, scaler} from '@stylesCommon';
import {useRoute} from '@react-navigation/native';
import {useVideo} from '../screens/app/DetailFeed/components/Container';

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
  const route = useRoute<any>();
  const {state, setState} = useVideo();

  const onBack = () => {
    onPressLeft();
    route?.params?.onComplete && route?.params?.onComplete(state.listPackage);
  };
  return (
    <View style={[styles.container, {top: insets.top + 15}, styleContainer]}>
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.9}
        style={[styles.buttonLeft, styleButtonLeft]}
        disabled={hideLeftButton}>
        {IconLeft}
      </TouchableOpacity>
      {onPressRight && (
        <TouchableOpacity
          style={[styles.buttonRight, styleButtonRight]}
          activeOpacity={0.9}
          onPress={onPressRight}>
          {ComponentRight}
        </TouchableOpacity>
      )}
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
