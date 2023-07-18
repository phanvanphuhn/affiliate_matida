import {
  AppImage,
  TopicComponent,
  TrimesterComponent,
  ViewLock,
  ViewPrice,
} from '@component';
import {SvgHeart, SvgHearted} from '@images';
import {navigate} from '@navigation';
import {changeLikePodcastExplore} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {likePodCast, unlikePodCast} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {convertLangMonth, getFirstTextElementHTML} from '@util';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
interface IProps {
  item?: any;
}
export const ItemPodCast = ({item}: IProps) => {
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
  } = item;

  const dispatch = useDispatch();

  const [isLike, setIsLike] = useState<boolean>(is_liked ?? false);
  const [totalLike, setTotalLike] = useState<number>(+total_likes ?? 0);

  const isPayment = item?.is_payment && !item?.is_paid;

  useEffect(() => {
    setIsLike(is_liked ?? false);
    setTotalLike(+total_likes ?? 0);
  }, [item]);

  useEffect(() => {
    const debounceLike = setTimeout(() => {
      handleEventLike();
    }, 500);
    return () => {
      clearTimeout(debounceLike);
    };
  }, [isLike]);

  const handleEventLike = async () => {
    if (isLike !== is_liked) {
      try {
        isLike ? await likePodCast(id) : await unlikePodCast(id);
        dispatch(
          changeLikePodcastExplore({
            isLike: isLike,
            id: id,
            totalLike: totalLike,
          }),
        );
      } catch (e) {
        showMessage({
          message: '',
          type: 'default',
          backgroundColor: colors.transparent,
          color: '#FFFFFF',
        });
        setIsLike(is_liked);
        setTotalLike(+total_likes);
      } finally {
        // await onCallBack();
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
      onPress={() => navigate(ROUTE_NAME.DETAIL_PODCAST, {podcast: item})}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <AppImage uri={image} style={styles.image} />
          {isPayment ? <ViewLock absolute opacity="ba" /> : null}
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
            {trimester.length > 0 ? (
              <TrimesterComponent trimester={trimester[0]} />
            ) : (
              <>
                {topic?.map((item: number, index: number) => {
                  return <TopicComponent topic={item} key={index} />;
                })}
              </>
            )}
          </View>
        </View>
      </View>
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
        {isPayment ? (
          <ViewPrice price={item?.price_vn} />
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            style={{flexDirection: 'row', alignItems: 'center'}}
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
          <Text style={styles.textTime}>{getTime(duration)} min</Text>
        </View>
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
    // width: widthScreen * 0.7,
    // marginRight: scaler(16),
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
