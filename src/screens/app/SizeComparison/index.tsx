/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {FLoatingAIButton, Header, PickerWeek} from '@component';
import {SvgArrowLeft, SvgMessages3} from '@images';
import {useNavigation, useRoute} from '@react-navigation/native';
import {saveIsDoneDaily, updateDataHome} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {
  answerDailyQuiz,
  getCalendarCheckup,
  getSizeComparison,
  GlobalService,
} from '@services';
import {colors, scaler} from '@stylesCommon';
import {
  event,
  eventType,
  isShowForReviewer,
  trackingAppEvent,
  useUXCam,
} from '@util';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {ViewQuiz} from '../Home/components';
import {Body} from './component/Body';
import {CheckupCalendar} from './component/CheckupCalendar';
import {Embryo} from './component/Embryo';
import {ListArticle} from './component/ListArticle';
import {ListPostByWeek} from './component/ListPostByWeek';
import {Size} from './component/Size';
import {ViewSelectType} from './component/ViewSelectType';
import {styles} from './styles';
import {trackClickedOnPregnancyTracker} from '@services/webengageManager.tsx';
import TeaserProgram from '../Home/components/TeaserProgram';
import ProductCarousel from '../Home/components/ProductCarousel';
import ModalConsultant from '../Home/components/ModalConsultant';
import GetSupport from '../Home/components/GetSupport';

const SizeComparison = () => {
  const dispatch = useDispatch();

  const route = useRoute<any>();
  const {option = 1, isBody} = route?.params;
  const weekNotifi = route?.params?.week;
  const homeData = useSelector((state: any) => state?.home);
  const isDoneDaily = useSelector((state: RootState) => state.auth.isDoneDaily);
  const weekPregnant =
    useSelector(
      (state: any) => state?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks,
    ) ?? 40;
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const lang = useSelector((state: any) => state?.auth?.lang);

  const week = weekNotifi ? weekNotifi : weekPregnant;
  const listPosition = useRef([0, 0, 0, 0, 0, 0, 0]);
  const scrollViewRef = useRef(null);

  const {t} = useTranslation();
  const [status, setStatus] = useState(option);
  const [data, setData] = useState<any>(null);
  const [dataTimeline, setDataTimeline] = useState([]);
  const [listImage, setListImage] = useState<any[]>([]);
  const [weekSelected, setWeek] = useState(week);
  const [calendarCheckupData, setCalendarCheckupData] = useState();
  const [bodyOffset, setBodyOffset] = useState(0);
  const [layoutEmbryo, setLayoutEmbryo] = useState(250);
  const [layoutSize, setLayoutSize] = useState(1000);

  const [selectedWeek, setSelectedWeek] = useState(null);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<any>();
  const statusView = useRef(option);
  const [isRendered, setRendered] = useState(false);
  const [isShowConsultant, setIsShowConsultant] = useState(false);

  const dataDailyQuiz = useSelector(
    (state: any) => state?.home?.data?.dailyQuizz,
  );

  useUXCam(ROUTE_NAME.SIZE_COMPARISON);
  const getData = async (value: any) => {
    setSelectedWeek(value);
    trackClickedOnPregnancyTracker(value, status);
    try {
      GlobalService.showLoading();
      setTimeout(() => {
        flatListRef?.current?.scrollToOffset({animated: true, offset: 0});
      }, 50);
      const res = await getSizeComparison(value);
      setData(res?.data);
      const image = res?.data?.baby?.image
        .concat(res?.data?.baby_size?.image)
        .concat(res?.data?.mom?.image);
      setListImage(image ?? []);
      // const resTimeline = await getValueTimeLine(value);
      // setDataTimeline(resTimeline?.data?.data);
    } catch (error) {
    } finally {
      GlobalService.hideLoading();
    }
  };
  const onAnswerQuiz = async (value: any) => {
    try {
      GlobalService.showLoading();
      const res = await answerDailyQuiz(value);
      !isDoneDaily && dispatch(saveIsDoneDaily(true));
      dispatch(
        updateDataHome({
          ...data,
          dailyQuizz: {
            ...dataDailyQuiz,
            ...res?.data,
          },
        }),
      );
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const onLayoutEmbryo = event => {
    const {height} = event.nativeEvent.layout;
    return height;
  };

  const onLayoutSize = event => {
    const {height} = event.nativeEvent.layout;
    return height;
  };

  useEffect(() => {
    trackingAppEvent(event.SCREEN.SIZE_COMPARISON, {}, eventType.AFF_FLYER);
    if (week && status === 1) {
      getData(week);
    } else {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: listPosition.current[Math.floor(weekSelected / 7)],
        });
      }, 400);
    }
  }, [week, status]);

  const getDataCalendarCheckup = useCallback(async () => {
    try {
      const calendarCheckup = await getCalendarCheckup();
      setCalendarCheckupData(calendarCheckup?.data);
      if (option === 2) {
        setTimeout(() => {
          flatListRef.current?.scrollToOffset({
            offset: listPosition.current[Math.floor(weekSelected / 7)],
          });
        }, 400);
      }
      if (isBody && calendarCheckup) {
        setTimeout(() => {
          if (isBody) {
            flatListRef.current?.scrollToOffset({
              offset: 900,
            });
          }
        }, 1000);
      }
    } catch (error) {
    } finally {
    }
  }, [layoutEmbryo]);

  const showBottomSheetConsultant = () => {
    setIsShowConsultant(true);
  };

  const hideBottomSheetConsultant = () => {
    setIsShowConsultant(false);
  };

  useEffect(() => {
    getDataCalendarCheckup();
  }, []);
  const Calendar = useCallback(
    () => (
      <CheckupCalendar
        data={calendarCheckupData}
        weekSelected={weekSelected}
        onLayoutItem={(top, index) => {
          listPosition.current[index] = top;
        }}
        onRendered={() => {
          setRendered(true);
        }}
      />
    ),
    [calendarCheckupData, status],
  );

  const renderBodyByStatus = () => {
    switch (status) {
      case 1:
        return (
          <>
            <View onLayout={onLayoutEmbryo}>
              <Embryo
                data={data?.baby}
                week={selectedWeek}
                listImage={listImage ?? []}
              />
            </View>
            <View onLayout={onLayoutSize}>
              <Size data={data?.baby_size} week={selectedWeek} />
            </View>
            <Body data={data?.mom} week={selectedWeek} />
          </>
        );
      case 2:
        return <Calendar />;
      default:
        return null;
    }
  };
  const renderView = () => {
    return (
      <View>
        {renderBodyByStatus()}
        <View style={{marginBottom: scaler(16)}}>
          <ProductCarousel />
        </View>

        <ListArticle week={weekSelected} />

        {status === 1 && (
          <>
            <ListPostByWeek
              week={weekSelected}
              cardBorderStyle={{
                borderWidth: 1,
                borderColor: '#F5F5F5',
              }}
            />
            <TouchableOpacity
              style={styles.createPostButton}
              onPress={() => {
                trackingAppEvent(
                  event.BABY_TRACKER.CLICK_POST_FORUM,
                  {},
                  eventType.MIX_PANEL,
                );
                navigation.navigate(ROUTE_NAME.CREATE_NEWPOST);
              }}>
              <SvgMessages3 color={colors.white} />
              <Text style={styles.titleButton}>{t('home.createPost')}</Text>
            </TouchableOpacity>

            {isShowForReviewer(user) &&
              (user?.baby_type == 'pregnant' ||
                user?.baby_type == 'pregnant-overdue' ||
                user?.baby_type == 'unknown') &&
              (!user?.payments?.length ||
                user?.payments?.some(e => e.status == 'processing')) && (
                <View>
                  <Text style={styles.textTitle}>Matida Masterclass</Text>
                  <View style={{marginHorizontal: 16}}>
                    <TeaserProgram isHome={true} />
                  </View>
                </View>
              )}
            <View style={styles.ph}>
              <GetSupport
                showBottomSheetConsultant={showBottomSheetConsultant}
              />
              {/* <Text style={styles.title}>{t('home.getSupport')}</Text>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={showBottomSheetConsultant}>
                <Image
                  source={{
                    uri:
                      lang == 1
                        ? 'https://s3.ap-southeast-1.amazonaws.com/matida/1710860879329404805.png'
                        : 'https://s3.ap-southeast-1.amazonaws.com/matida/1710860749497044032.png',
                  }}
                  style={{
                    width: '100%',
                    height: scaler(126),
                    borderRadius: scaler(16),
                  }}
                  resizeMode="center"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{flex: 1, marginTop: scaler(16)}}
                onPress={showBottomSheetConsultant}>
                <Image
                  source={{
                    uri:
                      lang == 1
                        ? 'https://s3.ap-southeast-1.amazonaws.com/matida/1710859552934329521.png'
                        : 'https://s3.ap-southeast-1.amazonaws.com/matida/1710859420184627150.png',
                  }}
                  style={{
                    width: '100%',
                    height: scaler(126),
                    borderRadius: scaler(16),
                  }}
                  resizeMode="center"
                />
              </TouchableOpacity> */}
            </View>
            {/* <BannerTestQuiz /> */}
            {homeData?.data?.dailyQuizz ? (
              <>
                <Text style={[styles.textTitle, {marginTop: scaler(16)}]}>
                  {t('sizeComparison.titleQuiz')}
                </Text>
                <ViewQuiz onAnswer={onAnswerQuiz} />
              </>
            ) : null}
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('sizeComparison.titleHeader')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      <PickerWeek
        customStyleContainer={styles.containerPicker}
        onSelect={(value: any) => {
          trackingAppEvent(
            event.BABY_TRACKER.BABY_TRACKER_CHANGE_WEEK,
            {
              content: value,
            },
            eventType.AFF_FLYER,
          );
          setWeek(value);
          if (statusView.current === 1) {
            getData(value);
          } else {
            flatListRef.current?.scrollToOffset({
              offset: listPosition.current[Math.floor(value / 7)],
            });
          }
        }}
        weekNotifi={week}
      />
      <FlatList
        data={[1]}
        ref={flatListRef}
        renderItem={() => {
          return (
            <ViewSelectType
              onChaneStatus={value => {
                trackClickedOnPregnancyTracker(weekSelected, value);
                setStatus(value);
                statusView.current = value;
                if (value === 1) {
                  setRendered(false);
                }
              }}
              status={status}
            />
          );
        }}
        bounces={false}
        ListFooterComponent={renderView}
        keyExtractor={(item, index) => index.toString()}
      />
      {isShowForReviewer(user) && (
        <View style={{marginLeft: scaler(16)}}>
          <FLoatingAIButton />
        </View>
      )}
      <ModalConsultant
        visible={isShowConsultant}
        closeModal={hideBottomSheetConsultant}
      />
    </View>
  );
};
export {SizeComparison};
