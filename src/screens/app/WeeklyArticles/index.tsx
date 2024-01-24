import {AppGallery, Header, ItemArticles, PickerWeek} from '@component';
import {SvgArrowLeft, SvgListBookmark} from '@images';
import {navigate} from '@navigation';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {
  getListArticlesOfWeek,
  getListArticlesPopular,
  GlobalService,
} from '@services';
import {colors, scaler} from '@stylesCommon';
import {t} from 'i18next';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {RefreshControl, ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './styles';
import {trackingAppEvent, event, useUXCam, eventType} from '@util';

export const WeeklyArticles = ({route}: {route: {params: {week: number}}}) => {
  const navigation = useNavigation<any>();
  const weekNotifi = route?.params?.week;
  const week =
    useSelector(
      (state: any) => state?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks,
    ) ?? 40;
  const [weeks, setWeeks] = useState<number>(
    weekNotifi ? weekNotifi : week < 0 ? 40 : week,
  );
  const [listArticles, setListArticles] = useState<any>([]);
  const [listPopular, setListPopular] = useState<any>([]);
  const [refreshing, setRefreshing] = useState<boolean>(true);

  const scrollRef = useRef<ScrollView>(null);

  useUXCam(ROUTE_NAME.WEEKLY_ARTICLES);

  // useEffect(() => {
  //   trackingAppEvent(event.SCREEN.WEEKLY_ARTICLES, {});
  //   setTimeout(() => {
  //     scrollRef?.current?.scrollTo({x: 0, y: 0, animated: true});
  //   }, 50);
  //   getDataArticles();
  //   if (weeks !== 42) {
  //     getListPopular();
  //   } else {
  //     setListPopular([]);
  //   }
  // }, [weeks]);
  useFocusEffect(
    React.useCallback(() => {
      trackingAppEvent(event.SCREEN.WEEKLY_ARTICLES, {}, eventType.AFF_FLYER);
      setTimeout(() => {
        scrollRef?.current?.scrollTo({x: 0, y: 0, animated: true});
      }, 50);
      getDataArticles();
      if (weeks !== 42) {
        getListPopular();
      } else {
        setListPopular([]);
      }
    }, [weeks]),
  );

  const getDataArticles = async () => {
    try {
      const res = await getListArticlesOfWeek(weeks);
      setListArticles([...res.data.data]);
    } catch (e) {}
  };

  const getListPopular = async () => {
    try {
      const res = await getListArticlesPopular({size: 10, week: weeks});
      setListPopular([...res.data]);
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getDataArticles();
    getListPopular();
  };
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const isCheckPayment = useMemo(
    () => user?.user_subscriptions?.some(e => e.code == 'PP'),
    [user],
  );
  return (
    <View style={styles.container}>
      <Header
        title={t('articlesOfWeek')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
        ComponentRight={<SvgListBookmark />}
        onPressRight={() => navigation.navigate(ROUTE_NAME.SAVED_ARTICLES)}
      />
      <PickerWeek
        customStyleContainer={styles.containerPicker}
        onSelect={(value: any) => setWeeks(value)}
        weekNotifi={weekNotifi}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: scaler(20),
          // paddingTop: scaler(6),
        }}>
        <ScrollView
          ref={scrollRef}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: scaler(12)}}>
          <AppGallery
            weeks={weeks}
            file={listArticles}
            onPress={(item: any) => {
              if (!isCheckPayment && item?.is_payment && !item?.is_paid) {
                navigate(ROUTE_NAME.NEW_USER_PROGRAM);
              } else {
                navigate(ROUTE_NAME.DETAIL_ARTICLE, {article: item});
              }
            }}
          />
          {listPopular.length !== 0 && (
            <View>
              <Text style={styles.textTitle}>{t('popularArticles')}</Text>
              {listPopular.map((item: any) => {
                return <ItemArticles item={item} key={item.id} />;
              })}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};
