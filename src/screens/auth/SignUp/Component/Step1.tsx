import {AppButton} from '@component';
import {iconApple, SvgIconFacebook, SvgIconZalo} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {event, eventType, trackingAppEvent} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, StyleSheet, Text} from 'react-native';

const Step1 = React.memo((props: any) => {
  const {onOpenSignIn, onChangeStep, loginSocial} = props;
  const {t} = useTranslation();

  return (
    <>
      <Text style={styles.txtHeader}>{t('signUp.title')}</Text>
      <Text style={styles.txtContent}>{t('signUp.contentSignUpStep2')}</Text>
      {/* <AppButton
        titleButton={t('signUp.continuePhone')}
        customStyleButton={[styles.customButton, {marginTop: scaler(60)}]}
        sourceIcon={iconPhone}
        onClick={onChangeStep}
      /> */}
      <AppButton
        titleButton={t('signUp.continueFace')}
        customStyleButton={[
          styles.customButton,
          styles.customButtonFace,
          {marginTop: scaler(60)},
        ]}
        icon={<SvgIconFacebook />}
        onClick={() => {
          loginSocial('Facebook');
          const params = {
            af_registration_method: 'Facebook',
          };
          trackingAppEvent(event.AUTH.CLICK_SIGN_UP, params, eventType.AFF_FLYER);
        }}
      />
      <AppButton
        titleButton={t('signUp.continueZalo')}
        customStyleButton={[styles.customButton, styles.customButtonZalo]}
        icon={<SvgIconZalo />}
        onClick={() => {
          loginSocial('Zalo');
          const params = {
            af_registration_method: 'Zalo',
          };
          trackingAppEvent(event.AUTH.CLICK_SIGN_UP, params, eventType.AFF_FLYER);
        }}
      />
      {Platform?.OS === 'ios' ? (
        <AppButton
          titleButton="Apple"
          customStyleButton={[styles.customButton, styles.customButtonApple]}
          sourceIcon={iconApple}
          customStyleIcon={styles.customIconButton}
          onClick={() => {
            loginSocial('Apple');
            const params = {
              af_registration_method: 'Apple',
            };
            trackingAppEvent(event.AUTH.CLICK_SIGN_UP, params, eventType.AFF_FLYER);
          }}
        />
      ) : null}
      <Text style={styles.txtBottom}>
        <Text style={{color: colors.textSmallColor}}>
          {t('signUp.haveAccount')}
        </Text>{' '}
        <Text style={{color: colors.primary}} onPress={onOpenSignIn}>
          {t('login.signIn')}
        </Text>
      </Text>
    </>
  );
});

const styles = StyleSheet.create({
  txtHeader: {
    fontSize: scaler(32),
    marginTop: scaler(27),
    color: '#000000',
    ...stylesCommon.fontPlus500,
  },
  txtContent: {
    fontSize: scaler(18),
    ...stylesCommon.fontWeight400,
    color: colors.textOpacityColor,
    marginTop: scaler(12),
  },
  customButton: {
    marginBottom: scaler(24),
  },
  customButtonFace: {
    backgroundColor: colors.facebook,
  },
  customButtonZalo: {
    backgroundColor: colors.zalo,
  },
  txtBottom: {
    marginTop: scaler(38),
    textAlign: 'center',
  },
  customIconButton: {
    width: scaler(22),
    height: scaler(22),
  },
  customButtonApple: {
    backgroundColor: '#000000',
  },
});

export {Step1};
