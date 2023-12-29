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
import {useTranslation} from 'react-i18next';
import TabProgram from './components/TabProgram';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface FeedbackSuccessProps {}

const FeedbackSuccess = (props: FeedbackSuccessProps) => {
  const [state, setState] = useState();
  const navigation = useNavigation<any>();
  const {t} = useTranslation();
  const userInfo = useSelector((state: any) => state?.auth?.userInfo);
  const paymentProcessing = useMemo(() => userInfo?.payments);
  const lang = useSelector((state: any) => state?.auth?.lang);
  const insets = useSafeAreaInsets();
  const onFinish = () => {
    navigation.navigate(ROUTE_NAME.PREGNANCY_PROGRAM);
  };
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <TouchableOpacity
        onPress={goBack}
        hitSlop={{top: 20, right: 20, bottom: 20, left: 20}}
        style={styles.buttonClose}>
        <Image source={iconClose} style={styles.iconClose} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 30,
        }}>
        <Image
          style={{
            width: '100%',
            aspectRatio: 3 / 2,
          }}
          source={{
            uri: 'https://s3.ap-southeast-1.amazonaws.com/matida/1703522103400421184.png',
          }}
        />
        <View style={[styles.container2, styles.center]}>
          <Text style={styles.textTitle}>
            {t('pregnancyProgram.ThankYouForYourFeedback')}
          </Text>
          <Text style={styles.textTitle2}>
            {t('pregnancyProgram.YourFeedbackHelpsUsToGetBetter')}
          </Text>
        </View>

        <TouchableOpacity onPress={onFinish} style={styles.buttonFinish}>
          <Text style={styles.textFinish}>
            {t('pregnancyProgram.exploreMatida')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedbackSuccess;

const styles = StyleSheet.create({
  buttonFinish: {
    backgroundColor: colors.pink200,
    paddingVertical: 14,
    marginVertical: 40,
    alignSelf: 'center',
    borderRadius: 100,
    width: '85%',
    alignItems: 'center',
  },
  textFinish: {
    fontSize: scaler(15),
    color: colors.white,
    lineHeight: scaler(20),
    ...stylesCommon.fontWeight600,
  },
  buttonClose: {
    alignSelf: 'flex-end',
    paddingRight: scaler(16),
  },
  iconClose: {
    height: 25,
    width: 25,
  },
  container: {backgroundColor: colors.white, flex: 1},
  container2: {paddingTop: scaler(15)},
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: scaler(22),
    lineHeight: scaler(28),
    ...stylesCommon.fontWeight600,
  },
  textTitle2: {
    fontSize: scaler(15),
    color: colors.labelColor,
    marginTop: 5,
    marginBottom: scaler(10),
    lineHeight: scaler(20),
    ...stylesCommon.fontSarabun400,
  },
});
