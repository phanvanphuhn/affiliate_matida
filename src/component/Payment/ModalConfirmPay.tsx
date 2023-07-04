import {EPaymentType} from '@constant';
import {
  getCheckingPayment,
  GlobalService,
  postPaymentIntent,
  postPaymentInvoice,
  postPaymentSheet,
} from '@services';
import {
  confirmPlatformPayPayment,
  isPlatformPaySupported,
  openPlatformPaySetup,
  PaymentSheetError,
  PlatformPay,
  PlatformPayButton,
  PlatformPayError,
  StripeError,
  useStripe,
} from '@stripe/stripe-react-native';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, Platform, StyleSheet, Text, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {AppButton} from '../AppButton';
import {AppModal} from '../AppModal';
import {
  ModalConfirmPayProps,
  ViewConfirmPayProps,
  ViewNotSupportPayProps,
} from './type';

export type ModalConfirmPayment = {
  open: () => void;
  close: () => void;
};

enum StepPayment {
  CONFIRM,
  CHOOSE,
}

export const ModalConfirmPay = forwardRef<
  ModalConfirmPayment,
  ModalConfirmPayProps
>((props, ref) => {
  const {price, type, id, onCallBack = () => {}, isPay = false} = props;

  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const {initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment} =
    useStripe();

  const [loading, setLoading] = useState<boolean>(false);
  const [isPaySupported, setIsPaySupported] = useState<boolean>(true);
  const [step, setStep] = useState<StepPayment>(StepPayment.CONFIRM);

  const refFirst = useRef<boolean>(true);
  const refPay = useRef<any>(null);

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [],
  );

  const open = () => {
    refPay.current?.open();
  };

  const close = () => {
    refPay.current?.close();
  };

  const handleCancel = () => {
    close();
  };

  //test
  useEffect(() => {
    if (!!id && isPay) {
      if (refFirst.current) {
        setLoading(false);
        initializePaymentSheet();
      } else {
        refFirst.current = false;
      }
    }
  }, [id, type]);

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
      const res = await postPaymentSheet(id, type);
      const {error} = await initPaymentSheet({
        merchantDisplayName: 'Matida',
        customerId: res?.data?.customer,
        customerEphemeralKeySecret: res?.data?.ephemeralKey,
        paymentIntentClientSecret: res?.data?.paymentIntent?.client_secret,
        // allowsDelayedPaymentMethods: true,
        // customFlow: true,
        defaultBillingDetails: {
          name: user?.name ?? 'User',
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
        setLoading(true);
        console.log('init done: ', error);
      } else {
        console.log('init error: ', error);
      }
    } catch (e) {
      console.log({e});
      // Alert.alert(`Error`, e?.message);
    } finally {
      GlobalService.hideLoading();
    }
  };

  const handlePaymentPlatform = async () => {
    try {
      // close();
      GlobalService.showLoading();
      const res = await postPaymentIntent(id, type);
      GlobalService.hideLoading();
      const clientSecret = res?.data?.client_secret;
      if (clientSecret) {
        const {paymentIntent, error} = await confirmPlatformPayPayment(
          clientSecret,
          {
            applePay: {
              cartItems: [
                {
                  label: 'Total',
                  amount: `${price}`,
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
      }
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const handlePaymentStripe = async () => {
    if (loading) {
      setTimeout(async () => {
        const {error} = await presentPaymentSheet();
        getAfterPay(error);
      }, 500);
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
      await postPaymentInvoice(id, type, error ? 2 : 1, error?.message || '');
      if (!error) {
        Alert.alert(t('payment.success'), t('payment.msgSuccess') as string);
        onCallBack();
        close();
      } else {
        if (error?.code !== 'Canceled') {
          Alert.alert(t('payment.failure'), t('payment.msgFailure') as string);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      GlobalService.hideLoading();
    }
  };

  const handlePressYesPay = () => {
    GlobalService.showLoading();
    close();
    setStep(StepPayment.CHOOSE);
    setTimeout(() => {
      open();
      GlobalService.hideLoading();
    }, 500);
  };

  const handleClosedModal = () => {
    if (step === StepPayment.CHOOSE) {
      setStep(StepPayment.CONFIRM);
    }
  };

  return (
    <AppModal
      position={step === StepPayment.CONFIRM ? 'center' : 'bottom'}
      onClosed={handleClosedModal}
      modalBorderRadius={scaler(16)}
      ref={refPay}
      modalSize={{
        height: scaler(340),
        width:
          step === StepPayment.CONFIRM ? widthScreen - scaler(32) : widthScreen,
      }}>
      <>
        {step === StepPayment.CONFIRM ? (
          <ViewConfirmPay
            price={price}
            onPressCancel={handleCancel}
            onPressYes={handlePressYesPay}
            type={type}
            isPay={loading}
          />
        ) : (
          <ViewChooseMethodPayment
            isPaySupported={isPaySupported}
            onCancel={handleCancel}
            onPressPayPlatform={handlePaymentPlatform}
            onPressPayStripe={handlePaymentStripe}
          />
        )}
      </>
    </AppModal>
  );
});

const ViewConfirmPay = ({
  onPressYes,
  onPressCancel,
  price,
  type,
  isPay,
}: ViewConfirmPayProps) => {
  const {t} = useTranslation();

  const getTypeUnlock = () => {
    switch (type) {
      case EPaymentType.VIDEO:
      case EPaymentType.VIDEO_MASTER_CLASS:
        return t('payment.video');
      case EPaymentType.ARTICLE:
        return t('payment.article');
      case EPaymentType.POD_CAST:
        return t('payment.podcast');
      case EPaymentType.COURSE_MASTER_CLASS:
        return t('payment.course');
      default:
        return '';
    }
  };
  return (
    <View style={styles.containerModal}>
      <View>
        <Text style={styles.txtTitleModal}>{t('payment.purchase')}</Text>
        <View style={{marginVertical: scaler(32)}}>
          <Text style={styles.txtBodyModal}>
            {t('payment.premiumContent')}
            {t('payment.unlock', {
              price: price?.toLocaleString(),
              currency: 'VND',
              cart: getTypeUnlock(),
            })}
          </Text>
        </View>
      </View>
      <View>
        <AppButton
          onClick={onPressYes}
          titleButton={t('payment.yes')}
          disable={!isPay}
        />
        <AppButton
          onClick={onPressCancel}
          titleButton={t('payment.cancel')}
          customStyleButton={{
            backgroundColor: colors.white,
            marginTop: scaler(16),
          }}
          customStyleText={{color: colors.red50}}
        />
      </View>
    </View>
  );
};

type ChooseMethodProps = {
  isPaySupported: boolean;
  onCancel: () => void;
  onPressPayPlatform: () => void;
  onPressPayStripe: () => void;
};

const ViewChooseMethodPayment = (props: ChooseMethodProps) => {
  const {isPaySupported, onCancel, onPressPayPlatform, onPressPayStripe} =
    props;
  const {t} = useTranslation();
  const [showStripe, setShowStripe] = useState<boolean>(false);

  useEffect(() => {
    getChecking();
  }, []);

  const getChecking = async () => {
    try {
      const res = await getCheckingPayment();
      setShowStripe(res?.data);
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: colors.transparent,
        color: '#FFFFFF',
      });
    }
  };

  const handlePressPayButton = async () => {
    if (!isPaySupported && Platform.OS === 'ios') {
      await openPlatformPaySetup();
    } else {
      await onPressPayPlatform();
    }
  };

  return (
    <View
      style={[
        styles.containerModal,
        {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          paddingTop: scaler(16),
        },
      ]}>
      <View>
        <Text
          style={[
            styles.txtTitleModal,
            {
              marginBottom: scaler(28),
              fontSize: scaler(16),
              ...stylesCommon.fontWeight500,
            },
          ]}>
          {t('payment.method')}
        </Text>
        <PlatformPayButton
          onPress={handlePressPayButton}
          type={
            isPaySupported
              ? PlatformPay.ButtonType.Pay
              : PlatformPay.ButtonType.SetUp
          }
          borderRadius={scaler(8)}
          style={{
            width: '100%',
            height: Platform.OS === 'ios' ? scaler(54) : scaler(63),
            marginBottom: scaler(16),
          }}
        />
        {showStripe ? (
          <AppButton
            onClick={onPressPayStripe}
            titleButton={t('payment.other')}
            customStyleButton={{marginBottom: scaler(16)}}
          />
        ) : null}
        <AppButton
          onClick={onCancel}
          titleButton={t('payment.cancel')}
          customStyleText={{color: colors.primary}}
          customStyleButton={{
            backgroundColor: colors.white,
            borderWidth: scaler(1),
            borderColor: colors.primary,
          }}
        />
      </View>
    </View>
  );
};

const ViewNotSupportPay = ({onPressCancel}: ViewNotSupportPayProps) => {
  const {t} = useTranslation();
  return (
    <View style={styles.containerModal}>
      <View>
        <Text style={styles.txtTitleModal}>{t('payment.error')}</Text>
        <Text
          style={[
            styles.txtBodyModal,
            {textAlign: 'center', marginTop: scaler(12)},
          ]}>
          {t('payment.notSupport')}
        </Text>
      </View>
      <AppButton onClick={onPressCancel} titleButton={t('payment.cancel')} />
      <AppButton onClick={onPressCancel} titleButton={t('payment.cancel')} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    paddingVertical: scaler(32),
    paddingHorizontal: scaler(16),
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: scaler(16),
  },
  txtTitleModal: {
    color: colors.textColor,
    fontSize: scaler(24),
    textAlign: 'center',
    ...stylesCommon.fontWeight600,
  },
  txtBodyModal: {
    color: colors.black,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
  },
});
