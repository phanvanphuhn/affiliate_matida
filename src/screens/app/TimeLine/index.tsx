import {FLoatingAIButton, Header, PickerWeek} from '@component';
import {SvgArrowLeft} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {GlobalService, getValueTimeLine} from '@services';
import {colors, scaler} from '@stylesCommon';
import {event, eventType, isShowForReviewer, trackingAppEvent, useUXCam} from '@util';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './styles';

const TimeLine = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<any>();
  const week =
    useSelector(
      (state: any) => state?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks,
    ) ?? 40;
  const lang = useSelector((state: any) => state?.auth?.lang);
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const [data, setData] = useState([]);
  const [weekLocal, setWeekLocal] = useState(null);
  const [date, setDate] = useState('jan 8 - jan15');

  useUXCam(ROUTE_NAME.TIME_LINE);

  const callApiGetValueTimeLine = async (value: any) => {
    setWeekLocal(value);
    try {
      GlobalService.showLoading();
      const res = await getValueTimeLine(value);
      setData(res?.data?.data);
      setDate(res?.data?.date);
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  useEffect(() => {
    trackingAppEvent(event.SCREEN.TIME_LINE, {}, eventType.AFF_FLYER);
    if (week) {
      callApiGetValueTimeLine(week);
    }
  }, [week]);

  const renderItem = ({item, index}: any) => {
    const renderStyle = () => {
      if (item?.left === true && item?.right === true) {
        return styles.styleCenter;
      } else if (item?.left === true) {
        return styles.styleLeft;
      } else if (item?.right === true) {
        return styles.styleRight;
      }
    };

    const renderWidth = () => {
      if (item?.left === true && item?.right === true) {
        return '100%';
      } else if (item?.right === true) {
        return '70%';
      } else if (item?.left === true) {
        return '70%';
      }
    };

    const renderColor = () => {
      switch (item?.type) {
        case 1:
          return '#F7C984';
        case 2:
          return '#ED8989';
        case 3:
          return '#40C1B9';
        case 4:
          return '#3E7BFF';
        default:
          return '#A36977';
      }
    };

    const renderColorText = () => {
      switch (item?.type) {
        case 1:
          return '#252525';
        default:
          return '#FFFFFF';
      }
    };

    return (
      <View style={renderStyle()}>
        <TouchableOpacity
          style={[
            styles.itemView,
            {
              width: renderWidth(),
              backgroundColor: renderColor(),
            },
          ]}
          onPress={() => {
            const param = {
              content: item?.content,
              image: item?.thumbnail,
              title: item?.title,
              created_at: item?.created_at,
              id: item?.id,
              isTimeline: true,
            };
            navigation.navigate(ROUTE_NAME.DETAIL_ARTICLE, {article: param});
          }}>
          <Text
            style={[styles.txtContent, {color: renderColorText()}]}
            numberOfLines={2}>
            {item?.title ?? ''}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('timeLine.titleHeader')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
        routeName={ROUTE_NAME.TIME_LINE}
      />
      <View style={styles.viewRing1} />
      <View style={styles.viewRing2} />
      <View style={styles.viewRing3} />
      <View style={styles.viewRing4} />
      <View style={styles.viewTxtHeader}>
        {/* <View style={styles.viewRow}>
          <Text style={styles.txtShortDate}>
            {convertLangDay(moment().format('dddd'))},{' '}
            {convertLangMonth(moment().format('MMMM'))} {moment().format('DD')}
          </Text>
        </View> */}
        <Text style={styles.txtLongDate}>{date}</Text>
      </View>
      {/* <View style={styles.viewPickTime}>
        <ViewPickerTime
          onSelect={(value: any) => {
            callApiGetValueTimeLine(value);
          }}
        />
      </View> */}
      <PickerWeek
        customStyleContainer={{
          marginTop: scaler(25),
        }}
        onSelect={(value: any) => callApiGetValueTimeLine(value)}
      />
      <View style={styles.viewContent}>
        <FlatList
          data={data}
          renderItem={renderItem}
          ListEmptyComponent={() => {
            return (
              <View style={styles.viewEmpty}>
                <Text style={styles.txtEmpty}>{t('videoList.noData')}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: any) => item?.id}
        />
      </View>
      {isShowForReviewer(user) && <FLoatingAIButton />}
    </View>
  );
};

export {TimeLine};
