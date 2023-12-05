import {AppButton} from '@component';
import {iconHeart, imageIntro, SvgLogo} from '@images';
import {useNavigation, useRoute} from '@react-navigation/native';
import {scaler} from '@stylesCommon';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Platform, StatusBar, Text, View} from 'react-native';
import {styles} from './styles';

import {ROUTE_NAME} from '@routeName';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Login} from '../Login';
import {SignUp} from '../SignUp';

import {changeStatusLogin, saveDataLoginFacebook} from '@redux';
import {GlobalService, loginApple, loginFacebook, loginZalo} from '@services';
import {useDispatch, useSelector} from 'react-redux';

import {appleAuth} from '@invertase/react-native-apple-authentication';
import {
  event,
  eventType,
  loginWebEngage,
  trackEventBranch,
  trackingAppEvent,
  useUXCam,
} from '@util';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {Constants, login as LoginWithZalo} from 'react-native-zalo-kit';
import reactotron from 'reactotron-react-native';
import {trackUser} from '@services/webengageManager.tsx';

const Intro = () => {
  const {t} = useTranslation();
  const route = useRoute();
  const userInfo = useSelector((state: any) => state?.auth?.userInfo);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [login, showModalLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const lang = useSelector((state: any) => state?.auth?.lang);

  useUXCam(ROUTE_NAME.INTRO);

  if (route?.name === ROUTE_NAME.INTRO) {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('dark-content');
    }
  }

  const showLogin = useCallback(() => {
    showModalLogin(!login);
  }, [login]);

  const showSignUp = useCallback(() => {
    setSignUp(!signUp);
  }, [signUp]);

  const onOpenSignUp = async () => {
    showModalLogin(false);
    showSignUp();
  };

  const onOpenSignIn = async () => {
    setSignUp(false);
    showLogin();
  };

  const onSuccess = (value: any) => {
    loginWebEngage(`${value?.user?.id}Phone`);
    trackUser(value?.user);
    if (value?.user?.due_date) {
      dispatch(changeStatusLogin(true));
    } else {
      navigation.navigate(ROUTE_NAME.ONBOARDING_V2);
    }
  };

  const refCheckLoginZalo = useRef(false);

  useEffect(() => {
    // const key = getApplicationHashKey();
    if (Platform.OS === 'android') {
    }
  }, []);

  const loginSocial = async (value: any) => {
    if (value === 'Facebook') {
      try {
        LoginManager.logOut();
        LoginManager.setLoginBehavior('web_only');
        const result = await LoginManager.logInWithPermissions([
          'public_profile',
          'email',
        ]);
        const data = await AccessToken.getCurrentAccessToken();
        if (data?.accessToken) {
          const res = await loginFacebook(data?.accessToken);
          dispatch(saveDataLoginFacebook(res?.data));
          loginWebEngage(`${res?.data?.data?.id}Facebook`);
          trackUser(res?.data?.data);
          if (res?.data?.data?.due_date || res?.data?.data?.is_skip) {
            dispatch(changeStatusLogin(true));
            trackingAppEvent(event.AUTH.CLICK_LOGIN, {}, eventType.AFF_FLYER);
            trackEventBranch(event.BRANCH.LOGIN, {}, true);
          } else {
            const eventParams = {
              af_registration_method: 'Facebook',
            };
            trackingAppEvent(
              event.AUTH.CLICK_SIGN_UP_SUCCESS,
              eventParams,
              eventType.AFF_FLYER,
            );
            trackEventBranch(event.BRANCH.SIGNUP, eventParams, true);
            navigation.navigate(ROUTE_NAME.ONBOARDING_V2);
          }
          GlobalService.hideLoading();
        }
      } catch (error) {
        GlobalService.hideLoading();
      }
    } else if (value === 'Zalo') {
      if (Platform.OS === 'android') {
        const oauthCode: any = await LoginWithZalo(
          Constants.AUTH_VIA_APP_OR_WEB,
        );
        if (!refCheckLoginZalo.current) {
          refCheckLoginZalo.current = true;
          //@ts-ignore
          const res = await loginZalo(oauthCode?.accessToken);
          refCheckLoginZalo.current = false;
          dispatch(saveDataLoginFacebook(res?.data));
          loginWebEngage(`${res?.data?.data?.id}ZALO-android`);
          trackUser(res?.data?.data);
          if (res?.data?.data?.due_date || res?.data?.data?.is_skip) {
            dispatch(changeStatusLogin(true));
            trackingAppEvent(event.AUTH.CLICK_LOGIN, {}, eventType.AFF_FLYER);
            trackEventBranch(event.BRANCH.LOGIN, {}, true);
          } else {
            const eventParams = {
              af_registration_method: 'Zalo',
            };
            trackingAppEvent(
              event.AUTH.CLICK_SIGN_UP_SUCCESS,
              eventParams,
              eventType.AFF_FLYER,
            );
            trackEventBranch(event.BRANCH.SIGNUP, eventParams, true);
            navigation.navigate(ROUTE_NAME.ONBOARDING_V2);
          }
        }
      } else {
        const oauthCode: any = await LoginWithZalo(
          Constants.AUTH_VIA_APP_OR_WEB,
        );
        const res = await loginZalo(oauthCode?.accessToken);
        dispatch(saveDataLoginFacebook(res?.data));
        loginWebEngage(`${res?.data?.data?.id}Zalo-ios`);
        trackUser(res?.data?.data);
        if (res?.data?.data?.due_date || res?.data?.data?.is_skip) {
          dispatch(changeStatusLogin(true));
          trackingAppEvent(event.AUTH.CLICK_LOGIN, {}, eventType.AFF_FLYER);
          trackEventBranch(event.BRANCH.LOGIN, {}, true);
        } else {
          const eventParams = {
            af_registration_method: 'Zalo',
          };
          trackingAppEvent(
            event.AUTH.CLICK_SIGN_UP_SUCCESS,
            eventParams,
            eventType.AFF_FLYER,
          );
          trackEventBranch(event.BRANCH.SIGNUP, eventParams, true);
          navigation.navigate(ROUTE_NAME.ONBOARDING_V2);
        }
      }
    } else if (value === 'Apple') {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        const res = await loginApple(appleAuthRequestResponse?.identityToken);
        dispatch(saveDataLoginFacebook(res?.data));
        reactotron.log?.('LOGIN APPLE', res);
        loginWebEngage(`${res?.data?.data?.id}Apple`);
        trackUser(res?.data?.data);
        if (res?.data?.data?.due_date || res?.data?.data?.is_skip) {
          dispatch(changeStatusLogin(true));
          trackingAppEvent(event.AUTH.CLICK_LOGIN, {}, eventType.AFF_FLYER);
          trackEventBranch(event.BRANCH.LOGIN, {}, true);
        } else {
          const eventParams = {
            af_registration_method: 'Apple',
          };
          trackingAppEvent(
            event.AUTH.CLICK_SIGN_UP_SUCCESS,
            eventParams,
            eventType.AFF_FLYER,
          );
          trackEventBranch(event.BRANCH.SIGNUP, eventParams, true);
          navigation.navigate(ROUTE_NAME.ONBOARDING_V2);
        }
      } else {
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      bouncesZoom={false}
      scrollEnabled={false}
      style={styles.containerScroll}>
      <View style={styles.container}>
        <Image
          source={imageIntro}
          style={styles.imageIntro}
          resizeMode="cover"
        />
        <View style={styles.viewBottomText}>
          <SvgLogo />
          {lang === 2 ? (
            <>
              <Text style={[styles.txtBottom, {marginTop: scaler(12)}]}>
                Chào bạn,
              </Text>
              <View style={{flexDirection: 'row', marginBottom: scaler(12)}}>
                <Text style={styles.txtBottom}>Matida đây</Text>
                <Image source={iconHeart} style={styles.imageHeart} />
              </View>
            </>
          ) : (
            <Text style={styles.txtBottom}>{t('intro.introTitle')}</Text>
          )}
          {lang === 2 ? (
            <Text style={[styles.txtBottomContent, {width: '100%'}]}>
              Ứng dụng đồng hành cùng mẹ bầu trong hành trình làm mẹ. Cùng theo
              dõi thai kỳ, lắng nghe chia sẻ từ các chuyên gia và mẹ bầu khác.
              Khám phá ngay!
            </Text>
          ) : (
            <Text style={styles.txtBottomContent}>
              {t('intro.introContent')}
            </Text>
          )}
        </View>
        <View style={styles.viewBottom}>
          <AppButton titleButton={t('login.logIn')} onClick={showLogin} />
          <AppButton
            titleButton={t('login.signUp')}
            onClick={showSignUp}
            customStyleButton={styles.customButton}
            customStyleText={styles.customTextButton}
          />
        </View>
        {login === true ? (
          <View style={styles.viewModal}>
            <Login
              visible={login}
              closeModal={showLogin}
              onOpenSignUp={onOpenSignUp}
              onSuccess={onSuccess}
              loginSocial={loginSocial}
            />
          </View>
        ) : null}
        {signUp === true ? (
          <View style={styles.viewModal}>
            <SignUp
              visible={signUp}
              closeModal={showSignUp}
              onOpenSignIn={onOpenSignIn}
              onSuccess={onSuccess}
              loginSocial={loginSocial}
            />
          </View>
        ) : null}
      </View>
    </KeyboardAwareScrollView>
  );
};

export {Intro};
