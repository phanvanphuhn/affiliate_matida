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
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from 'react-native';
import {useKeyboard} from '@react-native-community/hooks';
import {colors, heightScreen, scaler, stylesCommon} from '@stylesCommon';
import {ic_send, iconClose, iconReplyArr} from '@images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useActionFeed from '../useActionFeed';
import useCommentFeed from '../useCommentFeed';
import {useSelector} from 'react-redux';
import {AppImage} from '@component';
import {useVideo} from './Container';
import {useTranslation} from 'react-i18next';

interface Props extends ViewProps {
  onChangeText: (value: string) => void;
  onComment: () => void;
  value: string;
}

function KeyboardShift(props: Props) {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();

  const user = useSelector((state: any) => state.auth.userInfo);

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
  const {state, setState} = useVideo();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[styles.container, isKeyBoardShow ? styles.container2 : {}]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={{
            paddingTop: 10,
            backgroundColor: colors.white,
            paddingBottom: Platform.select({ios: 0, android: 10}),
            paddingLeft: 10,
          }}>
          {state?.comment ? (
            <View
              style={[
                styles.viewRepLy,
                {
                  paddingHorizontal: scaler(20),
                },
              ]}>
              <View style={styles.viewRow}>
                <Image source={iconReplyArr} style={styles.iconReply} />
                <Text style={styles.txtTitleReply}>{t('post.titleReply')}</Text>
                <Text style={styles.txtNameReply} numberOfLines={1}>
                  {' '}
                  {state?.comment?.user?.name}{' '}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setState({comment: undefined});
                }}>
                <Image source={iconClose} style={styles.iconClose} />
              </TouchableOpacity>
            </View>
          ) : null}
          <View
            style={[
              styles.containerInput,
              {
                paddingBottom: 20,
              },
            ]}>
            <AppImage uri={user?.avatar} style={styles.imageAvatar} />
            <TextInput
              style={styles.input}
              placeholder={'Comment'}
              value={props?.value || ''}
              onChangeText={props.onChangeText}
            />
            <TouchableOpacity
              onPress={props.onComment}
              style={{paddingHorizontal: 10}}>
              <Image source={ic_send} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
export default React.memo(KeyboardShift);
const styles = StyleSheet.create({
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconReply: {
    width: scaler(16),
    height: scaler(16),
  },
  iconClose: {
    width: scaler(20),
    height: scaler(20),
  },
  txtTitleReply: {
    color: '#515151',
    ...stylesCommon.fontWeight400,
    marginLeft: scaler(14),
    fontSize: scaler(12),
  },
  txtNameReply: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(12),
    maxWidth: '70%',
  },
  viewRepLy: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingBottom: scaler(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
