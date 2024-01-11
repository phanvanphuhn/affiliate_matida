import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  UIManager,
} from 'react-native';
import {
  colors,
  heightScreen,
  scaler,
  stylesCommon,
  widthScreen,
} from '@stylesCommon';
import Svg, {Circle, G, Path, Line} from 'react-native-svg';
import DashedLine from './DashedLine';
import {
  ic_default1,
  ic_default2,
  ic_gift,
  SvgArrowLeft,
  SvgLock,
} from '@images';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {getFeedBacks, getUserTask} from '../../../../services/pregnancyProgram';
import {useSelector} from 'react-redux';
import {GlobalService} from '@services';
import {useTranslation} from 'react-i18next';
import {
  event,
  eventType,
  getColorPregnancy,
  getLabelPregnancy,
  getSubTitlePregnancy,
  getTitlePregnancy,
  trackingAppEvent,
} from '@util';
import {navigate, NavigationUtils} from '@navigation';
import {EPreRoute} from '@constant';
import {NavigationProp} from '@react-navigation/core/src/types';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
interface ListProgramProps {
  tabIndex?: number; // 0 todos || 1 finished
  currentWeek: number;
}
export const sortOrder = [
  'core',
  'love_and_money',
  'fitness_and_nutrition',
  'baby_care',
];

const ListProgram = (props: ListProgramProps) => {
  const [state, setState] = useState([]);
  const navigation = useNavigation<NavigationProp<any>>();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const isFeedback = useRef(false);
  const week = useSelector((state: any) =>
    !state?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks ||
    state?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks <= 4
      ? 4
      : state?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks,
  );
  const {t} = useTranslation();

  const getListFeedBack = async () => {
    let result = await getFeedBacks({week: props.currentWeek});
    console.log('=>(ListProgram.tsx:78) result', result);
    return !!result?.data?.length;
  };

  const getData = async () => {
    try {
      GlobalService.showLoading();
      let res = await getUserTask(
        props?.currentWeek || week,
        props?.tabIndex == 0 ? 'doing' : 'success',
      );
      if (res?.success) {
        let data = res?.data
          .sort(
            (a: any, b: any) =>
              sortOrder.indexOf(a?.task.module) -
              sortOrder.indexOf(b?.task.module),
          )
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
        if (data?.length > 0) {
          data = data.concat([
            {
              title: t('pregnancyProgram.makingProgress'),
              type: 'reward',
              label: 'Basics',
              data: [
                {
                  name: 'What should mom eat in week 5?',
                  description: 'Learn',
                  icon: ic_default2,
                },
              ],
            },
          ]);
        } else {
          let isCheck = await getListFeedBack();
          console.log('=>(ListProgram.tsx:124) isFeedback', isFeedback);
          if (!isFeedback.current && props?.tabIndex == 0 && !isCheck) {
            isFeedback.current = true;

            navigation.navigate(ROUTE_NAME.FEEDBACK_TASK, {
              currentWeek: props.currentWeek,
            });
          }
        }
        setState(data);
        console.log('=>(ListProgram.tsx:128) data', data);
      }
    } catch (e) {
    } finally {
      GlobalService.hideLoading();
    }
  };
  useEffect(() => {
    isFeedback.current = false;
  }, [props.currentWeek]);
  useFocusEffect(
    useCallback(() => {
      getData();
    }, [props?.currentWeek, props?.tabIndex]),
  );
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
            preRoute: EPreRoute.PREGNANCY_PROGRAM,
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

  const onFeedBack = () => {
    // navigation.navigate(ROUTE_NAME.FEEDBACK_TASK, {
    //   currentWeek: props.currentWeek,
    // });
  };
  return (
    <View style={styles.container}>
      {state?.map((item, index) => {
        return (
          <View key={index} style={[styles.rowStart, {}]}>
            <View
              style={{
                alignItems: 'flex-start',
                marginRight: item.type == 'reward' ? 0 : 10,
              }}>
              <View
                style={[
                  styles.dot,
                  {backgroundColor: getColorPregnancy(item.type)},
                ]}
              />
              {item.type == 'reward' ? (
                <Svg style={{width: 20, height: '100%'}} fill="none">
                  <Path
                    d="M1 1V35C1 55.8366 8.16344 52 20 55V55"
                    stroke={getColorPregnancy(item.type)}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeDasharray="2 4"
                    x={8}
                    y={0}
                  />
                </Svg>
              ) : (
                <Svg
                  style={{width: 20, height: '100%', position: 'absolute'}}
                  fill="none">
                  <Line
                    stroke={getColorPregnancy(item.type)}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="2 4"
                    x1="10"
                    y1="22"
                    x2="10"
                    y2={'200%'}
                  />
                </Svg>
              )}
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
                      marginLeft: item.type == 'reward' ? 10 : 0,
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
                {item.type == 'reward' ? (
                  <View>
                    <TouchableOpacity
                      onPress={onFeedBack}
                      disabled={true}
                      style={{
                        backgroundColor: colors.blue,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: scaler(16),
                        paddingHorizontal: scaler(16),
                        paddingVertical: scaler(15),
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: scaler(15),
                          ...stylesCommon.fontWeight600,
                        }}>
                        {t('pregnancyProgram.thankMommy')}
                      </Text>
                      <Image style={{height: 26, width: 26}} source={ic_gift} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  item.data.map((e, i) => {
                    return (
                      <View
                        key={i}
                        style={[
                          styles.containerChild,
                          i == item.data.length - 1
                            ? {
                                marginBottom: 20,
                              }
                            : {},
                        ]}>
                        <View style={{flex: 1, marginRight: scaler(16)}}>
                          <View style={{flex: 1}}>
                            <Text style={styles.textChild}>
                              {lang == 1 ? e?.task?.name_en : e?.task?.name_vi}
                            </Text>
                            <Text style={styles.textChildDesc}>
                              {getSubTitlePregnancy(e.task?.categories?.[0])}
                            </Text>
                          </View>
                          {week < props?.currentWeek ? (
                            <View style={styles.rowCenter}>
                              <SvgLock
                                color={colors.gray550}
                                size={16}
                                strokeWidth={3}
                              />
                              <Text
                                style={[
                                  styles.textSmash,
                                  {color: colors.gray550, marginLeft: 5},
                                ]}>
                                {t('pregnancyProgram.comeBackLater')}
                              </Text>
                            </View>
                          ) : (
                            <TouchableOpacity
                              onPress={() => onDetail(e)}
                              style={styles.rowCenter}>
                              <Text style={styles.textSmash}>
                                {props?.tabIndex == 0
                                  ? t('pregnancyProgram.finishTheTask')
                                  : t('pregnancyProgram.reviewIt')}
                              </Text>
                              <SvgArrowLeft
                                stroke={colors.pink300}
                                size={16}
                                strokeWidth={3}
                                transform={[{rotate: '180deg'}]}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                        <Image
                          source={
                            e?.task?.thumbnail
                              ? {uri: e?.task?.thumbnail}
                              : ic_default1
                          }
                          style={styles.img}
                        />
                      </View>
                    );
                  })
                )}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ListProgram;

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
    marginTop: scaler(5),
    paddingRight: scaler(10),
    paddingBottom: scaler(10),
    ...stylesCommon.fontSarabun400,
  },
  containerChild: {
    backgroundColor: colors.gray350,
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
  container: {flex: 1, padding: scaler(15)},
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
