import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {iconZalo, iconFacebook, iconPhone, iconApple} from '@images';
import {AppButton} from '@component';
import {colors, stylesCommon, scaler} from '@stylesCommon';
import {useTranslation} from 'react-i18next';

const Step1 = React.memo((props: any) => {
  const {onOpenSignUp, onChangeStep, loginSocial} = props;
  const {t} = useTranslation();

  return (
    <>
      <Text style={styles.txtHeader}>{t('login.signIn')}</Text>
      <Text style={styles.txtContent}>{t('login.contentLogin')}</Text>
      <AppButton
        titleButton={t('login.continuePhone')}
        customStyleButton={[
          styles.customButton,
          {marginTop: scaler(60), opacity: 0.5},
        ]}
        sourceIcon={iconPhone}
        onClick={onChangeStep}
      />
      <AppButton
        titleButton={t('login.continueFace')}
        customStyleButton={[styles.customButton, styles.customButtonFace]}
        sourceIcon={iconFacebook}
        onClick={() => loginSocial('Facebook')}
      />
      <AppButton
        titleButton={t('login.continueZalo')}
        customStyleButton={[styles.customButton, styles.customButtonZalo]}
        sourceIcon={iconZalo}
        onClick={() => loginSocial('Zalo')}
      />
      {Platform?.OS === 'ios' ? (
        <AppButton
          titleButton="Apple"
          customStyleButton={[styles.customButton, styles.customButtonApple]}
          sourceIcon={iconApple}
          customStyleIcon={styles.customIconButton}
          onClick={() => loginSocial('Apple')}
        />
      ) : null}
      <Text style={styles.txtBottom}>
        <Text style={{color: colors.textSmallColor}}>
          {t('login.dontHaveAccount')}
        </Text>{' '}
        <Text style={{color: colors.primary}} onPress={onOpenSignUp}>
          {t('login.signUp')}
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
    // ...stylesCommon.fontWeight500,
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
  customButtonApple: {
    backgroundColor: '#000000',
  },
  txtBottom: {
    marginTop: scaler(38),
    textAlign: 'center',
  },
  customIconButton: {
    width: scaler(22),
    height: scaler(22),
  },
});

export {Step1};
