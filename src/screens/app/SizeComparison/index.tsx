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
import {colors} from '@stylesCommon';
import {
  event,
  eventType,
  isShowForReviewer,
  trackingAppEvent,
  useUXCam,
} from '@util';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
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

const SizeComparison = () => {
  const dispatch = useDispatch();

  const route = useRoute<any>();
  const {option = 1} = route?.params;
  const weekNotifi = route?.params?.week;
  const homeData = useSelector((state: any) => state?.home);
  const isDoneDaily = useSelector((state: RootState) => state.auth.isDoneDaily);
  const weekPregnant =
    useSelector(
      (state: any) => state?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks,
    ) ?? 40;
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const week = weekNotifi ? weekNotifi : weekPregnant;
  const listPosition = useRef([0, 0, 0, 0, 0, 0, 0]);

  const {t} = useTranslation();
  const [status, setStatus] = useState(option);
  const [data, setData] = useState<any>(null);
  const [dataTimeline, setDataTimeline] = useState([]);
  const [listImage, setListImage] = useState<any[]>([]);
  const [weekSelected, setWeek] = useState(week);
  const [calendarCheckupData, setCalendarCheckupData] = useState();

  const [selectedWeek, setSelectedWeek] = useState(null);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<any>();
  const statusView = useRef(1);
  const [isRendered, setRendered] = useState(false);

  useUXCam(ROUTE_NAME.SIZE_COMPARISON);
  const getData = async (value: any) => {
    setSelectedWeek(value);
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
            ...data?.dailyQuizz,
            ...res?.data,
          },
        }),
      );
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
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
    } catch (error) {
    } finally {
    }
  }, []);

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
            <Embryo
              data={data?.baby}
              week={selectedWeek}
              listImage={listImage ?? []}
            />
            <Size data={data?.baby_size} week={selectedWeek} />
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
              <SvgMessages3 />
              <Text style={styles.titleButton}>{t('home.createPost')}</Text>
            </TouchableOpacity>
            {homeData?.data?.dailyQuizz ? (
              <ViewQuiz onAnswer={onAnswerQuiz} />
            ) : null}
            {/* <BannerTestQuiz /> */}
            <ListArticle week={weekSelected} />
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
      />
      {isShowForReviewer(user) && <FLoatingAIButton />}
    </View>
  );
};
export {SizeComparison};
