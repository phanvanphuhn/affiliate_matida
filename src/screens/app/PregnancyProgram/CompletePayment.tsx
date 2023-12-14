import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, scaler} from '@stylesCommon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {goBack} from '@navigation';
import {
  ic_apple,
  ic_background,
  ic_copy,
  ic_google,
  ic_logo_round,
  ic_transfer,
  iconClose,
  LogoApp,
  SvgPathBottom,
  SvgPathTop,
} from '@images';
import QRCode from 'react-native-qrcode-svg';
import {ModalConfirmPay, ModalConfirmPayment} from '@component';
import {EPaymentType} from '@constant';
import {
  confirmPlatformPayPayment,
  initPaymentSheet,
  isPlatformPaySupported,
  openPlatformPaySetup,
  PaymentSheetError,
  PlatformPay,
  PlatformPayError,
  StripeError,
} from '@stripe/stripe-react-native';
import {
  GlobalService,
  postPaymentIntent,
  postPaymentInvoice,
  postPaymentSheet,
} from '@services';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';

interface CompletePaymentProps {}

const CompletePayment = (props: CompletePaymentProps) => {
  const refPay = useRef<ModalConfirmPayment>(null);
  const {t} = useTranslation();
  const navigation = useNavigation<any>();

  const [isPaySupported, setIsPaySupported] = useState<boolean>();

  useEffect(() => {
    (async function () {
      const isSupport =
        Platform.OS === 'ios'
          ? await isPlatformPaySupported()
          : await isPlatformPaySupported({googlePay: {testEnv: false}});
      setIsPaySupported(isSupport);
    })();
  }, [isPlatformPaySupported]);

  const initializePaymentSheet = async () => {
    GlobalService.showLoading();
    try {
      // const res = await postPaymentSheet(id, type);
      const {error} = await initPaymentSheet({
        merchantDisplayName: 'Matida',
        customerId: 'res?.data?.customer',
        customerEphemeralKeySecret: 'res?.data?.ephemeralKey',
        paymentIntentClientSecret: 'res?.data?.paymentIntent?.client_secret',
        // allowsDelayedPaymentMethods: true,
        // customFlow: true,
        defaultBillingDetails: {
          name: 'user?.name' ?? 'User',
        },
        applePay: {
          merchantCountryCode: 'VN',
        },
        googlePay: {
          merchantCountryCode: 'VN',
          testEnv: false, // use test environment
        },
      });
      if (!error) {
      }
    } catch (e) {
    } finally {
      GlobalService.hideLoading();
    }
  };
  const handlePressPayButton = async () => {
    await initializePaymentSheet();
    if (!isPaySupported && Platform.OS === 'ios') {
      await openPlatformPaySetup();
    } else {
      await handlePaymentPlatform();
    }
  };
  const getAfterPay = async (
    error:
      | StripeError<PaymentSheetError>
      | StripeError<PlatformPayError>
      | undefined,
  ) => {
    try {
      GlobalService.showLoading();
      await postPaymentInvoice('id', 1, error ? 2 : 1, error?.message || '');
      if (!error) {
        Alert.alert(t('payment.success'), t('payment.msgSuccess') as string);
        onCallBack();
      } else {
        if (error?.code !== 'Canceled') {
          Alert.alert(t('payment.failure'), t('payment.msgFailure') as string);
        }
      }
    } catch (e) {
    } finally {
      GlobalService.hideLoading();
    }
  };
  const handlePaymentPlatform = async () => {
    try {
      // close();
      GlobalService.showLoading();
      // const res = await postPaymentIntent('id', 1);
      GlobalService.hideLoading();
      // const clientSecret = res?.data?.client_secret;
      // if (clientSecret) {
      const {paymentIntent, error} = await confirmPlatformPayPayment(
        'clientSecret',
        {
          applePay: {
            cartItems: [
              {
                label: 'Total',
                amount: `${150000}`,
                paymentType: PlatformPay.PaymentType.Immediate,
              },
            ],
            merchantCountryCode: 'VN',
            currencyCode: 'VND',
            requiredBillingContactFields: [
              PlatformPay.ContactField.PhoneNumber,
            ],
          },
          googlePay: {
            testEnv: false,
            merchantName: 'Matida',
            merchantCountryCode: 'VN',
            currencyCode: 'VND',
            billingAddressConfig: {
              format: PlatformPay.BillingAddressFormat.Full,
              isPhoneNumberRequired: true,
              isRequired: true,
            },
          },
        },
      );
      await getAfterPay(error);
      console.log('=>(CompletePayment.tsx:162) error', error);
      // }
    } catch (error) {
      console.log('=>(CompletePayment.tsx:167) error', error);
      GlobalService.hideLoading();
    }
  };

  const onPaymentFinish = () => {
    navigation.navigate(ROUTE_NAME.PREGNANCY_PROGRAM);
  };
  const onCallBack = () => {};
  return (
    <SafeAreaView edges={['top']} style={[styles.container]}>
      <View style={[styles.container]}>
        <TouchableOpacity onPress={goBack} style={styles.buttonBack}>
          <Image source={iconClose} />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{paddingBottom: scaler(30)}}>
          <Text style={styles.textTitle}>Complete payment</Text>
          <Text style={styles.textSubTitle}>
            Please select a method to complete this payment
          </Text>
          <View style={styles.containerButtonRow}>
            <TouchableOpacity
              style={[styles.buttonTransfer, {borderColor: colors.pink200}]}>
              <Image source={ic_transfer} />
              <Text style={styles.textTransfer}>Bank Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePressPayButton}
              style={styles.buttonTransfer}>
              <Image source={Platform.OS == 'ios' ? ic_apple : ic_google} />
              <Text style={styles.textTransfer}>
                {Platform.OS == 'ios' ? 'Apple Pay' : 'Google Pay'}
              </Text>
            </TouchableOpacity>
          </View>

          <ImageBackground source={ic_background}>
            <SvgPathBottom />
            <View style={styles.containerInput}>
              <QRCode
                value="Matida"
                logo={ic_logo_round}
                logoSize={32}
                logoBorderRadius={32}
              />
              <View style={{width: '100%'}}>
                <Text style={styles.textLabel}>Transaction contents</Text>
                <Text style={styles.input}>1511 PP1</Text>
                <TouchableOpacity style={styles.buttonCopy}>
                  <Image source={ic_copy} />
                </TouchableOpacity>
              </View>
              <View style={{width: '100%'}}>
                <Text style={styles.textLabel}>Transaction amount</Text>
                <Text style={styles.input}>{`${t('payment.pay', {
                  money: 399000?.toLocaleString(),
                  currency: 'vnd',
                })}`}</Text>
                <TouchableOpacity style={styles.buttonCopy}>
                  <Image source={ic_copy} />
                </TouchableOpacity>
              </View>
              <View style={{width: '100%'}}>
                <Text style={styles.textLabel}>Bank account</Text>
                <Text style={styles.input}>0123456789</Text>
                <TouchableOpacity style={styles.buttonCopy}>
                  <Image source={ic_copy} />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.textLabel}>Bank</Text>
                <Text style={styles.input}>Vietcombank</Text>
              </View>
              <View>
                <Text style={styles.textLabel}>Account owner</Text>
                <Text style={styles.input}>Matida Co.Ltd</Text>
                <Text style={styles.input2}>MST: 123456789</Text>
              </View>
            </View>
            <SvgPathTop />
          </ImageBackground>

          <View
            style={{
              paddingHorizontal: scaler(24),
            }}>
            <TouchableOpacity
              onPress={onPaymentFinish}
              style={styles.buttonDone}>
              <Text style={styles.textDone}>I have transfered the money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel}>
              <Text style={styles.textCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CompletePayment;

const styles = StyleSheet.create({
  container: {backgroundColor: colors.white, flex: 1},
  buttonBack: {
    alignItems: 'flex-end',
    paddingHorizontal: scaler(15),
    paddingVertical: scaler(10),
  },
  textTitle: {
    fontSize: scaler(24),
    fontWeight: '600',
    textAlign: 'center',
  },
  textSubTitle: {
    fontSize: scaler(15),
    textAlign: 'center',
    padding: scaler(15),
    color: colors.textColor,
  },
  containerInput: {
    backgroundColor: colors.white,
    paddingVertical: scaler(40),
    paddingHorizontal: scaler(30),
    marginHorizontal: scaler(20),
    marginVertical: scaler(25),
    borderRadius: scaler(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLabel: {
    fontSize: scaler(13),
    fontWeight: '500',
    color: colors.gray50,
    marginTop: scaler(20),
    textAlign: 'center',
  },
  input: {
    textAlign: 'center',
    fontSize: scaler(16),
    fontWeight: '500',
    paddingTop: scaler(10),
    paddingHorizontal: scaler(24),
  },
  input2: {
    textAlign: 'center',
    fontSize: scaler(13),
    fontWeight: '500',
    paddingHorizontal: scaler(24),
    color: colors.labelColor,
    marginTop: 5,
  },
  buttonCopy: {
    position: 'absolute',
    right: 0,
    bottom: 0,
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
  containerButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaler(30),
    paddingBottom: scaler(20),
    paddingTop: scaler(10),
  },
  buttonTransfer: {
    backgroundColor: colors.gray350,
    paddingVertical: scaler(15),
    paddingHorizontal: scaler(15),
    borderRadius: scaler(30),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
  },
  textTransfer: {
    fontSize: scaler(15),
    fontWeight: '600',
    color: colors.textColor,
    marginLeft: scaler(7),
  },
});
