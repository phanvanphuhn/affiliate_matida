import {AppButton, AppInput, AppSelectPhoneCode} from '@component';
import {GlobalService, signUpPhone} from '@services';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {hasWhiteSpace, validateForm, validateFormVN} from '@util';
import {Formik} from 'formik';
import {showMessage} from 'react-native-flash-message';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {useSelector} from 'react-redux';
import * as yup from 'yup';

const Step2 = React.memo((prop: any) => {
  const {onChangeStep, onOpenSignIn} = prop;
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);

  const [phoneCode, setPhoneCode] = useState('84');
  const [countryCode, setCountryCode] = useState('VN');

  useEffect(() => {
    setCountryCode('VN');
  }, []);

  const formInitialValues = {
    name: '',
    babyName: '',
    phoneNumber: '',
    email: '',
    callingCode: '',
    username: '',
    country_code: null,
  };

  const validationSchema = yup.object().shape({
    name: validateForm().name,
    babyName: validateForm().babyName,
    phoneNumber: validateForm().phone,
    email: validateForm().email,
    username: validateForm().username,
  });

  const validationSchemaVN = yup.object().shape({
    name: validateFormVN().name,
    babyName: validateFormVN().babyName,
    phoneNumber: validateFormVN().phone,
    email: validateFormVN().email,
    username: validateFormVN().username,
  });

  const onSubmit = async (value: any) => {
    try {
      GlobalService.showLoading();
      if (value?.email?.length === 0) {
        const body = {
          name: value?.name,
          babyName: value?.babyName,
          phoneNumber: value?.phoneNumber,
          callingCode: `+${phoneCode}`,
          country_code: countryCode,
          username: value?.username,
        };
        const res: any = await signUpPhone(body);
        onChangeStep(res?.data?.active_token, value?.phoneNumber, phoneCode);
        showMessage({
          message: res?.data?.message,
          type: 'default',
          backgroundColor: colors.success_message,
        });
        GlobalService.hideLoading();
      } else {
        const res: any = await signUpPhone({
          ...value,
          callingCode: `+${phoneCode}`,
          country_code: countryCode,
        });
        onChangeStep(res?.data?.active_token, value?.phoneNumber, phoneCode);
        showMessage({
          message: res?.data?.message,
          type: 'default',
          backgroundColor: colors.success_message,
        });
        GlobalService.hideLoading();
      }
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={lang === 2 ? validationSchemaVN : validationSchema}
      validateOnChange={false}
      onSubmit={onSubmit}>
      {props => {
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.txtHeader}>{t('signUp.titleSignUpStep2')}</Text>
            <Text style={styles.txtContent}>
              {t('signUp.contentSignUpStep2')}
            </Text>
            <AppInput
              label={`${t('signUp.yourName')}`}
              onValueChange={props.handleChange('name')}
              value={props.values.name}
              error={props.errors.name}
              style={styles.customInputName}
            />
            <AppInput
              label={`${t('signUp.username')}`}
              onValueChange={props.handleChange('username')}
              value={props.values.username}
              error={props.errors.username}
              style={styles.customInput}
            />
            <AppInput
              label={`${t('signUp.nickName')}`}
              onValueChange={props.handleChange('babyName')}
              value={props.values.babyName}
              error={props.errors.babyName}
              style={styles.customInput}
            />
            <View style={styles.viewRow}>
              <AppSelectPhoneCode
                defaultCode="VN"
                onChangeFlag={(phoneCode: any, countryCode: any) => {
                  setPhoneCode(phoneCode);
                  setCountryCode(countryCode);
                }}
              />
              <View>
                <AppInput
                  label={`${t('signUp.phoneNumber')}`}
                  onValueChange={props.handleChange('phoneNumber')}
                  value={props.values.phoneNumber}
                  error={props.errors.phoneNumber}
                  style={styles.customInputPhone}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <AppInput
              label={`${t('signUp.email')}`}
              onValueChange={props.handleChange('email')}
              value={props.values.email}
              error={props.errors.email}
              style={styles.customInputEmail}
            />
            <AppButton
              titleButton={t('signUp.sendVerifiCode')}
              onClick={props.handleSubmit}
              customStyleButton={styles.button}
              disable={
                props.values.name?.length === 0 ||
                props.values.phoneNumber?.length === 0 ||
                hasWhiteSpace(props.values.babyName) ||
                hasWhiteSpace(props.values.name) ||
                hasWhiteSpace(props.values.username)
              }
            />
            <Text style={styles.txtBottom}>
              <Text style={{color: colors.textSmallColor}}>
                {t('signUp.haveAccount')}
              </Text>{' '}
              <Text style={{color: colors.primary}} onPress={onOpenSignIn}>
                {t('login.signIn')}
              </Text>
            </Text>
          </ScrollView>
        );
      }}
    </Formik>
  );
});

const styles = StyleSheet.create({
  txtHeader: {
    fontSize: scaler(32),
    marginTop: scaler(17),
    color: '#000000',
    ...stylesCommon.fontPlus500,
  },
  txtContent: {
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
    color: colors.textOpacityColor,
    marginTop: scaler(12),
  },
  customInputTop: {
    marginTop: scaler(40),
  },
  customInput: {
    marginTop: scaler(20),
  },
  customInputEmail: {
    marginTop: scaler(20),
  },
  button: {
    marginTop: scaler(32),
  },
  txtBottom: {
    marginTop: scaler(38),
    marginBottom: getBottomSpace() + scaler(30),
    textAlign: 'center',
    ...stylesCommon.fontWeight500,
    fontSize: scaler(14),
  },
  viewRow: {
    flexDirection: 'row',
    marginTop: scaler(20),
    justifyContent: 'space-between',
  },
  customInputPhone: {
    width: widthScreen - scaler(76) - scaler(32) - scaler(12),
  },
  customInputName: {
    marginTop: scaler(40),
  },
});

export {Step2};
