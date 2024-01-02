import {Header} from '@component';
import {SvgArrowLeft, babyPurchases} from '@images';
import {navigate} from '@navigation';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import moment from 'moment';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import useCheckPregnancy from '@util/hooks/useCheckPregnancy';

const MyPurchases = () => {
  const {t} = useTranslation();
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const checkPlan = useCheckPregnancy();

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Header
        title={t('setting.myPurchases')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      {user?.payments.length < 1 ? (
        <View style={[styles.container, {alignItems: 'center'}]}>
          <FastImage
            source={babyPurchases}
            style={{
              width: scaler(240),
              height: scaler(240),
              marginTop: scaler(80),
            }}
          />
          <Text style={[styles.title, {marginTop: scaler(40)}]}>
            {t('myPurchases.noPurchaseFound')}
          </Text>
          <Text style={[styles.label, {marginTop: scaler(12)}]}>
            {t('myPurchases.noPurchaseHistory')}
          </Text>
          <TouchableOpacity
            style={[styles.wrapBtnContainer, {marginTop: scaler(24)}]}
            onPress={checkPlan}>
            <Text style={styles.btnTitle}>{t('myPurchases.signUpNow')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.wrapHeaderContainer}>
            <Text style={styles.label}>Plan</Text>
            <Text style={[styles.title, {fontSize: scaler(18)}]}>
              499,000đ{' '}
              <Text style={styles.lifeTime}>/{t('myPurchases.lifetime')}</Text>
            </Text>
          </View>
          <Text style={[styles.subLabel, {marginTop: scaler(8)}]}>
            {t('myPurchases.billing')}
          </Text>
          <Text
            style={[
              styles.title,
              {fontSize: scaler(18), marginTop: scaler(32)},
            ]}>
            {t('myPurchases.purchaseHistory')}
          </Text>
          <ScrollView style={{flex: 1}}>
            {user?.payments.map(item => {
              return (
                <View style={styles.wrapItemContainer}>
                  <Text
                    style={[
                      styles.title,
                      {fontSize: scaler(16), marginBottom: scaler(4)},
                    ]}>
                    ID: {item?.transaction_id}
                  </Text>
                  <View style={styles.row}>
                    <Text
                      style={[
                        styles.lifeTime,
                        {fontSize: scaler(15), color: colors.gray550},
                      ]}>
                      {t('myPurchases.Amount')}
                    </Text>
                    <Text style={[styles.label, {color: colors.neutral10}]}>
                      {item?.price
                        ?.toString()
                        ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      đ
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      style={[
                        styles.lifeTime,
                        {fontSize: scaler(15), color: colors.gray550},
                      ]}>
                      {t('myPurchases.Method')}
                    </Text>
                    <Text style={[styles.label, {color: colors.neutral10}]}>
                      {item?.payment_method == 'bank_transfer'
                        ? t('myPurchases.bankTransfer')
                        : Platform.OS == 'ios'
                        ? 'Apple Pay'
                        : 'Google Pay'}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      style={[
                        styles.lifeTime,
                        {fontSize: scaler(15), color: colors.gray550},
                      ]}>
                      {t('myPurchases.Date')}
                    </Text>
                    <Text style={[styles.label, {color: colors.neutral10}]}>
                      {moment(item?.payment_date).format('DD/MM/YYYY')}
                    </Text>
                  </View>
                  {item?.status == 'completed' ? (
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.wrapStatusContainer}>
                        <Text style={styles.statusTitle}>
                          {t('myPurchases.Successful')}
                        </Text>
                      </View>
                    </View>
                  ) : item?.status == 'processing' ? (
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={[
                          styles.wrapStatusContainer,
                          {backgroundColor: colors.gray550},
                        ]}>
                        <Text style={styles.statusTitle}>
                          {t('myPurchases.Pending')}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={[
                          styles.wrapStatusContainer,
                          {backgroundColor: colors.red200},
                        ]}>
                        <Text style={styles.statusTitle}>
                          {t('myPurchases.Failed')}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scaler(16),
    flex: 1,
    borderTopWidth: 0.5,
    borderTopColor: colors.gray,
  },
  title: {
    fontSize: scaler(20),
    ...stylesCommon.fontWeight600,
  },
  label: {
    fontSize: scaler(15),
    ...stylesCommon.fontWeight400,
    color: colors.labelColor,
  },
  wrapBtnContainer: {
    paddingVertical: scaler(8),
    paddingHorizontal: scaler(16),
    backgroundColor: colors.pink4,
    borderRadius: scaler(40),
    alignItems: 'center',
  },
  btnTitle: {
    fontSize: scaler(13),
    ...stylesCommon.fontWeight600,
    color: colors.white,
  },
  wrapHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaler(12),
    paddingVertical: scaler(20),
    backgroundColor: colors.gray2,
    borderRadius: scaler(12),
  },
  subLabel: {
    fontSize: scaler(13),
    ...stylesCommon.fontWeight400,
    color: colors.gray7,
  },
  lifeTime: {
    fontSize: scaler(14),
    ...stylesCommon.fontWeight500,
  },
  wrapItemContainer: {
    paddingVertical: scaler(16),
    marginTop: scaler(16),
    borderTopWidth: 0.5,
    borderTopColor: colors.gray,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaler(8),
  },
  wrapStatusContainer: {
    paddingHorizontal: scaler(8),
    paddingVertical: scaler(4),
    borderRadius: scaler(16),
    backgroundColor: colors.green250,
    marginTop: scaler(16),
  },
  statusTitle: {
    fontSize: scaler(11),
    ...stylesCommon.fontWeight600,
    color: colors.white,
  },
});

export default MyPurchases;
