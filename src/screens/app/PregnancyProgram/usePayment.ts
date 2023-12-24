import React, {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
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
import {GlobalService, postPaymentInvoice} from '@services';

interface Props {}

const usePayment = (props: Props) => {
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
  const onCallBack = () => {};

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
};

export default usePayment;
