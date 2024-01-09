import React, {useMemo, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {
  ic_default1,
  ic_wave_line_bottom,
  ic_wave_line_top,
  iconClose,
  SvgLineWave,
  SvgPathTop,
  teaser2,
} from '@images';
import {goBack} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {useNavigation} from '@react-navigation/native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {getUserInfoApi, GlobalService} from '@services';
import {saveDataUser} from '@redux';

interface VerifyPaymentProps {}

const VerifyPayment = (props: VerifyPaymentProps) => {
  const navigation = useNavigation<any>();
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const getDataUser = async () => {
    try {
      const res = await getUserInfoApi();
      dispatch(saveDataUser(res?.data?.data));
      return res?.data?.data;
    } catch (error) {}
  };

  const onPaymentFinish = async () => {
    GlobalService.showLoading();
    let data = await getDataUser();
    if (
      !data?.payments?.length ||
      data?.payments?.some(e => e.status == 'processing')
    ) {
      navigation.navigate(ROUTE_NAME.TAB_HOME);
    } else {
      navigation.navigate(ROUTE_NAME.PREGNANCY_PROGRAM);
    }
    GlobalService.hideLoading();
  };

  const onPressOpenSetting = async () => {
    await Linking.openSettings();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        bounces={false}>
        <View
          style={{
            flex: 1,
          }}>
          <View style={styles.container2}>
            <TouchableOpacity
              onPress={goBack}
              hitSlop={{top: 20, right: 20, bottom: 20, left: 20}}
              style={styles.buttonClose}>
              <Image source={iconClose} style={styles.iconClose} />
            </TouchableOpacity>
            <Text style={styles.text1}>{t('pregnancyProgram.aioCourse')}</Text>
            <Text style={styles.text2}>Matida Masterclass</Text>
          </View>
          <View style={styles.containerContent}>
            <View style={{top: -8.6}}>
              <Image
                source={ic_wave_line_top}
                style={{width: '100%', height: 17, tintColor: colors.pink350}}
              />
            </View>
            <View style={styles.containerContent2}>
              <Text style={styles.textContent}>
                {t('pregnancyProgram.programCreated')}
              </Text>
              <Text style={styles.textContent2}>
                {t('pregnancyProgram.thankYouForSignUp')}
              </Text>
              <Image source={teaser2} />
              <TouchableOpacity onPress={onPressOpenSetting}>
                <Text style={styles.textContent2}>
                  {t('pregnancyProgram.dontForget')}{' '}
                  <Text style={[styles.textContent2, {color: colors.pink300}]}>
                    {t('pregnancyProgram.turnOnNoti')}
                  </Text>{' '}
                  {`\n${t('pregnancyProgram.reminder')}`}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{bottom: -8.6}}>
              <Image
                source={ic_wave_line_bottom}
                style={{width: '100%', height: 17, tintColor: colors.blue50}}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={onPaymentFinish} style={styles.buttonFinish}>
          <Text style={styles.textFinish}>
            {t('pregnancyProgram.exploreMatida')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default VerifyPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pink350,
  },
  container2: {
    backgroundColor: colors.yellow200,
    height: widthScreen,
    width: widthScreen,
    borderRadius: widthScreen / 2,
    borderColor: colors.white,
    borderWidth: 10,
    justifyContent: 'flex-end',
    paddingBottom: 70,
    alignItems: 'center',
    transform: [{scaleX: 1.04}],
    position: 'absolute',
    top: -widthScreen / 2 + (isIphoneX() ? 60 : 40),
  },
  buttonClose: {
    alignSelf: 'flex-end',
    paddingRight: scaler(16),
  },
  iconClose: {
    height: 25,
    width: 25,
  },
  text1: {
    fontSize: scaler(20),
    marginBottom: 10,
    color: colors.textColor,
    ...stylesCommon.fontWeight500,
  },
  text2: {
    fontSize: scaler(26),
    ...stylesCommon.fontWeight600,
  },
  containerContent: {
    backgroundColor: colors.white,
    flex: 1,
    marginTop: widthScreen / 2 + (isIphoneX() ? 20 : 0),
  },
  containerContent2: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: scaler(40),
  },
  textContent: {
    fontSize: scaler(22),
    ...stylesCommon.fontWeight600,
    marginTop: scaler(40),
  },
  textContent2: {
    fontSize: scaler(15),
    color: colors.labelColor,
    textAlign: 'center',
    marginTop: scaler(20),
    ...stylesCommon.fontWeight400,
    marginBottom: scaler(24),
  },
  buttonFinish: {
    backgroundColor: colors.yellow200,
    paddingVertical: 14,
    marginVertical: 40,
    alignSelf: 'center',
    borderRadius: 100,
    width: '85%',
    alignItems: 'center',
  },
  textFinish: {
    fontSize: scaler(15),
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
  },
});
