import {
  AppImage,
  AppTextUrl,
  ViewLockPayment,
  ViewTextSeeMore,
} from '@component';
import {iconClock, SvgEye, SvgPrevious44} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {getConvertViewer} from '@util';
import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import {trackingAppEvent, event} from '@util';
import {useSelector} from 'react-redux';

const Item = React.memo((props: any) => {
  const {item} = props;
  const navigation = useNavigation<any>();
  const lang = useSelector((state: any) => state?.auth?.lang);

  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState<any>(0);

  const isPayment = item?.is_payment && !item?.is_paid;

  useEffect(() => {
    setDuration(Math?.round(item?.durations));
  }, []);

  const onLoad = (data: any) => {
    setLoading(false);
    setDuration(Math?.round(data?.duration));
  };

  const onLoadStart = () => {
    setLoading(true);
  };

  // const minutes = Math.floor(item?.durations / 60);
  // const seconds = item?.durations - minutes * 60;

  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;

  return (
    <View style={styles.viewItem}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate(ROUTE_NAME.DETAIL_VIDEO, {
            url: item?.url,
            id: item?.id,
            title: item?.title,
            item: item,
          });
        }}>
        <Video
          source={{uri: item?.url}}
          style={(styles.image, {position: 'absolute'})}
          resizeMode="cover"
          paused={true}
          volume={10}
          ignoreSilentSwitch="ignore"
          onLoad={onLoad}
          //@ts-ignore
          onLoadStart={onLoadStart}
        />
        <View>
          {!loading ? (
            <View>
              <AppImage
                uri={item?.thumbnail ?? ''}
                style={styles.image}
                resizeMode="stretch"
              />
            </View>
          ) : (
            <View
              style={[
                styles.image,
                {
                  backgroundColor: colors.gray100,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <ActivityIndicator size="large" />
            </View>
          )}
          {!loading && (
            <>
              <View style={styles.viewPrevious}>
                <SvgPrevious44 />
              </View>
            </>
          )}
          {isPayment ? (
            <ViewLockPayment
              price={item?.price_vn}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            />
          ) : null}
        </View>
        <Text style={styles.txtTitle} numberOfLines={2}>
          {item?.title}
        </Text>
        {item?.description?.length > 0 ? (
          // <AppTextUrl style={styles.txtDes} color={colors.brandMainPinkRed}>
          //   {item?.description}
          // </AppTextUrl>
          <ViewTextSeeMore text={item?.description} style={styles.txtDes} />
        ) : null}
        <View style={{flexDirection: 'row'}}>
          {duration > 0 ? (
            <View style={styles.viewRow}>
              <Image source={iconClock} />
              <Text style={styles.txtTime}>
                {/* {minutes}:{seconds} */}
                {t('videoList.minsWatch', {
                  minutes: minutes === 0 ? 1 : minutes,
                })}
              </Text>
            </View>
          ) : null}
          <View style={[styles.viewRow, {marginLeft: scaler(16)}]}>
            <SvgEye stroke={colors.borderColor} />
            <Text style={[styles.txtTime]}>
              {t('views.views', {views: getConvertViewer(item?.views)})}
            </Text>
          </View>
        </View>
        {/* <View style={styles.viewLoading}>
          {loading === true ? (
            <ActivityIndicator size="large" />
          ) : (
            <Image source={iconPlay} style={styles.iconPlay} />
          )}
        </View> */}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  containerPicker: {
    marginTop: scaler(25),
    marginBottom: scaler(32),
  },
  image: {
    width: '100%',
    height: scaler(200),
    borderRadius: scaler(10),
  },
  viewItem: {
    marginBottom: scaler(23),
    paddingHorizontal: scaler(20),
  },
  txtTitle: {
    color: colors.textColor,
    ...stylesCommon.fontPlus600,
    fontSize: scaler(14),
    marginTop: scaler(12),
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaler(8),
  },
  txtTime: {
    marginLeft: scaler(6),
    color: colors.borderColor,
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
  },
  iconPlay: {
    tintColor: colors.gray,
  },
  viewEmpty: {
    alignItems: 'center',
    marginTop: scaler(20),
  },
  txtEmpty: {
    ...stylesCommon.fontWeight500,
    color: colors.borderColor,
    fontSize: scaler(14),
  },
  viewLoading: {
    width: '100%',
    height: scaler(213),
    borderRadius: scaler(10),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPrevious: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtDes: {
    fontSize: scaler(13),
    marginTop: scaler(5),
    color: colors.borderColor,
  },
});

export {Item};
