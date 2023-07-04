import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {scaler, stylesCommon, colors, widthScreen} from '@stylesCommon';
import {Header, AppCameraModal2} from '@component';
import {SvgArrowLeft, iconEdit} from '@images';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {AppImage} from '@component';
import {avatarDefault} from '@images';
import {GlobalService, uploadImage, editPostApi} from '@services';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {imageUpload} from '@images';
import FastImage from 'react-native-fast-image';
import {showMessage} from 'react-native-flash-message';
import {hasWhiteSpace, useUXCam} from '@util';
import {ROUTE_NAME} from '@routeName';
import {getPostInfo} from '@services';
import {trackingAppEvent, event} from '@util';

const EditPost = (props: any) => {
  const {route} = props;
  const {id} = route?.params;
  const {t} = useTranslation();
  const navigation = useNavigation();
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState<any>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [imageUrlApi, setImageUrlApi] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [isFocused, setIsFocused] = useState(false);

  useUXCam(ROUTE_NAME.EDIT_POST);

  const createPost = async () => {
    try {
      GlobalService.showLoading();
      const body = {
        content: content,
        image: imageUrlApi,
      };
      const res = await editPostApi(id, body);
      showMessage({
        message: t('post.message_success_post_edit'),
        type: 'default',
        backgroundColor: colors.success_message,
      });
      navigation.goBack();
      GlobalService.hideLoading();
    } catch (error) {
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

  const getDataDetail = async () => {
    try {
      GlobalService.showLoading();
      const res = await getPostInfo(id);
      setContent(res?.data?.content);
      setImageUrlApi(res?.data?.image);
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  useEffect(() => {
    getDataDetail();
    trackingAppEvent(event.SCREEN.EDIT_POST, {});
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={t('post.edit_post')}
        routeName={ROUTE_NAME.CREATE_NEWPOST}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
        ComponentRight={
          <TouchableOpacity
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
            disabled={content?.length === 0 || hasWhiteSpace(content)}>
            <Text style={styles.txtButton}>{t('post.edit')}</Text>
          </TouchableOpacity>
        }
        // styleContainer={styles.header}
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
            {/* <Text style={styles.txtTitle}>{t('post.content')}:</Text> */}
            <TextInput
              style={styles.input}
              onChangeText={(text: any) => setContent(text)}
              value={content}
              placeholder={isFocused ? '' : `${t('post.placeHolderPost')}`}
              multiline={true}
              maxLength={1000}
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
    width: scaler(90),
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
    marginBottom: scaler(16),
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

export {EditPost};
