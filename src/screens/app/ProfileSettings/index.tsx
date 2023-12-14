import {
  AppButton,
  AppCameraModal,
  AppImage,
  AppInput,
  AppSelectPhoneCode,
  Header,
  ModalConfirmDelete,
  ModalConfirmSettings,
  SelectionPicker,
  ViewDisableInput,
} from '@component';
import {iconCamera, SvgArrowLeft} from '@images';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {colors, scaler, widthScreen} from '@stylesCommon';
import {
  event,
  eventType,
  trackingAppEvent,
  useUXCam,
  validateForm,
  validateFormVN,
} from '@util';
import {Formik, FormikProps} from 'formik';
import {t} from 'i18next';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {DueDateComponent} from './DueDateComponent';

import {logOut, saveDataUser} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {
  deleteAccount,
  getUserInfoApi,
  GlobalService,
  updateUserInfo,
  uploadImage,
} from '@services';
import * as yup from 'yup';
import {trackUser} from '@services/webengageManager.tsx';

const ProfileSettingsScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const lang = useSelector((state: any) => state?.auth?.lang);
  const [avatar, setAvatar] = useState<any>();
  const [visible, setVisible] = useState<boolean>(false);

  const [phoneCode, setPhoneCode] = useState<any>(84);
  const [countryCode, setCountryCode] = useState<any>(null);
  const [date, setDate] = useState<any>();
  const [pregnant_type, setPregnanttype] = useState<any>(1);
  const [imageUrlApi, setImageUrlApi] = useState<any>(null);
  const [loading, setLoading] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  useUXCam(ROUTE_NAME.PROFILE_SETTINGS);

  // const [isChange, setIsChange] = useState<boolean>(false);

  const refInit = useRef({
    avatar: user?.avatar,
    pregnant: user?.pregnant_type,
  }).current;

  const formRef = useRef<
    FormikProps<{
      name: string;
      email: string;
      phone_number: string;
      baby_name: string;
      username: string;
    }>
  >();

  const getListPregnancy: {label: string; value: string | number}[] = [
    {
      label: t('profileSettings.typeOfPregnancyDetail.one_baby'),
      value: 1,
    },
    {
      label: t('profileSettings.typeOfPregnancyDetail.multiple'),
      value: 2,
    },
  ];

  const validationSchema = yup.object({
    name: validateForm().name,
    email: validateForm().email,
    phone_number: validateForm().phone,
    baby_name: validateForm().babyName,
    username: validateForm().username,
  });

  const validationSchemaVN = yup.object({
    name: validateFormVN().name,
    email: validateFormVN().email,
    phone_number: validateFormVN().phone,
    baby_name: validateFormVN().babyName,
    username: validateFormVN().username,
  });
  console.log('validationSchemaVN: ', validationSchemaVN);
  const initialValuesProfileSettings: any = {
    name: user?.name ? user?.name : '',
    email: user?.email ? user?.email : '',
    phone_number: user?.phone_number ? user?.phone_number : '',
    baby_name: user?.baby_name ? user?.baby_name : '',
    username: user?.username ? user?.username : '',
  };

  const getUserInfo = async () => {
    try {
      const res = await getUserInfoApi();
      dispatch(saveDataUser(res?.data?.data));
    } catch (error) {}
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserInfo();
    }, []),
  );

  useEffect(() => {
    trackingAppEvent(event.SCREEN.PROFILE_SETTINGS, {}, eventType.AFF_FLYER);
    if (user) {
      if (user?.calling_code) {
        setPhoneCode(user?.calling_code?.replace('+', ''));
      }
      setCountryCode(user?.country_code);
      setDate(user?.due_date);
      if (user?.avatar) {
        setAvatar({uri: user?.avatar});
      }
      setPregnanttype(user?.pregnant_type);
      setImageUrlApi(user?.avatar);
    }
  }, [user]);

  const isChangeFormik = () => {
    const init = initialValuesProfileSettings;
    const values = formRef?.current?.values;
    return (
      values?.name !== init?.name ||
      values?.email !== init?.email ||
      values?.phone_number !== init?.phone_number ||
      values?.baby_name !== init?.baby_name ||
      values?.username !== init?.username ||
      imageUrlApi !== refInit.avatar ||
      pregnant_type !== refInit.pregnant
    );
  };

  const handleConfirm = () => {
    if (isChangeFormik()) {
      setShowModal(true);
    } else {
      navigation.goBack();
    }
  };
  //Hàm gọi khi ấn button Save
  const handleSave = async (values: any) => {
    console.log('values?.name: ', values?.name);
    try {
      if (values?.email?.length === 0) {
        const body = {
          name: values?.name,
          baby_name: values?.baby_name,
          username: values?.username,
          pregnant_type: pregnant_type,
          avatar: imageUrlApi,
        };
        const body2 = {
          name: values?.name,
          baby_name: values?.baby_name,
          username: values?.username,
          pregnant_type: pregnant_type,
          avatar: imageUrlApi,
          phone_number: values?.phone_number,
          calling_code:
            values?.phone_number?.length > 0 ? `+${phoneCode}` : null,
          country_code: countryCode,
        };
        const res: any = await updateUserInfo(
          user?.facebook_id || user?.zalo_id || user?.apple_id ? body2 : body,
        );
        trackUser(values);
        dispatch(saveDataUser(res?.data?.user));
        showMessage({
          message: res?.data?.message,
          type: 'default',
          backgroundColor: colors.success_message,
        });
        navigation.goBack();
        GlobalService.hideLoading();
      } else {
        const body = {
          name: values?.name,
          baby_name: values?.baby_name,
          username: values?.username,
          pregnant_type: pregnant_type,
          email: values?.email,
          avatar: imageUrlApi,
        };
        const body2 = {
          name: values?.name,
          baby_name: values?.baby_name,
          username: values?.username,
          pregnant_type: pregnant_type,
          email: values?.email,
          avatar: imageUrlApi,
          phone_number: values?.phone_number,
          calling_code:
            values?.phone_number?.length > 0 ? `+${phoneCode}` : null,
          country_code: countryCode,
        };
        const res: any = await updateUserInfo(
          user?.facebook_id || user?.zalo_id || user?.apple_id ? body2 : body,
        );
        trackUser(values);
        dispatch(saveDataUser(res?.data?.user));
        showMessage({
          message: res?.data?.message,
          type: 'default',
          backgroundColor: colors.success_message,
        });
        navigation.goBack();
        GlobalService.hideLoading();
      }
    } catch (error: any) {
      showMessage({
        message: error?.message,
        type: 'default',
        backgroundColor: colors.error_message,
      });
      navigation.goBack();
      GlobalService.hideLoading();
    }
  };

  const handleChangeAvatar = async (response: any) => {
    setVisible(false);
    try {
      // if (response) {
      const data = new FormData();
      const imageUpload = {
        uri:
          Platform.OS === 'ios'
            ? response?.path.replace('file://', '')
            : response?.path,
        type: 'image/jpeg',
        name: response?.fileName ? response?.fileName : response?.path,
      };
      data.append('file', imageUpload);
      const res = await uploadImage(data);
      setImageUrlApi(res?.data?.url);
      // }
    } catch (error) {}
  };

  const onLoadStart = useCallback(() => {
    setLoading(true);
  }, []);

  const onLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const handleSubmitDelete = async () => {
    try {
      GlobalService.showLoading();
      const res = await deleteAccount(user?.id);
      showMessage({
        message: res?.data?.message,
        type: 'default',
        backgroundColor: colors.success_message,
      });
      dispatch(logOut());
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <Formik
          initialValues={initialValuesProfileSettings}
          //@ts-ignore
          innerRef={formRef}
          enableReinitialize
          onSubmit={handleSave}
          validationSchema={lang === 2 ? validationSchemaVN : validationSchema}
          validateOnChange={false}>
          {({handleChange, errors, touched, handleSubmit, values}) => (
            <>
              <Header
                title={t('profileSettings.profileSettings')}
                IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
                onPressLeft={handleConfirm}
                styleContainer={{backgroundColor: '#FFFFFF'}}
                styleContainerSafeArea={{backgroundColor: '#FFFFFF'}}
              />
              <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}>
                <View style={styles.viewRoot}>
                  <View style={styles.viewCenter}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.viewAvatar}
                      onPress={() => setVisible(true)}>
                      <AppImage
                        uri={imageUrlApi}
                        style={styles.avatarImage}
                        user
                      />
                      {/* {imageUrlApi?.length > 0 ? (
                        <>
                          <FastImage
                            style={styles.avatarImage}
                            source={{
                              uri: `${imageUrlApi}`,
                              priority: FastImage.priority.high,
                            }}
                            resizeMode="cover"
                            onLoadStart={() => onLoadStart()}
                            onLoad={() => onLoad()}
                          />
                        </>
                      ) : (
                        <Image
                          source={avatarDefault}
                          style={styles.avatarImage}
                        />
                      )} */}
                      <Image source={iconCamera} style={styles.iconCamera} />
                      {/* {loading ? (
                        <View style={styles.viewLoading}>
                          <ActivityIndicator
                            color={colors.primary}
                            size="small"
                          />
                        </View>
                      ) : null} */}
                    </TouchableOpacity>
                    <AppCameraModal
                      visible={visible}
                      setVisible={setVisible}
                      onPress={handleChangeAvatar}
                    />
                  </View>
                  <AppInput
                    style={[styles.input, {marginTop: scaler(0)}]}
                    onValueChange={handleChange('name')}
                    label={t('profileSettings.yourName')}
                    value={values.name}
                    error={errors.name}
                  />
                  <AppInput
                    style={styles.input}
                    onValueChange={handleChange('username')}
                    label={t('signUp.username')}
                    value={values.username}
                    error={errors.username}
                  />
                  <AppInput
                    style={styles.input}
                    onValueChange={handleChange('email')}
                    label={t('profileSettings.email')}
                    value={values.email}
                    error={errors.email}
                  />

                  <View style={styles.viewRow}>
                    <AppSelectPhoneCode
                      defaultCode={countryCode ? countryCode : 'VN'}
                      onChangeFlag={(phoneCode: any, countryCode: any) => {
                        setPhoneCode(phoneCode);
                        setCountryCode(countryCode);
                      }}
                      value={phoneCode}
                      disable={user?.facebook_id ? false : true}
                    />
                    <View>
                      {user?.facebook_id || user?.zalo_id || user?.apple_id ? (
                        <AppInput
                          label={`${t('signUp.phoneNumber')}`}
                          value={values.phone_number}
                          onValueChange={handleChange('phone_number')}
                          error={errors.phone_number}
                          style={styles.customInput}
                          keyboardType="numeric"
                        />
                      ) : (
                        <ViewDisableInput
                          label={t('signUp.phoneNumber')}
                          value={values.phone_number}
                          style={styles.customInput}
                        />
                      )}
                    </View>
                  </View>
                  {/* <View
                    style={{
                      paddingLeft:
                        Platform.OS === 'ios' ? scaler(12) : scaler(16),
                    }}>
                    <DueDateComponent dateValue={date} />
                  </View> */}
                  {/* <AppInput
                    style={styles.input}
                    onValueChange={handleChange('baby_name')}
                    label={t('profileSettings.babyName')}
                    value={values.baby_name}
                    error={errors.baby_name}
                  /> */}

                  {/* <SelectionPicker
                    listItem={getListPregnancy}
                    value={pregnant_type}
                    stylesSelection={styles.viewBabyName}
                    placeholder={t('profileSettings.typeOfPregnancy')}
                    onPress={value => setPregnanttype(value)}
                  /> */}
                  {/* {!!errors?.pregnant_type && (
                  <Text style={styles.error}>{errors?.pregnant_type}</Text>
                )} */}
                </View>
                <AppButton
                  titleButton={t('profileSettings.deleteAccount')}
                  customStyleButton={styles.buttonDelete}
                  customStyleText={{color: colors.primary}}
                  onClick={() => {
                    setShowModalDelete(true);
                  }}
                />

                <AppButton
                  titleButton={t('profileSettings.save')}
                  customStyleButton={styles.buttonSave}
                  onClick={handleConfirm}
                />
                <ModalConfirmSettings
                  // visible={showModal}
                  visible={showModal}
                  titleHeader={t('profileSettings.titleConfirm')}
                  onCancel={() => navigation.goBack()}
                  onConfirm={() => {
                    handleSubmit();
                    setShowModal(false);
                  }}
                />
                <ModalConfirmDelete
                  // visible={showModal}
                  visible={showModalDelete}
                  titleHeader={t('profileSettings.titleConfirm')}
                  onCancel={() => setShowModalDelete(false)}
                  onConfirm={() => {
                    handleSubmitDelete();
                    setShowModalDelete(false);
                  }}
                />
              </KeyboardAwareScrollView>
            </>
          )}
        </Formik>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  scrollView: {
    paddingBottom: scaler(40),
    paddingHorizontal: scaler(16),
  },
  viewAvatar: {
    marginBottom: scaler(20),
  },
  avatarImage: {
    width: scaler(80),
    height: scaler(80),
    borderRadius: scaler(80),
    backgroundColor: colors.gray,
  },
  iconCamera: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  input: {
    backgroundColor: colors.gray100,
    marginTop: scaler(20),
  },
  buttonSave: {
    marginTop: scaler(27),
  },
  viewBabyName: {
    backgroundColor: colors.gray100,
    marginTop: scaler(20),
  },
  viewRow: {
    flexDirection: 'row',
    marginTop: scaler(20),
    justifyContent: 'space-between',
  },
  customInput: {
    width: widthScreen - scaler(76) - scaler(32) - scaler(12) - scaler(32),
  },
  error: {
    marginTop: scaler(4),
    color: colors.red,
    fontSize: scaler(12),
  },
  inputName: {
    width: widthScreen / 2 - scaler(24),
  },
  viewCenter: {
    width: '100%',
    alignItems: 'center',
  },
  viewLoading: {
    width: scaler(80),
    height: scaler(80),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRight: {
    width: scaler(30),
    height: scaler(30),
    tintColor: colors.primary,
  },
  buttonDelete: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    paddingLeft: scaler(12),
  },
  viewRoot: {
    padding: scaler(16),
    backgroundColor: '#FFFFFF',
    marginVertical: scaler(16),
    borderRadius: scaler(8),
  },
});

export {ProfileSettingsScreen};
