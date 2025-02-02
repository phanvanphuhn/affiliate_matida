import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  Linking,
} from 'react-native';
import Container from '../DetailFeed/components/Container';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ic_background, iconClose, SvgPathBottom, SvgPathTop} from '@images';
import {
  colors,
  heightScreen,
  scaler,
  stylesCommon,
  widthScreen,
} from '@stylesCommon';
import {goBack} from '@navigation';
import useStateCustom from '../../../util/hooks/useStateCustom';
import {Route, useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {useTranslation} from 'react-i18next';
import {FormikProvider, useFormik} from 'formik';
import FormInput from './components/FormInput';
import {validation, validationNewborn} from './validation';
import {GlobalService} from '@services';
import {requestSubcribePlan} from '../../../services/pregnancyProgram';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {changeWeekUserTask} from '@redux';
import {event, eventType, trackingAppEvent} from '@util';
import useBackHandler from '../../../util/hooks/useBackHandler';
import {trackCustomEvent} from '@services/webengageManager';

interface UpdateInformationProps {
  route: any;
}
export interface UpdateInformationState {
  name: string;
  pregnant_week?: string;
  phone: string;
  pregnant_month?: string;
}

const UpdateInformation = (props: UpdateInformationProps) => {
  const {route} = props;
  const {params} = route;
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const dispatch = useDispatch();

  useBackHandler(() => {
    return true;
  });
  const handleSubcribePlan = async (metadata: UpdateInformationState) => {
    trackCustomEvent('Checkout Initiated', {
      user_id: user?.id,
      baby_weeks: user?.pregnantWeek?.weekPregnant?.weeks,
      baby_months: user?.pregnantWeek?.weekPregnant?.months,
      name: metadata.name,
      phone: metadata.phone,
    });
    try {
      let data = {
        plan_code: params?.isConsultant
          ? user?.baby_type === 'newborn'
            ? 'PD1'
            : 'PD'
          : 'PP',
        payment_method: 'bank_transfer',
        metadata: metadata,
      };
      GlobalService.showLoading();
      let res = await requestSubcribePlan(data);
      if (res?.success) {
        if (params?.isConsultant) {
          navigation.navigate(ROUTE_NAME.COMPLETE_PAYMENT, {
            values: res?.data,
            isConsultant: params?.isConsultant,
          });
        } else {
          navigation.navigate(ROUTE_NAME.COMPLETE_PAYMENT, {
            values: res?.data,
            isConsultant: params?.isConsultant,
          });
          dispatch(changeWeekUserTask(parseInt(metadata.pregnant_week)));
        }
      }
    } catch (err) {
      showMessage({
        message: err?.response?.data?.message,
        type: 'danger',
        backgroundColor: colors.primaryBackground,
      });
      console.log('err: ', err);
    } finally {
      GlobalService.hideLoading();
    }
  };
  const formik = useFormik<UpdateInformationState>({
    initialValues:
      user?.baby_type === 'newborn'
        ? {
            name: '',
            pregnant_month: '',
            phone: '',
          }
        : {
            name: '',
            pregnant_week: '',
            phone: '',
          },
    validationSchema:
      user?.baby_type === 'newborn' ? validationNewborn : validation,
    onSubmit: async values => {
      handleSubcribePlan(values);
    },
  });

  const navigation = useNavigation<any>();
  const onNext = () => {
    trackingAppEvent(
      event.MASTER_CLASS.PP_USER_INFO_NEXT,
      {id: user?.id},
      eventType.MIX_PANEL,
    );
    trackingAppEvent(
      event.NEW_HOMEPAGE.doctor_package_user_info,
      {id: user?.id},
      eventType.MIX_PANEL,
    );
    formik.handleSubmit();
  };
  const onPolicy = async () => {
    let url =
      lang == 1
        ? 'https://admin.matida.app/privacy-policy'
        : 'https://admin.matida.app/privacy-policy-vi';
    let isOpen = await Linking.canOpenURL(url);
    if (isOpen) {
      Linking.openURL(url);
    }
  };

  const onTerm = async () => {
    let url =
      lang == 1
        ? 'https://docs.matida.app/privacy-policy/en'
        : 'https://docs.matida.app/privacy-policy/vi';
    let isOpen = await Linking.canOpenURL(url);
    if (isOpen) {
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <FormikProvider value={formik}>
        <View style={styles.container}>
          <TouchableOpacity onPress={goBack} style={styles.buttonBack}>
            <Image source={iconClose} />
          </TouchableOpacity>
          <ScrollView
            bounces={false}
            contentContainerStyle={{paddingBottom: 50}}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.textTitle}>
              {t('pregnancyProgram.yourInformation')}
            </Text>
            <Text style={styles.textSubTitle}>
              {t('pregnancyProgram.pleaseFill')}
            </Text>

            <ImageBackground source={ic_background}>
              <View
                style={{
                  marginTop: -0.3,
                }}>
                <SvgPathBottom />
              </View>
              <View style={styles.containerInput}>
                <FormInput
                  name={'name'}
                  title={t('pregnancyProgram.yourName')}
                  placeholder={'Nguyễn Thị Mama' as string}
                  maxLength={100}
                />
                <FormInput
                  maxLength={10}
                  keyboardType={'number-pad'}
                  name={'phone'}
                  title={t('pregnancyProgram.phoneNumber')}
                  placeholder={'0123 456 789' as string}
                />
                <FormInput
                  name={
                    user?.baby_type === 'newborn'
                      ? 'pregnant_month'
                      : 'pregnant_week'
                  }
                  title={
                    user?.baby_type === 'newborn'
                      ? t('pregnancyProgram.yourBabyMonth')
                      : t('pregnancyProgram.yourPregnancyWeek')
                  }
                  placeholder={'8' as string}
                  maxLength={2}
                  keyboardType={'number-pad'}
                />
              </View>
              <SvgPathTop />
            </ImageBackground>
          </ScrollView>
          <View
            style={{
              paddingHorizontal: scaler(24),
              marginBottom: scaler(36),
            }}>
            <TouchableOpacity onPress={onNext} style={styles.buttonDone}>
              <Text style={styles.textDone}>{t('pregnancyProgram.next')}</Text>
            </TouchableOpacity>
            <Text
              style={{
                color: colors.gray500,
                fontSize: scaler(13),
                textAlign: 'center',
                marginTop: 15,
                ...stylesCommon.fontSarabun400,
              }}>
              {t('pregnancyProgram.byContinue')}{' '}
              <Text
                onPress={onTerm}
                style={{
                  color: colors.pink300,
                  ...stylesCommon.fontSarabun500,
                }}>
                {t('pregnancyProgram.terms')}
              </Text>{' '}
              &{' '}
              <Text
                onPress={onPolicy}
                style={{
                  color: colors.pink300,
                  ...stylesCommon.fontSarabun500,
                }}>
                {t('pregnancyProgram.privacy')}
              </Text>
            </Text>
          </View>
        </View>
      </FormikProvider>
    </SafeAreaView>
  );
};

export default UpdateInformation;

const styles = StyleSheet.create({
  container: {backgroundColor: colors.white, flex: 1},
  buttonBack: {
    alignItems: 'flex-end',
    paddingHorizontal: scaler(15),
    // paddingVertical: scaler(10),
  },
  textTitle: {
    fontSize: scaler(24),
    textAlign: 'center',
    ...stylesCommon.fontWeight600,
  },
  textSubTitle: {
    fontSize: scaler(15),
    textAlign: 'center',
    padding: scaler(15),
    color: colors.textColor,
    ...stylesCommon.fontSarabun400,
  },
  containerInput: {
    backgroundColor: colors.white,
    paddingVertical: scaler(20),
    paddingBottom: '50%',
    paddingHorizontal: scaler(30),
    marginHorizontal: scaler(20),
    marginVertical: scaler(25),
    borderRadius: scaler(16),
    alignItems: 'center',
  },
  textLabel: {
    fontSize: scaler(13),
    color: colors.gray50,
    marginTop: scaler(20),
    textAlign: 'center',
    ...stylesCommon.fontSarabun500,
  },
  input: {
    textAlign: 'center',
    fontSize: scaler(16),
    paddingTop: scaler(10),
    ...stylesCommon.fontWeight400,
  },
  buttonDone: {
    backgroundColor: colors.pink200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaler(15),
    marginTop: scaler(20),
    borderRadius: scaler(40),
  },
  textDone: {
    fontSize: scaler(15),
    color: colors.white,
    ...stylesCommon.fontSarabun600,
  },
  buttonCancel: {
    backgroundColor: colors.gray350,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaler(15),
    marginTop: scaler(12),
    borderRadius: scaler(40),
  },
  textCancel: {
    fontSize: scaler(14),
    color: colors.textColor,
    ...stylesCommon.fontWeight500,
  },
});
