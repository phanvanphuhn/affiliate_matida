import {AppImage, TrimesterComponent, ViewLock, ViewPrice} from '@component';
import {SvgHeart, SvgHearted} from '@images';
import {navigate} from '@navigation';
import {useFocusEffect} from '@react-navigation/native';
import {getDataHome, getDataHomeByWeek} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {likePodCast, unlikePodCast} from '@services';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {convertLangMonth, getFirstTextElementHTML} from '@util';
import {t} from 'i18next';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  podcast: any | null;
};

export const PodcastItem = ({podcast}: Props) => {
  const {
    created_at,
    image,
    is_liked,
    title,
    topic,
    total_likes,
    duration,
    trimester,
    desc,
    id,
  } = podcast;

  const dispatch = useDispatch();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const week = useSelector((state: any) => state?.home?.week);

  const [isLike, setIsLike] = useState<boolean>(is_liked ?? false);
  const [totalLike, setTotalLike] = useState<number>(+total_likes ?? 0);
  const refLike = useRef<boolean>(isLike);
  const refTotal = useRef<number>(totalLike);

  const isPayment = podcast?.is_payment && !podcast?.is_paid;

  useFocusEffect(
    React.useCallback(() => {
      refLike.current = is_liked ?? false;
      refTotal.current = +total_likes ?? 0;
      setTotalLike(+total_likes);
      setIsLike(is_liked);
    }, [podcast]),
  );

  useEffect(() => {
    const debounceLike = setTimeout(() => {
      handleEventLike();
    }, 500);
    return () => {
      clearTimeout(debounceLike);
    };
  }, [isLike]);

  const handleEventLike = async () => {
    if (isLike !== refLike.current) {
      try {
        isLike ? await likePodCast(id) : await unlikePodCast(id);
        refLike.current = isLike;
        refTotal.current = totalLike;
      } catch (e) {
        setIsLike(refLike.current);
        setTotalLike(refTotal.current);
      } finally {
        dispatch(getDataHomeByWeek({week: week}));
      }
    }
  };

  const handleLike = () => {
    !isLike ? setTotalLike(totalLike + 1) : setTotalLike(totalLike - 1);
    setIsLike(!isLike);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() =>
        navigate(ROUTE_NAME.DETAIL_PODCAST, {
          podcast: {
            ...podcast,
            total_likes: +total_likes,
            is_liked: is_liked,
          },
        })
      }>
      <View style={{flexDirection: 'row'}}>
        {/* <Image source={isStockPhoto} style={styles.image} /> */}
        <View>
          <AppImage uri={image} style={styles.image} />
          {isPayment ? <ViewLock opacity={'ba'} absolute /> : null}
        </View>
        <View
          style={{
            marginLeft: scaler(12),
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <Text numberOfLines={2} style={styles.textTitle}>
            {title}
          </Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {trimester?.length > 0 && (
              <TrimesterComponent trimester={trimester[0]} />
            )}
          </View>
        </View>
      </View>
      <View></View>
      <Text
        numberOfLines={2}
        style={{
          ...stylesCommon.fontWeight400,
          fontSize: scaler(12),
          color: colors.gray200,
          paddingVertical: scaler(12),
          textAlign: 'left',
          width: '100%',
        }}>
        {getFirstTextElementHTML(desc)}
      </Text>
      <View style={styles.footer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {created_at && (
            <Text style={styles.textTime}>
              {moment(created_at).format('D')}{' '}
              {convertLangMonth(moment(created_at).format('MMMM'))}
            </Text>
          )}
          <View
            style={{
              width: scaler(4),
              height: scaler(4),
              borderRadius: scaler(2),
              backgroundColor: '#D3D3D3',
              marginHorizontal: scaler(4),
            }}
          />
          <Text style={styles.textTime}>
            {t('podcast.time', {time: getTime(duration)})}
          </Text>
        </View>
        {isPayment ? (
          <ViewPrice price={podcast?.price_vn} />
        ) : (
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            activeOpacity={0.9}
            onPress={handleLike}>
            {isLike ? <SvgHearted /> : <SvgHeart />}
            <Text
              style={{
                color: isLike ? colors.brandMainPinkRed : colors.textSmallColor,
                ...stylesCommon.fontWeight400,
                fontSize: scaler(12),
                marginLeft: scaler(6),
              }}>
              {totalLike}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const getTime = (s: number | null) => {
  const duration = s ?? 0;
  return duration < 60 ? 1 : Math.floor(duration / 60);
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: widthScreen * 0.7,
    marginRight: scaler(16),
    borderRadius: scaler(8),
    backgroundColor: colors.white,
    padding: scaler(12),
    marginTop: scaler(16),
  },
  image: {
    borderRadius: scaler(8),
    height: scaler(68),
    width: scaler(68),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  textTitle: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    color: colors.textColor,
  },
  textTime: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
    color: colors.textSmallColor,
  },
});
