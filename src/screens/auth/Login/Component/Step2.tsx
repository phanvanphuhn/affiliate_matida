import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {iconZalo, iconFacebook} from '@images';
import {AppInput, AppButton, AppSelectPhoneCode} from '@component';
import {colors, stylesCommon, scaler, widthScreen} from '@stylesCommon';
import {useTranslation} from 'react-i18next';
import {loginWithPhone, GlobalService} from '@services';
import {showMessage} from 'react-native-flash-message';

import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import {hasWhiteSpace, validateForm, validateFormVN} from '@util';
 
const Step2 = React.memo((props: any) => {
  const {onChangeStep} = props;
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);

  const formInitialValues = {
    phoneNumber: '',
    callingCode: '84',
  };

  const validationSchema = yup.object().shape({
    phoneNumber: validateForm().phone,
    callingCode: validateForm().callingCode,
  });

  const validationSchemaVN = yup.object().shape({
    phoneNumber: validateFormVN().phone,
    callingCode: validateFormVN().callingCode,
  });

  const onSubmit = async (value: any) => {
    try {
      GlobalService.showLoading();
      const body = {
        ...value,
        callingCode: `+${value?.callingCode}`,
      };
      const res = await loginWithPhone(body);
      showMessage({
        message: res?.data?.message,
        type: 'default',
        backgroundColor: colors.success_message,
      });
      onChangeStep(
        res?.data?.active_token,
        value?.phoneNumber,
        value?.callingCode,
      );
      GlobalService.hideLoading();
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
          <>
            <Text style={styles.txtHeader}>{t('login.signIn')}</Text>
            <Text style={styles.txtContent}>
              {t('login.enterPhoneContent')}
            </Text>
            <View style={styles.viewRow}>
              <AppSelectPhoneCode
                defaultCode="VN"
                onChangeFlag={props.handleChange('callingCode')}
              />
              <View>
                <AppInput
                  label={`${t('signUp.phoneNumber')}`}
                  value={props.values.phoneNumber}
                  onValueChange={props.handleChange('phoneNumber')}
                  error={props.errors.phoneNumber}
                  style={styles.customInput}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <AppButton
              titleButton={t('login.sendOTP')}
              onClick={props.handleSubmit}
              customStyleButton={styles.button}
              disable={
                !props.values.phoneNumber ||
                props.values.phoneNumber?.length === 0 ||
                hasWhiteSpace(props.values.phoneNumber)
              }
            />
          </>
        );
      }}
    </Formik>
  );
});

const styles = StyleSheet.create({
  txtHeader: {
    fontSize: scaler(32),
    marginTop: scaler(57),
    color: '#000000',
    ...stylesCommon.fontPlus500,
  },
  txtContent: {
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
    color: colors.textOpacityColor,
    marginTop: scaler(12),
  },
  customInput: {
    width: widthScreen - scaler(76) - scaler(32) - scaler(12),
  },
  button: {
    marginTop: scaler(32),
  },
  viewRow: {
    flexDirection: 'row',
    marginTop: scaler(80),
  },
});

export {Step2};
