import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {colors, scaler} from '@stylesCommon';
import React, {forwardRef, useCallback} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

interface Props {
  leftIcon?: boolean;
  header?: string | React.ReactNode;
  rightIcon?: boolean;
  primaryButton?: boolean;
  primaryButtonTitle?: string;
  subButton?: boolean;
  subButtonTitle?: string;
  index?: number;
  snapPoints: string[];
  onChange?: (index: number) => void;
  onClose?: () => void;
  leftIconPress?: () => void;
  primaryButtonPress?: () => void;
  animateOnMount?: boolean;
  enablePanDownToClose?: boolean;
  children: React.ReactNode;
  onAnimate?: (fromIndex: number | string, toIndex: number | string) => void;
  backgroundStyle?: object;
}

const BottomSheetModal = forwardRef((props: Props, ref) => {
  const {
    leftIcon,
    header,
    rightIcon,
    primaryButton,
    primaryButtonTitle,
    subButton,
    subButtonTitle,
    snapPoints,
    onChange,
    onClose,
    leftIconPress,
    primaryButtonPress,
    animateOnMount,
    enablePanDownToClose,
    children,
    onAnimate,
    backgroundStyle,
  } = props;

  const renderBackdrop = useCallback(
    (props2: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props2}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        onPress={onClose}
        pressBehavior={'close'}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      index={-1}
      ref={ref}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
      animateOnMount={animateOnMount}
      enablePanDownToClose={enablePanDownToClose ? true : false}
      onAnimate={onAnimate}
      backgroundStyle={backgroundStyle}>
      <BottomSheetScrollView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          {leftIcon && (
            <TouchableOpacity style={{width: 50}} onPress={leftIconPress}>
              {/* <Icon48px.Left /> */}
            </TouchableOpacity>
          )}

          {header && (
            <View
              style={{
                flex: 1,
              }}>
              {header}
            </View>
          )}

          {rightIcon && <View style={{width: 50}} />}
        </View>

        {children}

        {primaryButton && (
          <TouchableOpacity
            onPress={primaryButtonPress}
            style={{
              paddingBottom: scaler(10),
              paddingTop: scaler(12),
              paddingHorizontal: scaler(32),
              borderRadius: 999,
              backgroundColor: colors.white,
              marginBottom: scaler(16),
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: colors.black,
                textAlign: 'center',
              }}>
              {primaryButtonTitle}
            </Text>
          </TouchableOpacity>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

BottomSheetModal.defaultProps = {
  children: <View />,
};

export default BottomSheetModal;
