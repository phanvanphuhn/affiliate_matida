import {AppImage, ViewLockPayment} from '@component';
import {iconClock, SvgEye, SvgPrevious44} from '@images';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {getConvertViewer} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

interface IProps {
  onPress: (item: any) => void;
  video: any;
}

export const WeekVideo = ({onPress, video}: IProps) => {
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const url = video?.url ?? '';
  const id = video?.id ?? 0;
  const title = video?.title ?? '';

  const minutes = Math.floor(video?.durations / 60);

  const isPayment = video?.is_payment && !video?.is_paid;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={() => onPress(video)}>
      <AppImage
        uri={video?.thumbnail ?? ''}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.viewPrevious}>
        {isPayment ? null : <SvgPrevious44 style={styles.iconPlay} />}
        <View style={styles.viewTxtBottom}>
          <Text numberOfLines={2} style={styles.txtTitle}>
            {video?.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: scaler(8),
            }}>
            {video?.durations > 0 ? (
              <View style={styles.viewRow}>
                <Image source={iconClock} style={{tintColor: colors.white}} />
                <Text style={styles.txtTime}>
                  {/* {minutes}:{seconds} */}
                  {t('videoList.minsWatch', {
                    minutes: minutes === 0 ? 1 : minutes,
                  })}
                </Text>
              </View>
            ) : null}
            <View style={[styles.viewRow, {marginLeft: scaler(16)}]}>
              <SvgEye />
              <Text style={[styles.txtTime]}>
                {t('views.views', {views: getConvertViewer(video?.views)})}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {isPayment ? (
        <ViewLockPayment
          price={video?.price_vn}
          style={{flexDirection: 'row', justifyContent: 'space-between'}}
        />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scaler(widthScreen * 0.7),
    height: scaler(213),
    marginRight: scaler(16),
    marginTop: scaler(16),
  },
  image: {
    borderRadius: scaler(8),
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  viewPrevious: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: scaler(8),
    justifyContent: 'flex-end',
  },
  iconPlay: {
    position: 'absolute',
    top: scaler(8),
    right: scaler(8),
  },
  txtTitle: {
    ...stylesCommon.fontPlus600,
    color: '#FFFFFF',
    fontSize: scaler(16),
    lineHeight: scaler(22),
  },
  viewTxtBottom: {
    width: '100%',
    paddingLeft: scaler(12),
    paddingRight: scaler(54),
    paddingBottom: scaler(12),
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtTime: {
    marginLeft: scaler(6),
    color: colors.white,
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
  },
});
