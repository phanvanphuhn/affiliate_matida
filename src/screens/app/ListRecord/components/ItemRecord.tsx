import {AppImage, ViewLockPayment} from '@component';
import {EVideoType} from '@constant';
import {iconClock, SvgEye, SvgPrevious44} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {getConvertViewer} from '@util';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
type Props = {
  item: any;
};

export const ItemRecord = ({item}: Props) => {
  const navigation = useNavigation<any>();
  const {t} = useTranslation();

  const lang = useSelector((state: any) => state.auth.lang);

  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState<any>(0);

  const onLoad = (data: any) => {
    setLoading(false);
    setDuration(Math?.round(data?.duration));
  };

  const onLoadStart = () => {
    setLoading(true);
  };

  const minutes = Math.floor(duration / 60);
  const isPayment = item?.is_payment && !item?.is_paid;

  return (
    <View style={styles.viewItem}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTE_NAME.DETAIL_VIDEO, {
            id: item?.id,
            type: EVideoType.RECORD,
            // url: item?.link,
            // isRecord: true,
            // item: item,
          });
        }}>
        <Video
          source={{uri: item?.link}}
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
            <AppImage
              uri={item?.thumbnail ?? ''}
              style={styles.image}
              // resizeMode="stretch"
            />
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
              style={{justifyContent: 'space-between'}}
            />
          ) : null}
        </View>
        <Text style={styles.txtTitle} numberOfLines={2}>
          {lang === 2 ? item?.title_vn : item?.title_en}
        </Text>
        <Text numberOfLines={4} style={[styles.txtTime]}>
          {lang === 2 ? item?.description_vn : item?.description_en}
        </Text>
        {/* <View style={[styles.viewRow, {marginLeft: scaler(16)}]}>
          <SvgEye stroke={colors.borderColor} />
        </View> */}
        <View>
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
        </View>
      </TouchableOpacity>
    </View>
  );
};

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
    marginBottom: scaler(8),
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
});
