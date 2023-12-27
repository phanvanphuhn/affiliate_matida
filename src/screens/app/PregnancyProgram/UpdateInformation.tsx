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
            <Text style={styles.textTitle}>Update information</Text>
            <Text style={styles.textSubTitle}>
              Please fill in this form so we can set up your plan.
            </Text>

            <ImageBackground source={ic_background}>
              <SvgPathBottom />
              <View style={styles.containerInput}>
                <FormInput
                  name={'name'}
                  title={'Your name'}
                  placeholder={'Nguyễn Thị Mama'}
                />
                <FormInput
                  maxLength={10}
                  keyboardType={'number-pad'}
                  name={'phone'}
                  title={'Your phone number'}
                  placeholder={'0123456789'}
                />
                <FormInput
                  name={'pregnant_week'}
                  title={'Your pregnancy week'}
                  placeholder={'8'}
                  maxLength={2}
                  keyboardType={'number-pad'}
                />
              </View>
              <SvgPathTop />
            </ImageBackground>

            <View
              style={{
                paddingHorizontal: scaler(24),
              }}>
              <TouchableOpacity onPress={onNext} style={styles.buttonDone}>
                <Text style={styles.textDone}>Next</Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: colors.gray500,
                  fontWeight: '400',
                  fontSize: scaler(13),
                  textAlign: 'center',
                  marginTop: 15,
                  ...stylesCommon.fontSarabun400,
                }}>
                By continue, I agree to the{' '}
                <Text
                  onPress={onPolicy}
                  style={{
                    color: colors.pink300,
                    fontWeight: '500',
                    ...stylesCommon.fontSarabun500,
                  }}>
                  Terms
                </Text>{' '}
                &{' '}
                <Text
                  onPress={onPolicy}
                  style={{
                    color: colors.pink300,
                    fontWeight: '500',
                    ...stylesCommon.fontSarabun500,
                  }}>
                  Privacy Policy
                </Text>
              </Text>
            </View>
          </ScrollView>
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
    fontWeight: '600',
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
    fontWeight: '500',
    color: colors.gray50,
    marginTop: scaler(20),
    textAlign: 'center',
    ...stylesCommon.fontSarabun500,
  },
  input: {
    textAlign: 'center',
    fontSize: scaler(16),
    fontWeight: '500',
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
    fontWeight: '600',
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
    fontWeight: '500',
    color: colors.textColor,
  },
});
