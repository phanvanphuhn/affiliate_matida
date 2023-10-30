import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {stylesDailyAffirmation} from '@constant';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {IQuote} from '../types';
import {useSelector} from 'react-redux';
import {
  SvgCircleRightDailyAffirmation,
  SvgIconTida,
  SvgLogoDailyAffirmation,
  SvgSparkle,
  TidaAI,
} from '@images';
import {useTranslation} from 'react-i18next';
import {AppButton} from '@component';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {event, eventType, trackingAppEvent} from '@util';

export const ChatGPTComponent = React.memo(() => {
  const navigation = useNavigation<any>();
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const styleOfWeek = stylesDailyAffirmation[1];
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: '#654AC9', overflow: 'hidden'},
      ]}>
      <SvgCircleRightDailyAffirmation
        color={styleOfWeek.colorIcon}
        // color="red"
        style={{position: 'absolute', top: scaler(47), left: -scaler(44)}}
      />
      <SvgLogoDailyAffirmation
        color={styleOfWeek.colorIcon}
        style={{position: 'absolute', top: -scaler(22), right: -scaler(100)}}
      />
      <View style={{alignItems: 'center', flex: 1}}>
        <Text style={[styles.textTitle, {color: styleOfWeek.colorTitle}]}>
          {t('home.titleTida')}
        </Text>
        {/* <SvgIconTida style={{marginVertical: scaler(16)}} /> */}
        <Image
          source={TidaAI}
          style={{
            width: scaler(104),
            height: scaler(104),
            // borderRadius: scaler(52),
            marginTop: scaler(16),
          }}
          // resizeMethod="resize"
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            trackingAppEvent(
              event.TIDA.TIDA_OPEN_HOMEPAGE,
              {},
              eventType.MIX_PANEL,
            );
            navigation.navigate(ROUTE_NAME.CHAT_GPT);
          }}>
          <SvgSparkle />
          <Text style={styles.textBody}>{t('home.askTida')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaler(30),
    paddingVertical: scaler(28),
    backgroundColor: colors.brandMainPinkRed,
    marginHorizontal: scaler(20),
    borderRadius: scaler(8),
    marginBottom: scaler(28),
  },
  textTitle: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(18),
    color: colors.white,
    textAlign: 'center',
  },
  textBody: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    color: '#654AC9',
    textAlign: 'center',
    marginLeft: scaler(10),
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: scaler(8),
    paddingHorizontal: scaler(39),
    borderRadius: scaler(8),
  },
});
