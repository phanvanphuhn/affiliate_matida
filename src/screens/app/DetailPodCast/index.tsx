import {
  AppControlSound,
  AppImage,
  TopicComponent,
  TrimesterComponent,
  ViewPayment,
  ViewSmallQuiz,
} from '@component';
import {avatarSpeaker, SvgArrowLeft, SvgHeart, SvgHearted} from '@images';
import {goBack} from '@navigation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getPodcastDetail, likePodCast, unlikePodCast} from '@services';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {convertLangMonth, useUXCam} from '@util';
import {t} from 'i18next';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {systemFonts, tagsStyles} from '../DetailArticle/settingHTML';
import {trackingAppEvent, event} from '@util';
import {ROUTE_NAME} from '@routeName';
import {useDispatch, useSelector} from 'react-redux';
import {EPaymentType} from '@constant';
import {getDataHomeByWeek, payPodcastHome} from '@redux';

export const DetailPodCast = () => {
  const route = useRoute<any>();
  const dispatch = useDispatch();

  const navigation = useNavigation<any>();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const week = useSelector((state: any) => state?.home?.week);

  const {podcast} = route.params;
  const {id} = podcast;
  const [podcastDetail, setPodcastDetail] = useState<any>(podcast);
  const [paused, setPaused] = useState(true);

  const [isLike, setIsLike] = useState<boolean>(podcast?.is_liked ?? false);
  const [totalLike, setTotalLike] = useState<number>(podcast?.total_likes ?? 0);
  const refLike = useRef<boolean>(isLike);
  const refTotal = useRef<number>(totalLike);

  const source = {
    html: podcastDetail?.desc,
  };

  const isPayment = podcastDetail?.is_payment && !podcastDetail?.is_paid;

  useUXCam(ROUTE_NAME.DETAIL_PODCAST);

  useEffect(() => {
    getData();
    trackingAppEvent(event.SCREEN.DETAIL_PODCAST, {});
  }, []);

  useEffect(() => {
    const debounceLike = setTimeout(() => {
      handleEventLike();
    }, 500);
    return () => {
      clearTimeout(debounceLike);
    };
  }, [isLike]);

  const getData = async () => {
    try {
      const res = await getPodcastDetail(id);
      setPodcastDetail(res?.data);
      refLike.current = res?.data?.is_liked;
      refTotal.current = res?.data?.total_likes;
      setIsLike(res?.data?.is_liked);
      setTotalLike(res?.data?.total_likes);
    } catch (e) {}
  };

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
        // await onCallBack();
        dispatch(getDataHomeByWeek({week: week}));
      }
    }
  };

  const handleLike = () => {
    !isLike ? setTotalLike(totalLike + 1) : setTotalLike(totalLike - 1);
    setIsLike(!isLike);
  };

  const onPay = async () => {
    dispatch(payPodcastHome({id: +id}));
    await getData();
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{width: '100%', height: scaler(260)}}>
        <AppImage
          uri={podcastDetail?.image}
          style={{width: '100%', height: scaler(260)}}
        />
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '#00000040',
          }}
        />
        <AppControlSound
          stylesContainer={{
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: 0,
            marginVertical: 0,
          }}
          colorProgress="#170B0B"
          colorTime="#F6F6F6"
          title=""
          titleTracker={podcastDetail?.title}
          podcast={podcastDetail?.audio}
          paused={paused}
          setPaused={setPaused}
        />

        {isPayment ? (
          <ViewPayment
            isPay={isPayment}
            type={EPaymentType.POD_CAST}
            id={podcastDetail?.id}
            onCallBack={onPay}
            price={podcastDetail?.price_vn}
            flex
          />
        ) : (
          <HeaderPodCastDetail />
        )}
      </View>
      <ScrollView contentContainerStyle={{padding: scaler(16)}}>
        <Text
          style={{
            ...stylesCommon.fontWeight600,
            color: colors.textColor,
            fontSize: scaler(18),
            marginBottom: scaler(8),
          }}>
          {podcastDetail?.title}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {podcastDetail?.created_at && (
              <Text
                style={{
                  color: colors.textSmallColor,
                  ...stylesCommon.fontWeight400,
                  fontSize: scaler(12),
                }}>
                {moment(podcastDetail?.created_at).format('D')}{' '}
                {convertLangMonth(
                  moment(podcastDetail?.created_at).format('MMMM'),
                )}
              </Text>
            )}
            <View style={styles.dot} />
            <Text
              style={{
                color: colors.textSmallColor,
                ...stylesCommon.fontWeight400,
                fontSize: scaler(12),
              }}>
              {t('podcast.time', {time: getTime(podcastDetail?.duration)})}
            </Text>
            <View style={styles.dot} />
          </View>
          <Text
            style={{
              color: colors.textSmallColor,
              ...stylesCommon.fontWeight400,
              fontSize: scaler(12),
              flex: 1,
            }}>
            {t('podcast.by')}
            <Text style={{color: '#28B4AE', ...stylesCommon.fontWeight500}}>
              {podcastDetail?.speaker_name || 'Matida'}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: scaler(8),
          }}>
          {podcastDetail?.trimester?.length > 0 && (
            <>
              {podcastDetail?.trimester?.map((item: number, index: number) => {
                return <TrimesterComponent trimester={item} key={index} />;
              })}
            </>
          )}
          {podcastDetail?.topic.map((item: number, index: number) => {
            return <TopicComponent topic={item} key={index} />;
          })}
        </View>
        <TouchableOpacity
          onPress={handleLike}
          activeOpacity={0.9}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.gray100,
            alignSelf: 'flex-start',
            paddingHorizontal: scaler(8),
            paddingVertical: scaler(6),
            borderRadius: scaler(16),
            marginTop: scaler(8),
          }}>
          {isLike ? <SvgHearted /> : <SvgHeart />}
          <Text
            style={{
              marginLeft: scaler(10),
              ...stylesCommon.fontWeight600,
              // color: colors.textColor,
              color: isLike ? colors.brandMainPinkRed : colors.textSmallColor,
            }}>
            {totalLike}
            <Text style={{...stylesCommon.fontWeight400}}>
              {t('podcast.like')}
            </Text>
          </Text>
        </TouchableOpacity>

        <View
          style={{
            borderTopWidth: scaler(1),
            borderColor: colors.gray100,
            marginVertical: scaler(16),
          }}
        />
        <Text
          style={{
            ...stylesCommon.fontWeight600,
            fontSize: scaler(16),
            color: colors.textColor,
          }}>
          {t('podcast.descriptions')}
        </Text>
        <RenderHtml
          contentWidth={widthScreen}
          systemFonts={systemFonts}
          tagsStyles={{...tagsStyles}}
          source={source}
          enableExperimentalMarginCollapsing={true}
          enableExperimentalBRCollapsing={true}
          enableExperimentalGhostLinesPrevention={true}
        />
        <View
          style={{
            borderTopWidth: scaler(1),
            borderColor: colors.gray100,
            marginVertical: scaler(16),
          }}
        />

        {podcastDetail?.speaker_bio && (
          <>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={avatarSpeaker}
                style={{
                  width: scaler(44),
                  height: scaler(44),
                  borderRadius: scaler(22),
                }}
              />
              <Text
                style={{
                  ...stylesCommon.fontWeight600,
                  fontSize: scaler(16),
                  color: colors.textColor,
                  marginLeft: scaler(12),
                }}>
                {t('podcast.speaker')}
              </Text>
            </View>
            <Text
              style={{
                marginTop: scaler(16),
                marginBottom: scaler(30),
                color: '#515151',
                ...stylesCommon.fontWeight400,
                fontSize: scaler(12),
              }}>
              {podcastDetail?.speaker_bio || ''}
            </Text>
          </>
        )}
        <ViewSmallQuiz />
      </ScrollView>
    </View>
  );
};

const getTime = (s: number | null) => {
  const duration = s ?? 0;
  return duration < 60 ? '1' : `${Math.floor(duration / 60)}`;
};

const HeaderPodCastDetail = () => {
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity
      onPress={() => goBack()}
      activeOpacity={0.9}
      style={{
        paddingHorizontal: scaler(16),
        position: 'absolute',
        top: insets.top,
      }}>
      <SvgArrowLeft />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dot: {
    backgroundColor: '#D3D3D3',
    height: scaler(4),
    width: scaler(4),
    borderRadius: scaler(2),
    marginHorizontal: scaler(6),
  },
});
