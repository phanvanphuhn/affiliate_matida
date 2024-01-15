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
import {goBack} from '@navigation';
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
import {getPlanByCode, userConfirm} from '../../../services/pregnancyProgram';
import {GlobalService} from '@services';
import {showMessage} from 'react-native-flash-message';
import {RouteProp} from '@react-navigation/core/src/types';
import Clipboard from '@react-native-clipboard/clipboard';
import {event, eventType, formatPrice, trackingAppEvent} from '@util';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFetchBlob from 'rn-fetch-blob';
import {useSelector} from 'react-redux';
import useBackHandler from '../../../util/hooks/useBackHandler';

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
  // const {
  //   connected,
  //   products,
  //   promotedProductsIOS,
  //   subscriptions,
  //   purchaseHistories,
  //   availablePurchases,
  //   currentPurchase,
  //   currentPurchaseError,
  //   initConnectionError,
  //   finishTransaction,
  //   getProducts,
  //   getSubscriptions,
  //   getAvailablePurchases,
  //   getPurchaseHistories,
  //   requestSubscription,
  // } = useIAP();
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
  // const listenPurchases = (
  //   purchase: SubscriptionPurchase | ProductPurchase,
  // ) => {
  //   const receipt = purchase.transactionReceipt;
  //   if (receipt) {
  //   }
  // };
  // const initialize = async () => {
  //   let init = await initConnection();
  //   if (Platform.OS == 'android') {
  //     await flushFailedPurchasesCachedAsPendingAndroid();
  //   }
  // };

  useEffect(() => {
    getData();
    // initialize();
    // return () => {
    //   endConnection();
    // };
  }, []);

  // const handlePurchase = async (sku: string) => {
  //   try {
  //     let available = await getProducts({skus: [PRODUCT_ID_PAY]});
  //     let purchase = await requestPurchase({
  //       sku,
  //       skus: [PRODUCT_ID_PAY],
  //       andDangerouslyFinishTransactionAutomaticallyIOS: false,
  //     });
  //     finishTransaction({
  //       purchase: purchase,
  //     });
  //     console.log('=>(CompletePayment.tsx:100) res', purchase);
  //   } catch (err) {
  //     console.log('=>(CompletePayment.tsx:107) err', err);
  //   }
  // };
  //
  // useEffect(() => {
  //   // ... listen to currentPurchaseError, to check if any error happened
  //   console.log(
  //     '=>(CompletePayment.tsx:116) currentPurchaseError',
  //     currentPurchaseError,
  //   );
  // }, [currentPurchaseError]);
  //
  // useEffect(() => {
  //   // ... listen to currentPurchase, to check if the purchase went through
  //   console.log('=>(CompletePayment.tsx:124) currentPurchase', currentPurchase);
  // }, [currentPurchase]);
  useBackHandler(() => {
    return true;
  });
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
        verify_code: route?.params?.values?.verify_code,
        user_id: user?.id,
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

  return (
    <SafeAreaView edges={['top']} style={[styles.container]}>
      <View style={[styles.container]}>
        {!!route?.params?.isBack && (
          <TouchableOpacity onPress={goBack} style={styles.buttonBack}>
            <Image source={iconClose} />
          </TouchableOpacity>
        )}
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
                // handlePurchase(PRODUCT_ID_PAY);
              }}
              style={[styles.buttonTransfer, {opacity: 0.5}]}>
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
                <Text style={styles.input}>
                  {route?.params?.values?.verify_code}
                </Text>
                <TouchableOpacity
                  onPress={onCopy(
                    route?.params?.values?.verify_code,
                    copyType.TRANSACTION,
                  )}
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
