import {AppButton} from '@component';
import {saveLoginInfo} from '@redux';
import {GlobalService, resendCode, verifyLogin} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {event, eventType, trackEventBranch, trackingAppEvent} from '@util';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';

const Step3 = React.memo((props: any) => {
  const {onChangeStep, token, phone, codePhone} = props;
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const resendCodeApi = async () => {
    try {
      GlobalService.showLoading();
      const body = {
        phoneNumber: phone,
        callingCode: `+${codePhone}`,
      };
      const res = await resendCode(body);
      showMessage({
        message: res?.data?.message,
        type: 'default',
        backgroundColor: colors.success_message,
      });
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const onSubmit = async () => {
    try {
      GlobalService.showLoading();
      const body = {
        active_token: token,
        otp: value,
      };
      const res = await verifyLogin(body);
      showMessage({
        message: res?.data?.message,
        type: 'default',
        backgroundColor: colors.success_message,
      });
      trackingAppEvent(event.AUTH.CLICK_LOGIN, {}, eventType.AFF_FLYER);
      trackEventBranch(event.BRANCH.CLICK_LOGIN, {});
      dispatch(saveLoginInfo(res?.data));
      onChangeStep(res?.data);
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  return (
    <>
      <Text style={styles.txtHeader}>{t('login.enterOTP')}</Text>
      <Text style={styles.txtContent}>
        {t('login.enterOTPcontent')}
        <Text style={styles.txtPhone}>
          +{codePhone}
          {phone}
        </Text>
      </Text>
      <View style={styles.viewCode}>
        <CodeField
          ref={ref}
          {...prop}
          value={value}
          onChangeText={setValue}
          cellCount={6}
          // rootStyle={styles.codeFieldRoot}
          keyboardType="numeric"
          renderCell={({index, symbol, isFocused}) => (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        <AppButton
          titleButton={t('login.confirm')}
          onClick={onSubmit}
          customStyleButton={styles.button}
          disable={value?.length < 6}
        />
        <Text style={styles.txtBottom1}>{t('login.haventCode')}</Text>
        <Text style={styles.txtBottom2} onPress={resendCodeApi}>
          {t('login.resendCode')}
        </Text>
      </View>
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
    lineHeight: scaler(25),
  },
  txtPhone: {
    ...stylesCommon.fontWeight700,
    color: '#000000',
  },
  cellRoot: {
    width: scaler(48),
    height: scaler(56),
    borderRadius: scaler(8),
    backgroundColor: '#F6F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusCell: {
    width: scaler(48),
    height: scaler(56),
    borderRadius: scaler(8),
    backgroundColor: '#F6F4F6',
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: scaler(16),
    ...stylesCommon.fontWeight500,
    color: colors.textColor,
  },
  viewCode: {
    marginTop: scaler(80),
  },
  button: {
    marginTop: scaler(32),
  },
  txtBottom1: {
    textAlign: 'center',
    marginVertical: scaler(20),
    color: 'rgba(37, 40, 49, 0.7)',
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
  },
  txtBottom2: {
    textAlign: 'center',
    ...stylesCommon.fontWeight500,
    fontSize: scaler(14),
    color: colors.primary,
  },
});

export {Step3};
