import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';

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
  SvgCircleRightDailyAffirmation1,
  IconBackgroundImageHome,
} from '@images';
import {useTranslation} from 'react-i18next';
import {AppButton} from '@component';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {event, eventType, trackingAppEvent} from '@util';
import LinearGradient from 'react-native-linear-gradient';
import {chatGPTbackground} from '@images';

export const ChatGPTComponent = React.memo(({value}: any) => {
  const navigation = useNavigation<any>();
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const styleOfWeek = stylesDailyAffirmation[1];

  const onNavigateChatGPT = () => {
    trackingAppEvent(event.TIDA.TIDA_OPEN_HOMEPAGE, {}, eventType.MIX_PANEL);
    navigation.navigate(ROUTE_NAME.CHAT_GPT);
  };

  const Header_Max_Height = 240;
  const Header_Min_Height = 120;
  const Scroll_Distance = Header_Max_Height - Header_Min_Height;

  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  const animatedHeaderColor = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: ['#181D31', '#678983'],
    extrapolate: 'clamp',
  });

  return (
    // <Animated.View
    //   style={{
    //     marginTop: scaler(16),
    //     marginBottom: scaler(16),
    //     height: animatedHeaderHeight,
    //     backgroundColor: animatedHeaderColor,
    //   }}>
    <TouchableOpacity
      onPress={onNavigateChatGPT}
      style={{paddingHorizontal: scaler(16), marginTop: scaler(16)}}
      activeOpacity={0.9}>
      <LinearGradient
        colors={['rgb(134, 85, 255)', '#EE6566']}
        style={{
          borderRadius: scaler(16),
          paddingTop: scaler(16),
          paddingRight: scaler(16),
          paddingLeft: scaler(16),
        }}>
        <Image
          source={IconBackgroundImageHome}
          style={styles.imageBackground}
        />
        <View style={styles.wrapContainer}>
          <View style={styles.wrapContentContainer}>
            <Text style={[styles.textTitle, {color: styleOfWeek.colorTitle}]}>
              {t('newBornTida.hi')}
            </Text>
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
      </LinearGradient>
    </TouchableOpacity>
    // </Animated.View>
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
    color: colors.white,
  },
  textBody: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(12),
    textAlign: 'center',
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
    color: colors.white,
  },
  imageBackground: {
    width: scaler(134),
    height: scaler(249),
    position: 'absolute',
    right: 0,
    top: scaler(-100),
  },
});
