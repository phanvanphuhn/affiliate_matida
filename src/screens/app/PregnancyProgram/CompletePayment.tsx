import React, {useCallback, useEffect, useRef} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {goBack} from '@navigation';
import {
  ic_apple,
  ic_background,
  ic_copy,
  ic_download,
  ic_google,
  ic_logo_round,
  ic_transfer,
  iconClose,
  SvgPathBottom,
  SvgPathTop,
} from '@images';
import QRCode from 'react-native-qrcode-svg';
import {ModalConfirmPayment} from '@component';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {
  getPlanByCode,
  requestSubcribePlan,
} from '../../../services/pregnancyProgram';
import {GlobalService, PRODUCT_ID_PAY} from '@services';
import {showMessage} from 'react-native-flash-message';
import {
  endConnection,
  flushFailedPurchasesCachedAsPendingAndroid,
  initConnection,
  ProductPurchase,
  PurchaseError,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
  requestSubscription,
  SubscriptionPurchase,
  useIAP,
} from 'react-native-iap';

interface CompletePaymentProps {}

const CompletePayment = (props: CompletePaymentProps) => {
  const refPay = useRef<ModalConfirmPayment>(null);
  const {t} = useTranslation();
  const navigation = useNavigation<any>();
  const {
    connected,
    products,
    promotedProductsIOS,
    subscriptions,
    purchaseHistories,
    availablePurchases,
    currentPurchase,
    currentPurchaseError,
    initConnectionError,
    finishTransaction,
    getProducts,
    getSubscriptions,
    getAvailablePurchases,
    getPurchaseHistories,
    requestSubscription,
  } = useIAP();
  const getData = async () => {
    let res = await getPlanByCode();
    console.log('=>(CompletePayment.tsx:43) res', res);
  };
  const listenPurchases = (
    purchase: SubscriptionPurchase | ProductPurchase,
  ) => {
    console.log('purchaseUpdatedListener', purchase);
    const receipt = purchase.transactionReceipt;
    if (receipt) {
    }
  };
  const initialize = async () => {
    let init = await initConnection();
    if (Platform.OS == 'android') {
      await flushFailedPurchasesCachedAsPendingAndroid();
    }
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     GlobalService.showLoading();
  //     const getPurchase = async () => {
  //       try {
  //         const result = await getAvailablePurchases();
  //         const hasPurchased = result?.find(
  //           product => product.productId === PRODUCT_ID_PAY,
  //         );
  //         console.log('=>(CompletePayment.tsx:103) hasPurchased', hasPurchased);
  //         GlobalService.hideLoading();
  //       } catch (error) {
  //         GlobalService.hideLoading();
  //         console.error('Error occurred while fetching purchases', error);
  //       }
  //     };
  //
  //     getPurchase();
  //   }, []),
  // );
  useEffect(() => {
    getData();
    initialize();
    return () => {
      endConnection();
    };
  }, []);

  console.log('=>(CompletePayment.tsx:97) products', products);

  console.log('=>(CompletePayment.tsx:108) subscriptions', subscriptions);
  const handlePurchase = async (sku: string) => {
    try {
      let available = await getSubscriptions({skus: [PRODUCT_ID_PAY]});
      let offerToken: string | undefined = subscriptions[0]
        ?.subscriptionOfferDetails
        ? (subscriptions[0]?.subscriptionOfferDetails || [])?.[0]?.offerToken
        : undefined;
      console.log('=>(CompletePayment.tsx:102) available', offerToken);
      let purchase = await requestSubscription({
        sku,
        ...(offerToken && {
          subscriptionOffers: [{sku: sku, offerToken}],
        }),
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
      finishTransaction({
        purchase: purchase,
      });
      console.log('=>(CompletePayment.tsx:100) res', purchase);
    } catch (err) {
      console.log('=>(CompletePayment.tsx:107) err', err);
    }
  };

  useEffect(() => {
    // ... listen to currentPurchaseError, to check if any error happened
    console.log(
      '=>(CompletePayment.tsx:116) currentPurchaseError',
      currentPurchaseError,
    );
  }, [currentPurchaseError]);

  useEffect(() => {
    // ... listen to currentPurchase, to check if the purchase went through
    console.log('=>(CompletePayment.tsx:124) currentPurchase', currentPurchase);
  }, [currentPurchase]);
  const handleSubcribePlan = async () => {
    try {
      let data = {
        plan_code: 'PP',
        payment_method: 'bank_transfer',
      };
      GlobalService.showLoading();
      let res = await requestSubcribePlan(data);

      return true;
    } catch (err) {
      showMessage({
        message: err?.response?.data?.message,
        type: 'danger',
        backgroundColor: colors.primaryBackground,
      });
      return false;
    } finally {
      GlobalService.hideLoading();
    }
  };
  const onPaymentFinish = async () => {
    let isDone = await handleSubcribePlan();
    if (isDone) {
      navigation.navigate(ROUTE_NAME.VERIFY_PAYMENT);
    }
  };
  return (
    <SafeAreaView edges={['top']} style={[styles.container]}>
      <View style={[styles.container]}>
        <TouchableOpacity onPress={goBack} style={styles.buttonBack}>
          <Image source={iconClose} />
        </TouchableOpacity>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: scaler(30)}}>
          <Text style={styles.textTitle}>Complete payment</Text>
          <Text style={styles.textSubTitle}>
            Please select a method to complete this payment
          </Text>
          <View style={styles.containerButtonRow}>
            <TouchableOpacity
              style={[
                styles.buttonTransfer,
                {borderColor: colors.pink200, marginRight: scaler(15)},
              ]}>
              <Image source={ic_transfer} />
              <Text style={styles.textTransfer}>Bank Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePurchase(PRODUCT_ID_PAY);
              }}
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
              <View style={{width: '100%'}}>
                <View style={{alignItems: 'center'}}>
                  <QRCode
                    value="Matida"
                    logo={ic_logo_round}
                    logoSize={32}
                    logoBorderRadius={32}
                  />
                </View>
                <TouchableOpacity style={styles.buttonCopy}>
                  <Image source={ic_download} />
                </TouchableOpacity>
              </View>
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
              paddingBottom: scaler(15),
            }}>
            <TouchableOpacity
              onPress={onPaymentFinish}
              style={styles.buttonDone}>
              <Text style={styles.textDone}>I have transferred my money</Text>
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
    ...stylesCommon.fontSarabun500,
  },
  input: {
    textAlign: 'center',
    fontSize: scaler(16),
    fontWeight: '500',
    paddingTop: scaler(10),
    paddingHorizontal: scaler(24),
    ...stylesCommon.fontWeight500,
  },
  input2: {
    textAlign: 'center',
    fontSize: scaler(13),
    fontWeight: '500',
    paddingHorizontal: scaler(24),
    color: colors.labelColor,
    marginTop: 5,
    ...stylesCommon.fontSarabun500,
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
    borderRadius: scaler(30),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    flex: 1,
    justifyContent: 'center',
  },
  textTransfer: {
    fontSize: scaler(15),
    fontWeight: '600',
    color: colors.textColor,
    marginLeft: scaler(7),
    ...stylesCommon.fontSarabun600,
  },
});
