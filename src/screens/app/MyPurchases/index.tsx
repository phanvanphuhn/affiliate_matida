import {Header} from '@component';
import {SvgArrowLeft, babyPurchases} from '@images';
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
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';

const MyPurchases = () => {
  const {t} = useTranslation();
  const user = useSelector((state: any) => state?.auth?.userInfo);
  console.log('user: ', user);
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Header
        title={t('setting.myPurchases')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      {user?.payments.length > 1 ? (
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
            Không có lịch sử thanh toán
          </Text>
          <Text style={[styles.label, {marginTop: scaler(12)}]}>
            Mẹ không có lịch sử thanh toán nào cả!
          </Text>
          <TouchableOpacity
            style={[styles.wrapBtnContainer, {marginTop: scaler(24)}]}>
            <Text style={styles.btnTitle}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.wrapHeaderContainer}>
            <Text style={styles.label}>Plan</Text>
            <Text style={[styles.title, {fontSize: scaler(18)}]}>
              499,000đ <Text style={styles.lifeTime}>/lifetime</Text>
            </Text>
          </View>
          <Text style={[styles.subLabel, {marginTop: scaler(8)}]}>
            Membership might take up to 24 hours after the billing date to be
            fully activated.
          </Text>
          <Text
            style={[
              styles.title,
              {fontSize: scaler(18), marginTop: scaler(32)},
            ]}>
            Purchase History
          </Text>
          <ScrollView style={{flex: 1}}>
            <View style={styles.wrapItemContainer}>
              <Text
                style={[
                  styles.title,
                  {fontSize: scaler(16), marginBottom: scaler(4)},
                ]}>
                ID: 0913540002 3012 PP1
              </Text>
              <View style={styles.row}>
                <Text
                  style={[
                    styles.lifeTime,
                    {fontSize: scaler(15), color: colors.gray550},
                  ]}>
                  Amount
                </Text>
                <Text style={[styles.label, {color: colors.neutral10}]}>
                  499,000đ
                </Text>
              </View>
              <View style={styles.row}>
                <Text
                  style={[
                    styles.lifeTime,
                    {fontSize: scaler(15), color: colors.gray550},
                  ]}>
                  Method
                </Text>
                <Text style={[styles.label, {color: colors.neutral10}]}>
                  Bank Transfer
                </Text>
              </View>
              <View style={styles.row}>
                <Text
                  style={[
                    styles.lifeTime,
                    {fontSize: scaler(15), color: colors.gray550},
                  ]}>
                  Date
                </Text>
                <Text style={[styles.label, {color: colors.neutral10}]}>
                  {moment(new Date()).format('DD/MM/YYYY')}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.wrapStatusContainer}>
                  <Text style={styles.statusTitle}>Successful</Text>
                </View>
              </View>
            </View>
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
