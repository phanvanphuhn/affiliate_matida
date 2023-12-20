import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {stylesDailyAffirmation} from '@constant';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {IQuote} from '../types';
import {useSelector} from 'react-redux';
import {
  SvgCircleRightDailyAffirmation,
  SvgIconTida,
  SvgLogoDailyAffirmation,
  SvgSparkle,
  TidaAI,
  SvgCircleRightDailyAffirmation1,
  IconBackgroundImageHome,
  ic_line,
} from '@images';
import {useTranslation} from 'react-i18next';
import {AppButton} from '@component';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {event, eventType, trackingAppEvent} from '@util';
import LinearGradient from 'react-native-linear-gradient';
import {chatGPTbackground} from '@images';

export const ChatGPTComponent = React.memo(() => {
  const navigation = useNavigation<any>();
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const styleOfWeek = stylesDailyAffirmation[1];

  const onNavigateChatGPT = () => {
    trackingAppEvent(event.TIDA.TIDA_OPEN_HOMEPAGE, {}, eventType.MIX_PANEL);
    navigation.navigate(ROUTE_NAME.CHAT_GPT);
  };

  return (
    <TouchableOpacity
      onPress={onNavigateChatGPT}
      style={{paddingHorizontal: scaler(16)}}
      activeOpacity={0.9}>
      <View style={styles.container1}>
        <View style={styles.containerYellow} />
        <Image source={ic_line} style={styles.imageBackground} />
        <View style={styles.wrapContainer}>
          <View style={styles.wrapContentContainer}>
            <Text style={[styles.textTitle]}>{t('newBornTida.hi')}</Text>
            <Text style={styles.description}>{t('newBornTida.tidaHere')}</Text>
            <View style={styles.btn}>
              <Text style={styles.textBody}>{t('newBornTida.askNow')}</Text>
            </View>
          </View>

          <View>
            <Image
              source={TidaAI}
              style={{
                width: scaler(90),
                height: scaler(120),
                // borderRadius: scaler(52),
                marginTop: scaler(16),
              }}
              // resizeMethod="resize"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaler(30),
    paddingVertical: scaler(28),
    backgroundColor: colors.brandMainPinkRed,
    marginHorizontal: scaler(20),
    borderRadius: scaler(16),
  },
  textTitle: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(11),
    color: colors.textColor,
  },
  textBody: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(12),
    textAlign: 'center',
    color: colors.pink300,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: scaler(6),
    paddingHorizontal: scaler(12),
    borderRadius: scaler(14),
  },
  wrapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapContentContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scaler(16),
  },
  description: {
    fontSize: scaler(20),
    ...stylesCommon.fontWeight600,
    color: colors.textColor,
  },
  imageBackground: {
    width: scaler(134),
    height: scaler(249),
    position: 'absolute',
    right: 0,
    top: scaler(-100),
    resizeMode: 'contain',
  },
  container1: {
    borderRadius: scaler(16),
    paddingTop: scaler(16),
    paddingRight: scaler(16),
    paddingLeft: scaler(16),
    backgroundColor: colors.pink350,
    overflow: 'hidden',
  },
  containerYellow: {
    backgroundColor: colors.yellow200,
    height: '200%',
    aspectRatio: 1,
    borderRadius: widthScreen,
    position: 'absolute',
    top: '-20%',
    left: '-20%',
  },
});
