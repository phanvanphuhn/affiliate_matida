import React, {useEffect, useRef, useState} from 'react';
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
import {goBack, navigate} from '@navigation';
import {
  ic_apple,
  ic_background,
  ic_copy,
  ic_download,
  ic_google,
  ic_transfer,
  iconClose,
  SvgPathBottom,
  SvgPathTop,
} from '@images';
import {ModalConfirmPayment} from '@component';
import {useTranslation} from 'react-i18next';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {
  getPlanByCode,
  userConfirm,
  changePaymentMethod,
} from '../../../services/pregnancyProgram';
import {GlobalService, PRODUCT_ID_PAY} from '@services';
import {showMessage} from 'react-native-flash-message';
import {RouteProp} from '@react-navigation/core/src/types';
import Clipboard from '@react-native-clipboard/clipboard';
import {event, eventType, formatPrice, trackingAppEvent} from '@util';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFetchBlob from 'rn-fetch-blob';
import {useSelector} from 'react-redux';
import useBackHandler from '../../../util/hooks/useBackHandler';
import {
  initConnection,
  endConnection,
  finishTransaction,
  flushFailedPurchasesCachedAsPendingAndroid,
  purchaseUpdatedListener,
  purchaseErrorListener,
  getProducts,
  requestPurchase,
} from 'react-native-iap';

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
  const QrRef = useRef<any>();

  const {t} = useTranslation();
  const route = useRoute<RouteProp<any>>();
  const navigation = useNavigation<any>();

  const [plan, setPlan] = useState<PlanState>({});
  const [products, setProducts] = useState<string[]>([]);
  const [verifyCode, setVerifyCode] = useState<string>(
    route?.params?.values?.verify_code,
  );

  const user = useSelector((state: any) => state?.auth?.userInfo);

  const copyType = {
    TRANSACTION: 'Transaction',
    PRICE: 'Price',
    BANK_ACCOUNT_NUMBER: 'Bank_account_number',
  };

  const getData = async () => {
    let res = await getPlanByCode();
    if (res?.success) {
      setPlan(res?.data);
    }
  };

  const onPaymentFinish = async () => {
    try {
      GlobalService.showLoading();
      trackingAppEvent(
        event.MASTER_CLASS.PP_PAYMENT_INFO_I_HAVE_TRANSFERED_MY_PAYMENT,
        {id: user?.id},
        eventType.MIX_PANEL,
      );
      console.log('=>(CompletePayment.tsx:193) route?.params', route?.params);
      let result = await userConfirm({
        verify_code: verifyCode,
        user_id: user?.id,
        payment_method: 'bank_transfer',
      });
      navigation.navigate(ROUTE_NAME.VERIFY_PAYMENT);
    } catch (error) {
      console.log('=>(CompletePayment.tsx:309) error', error);
    } finally {
      GlobalService.hideLoading();
    }
  };

  const onCopy = (value: string, type: string) => () => {
    switch (type) {
      case copyType.TRANSACTION:
        trackingAppEvent(
          event.MASTER_CLASS.PP_PAYMENT_INFO_COPY_TRANSACTION_CONTENT,
          {id: user?.id},
          eventType.MIX_PANEL,
        );
        break;
      case copyType.PRICE:
        trackingAppEvent(
          event.MASTER_CLASS.PP_PAYMENT_INFO_COPY_PRICE,
          {id: user?.id},
          eventType.MIX_PANEL,
        );
        break;
      case copyType.BANK_ACCOUNT_NUMBER:
        trackingAppEvent(
          event.MASTER_CLASS.PP_PAYMENT_INFO_COPY_BANK_NUMBER,
          {id: user?.id},
          eventType.MIX_PANEL,
        );
        break;
    }
    Clipboard.setString(value);
    showMessage({message: t('common.copySuccessfully'), type: 'success'});
  };

  const saveToGallery = async () => {
    trackingAppEvent(
      event.MASTER_CLASS.PP_PAYMENT_INFO_DOWNLOAD_QR,
      {id: user?.id},
      eventType.MIX_PANEL,
    );
    if (Platform.OS == 'android') {
      let dirs = RNFetchBlob.fs.dirs;
      let path = dirs.PictureDir + '/qr-matida.png';

      let res = await RNFetchBlob.config({
        fileCache: true,
        appendExt: 'png',
        indicator: true,
        IOSBackgroundTask: true,
        path: path,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mime: 'image/png',
          path: path,
          description: 'File downloaded.',
        },
      }).fetch(
        'GET',
        route?.params?.values?.metadata?.bank_account?.qr_code || '',
      );
    } else {
      let result = await CameraRoll.save(
        route?.params?.values?.metadata?.bank_account?.qr_code || '',
        {type: 'photo', album: 'matida'},
      );
    }
    showMessage({
      message: t('common.savedFileSuccess'),
      type: 'success',
    });
  };

  const switchPaymentMethod = async (type: string) => {
    GlobalService.showLoading();
    try {
      const res = await changePaymentMethod({
        payment_id: route?.params?.values.id,
        payment_method: type,
      });
      setVerifyCode(res?.data?.verify_code);
      GlobalService.hideLoading();
      return res;
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const makePurchase = async (sku: any, code: string) => {
    GlobalService.showLoading();
    try {
      const res = await requestPurchase({
        sku,
        appAccountToken: code,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
      if (res?.transactionReceipt) {
        const result = await userConfirm({
          verify_code: code,
          user_id: user?.id,
          payment_method: 'apple_pay',
          transaction_id: res?.transactionId,
        });
        if (result?.success) {
          navigate(ROUTE_NAME.TAB_HOME);
        } else {
          showMessage({
            message: t('common.paymentFailed'),
            type: 'danger',
            backgroundColor: colors.primaryBackground,
          });
          switchPaymentMethod('bank_transfer');
        }
      } else {
        showMessage({
          message: t('common.paymentFailed'),
          type: 'danger',
          backgroundColor: colors.primaryBackground,
        });
        switchPaymentMethod('bank_transfer');
      }
      GlobalService.hideLoading();
    } catch (error) {
      switchPaymentMethod('bank_transfer');
      GlobalService.hideLoading();
      console.error('Error making purchase', error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const products = await getProducts({
        skus: Platform.select({
          ios: [PRODUCT_ID_PAY],
          android: [PRODUCT_ID_PAY],
        }),
      });
      setProducts(products);
    } catch (error) {
      console.error('Error occurred while fetching products', error.message);
    }
  };

  useEffect(() => {
    const initializeConnection = async () => {
      try {
        await initConnection();
        if (Platform.OS === 'android') {
          await flushFailedPurchasesCachedAsPendingAndroid();
        }
      } catch (error) {
        console.error('An error occurred', error.message);
      }
    };

    const purchaseUpdate = purchaseUpdatedListener(async purchase => {
      const receipt = purchase.transactionReceipt;

      if (receipt) {
        try {
          await finishTransaction({purchase, isConsumable: true});
        } catch (error) {
          console.error('An error occurred', error.message);
        }
      }
    });

    const purchaseError = purchaseErrorListener(error =>
      console.error('Purchase error', error.message),
    );

    initializeConnection();
    fetchProducts();

    return () => {
      endConnection();
      purchaseUpdate.remove();
      purchaseError.remove();
    };
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView edges={['top']} style={[styles.container]}>
      <View style={[styles.container]}>
        <TouchableOpacity
          onPress={() => navigate(ROUTE_NAME.TAB_HOME)}
          style={styles.buttonBack}>
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
                {
                  borderColor: colors.pink200,
                  marginRight: scaler(15),
                },
              ]}
              onPress={() => {
                switchPaymentMethod('bank_transfer');
              }}>
              <Image source={ic_transfer} />
              <Text style={styles.textTransfer}>
                {t('pregnancyProgram.bankTransfer')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                const res = await switchPaymentMethod('apple_pay');
                if (res?.success) {
                  makePurchase(products[0]?.productId, res?.data?.verify_code);
                }
              }}
              disabled={Platform.OS == 'android' ? true : false}
              style={[styles.buttonTransfer]}>
              <Image source={Platform.OS == 'ios' ? ic_apple : ic_google} />
              <Text style={styles.textTransfer}>
                {Platform.OS == 'ios' ? 'Apple Pay' : 'Google Pay'}
              </Text>
            </TouchableOpacity>
          </View>

          <ImageBackground source={ic_background}>
            <View style={{marginTop: -0.1}}>
              <SvgPathBottom />
            </View>
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
                  onPress={saveToGallery}
                  style={styles.buttonCopy}>
                  <Image source={ic_download} />
                </TouchableOpacity>
              </View>
              <View style={{width: '100%'}}>
                <Text style={styles.textLabel}>
                  {t('pregnancyProgram.transactionContent')}
                </Text>
                <Text style={styles.input}>{verifyCode}</Text>
                <TouchableOpacity
                  onPress={onCopy(verifyCode, copyType.TRANSACTION)}
                  style={styles.buttonCopy}>
                  <Image source={ic_copy} />
                </TouchableOpacity>
              </View>
              <View style={{width: '100%'}}>
                <Text style={styles.textLabel}>
                  {t('pregnancyProgram.transactionAmount')}
                </Text>
                <Text style={styles.input}>{`${t('payment.pay', {
                  money: formatPrice(plan?.price),
                  currency: plan?.currency,
                })}`}</Text>
                <TouchableOpacity
                  onPress={onCopy(plan?.price, copyType.PRICE)}
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
                  onPress={onCopy(
                    plan?.bank_account?.bank_account_number,
                    copyType.BANK_ACCOUNT_NUMBER,
                  )}
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
    paddingHorizontal: scaler(16),
    paddingVertical: scaler(12),
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
    padding: scaler(16),
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
