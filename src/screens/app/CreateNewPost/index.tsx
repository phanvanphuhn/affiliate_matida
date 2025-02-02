/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {AppCameraModal2, AppCheckBox, AppImage, Header} from '@component';
import {SvgArrowLeft, avatarDefault, imageUpload} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {GlobalService, createPostApi, uploadImage} from '@services';
import {trackAskAQuestionClicked} from '@services/webengageManager.tsx';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {
  event,
  eventType,
  hasWhiteSpace,
  trackingAppEvent,
  useUXCam,
} from '@util';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {showMessage} from 'react-native-flash-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

const CreateNewPost = (props: {
  route: {
    params: {
      message?: string;
    };
  };
}) => {
  const message = props?.route?.params?.message;

  const {t} = useTranslation();
  const navigation = useNavigation();
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const [title, setTitle] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [content, setContent] = useState<any>(message ?? '');
  const [visible, setVisible] = useState<boolean>(false);
  const [imageUrlApi, setImageUrlApi] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [isFocused, setIsFocused] = useState(false);

  useUXCam(ROUTE_NAME.CREATE_NEWPOST);

  useEffect(() => {
    trackingAppEvent(event.SCREEN.CREATE_NEWPOST, {}, eventType.AFF_FLYER);
  }, []);

  const createPost = async () => {
    try {
      GlobalService.showLoading();
      setLoading(true);
      const body = {
        title: title,
        content: content,
        image: imageUrlApi,
        is_anonymous: isAnonymous,
      };
      trackingAppEvent(
        event.FORUM.POST_IN_FORUM,
        {content: body},
        eventType.AFF_FLYER,
      );
      const res = await createPostApi(body);
      showMessage({
        message: t('post.message_success_post'),
        type: 'default',
        backgroundColor: colors.success_message,
      });
      navigation.goBack();
    } catch (error) {
    } finally {
      setLoading(false);
      GlobalService.hideLoading();
    }
  };

  const handleChangeAvatar = async (response: any) => {
    setVisible(false);
    try {
      const data = new FormData();
      const imageUpload = {
        uri:
          Platform.OS === 'ios'
            ? response?.path.replace('file://', '')
            : response?.path,
        type: 'image/jpeg',
        name: response?.fileName ? response?.fileName : response?.path,
      };
      GlobalService.showLoading();
      data.append('file', imageUpload);
      const res = await uploadImage(data);
      setImageUrlApi(res?.data?.url);
      GlobalService.hideLoading();
    } catch (error) {
      Toast.show({
        visibilityTime: 4000,
        text1: t('error.uploadImageFail'),
        text1NumberOfLines: 2,
        position: 'top',
      });
      GlobalService.hideLoading();
    }
  };

  const onLoadStart = useCallback(() => {
    setLoading(true);
  }, []);

  const onLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={styles.container}>
      <Header
        title={t('post.create_new')}
        routeName={ROUTE_NAME.CREATE_NEWPOST}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
        ComponentRight={
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.buttonPost,
              {
                backgroundColor:
                  content?.length === 0 || hasWhiteSpace(content)
                    ? 'rgba(251,132,132, 0.5)'
                    : colors.primary,
              },
            ]}
            onPress={createPost}
            disabled={
              content?.length === 0 || hasWhiteSpace(content) || loading
            }>
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.txtButton}>{t('post.post')}</Text>
            )}
          </TouchableOpacity>
        }
      />
      <KeyboardAwareScrollView>
        <View style={[styles.container, styles.padding]}>
          <View style={styles.viewUser}>
            {user?.avatar?.length > 0 ? (
              <AppImage user uri={user?.avatar} style={styles.imageAvatar} />
            ) : (
              <Image source={avatarDefault} style={styles.imageAvatar} />
            )}
            <Text style={styles.txtName} numberOfLines={2}>
              {user?.name}{' '}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
            }}>
            <AppCheckBox
              active={isAnonymous}
              // title="Post anonymously in forum"
              title={t('post.anonymous')}
              onPress={() => {
                trackAskAQuestionClicked(true, user?.name);
                trackingAppEvent(
                  event.FORUM.POST_ANONYMOUSLY,
                  {},
                  eventType.MIX_PANEL,
                );
                setIsAnonymous(!isAnonymous);
              }}
            />
            {/* <Text>Post anonymously in forum</Text> */}
          </View>
          <TouchableOpacity
            style={styles.viewImage}
            onPress={() => setVisible(true)}>
            {imageUrlApi?.length > 0 ? (
              <>
                <FastImage
                  style={styles.viewImageBig}
                  source={{
                    uri: `${imageUrlApi}`,
                  }}
                  resizeMode="contain"
                  onLoadStart={() => onLoadStart()}
                  onLoad={() => onLoad()}
                />
              </>
            ) : (
              <Image source={imageUpload} style={styles.imageUpload} />
            )}
            {loading ? (
              <View style={styles.viewLoading}>
                <ActivityIndicator color={colors.primary} size="small" />
              </View>
            ) : null}
          </TouchableOpacity>
          <View style={styles.viewInput}>
            <TextInput
              style={styles.input}
              onChangeText={(text: any) => setContent(text)}
              value={content}
              placeholder={isFocused ? '' : `${t('post.placeHolderPost')}`}
              multiline={true}
              maxLength={20000}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <AppCameraModal2
        visible={visible}
        setVisible={setVisible}
        onPress={handleChangeAvatar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  header: {
    paddingTop: scaler(20),
    marginTop: 0,
    alignItems: 'center',
  },
  padding: {
    paddingHorizontal: scaler(20),
  },
  viewUser: {
    flexDirection: 'row',
    width: '100%',
    marginTop: scaler(30),
    marginBottom: scaler(8),
    alignItems: 'center',
  },
  imageAvatar: {
    width: scaler(32),
    height: scaler(32),
    borderRadius: scaler(32) / 2,
  },
  txtName: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    marginLeft: scaler(8),
    flex: 1,
  },
  buttonPost: {
    width: scaler(71),
    height: scaler(40),
    borderRadius: scaler(8),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButton: {
    color: '#FFFFFF',
    fontSize: scaler(14),
    ...stylesCommon.fontWeight600,
  },
  viewInput: {
    height: scaler(260),
    marginTop: scaler(20),
    padding: scaler(16),
    backgroundColor: '#F6F6F6',
    borderRadius: scaler(8),
  },
  input: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    color: colors.textColor,
    // marginBottom: scaler(16),
  },
  txtTitle: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(16),
    color: colors.textColor,
    marginBottom: scaler(8),
  },
  viewImage: {
    width: '100%',
    height: scaler(200),
    marginTop: scaler(10),
    borderRadius: scaler(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5F4',
  },
  imageUpload: {
    width: scaler(80),
    height: scaler(80),
    tintColor: colors.primary,
  },
  viewImageBig: {
    width: '100%',
    height: scaler(200),
    borderRadius: scaler(8),
  },
  viewLoading: {
    width: '100%',
    height: scaler(200),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: scaler(8),
  },
});

export {CreateNewPost};
