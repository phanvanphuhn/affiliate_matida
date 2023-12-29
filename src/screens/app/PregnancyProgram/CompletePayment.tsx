import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  PermissionsAndroid,
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
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
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
import {UpdateInformationState} from './UpdateInformation';
import {RouteProp} from '@react-navigation/core/src/types';
import Clipboard from '@react-native-clipboard/clipboard';
import {formatPrice} from '@util';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';
interface CompletePaymentProps {}
interface BankState {
  bank_account_name: string;
  bank_account_number: string;
  bank_name: string;
  phone_number: string;
}
interface PlanState {
  bank_account: BankState;
  code: string;
  created_at: string;
  currency: string;
  description_en?: string;
  description_vi?: string;
  discount: string;
  duration: number;
  duration_unit: string;
  id: number;
  is_active: boolean;
  is_subscribed: boolean;
  name_en: string;
  name_vi: string;
  price: string;
  updated_at: string;
  success: boolean;
}

const CompletePayment = (props: CompletePaymentProps) => {
  const refPay = useRef<ModalConfirmPayment>(null);
  const [plan, setPlan] = useState<PlanState>({});
  const {t} = useTranslation();
  const route = useRoute<RouteProp<any>>();
  const QrRef = useRef<any>();
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
    if (res?.success) {
      setPlan(res?.data);
    }
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
      let available = await getProducts({skus: [PRODUCT_ID_PAY]});
      let purchase = await requestPurchase({
        sku,
        skus: [PRODUCT_ID_PAY],
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

  const onPaymentFinish = async () => {
    navigation.navigate(ROUTE_NAME.VERIFY_PAYMENT);
  };
  const onCopy = (value: string) => () => {
    Clipboard.setString(value);
    showMessage({message: 'Copy success', type: 'success'});
  };
  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  async function savePicture() {
    try {
      if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        return;
      }

      let result = await CameraRoll.save(
        route?.params?.values?.metadata?.bank_account?.qr_code || '',
        {type: 'photo', album: 'matida'},
      );
      showMessage({
        message: 'Saved file success!',
        type: 'success',
      });
      console.log('=>(CompletePayment.tsx:265) result', result);
    } catch (error) {
      console.log('=>(CompletePayment.tsx:417) error', error);
    }
  }
  return (
    <SafeAreaView edges={['top']} style={[styles.container]}>
      <View style={[styles.container]}>
        <TouchableOpacity onPress={goBack} style={styles.buttonBack}>
          <Image source={iconClose} />
        </TouchableOpacity>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: scaler(30)}}>
          <Text style={styles.textTitle}>
            {t('pregnancyProgram.completePayment')}
          </Text>
          <Text style={styles.textSubTitle}>
            {t('pregnancyProgram.selectMethod')}
          </Text>
          <View style={styles.containerButtonRow}>
            <TouchableOpacity
              style={[
                styles.buttonTransfer,
                {borderColor: colors.pink200, marginRight: scaler(15)},
              ]}>
              <Image source={ic_transfer} />
              <Text style={styles.textTransfer}>
                {t('pregnancyProgram.bankTransfer')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={true}
              onPress={() => {
                handlePurchase(PRODUCT_ID_PAY);
              }}
              style={[styles.buttonTransfer, {opacity: 0.5}]}>
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
                  <Image
                    source={{
                      uri:
                        route?.params?.values?.metadata?.bank_account
                          ?.qr_code || '',
                    }}
                    style={{
                      height: scaler(112),
                      width: scaler(112),
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={savePicture}
                  style={styles.buttonCopy}>
                  <Image source={ic_download} />
                </TouchableOpacity>
              </View>
              <View style={{width: '100%'}}>
                <Text style={styles.textLabel}>
                  {t('pregnancyProgram.transactionContent')}
                </Text>
                <Text style={styles.input}>
                  {route?.params?.values?.verify_code}
                </Text>
                <TouchableOpacity
                  onPress={onCopy(route?.params?.values?.verify_code)}
                  style={styles.buttonCopy}>
                  <Image source={ic_copy} />
                </TouchableOpacity>
              </View>
              <View style={{width: '100%'}}>
                <Text style={styles.textLabel}>
                  {t('pregnancyProgram.transactionAmount')}
                </Text>
                <Text style={styles.input}>{`${t('payment.pay', {
                  money: formatPrice(plan?.price / 1000),
                  currency: plan?.currency,
                })}`}</Text>
                <TouchableOpacity
                  onPress={onCopy(plan?.price)}
                  style={styles.buttonCopy}>
                  <Image source={ic_copy} />
                </TouchableOpacity>
              </View>
              <View style={{width: '100%'}}>
                <Text style={styles.textLabel}>
                  {t('pregnancyProgram.bankAccount')}
                </Text>
                <Text style={styles.input}>
                  {plan?.bank_account?.bank_account_number}
                </Text>
                <TouchableOpacity
                  onPress={onCopy(plan?.bank_account?.bank_account_number)}
                  style={styles.buttonCopy}>
                  <Image source={ic_copy} />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.textLabel}>
                  {t('pregnancyProgram.bank')}
                </Text>
                <Text style={styles.input}>
                  {plan?.bank_account?.bank_name}
                </Text>
              </View>
              <View>
                <Text style={styles.textLabel}>
                  {t('pregnancyProgram.accountOwner')}
                </Text>
                <Text style={styles.input}>
                  {plan?.bank_account?.bank_account_name}
                </Text>
                {/*<Text style={styles.input2}>MST: 123456789</Text>*/}
              </View>
            </View>
            <View
              style={{
                marginBottom: -0.2,
              }}>
              <SvgPathTop />
            </View>
          </ImageBackground>
        </ScrollView>
        <View
          style={{
            paddingHorizontal: scaler(24),
            paddingBottom: scaler(30),
          }}>
          <TouchableOpacity onPress={onPaymentFinish} style={styles.buttonDone}>
            <Text style={styles.textDone}>
              {t('pregnancyProgram.transferredMoney')}
            </Text>
          </TouchableOpacity>
        </View>
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
    marginTop: scaler(10),
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
    paddingHorizontal: scaler(24),
    paddingBottom: scaler(32),
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
