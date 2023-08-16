import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardEvent,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from 'react-native';
import {useKeyboard} from '@react-native-community/hooks';
import {colors, heightScreen} from '@stylesCommon';
import {ic_send} from '@images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props extends ViewProps {}

export default function KeyboardShift(props: Props) {
  const insets = useSafeAreaInsets();
  const [isKeyBoardShow, setIsKeyBoardShow] = useState<boolean>(false);
  useEffect(() => {
    let keyboardDidShow = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardWillShow,
    );
    let keyboardDidHide = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardWillHide,
    );
    let keyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      handleKeyboardWillShow,
    );
    let keyboardWillHide = Keyboard.addListener(
      'keyboardWillHide',
      handleKeyboardWillShow,
    );
    return () => {
      keyboardWillShow?.remove();
      keyboardWillHide?.remove();
      keyboardDidShow?.remove();
      keyboardDidHide?.remove();
    };
  }, []);

  const handleKeyboardWillShow = (e: KeyboardEvent) => {
    setIsKeyBoardShow(true);
  };

  const handleKeyboardWillHide = () => {
    setIsKeyBoardShow(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[styles.container, isKeyBoardShow ? styles.container2 : {}]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={[
            styles.containerInput,
            {
              paddingBottom: 20,
            },
          ]}>
          <Image
            source={{
              uri: 'https://deviet.vn/wp-content/uploads/2019/04/vuong-quoc-anh.jpg',
            }}
            style={styles.imageAvatar}
          />
          <TextInput style={styles.input} placeholder={'Comment'} />
          <TouchableOpacity style={{paddingHorizontal: 10}}>
            <Image source={ic_send} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  container2: {
    top: 0,
    backgroundColor: '#00000040',
    elevation: 2,
    justifyContent: 'flex-end',
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
    backgroundColor: colors.white,
    paddingBottom: Platform.select({ios: 0, android: 10}),
    paddingLeft: 10,
  },
  imageAvatar: {
    height: 30,
    width: 30,
    borderRadius: 20,
  },
  input: {
    backgroundColor: '#F5F5FF',
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingLeft: 20,
    marginLeft: 12,
  },
});
