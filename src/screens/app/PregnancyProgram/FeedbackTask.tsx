import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  colors,
  heightScreen,
  scaler,
  stylesCommon,
  widthScreen,
} from '@stylesCommon';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ic_default1,
  ic_default2,
  ic_gift,
  SvgArrowLeft,
  SvgClose,
  SvgLike,
  SvgLikeQuiz,
  SvgLikeTask,
  SvgLineWave,
  SvgPathBottom,
  SvgPathTop,
  SvgUnLikeTask,
  teaser1,
  teaser2,
  teaser3,
  teaser4,
} from '@images';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {setActive} from 'react-native-sound';
import {goBack, navigate} from '@navigation';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import Swiper from '../DetailFeed/SwiperFlatlist/Swiper';
import ParsedText from 'react-native-parsed-text';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {useTranslation} from 'react-i18next';
import {GlobalService} from '@services';
import {getUserTask} from '../../../services/pregnancyProgram';
import {useSelector} from 'react-redux';
import {
  getColorPregnancy,
  getLabelPregnancy,
  getSubTitlePregnancy,
  getTitlePregnancy,
} from '@util';
import Svg, {Line, Path} from 'react-native-svg';
import {EPreRoute} from '@constant';
import {RouteProp} from '@react-navigation/core/src/types';

interface FeedbackTaskProps {
  isHome?: boolean;
}

const FeedbackTask = (props: FeedbackTaskProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [state, setState] = useState([]);
  const lang = useSelector((state: any) => state?.auth?.lang);
  const route = useRoute<RouteProp<any>>();
  const navigation = useNavigation<any>();
  const {t} = useTranslation();
  const week = useSelector((state: any) =>
    !state?.home?.weekUserTask || state?.home?.weekUserTask <= 4
      ? 4
      : state?.home?.weekUserTask,
  );
  const getData = async () => {
    try {
      GlobalService.showLoading();
      let res = await getUserTask(
        route?.params?.currentWeek || week,
        'success',
      );
      if (res?.success) {
        let data = res?.data
          .sort((a: any, b: any) => a.order - b.order)
          ?.map((e: any) => e.task?.module)
          .filter((e: any, i: number, arr: any) => arr.indexOf(e) == i)
          .map(e => {
            let arr = res?.data.filter((item: any) => item.task?.module == e);
            return {
              title: getTitlePregnancy(e),
              label: getLabelPregnancy(e),
              type: e,
              data: arr,
            };
          });
        setState(data);
        console.log('=>(ListProgram.tsx:128) data', data);
      }
    } catch (e) {
    } finally {
      GlobalService.hideLoading();
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const onSignUpNow = () => {
    navigation.navigate(ROUTE_NAME.FEEDBACK_SUCCESS, {});
  };

  const onDetail = (item: any) => {
    switch (item?.task?.type) {
      case 'input_data':
        navigation.navigate(ROUTE_NAME.MOM_DIARY, {
          item,
          type: props?.tabIndex == 1 ? 'review' : 'todo',
        });
        break;
      case 'self_check':
        navigation.navigate(ROUTE_NAME.DETAIL_TASK_PROGRAM, {
          item,
        });
        break;
      case 'auto':
        if (props.tabIndex == 1) {
          navigate(ROUTE_NAME.TEST_RESULT, {
            id: item?.task?.link?.replace(
              RegExp('matida://mom-prep-test/'),
              '',
            ),
            redoTest: () => {},
            preRoute: EPreRoute.TEST_DETAIL,
          });
        } else {
          navigate(ROUTE_NAME.TEST_DETAIL, {
            quiz: {
              id: item?.task?.link?.replace(
                RegExp('matida://mom-prep-test/'),
                '',
              ),
            },
          });
        }
        break;
      default:
        navigation.navigate(ROUTE_NAME.DETAIL_TASK_PROGRAM, {
          item,
        });
        break;
    }
  };
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {}]}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.containerHeader} />
        <View
          style={{
            flex: 1,
            marginTop: insets.top + 10,
          }}>
          {!props?.isHome && (
            <TouchableOpacity
              onPress={goBack}
              hitSlop={{top: 20, right: 20, bottom: 20, left: 20}}
              style={styles.buttonClose}>
              <SvgClose color={colors.labelColor} />
            </TouchableOpacity>
          )}

          <Text style={styles.textTitle}>
            {t('pregnancyProgram.LetWrapUpThisWeekTogether')}
          </Text>
          <Text
            style={[
              styles.textTitle2,
              {
                marginTop: 10,
                marginBottom: 20,
              },
            ]}>
            {t('pregnancyProgram.LetUsKnowHowThisWeekHasHelpedYou')}
          </Text>
          <View
            style={{
              bottom: -8,
              zIndex: 10,
            }}>
            <SvgLineWave color={colors.pink350} />
          </View>
          <View
            style={{
              backgroundColor: colors.white,
              flex: 1,
              paddingTop: 8,
            }}>
            <View
              style={{
                padding: scaler(16),
                paddingTop: scaler(30),
              }}>
              <Text
                style={{
                  fontSize: scaler(18),
                  color: colors.textColor,
                  lineHeight: scaler(22),
                  ...stylesCommon.fontWeight600,
                }}>
                {t('pregnancyProgram.DoYouEnjoyTheProgramSoFar')}
              </Text>
              <TextInput
                multiline={true}
                style={{
                  minHeight: scaler(96),
                  fontSize: scaler(15),
                  marginTop: scaler(8),
                  ...stylesCommon.fontSarabun400,
                }}
                placeholder={t('pregnancyProgram.TellUsAnything') as string}
              />
              <Text
                style={{
                  fontSize: scaler(18),
                  color: colors.textColor,
                  marginTop: scaler(40),
                  ...stylesCommon.fontWeight600,
                }}>
                {t('pregnancyProgram.PleaseRateThisWeekContent')}
              </Text>
              <View style={{flex: 1, paddingTop: scaler(24)}}>
                {state?.map((item, index) => {
                  return (
                    <View key={index} style={[styles.rowStart, {}]}>
                      <View
                        style={{
                          flex: 1,
                          paddingBottom: scaler(10),
                        }}>
                        <View style={[styles.rowStart, {alignItems: 'center'}]}>
                          <View style={{flex: 1}}>
                            <Text
                              style={{
                                fontSize: scaler(16),
                                color: colors.neutral10,
                                ...stylesCommon.fontSarabun600,
                              }}>
                              {item.title}
                            </Text>
                          </View>
                          {item.type != 'reward' && (
                            <View
                              style={[
                                styles.containerTag,
                                {backgroundColor: getColorPregnancy(item.type)},
                              ]}>
                              <Text style={styles.textTag}>{item.label}</Text>
                            </View>
                          )}
                        </View>
                        <View>
                          {item.data.map((e, i) => {
                            return (
                              <TouchableOpacity
                                key={i}
                                onPress={() => onDetail(e)}
                                style={[
                                  styles.containerChild,
                                  i == item.data.length - 1
                                    ? {
                                        marginBottom: 20,
                                      }
                                    : {},
                                ]}>
                                <View style={{flex: 1}}>
                                  <View style={{flex: 1}}>
                                    <Text style={styles.textChild}>
                                      {lang == 1
                                        ? e?.task?.name_en
                                        : e?.task?.name_vi}
                                    </Text>
                                    <Text style={styles.textChildDesc}>
                                      {getSubTitlePregnancy(
                                        e.task?.categories?.[0],
                                      )}
                                    </Text>
                                  </View>
                                </View>
                                <Image
                                  source={
                                    e?.task?.thumbnail
                                      ? {uri: e?.task?.thumbnail}
                                      : ic_default1
                                  }
                                  style={styles.img}
                                />
                                <View
                                  style={{
                                    position: 'absolute',
                                    bottom: -15,
                                    left: 20,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <TouchableOpacity style={styles.buttonLike}>
                                    <SvgLikeTask color={colors.pink200} />
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    style={[
                                      styles.buttonLike,
                                      {marginLeft: 10},
                                    ]}>
                                    <SvgUnLikeTask color={colors.gray550} />
                                  </TouchableOpacity>
                                </View>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.container3}>
        <View
          style={{
            top: -8,
          }}>
          <SvgLineWave color={colors.blue50} />
        </View>
        <TouchableOpacity onPress={onSignUpNow} style={styles.buttonSignUp}>
          <Text style={styles.textButtonSignUp}>{t('test.submit')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedbackTask;

const styles = StyleSheet.create({
  buttonSignUp: {
    backgroundColor: colors.yellow200,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaler(16),
    marginHorizontal: 25,
  },
  textButtonSignUp: {
    fontSize: scaler(15),
    color: colors.labelColor,
    ...stylesCommon.fontWeight600,
  },
  container3: {
    marginBottom: scaler(35),
  },
  container4: {
    backgroundColor: colors.white,
    borderRadius: scaler(12),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaler(10),
    paddingHorizontal: scaler(55),
    marginBottom: scaler(17),
  },
  container5: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: colors.pink300,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 5,
    paddingHorizontal: 9,
  },
  buttonLike: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 100,
    shadowColor: colors.labelColor,
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.2,
    elevation: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.pink350,
    borderRadius: scaler(16),
  },
  containerHeader: {
    backgroundColor: colors.yellow200,
    height: widthScreen,
    width: widthScreen,
    borderRadius: widthScreen / 2,
    borderColor: colors.white,
    borderWidth: 10,
    justifyContent: 'flex-end',
    paddingBottom: 60,
    transform: [{scaleX: 1.04}],
    alignItems: 'center',
    position: 'absolute',
    top: -widthScreen / 2 + (isIphoneX() ? 60 : 50),
  },
  buttonClose: {
    alignSelf: 'flex-end',
    paddingRight: scaler(16),
  },
  textTitle: {
    fontSize: scaler(22),
    color: colors.textColor,
    textAlign: 'center',
    paddingHorizontal: scaler(53),
    ...stylesCommon.fontWeight600,
  },
  textTitle2: {
    fontSize: scaler(15),
    color: colors.labelColor,
    paddingHorizontal: scaler(40),
    textAlign: 'center',
    ...stylesCommon.fontSarabun400,
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
  img: {
    height: widthScreen / 5,
    width: widthScreen / 5,
    borderRadius: 8,
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
    fontSize: scaler(14),
    paddingRight: 5,
    ...stylesCommon.fontWeight600,
  },
  textChildDesc: {
    color: colors.gray7,
    fontSize: scaler(13),
    marginTop: scaler(6),
    paddingRight: scaler(10),
    paddingBottom: scaler(20),
    textTransform: 'capitalize',
    ...stylesCommon.fontSarabun400,
  },
  containerChild: {
    backgroundColor: colors.gray350,
    padding: scaler(12),
    marginTop: scaler(16),
    marginBottom: scaler(16),
    borderRadius: scaler(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTag: {
    color: colors.white,
    fontSize: scaler(11),
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
});
