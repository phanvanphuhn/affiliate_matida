import {
  AppImage,
  ViewExpert,
  ViewLockPayment,
  ViewTextSeeMore,
} from '@component';
import {EVideoType} from '@constant';
import {iconClock, SvgEye, SvgPrevious44} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {getConvertViewer} from '@util';
import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ItemVideo = React.memo((props: any) => {
  const {item} = props;
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState<any>(0);

  const isPayment = item?.is_payment && !item?.is_paid;

  useEffect(() => {
    setDuration(Math?.round(item?.durations));
  }, []);

  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;

  return (
    <View style={styles.viewItem}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTE_NAME.DETAIL_VIDEO, {
            id: item?.id,
            type: EVideoType.VIDEO,
          });
        }}>
        <View>
          <>
            <AppImage
              uri={item?.thumbnail ?? ''}
              style={styles.image}
              onLoadCallBack={() => setLoading(false)}
            />
            {isPayment ? (
              <ViewLockPayment
                price={item?.price_vn}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              />
            ) : null}
          </>
          {!loading && (
            <>
              <View style={styles.viewPrevious}>
                <SvgPrevious44 />
              </View>
            </>
          )}
        </View>
        <Text style={styles.txtTitle} numberOfLines={2}>
          {item?.title}
        </Text>
        {item?.description?.length > 0 ? (
          <ViewTextSeeMore
            text={item?.description}
            style={styles.txtDes}
            heightMax={40}
          />
        ) : null}
        <View style={{marginTop: scaler(8)}}>
          {item?.expert_name ? (
            <View
              style={{
                maxWidth: widthScreen - scaler(80),
                marginBottom: scaler(8),
              }}>
              <ViewExpert
                name={item?.expert_name}
                avatar={item?.expert_image}
                numberOfLine={2}
              />
            </View>
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
        </View>
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

export {ItemVideo};
