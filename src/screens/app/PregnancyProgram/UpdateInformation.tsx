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
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {useTranslation} from 'react-i18next';
import {FormikProvider, useFormik} from 'formik';
import FormInput from './components/FormInput';
import validation from './validation';
import {GlobalService} from '@services';
import {requestSubcribePlan} from '../../../services/pregnancyProgram';
import {showMessage} from 'react-native-flash-message';

interface UpdateInformationProps {}
export interface UpdateInformationState {
  name: string;
  pregnant_week: string;
  phone: string;
}

const UpdateInformation = (props: UpdateInformationProps) => {
  const {t} = useTranslation();

  const handleSubcribePlan = async (metadata: UpdateInformationState) => {
    try {
      let data = {
        plan_code: 'PP',
        payment_method: 'bank_transfer',
        metadata: metadata,
      };
      GlobalService.showLoading();
      let res = await requestSubcribePlan(data);
      if (res?.success) {
        navigation.navigate(ROUTE_NAME.COMPLETE_PAYMENT, {
          values: res?.data,
        });
      }
    } catch (err) {
      showMessage({
        message: err?.response?.data?.message,
        type: 'danger',
        backgroundColor: colors.primaryBackground,
      });
    } finally {
      GlobalService.hideLoading();
    }
  };
  const formik = useFormik<UpdateInformationState>({
    initialValues: {
      name: '',
      pregnant_week: '',
      phone: '',
    },
    validationSchema: validation,
    onSubmit: async values => {
      handleSubcribePlan(values);
    },
  });

  const navigation = useNavigation<any>();
  const onNext = () => {
    formik.handleSubmit();
  };
  const onPolicy = async () => {
    let url = 'https://docs.matida.app/privacy-policy/en';
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
              <SvgPathBottom />
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
                  name={'pregnant_week'}
                  title={t('pregnancyProgram.yourPregnancyWeek')}
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
                onPress={onPolicy}
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
