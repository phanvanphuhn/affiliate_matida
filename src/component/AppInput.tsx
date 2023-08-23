import React from 'react';
import {
  Animated,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  Platform,
  Keyboard,
  Text,
} from 'react-native';
import {colors, stylesCommon, scaler} from '@stylesCommon';
import {DefaultTFuncReturn} from 'i18next';
// import {EyeIconClose, EyeIconOpen} from '@images';

interface IAppInput {
  label?: string | DefaultTFuncReturn;
  placeholder?: string;
  value?: any;
  secureTextEntry?: boolean;
  type?: string;
  style?: TextStyle | TextStyle[];
  inputStyle?: TextStyle | TextStyle[];
  multiline?: boolean;
  noPadding?: boolean;
  numberOfLines?: number;
  error?: any;
  showEye?: boolean;
  onValueChange: (e: any) => void;
  keyboardType?: any;
  maxLength?: number;
  placeholderColor?: string;
}

export const AppInput = (props: IAppInput) => {
  const {
    label,
    error,
    value,
    placeholder,
    secureTextEntry = false,
    inputStyle,
    multiline = false,
    numberOfLines = 1,
    type,
    style,
    showEye,
    onValueChange,
    keyboardType,
    maxLength,
    placeholderColor,
    ...rest
  } = props;
  const animatedIsFocused = React.useRef(
    new Animated.Value(value !== '' && value !== undefined ? 1 : 0),
  );
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePasssWord, setHidePassWord] = React.useState(true);

  React.useEffect(() => {
    Animated.timing(animatedIsFocused.current, {
      toValue: isFocused || (value !== '' && value !== undefined) ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const animatedLabelStyle = {
    top: animatedIsFocused.current.interpolate({
      inputRange: [0, 1],
      outputRange: [scaler(16), scaler(3)],
    }),
    fontSize: animatedIsFocused.current.interpolate({
      inputRange: [0, 1],
      outputRange: [scaler(16), scaler(12)],
    }),
    color: animatedIsFocused.current.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.borderColor, colors.primary],
    }),
  };

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const onShowPassWord = () => {
    setHidePassWord(!hidePasssWord);
  };
  const onSubmitEditing = () => {
    Keyboard.dismiss();
  };
  return (
    <>
      <View
        style={[
          styles.inputWrap,
          style,
          isFocused
            ? {
                borderColor: colors.primary,
              }
            : {
                borderColor: 'transparent',
              },
        ]}>
        {label && (
          <Animated.Text style={[styles.label, animatedLabelStyle]}>
            {label}
          </Animated.Text>
        )}
        <TextInput
          maxLength={maxLength}
          selection={isFocused ? undefined : {start: 0, end: 0}}
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor ?? 'rgba(90, 117, 132, 0.5);'}
          value={value}
          multiline={multiline}
          onFocus={handleFocus}
          onBlur={handleBlur}
          numberOfLines={numberOfLines}
          blurOnSubmit={false}
          onChangeText={onValueChange}
          secureTextEntry={hidePasssWord && secureTextEntry}
          keyboardType={keyboardType}
          onSubmitEditing={onSubmitEditing}
          hitSlop={{top: scaler(20)}}
        />
        {/* {showEye && (
          <TouchableOpacity onPress={onShowPassWord}>
            {hidePasssWord ? <EyeIconClose /> : <EyeIconOpen />}
          </TouchableOpacity>
        )} */}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  inputWrap: {
    height: scaler(54),
    flexDirection: 'row',
    backgroundColor: '#F6F4F6',
    paddingHorizontal: scaler(12),
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: scaler(12),
  },
  label: {
    position: 'absolute',
    left: Platform.OS === 'ios' ? scaler(12) : scaler(16),
    ...stylesCommon.fontWeight500,
  },
  input: {
    // flex: 1,
    paddingVertical: 0,
    width: '100%',
    alignItems: 'center',
    fontSize: scaler(14),
    ...stylesCommon.fontWeight500,
    height: scaler(30),
    marginTop: scaler(28),
    marginBottom: scaler(9),
    color: colors.textColor,
  },
  error: {
    marginTop: scaler(4),
    color: colors.red,
    fontSize: scaler(12),
  },
});
