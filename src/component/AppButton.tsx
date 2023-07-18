import React, {useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
} from 'react-native';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {debounce} from 'lodash';
import {DefaultTFuncReturn} from 'i18next';

interface IProps {
  titleButton?: string | DefaultTFuncReturn;
  customStyleButton?: StyleProp<ViewStyle>;
  customStyleDisable?: StyleProp<ViewStyle>;
  customStyleText?: StyleProp<TextStyle>;
  onClick?: () => void;
  sourceIcon?: ImageSourcePropType | undefined;
  disable?: boolean;
  customStyleIcon?: any;
  icon?: JSX.Element;
}

const AppButton = React.memo((props: IProps) => {
  const {
    titleButton = '',
    customStyleButton,
    customStyleText,
    onClick,
    sourceIcon,
    disable = false,
    customStyleIcon,
    customStyleDisable,
    icon,
  } = props;

  const onPressButton = useCallback(
    //Disble double click
    debounce(() => {
      if (onClick) {
        onClick();
      }
    }, 300),
    [onClick],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          backgroundColor: disable
            ? colors.backgroundOpacityDisable
            : colors.primary,
        },
        customStyleButton,
        disable && customStyleDisable,
      ]}
      onPress={onPressButton}
      disabled={disable}>
      {sourceIcon ? (
        <Image source={sourceIcon} style={[styles.icon, customStyleIcon]} />
      ) : null}
      {icon ? <View style={[styles.icon, customStyleIcon]}>{icon}</View> : null}
      <Text style={[styles.txtButton, customStyleText]}>{titleButton}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scaler(54),
    backgroundColor: colors.primary,
    borderRadius: scaler(8),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  txtButton: {
    color: colors.white,
    fontSize: scaler(16),
    ...stylesCommon.fontWeight500,
  },
  icon: {
    marginRight: scaler(8),
  },
});

export {AppButton};
