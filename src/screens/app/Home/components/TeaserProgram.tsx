import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {
  background_home,
  background_home2,
  chuyengia1,
  chuyengia2,
  ic_line_wave,
  ic_line_wave2,
  SvgClose,
  SvgLineWave,
  teaser1,
  teaser2,
  teaser3,
  teaser4,
} from '@images';
import {Pagination} from 'react-native-snap-carousel';
import {goBack} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {getQuestionOnboarding} from '../../../../services/pregnancyProgram';
import {useSelector} from 'react-redux';
import useCheckPregnancy from '../../../../util/hooks/useCheckPregnancy';
import {useTranslation} from 'react-i18next';
import BarchartOnboardingHome from '../../OnboardingStep/components/BarchartOnboardingHome';
import {event, eventType, trackingAppEvent} from '@util';

interface TeaserProgramProps {
  isHome?: boolean;
}
const TeaserProgram = (props: TeaserProgramProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [userScore, setUserScore] = useState();
  const navigation = useNavigation<any>();
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const checkPlan = useCheckPregnancy();
  const lang = useSelector((state: any) => state?.auth?.lang);

  const {t} = useTranslation();
  console.log('user: ', user);
  const checkQuiz = async () => {
    if (!user.user_subscriptions.some(e => e.code == 'PP')) {
      if (!user.payments.some(e => e.status == 'processing')) {
        let result = await getQuestionOnboarding();
        if (result?.data?.user_score?.score) {
          setUserScore(result?.data?.user_score);
        }
      }
    } else {
      setUserScore(false);
    }
  };

  const onTest = () => {
    trackingAppEvent(
      event.MASTER_CLASS.PP_HOMEPAGE_TEASER_SIGN_UP_NOW,
      {
        params: {
          userId: user.id,
        },
      },
      eventType.MIX_PANEL,
    );
    if (userScore) {
      trackingAppEvent(
        event.MASTER_CLASS.pp_pregnancy_tracker_teaser_sign_up_now,
        {
          params: {
            userId: user.id,
          },
        },
        eventType.MIX_PANEL,
      );
    } else {
      trackingAppEvent(
        event.MASTER_CLASS.pp_pregnancy_tracker_teaser_take_the_test,
        {
          params: {
            userId: user.id,
          },
        },
        eventType.MIX_PANEL,
      );
    }
    checkPlan();
  };

  useEffect(() => {
    checkQuiz();
  }, [user]);

  return (
    <>
      {userScore ? (
        <ImageBackground
          source={userScore ? background_home2 : undefined}
          style={[styles.container]}>
          <View style={styles.container3}>
            <View style={{flex: 1}}>
              <Text style={styles.textOff}>
                {userScore
                  ? t('home.takeTheMatidaMasterclass')
                  : t('home.wantToBeTheSmartest')}
              </Text>
              <Text style={styles.textPrice1}>
                {userScore
                  ? t('home.wellWorkYourChallenges')
                  : t('home.getAheadWithMatidaMasterclass')}
              </Text>
            </View>
            <TouchableOpacity onPress={onTest} style={styles.buttonSignUp}>
              <Text style={styles.textButtonSignUp}>
                {userScore ? t('myPurchases.signUpNow') : t('home.getStarted')}
              </Text>
            </TouchableOpacity>
          </View>

          {userScore ? (
            <BarchartOnboardingHome {...userScore} />
          ) : (
            <View
              style={{
                position: 'absolute',
                right: -12,
                bottom: -10,
                zIndex: -100,
                transform: [{scale: 0.9}],
              }}>
              <Image
                source={{
                  uri: 'https://s3.ap-southeast-1.amazonaws.com/matida/1708089084364683064.png',
                }}
                style={{height: scaler(175), width: scaler(235)}}
                resizeMode="center"
              />
            </View>
          )}
        </ImageBackground>
      ) : lang == 1 ? (
        <TouchableOpacity onPress={onTest}>
          <Image
            source={{
              uri: 'https://s3.ap-southeast-1.amazonaws.com/matida/1708824893511954201.png',
            }}
            style={styles.imageContainer}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onTest}>
          <Image
            source={{
              uri: 'https://s3.ap-southeast-1.amazonaws.com/matida/1708824924456913188.png',
            }}
            style={styles.imageContainer}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default TeaserProgram;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: scaler(16),
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'flex-end',
    marginBottom: 18,
    backgroundColor: colors.pink350,
  },
  buttonClose: {
    alignSelf: 'flex-end',
    padding: scaler(15),
  },
  textTitle: {
    fontSize: scaler(20),
    ...stylesCommon.fontWeight500,
    color: colors.labelColor,
    textAlign: 'center',
  },
  textTitle2: {
    fontSize: scaler(28),
    ...stylesCommon.fontWeight600,
    color: colors.labelColor,
    textAlign: 'center',
  },
  container2: {
    backgroundColor: colors.yellow200,
    marginHorizontal: scaler(25),
    borderTopLeftRadius: scaler(24),
    borderTopRightRadius: scaler(24),
    paddingTop: scaler(20),
    paddingBottom: scaler(40),
    bottom: -10,
    marginTop: scaler(10),
  },
  textSpecial: {
    color: colors.pink300,
    fontSize: scaler(20),
    ...stylesCommon.fontWeight600,
    textAlign: 'center',
    marginBottom: scaler(10),
  },
  textPriceOld: {
    textDecorationLine: 'line-through',
    color: colors.textColor,
    fontSize: scaler(16),
    ...stylesCommon.fontWeight600,
    marginBottom: scaler(4),
    textAlign: 'center',
  },
  textPriceNew: {
    fontSize: scaler(24),
    ...stylesCommon.fontWeight600,
    color: colors.textColor,
    textAlign: 'center',
  },
  textPriceNew2: {
    fontSize: scaler(15),
    ...stylesCommon.fontWeight500,
  },
  buttonSignUp: {
    backgroundColor: colors.white,
    paddingVertical: 7,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  textButtonSignUp: {
    fontSize: scaler(13),
    ...stylesCommon.fontWeight600,
    color: colors.pink300,
  },
  container3: {
    marginBottom: scaler(16),
    marginTop: scaler(16),
    paddingLeft: scaler(15),
  },
  container4: {
    backgroundColor: colors.white,
    borderRadius: scaler(12),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaler(10),
    marginBottom: scaler(17),
  },
  container5: {},
  textOff: {
    color: colors.labelColor,
    fontSize: scaler(12),
    ...stylesCommon.fontSarabun500,
  },
  textPrice1: {
    color: colors.neutral10,
    fontSize: scaler(16),
    ...stylesCommon.fontWeight600,
    marginTop: scaler(8),
  },
  imageContainer: {
    height: scaler(156),
    width: '100%',
    // marginBottom: scaler(16),
    borderRadius: scaler(16),
  },
});
