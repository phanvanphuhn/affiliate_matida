import React, {useMemo, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {
  ic_default1,
  iconClose,
  SvgLineWave,
  SvgPathTop,
  teaser2,
} from '@images';
import {goBack} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {useNavigation} from '@react-navigation/native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {useSelector} from 'react-redux';

interface VerifyPaymentProps {}

const VerifyPayment = (props: VerifyPaymentProps) => {
  const [state, setState] = useState();
  const navigation = useNavigation<any>();
  const userInfo = useSelector((state: any) => state?.auth?.userInfo);
  const isPaymentProcessing = useMemo(() =>
    userInfo?.payments?.some(e => e.status == 'processing'),
  );

  const onPaymentFinish = () => {
    if (isPaymentProcessing) {
      navigation.navigate(ROUTE_NAME.TAB_HOME);
    } else {
      navigation.navigate(ROUTE_NAME.PREGNANCY_PROGRAM);
    }
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
            <Text style={styles.text1}>The All-in-one Course</Text>
            <Text style={styles.text2}>Matida Masterclass</Text>
          </View>
          <View style={styles.containerContent}>
            <View style={{top: -8}}>
              <SvgLineWave color={colors.pink350} />
            </View>
            <View style={styles.containerContent2}>
              <Text style={styles.textContent}>
                Your program is being created!
              </Text>
              <Text style={styles.textContent2}>
                {
                  'Thank your for signing up! \nOur team will now create your personalized program and activate it for you. You will hear from us in the next 24 hours.'
                }
              </Text>
              <Image source={teaser2} />
              <Text style={styles.textContent2}>
                Don't forget to{' '}
                <Text style={[styles.textContent2, {color: colors.pink300}]}>
                  turn on your notifications
                </Text>{' '}
                {'\nfor weekly important reminders.'}
              </Text>
            </View>
            <View style={{bottom: -8}}>
              <SvgLineWave color={colors.blue50} />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={onPaymentFinish} style={styles.buttonFinish}>
          <Text style={styles.textFinish}>Explore Matida</Text>
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
