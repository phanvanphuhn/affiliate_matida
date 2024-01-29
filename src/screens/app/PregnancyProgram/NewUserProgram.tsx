import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {Header} from '@component';
import {
  bg_pp,
  ic_default1,
  ic_default2,
  ic_gift,
  ic_info,
  SvgArrowLeft,
  SvgCrown,
  SvgCrownProgram,
  SvgLive,
  SvgLock,
} from '@images';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import TabProgram from './components/TabProgram';
import ListWeek from './components/ListWeek';
import {ROUTE_NAME} from '@routeName';
import {useSelector} from 'react-redux';
import ListProgram from './components/ListProgram';
import {
  event,
  eventType,
  getColorPregnancy,
  getSubTitlePregnancy,
  trackingAppEvent,
} from '@util';
import Svg, {
  Defs,
  Line,
  Path,
  Stop,
  LinearGradient as LinearGradientSvg,
} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import useCheckPregnancy from '../../../util/hooks/useCheckPregnancy';

interface NewUserProgramProps {}

const NewUserProgram = (props: NewUserProgramProps) => {
  const navigation = useNavigation<any>();
  const checkPlan = useCheckPregnancy(false);
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const week = useSelector((state: any) =>
    !state?.home?.weekUserTask || state?.home?.weekUserTask <= 4
      ? 4
      : state?.home?.weekUserTask,
  );
  const [currentWeek, setCurrentWeek] = useState(week);
  const lang = useSelector((state: any) => state?.auth?.lang);

  const {t} = useTranslation();
  const goBack = () => {
    navigation.goBack();
  };

  const onGift = () => {
    navigation.navigate(ROUTE_NAME.MOM_DIARY);
  };
  const onAbout = () => {
    navigation.navigate(ROUTE_NAME.ABOUT_PROGRAM);
  };
  return (
    <View style={styles.container}>
      <Header
        title={'Matida Masterclass'}
        ComponentRight={
          <View style={{flexDirection: 'row'}}>
            {/*<TouchableOpacity onPress={onGift} disabled={true}>*/}
            {/*  <Image*/}
            {/*    source={ic_gift}*/}
            {/*    style={{*/}
            {/*      height: 30,*/}
            {/*      width: 30,*/}
            {/*      tintColor: colors.black10,*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</TouchableOpacity>*/}
            <TouchableOpacity style={{paddingLeft: 10}} onPress={onAbout}>
              <Image
                source={ic_info}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: colors.black10,
                }}
              />
            </TouchableOpacity>
          </View>
        }
        onPressLeft={goBack}
      />
      <Image
        style={{
          width: '100%',
          aspectRatio: 3 / 2,
        }}
        source={{
          uri:
            lang == 1
              ? 'https://s3.ap-southeast-1.amazonaws.com/matida/1703522103400421184.png'
              : 'https://s3.ap-southeast-1.amazonaws.com/matida/1703834983521123611.png',
        }}
      />
      <LinearGradient
        colors={[
          'rgba(242, 242, 242, 0.12)',
          'rgba(242, 242, 242, 0.42)',
          'rgba(242, 242, 242, 1)',
        ]}
        start={{x: 0.0, y: 0.55}}
        end={{x: 0.7, y: 1}}
        locations={[0, 0.5, 1]}
        style={{flex: 1}}>
        <View style={styles.container2}>
          <View style={styles.center}>
            <Text style={styles.textTitle}>
              {t('pregnancyProgram.AreYouReadyToBeTheBestMom')}
            </Text>
          </View>
          <View style={{padding: 20}}>
            <View style={[styles.rowStart, {}]}>
              <View
                style={{
                  alignItems: 'flex-start',
                  marginRight: 10,
                }}>
                <View
                  style={[
                    styles.dot,
                    {backgroundColor: getColorPregnancy('core')},
                  ]}
                />
                <Svg
                  style={{
                    width: 20,
                    height: '100%',
                    position: 'absolute',
                    top: 12,
                    left: 8,
                  }}
                  fill="none">
                  <Path
                    d="M1 1V179"
                    stroke="url(#paint0_linear_3027_21564)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                  />
                  <Defs>
                    <LinearGradientSvg
                      id="paint0_linear_3027_21564"
                      x1="10"
                      y1="20"
                      x2="10"
                      y2={'170'}
                      gradientUnits="userSpaceOnUse">
                      <Stop offset="0.395833" stopColor="#FD91FD" />
                      <Stop offset="1" stopColor="#FD91FD" stopOpacity="0" />
                    </LinearGradientSvg>
                  </Defs>
                </Svg>
              </View>

              <View
                style={{
                  flex: 1,
                  paddingBottom: scaler(10),
                }}>
                <View style={[styles.rowStart, {alignItems: 'center'}]}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: scaler(19),
                        ...stylesCommon.fontSarabun600,
                      }}>
                      {t('pregnancyProgram.pregnancyKnowledge')}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.containerTag,
                      {backgroundColor: getColorPregnancy('core')},
                    ]}>
                    <Text style={styles.textTag}>
                      {t('pregnancyProgram.core')}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={[styles.containerChild, {marginBottom: 20}]}>
                    <View style={{flex: 1, marginRight: scaler(16)}}>
                      <View style={{flex: 1}}>
                        <Text style={styles.textChild}>
                          {t(
                            'pregnancyProgram.LearnAboutTheBabyDevelopmentMilestones',
                          )}
                        </Text>

                        <View style={[styles.rowCenter, {paddingTop: 8}]}>
                          <SvgCrownProgram color={colors.yellow250} size={20} />
                          <Text style={styles.textChildDesc}>
                            {getSubTitlePregnancy('learn')}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Image source={ic_default2} style={styles.img} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            paddingBottom: 16,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: '',
          }}>
          <TouchableOpacity
            onPress={() => {
              trackingAppEvent(
                event.MASTER_CLASS.PP_FEED_SIGN_UP_NOW,
                {
                  params: {
                    userId: user.id,
                  },
                },
                eventType.MIX_PANEL,
              );
              checkPlan();
            }}
            style={{
              backgroundColor: colors.pink4,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 12,
              borderRadius: 100,
            }}>
            <SvgCrownProgram color={colors.white} size={20} />

            <Text
              style={{
                fontSize: scaler(15),
                color: colors.white,
                marginLeft: 10,
                ...stylesCommon.fontSarabun600,
              }}>
              {t('pregnancyProgram.SignUpNowToUnlock')}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default NewUserProgram;

const styles = StyleSheet.create({
  img: {
    height: widthScreen / 3.5,
    width: widthScreen / 3.5,
    borderRadius: 10,
  },
  textSmash: {
    color: colors.pink300,
    marginRight: 5,
    fontSize: scaler(13),
    ...stylesCommon.fontSarabun600,
    marginBottom: 2,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textChild: {
    fontSize: scaler(15),
    paddingRight: 5,
    ...stylesCommon.fontWeight600,
  },
  textChildDesc: {
    color: colors.gray500,
    fontSize: scaler(13),
    marginLeft: 5,
    ...stylesCommon.fontSarabun400,
  },
  containerChild: {
    backgroundColor: colors.white,
    padding: scaler(12),
    marginTop: scaler(16),
    borderRadius: scaler(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTag: {
    color: colors.white,
    fontSize: scaler(10),
    ...stylesCommon.fontSarabun600,
  },
  containerTag: {
    backgroundColor: colors.primaryBackground,
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(3),
    borderRadius: scaler(25),
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  dot: {
    backgroundColor: colors.primaryBackground,
    height: scaler(16),
    width: scaler(16),
    borderRadius: scaler(8),
    marginTop: 6,
    marginLeft: 1,
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  container: {backgroundColor: colors.white, flex: 1},
  container2: {flex: 1, paddingTop: scaler(15)},
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: scaler(22),
    textAlign: 'center',
    ...stylesCommon.fontWeight600,
  },
  textTitle2: {
    fontSize: scaler(14),
    color: colors.labelColor,
    marginTop: 5,
    marginBottom: scaler(10),
    ...stylesCommon.fontSarabun400,
  },
});
