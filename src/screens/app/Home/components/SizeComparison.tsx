import {t} from 'i18next';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

import {AppImage} from '@component';
import {OptionComparison} from '@constant';
import {iconNext} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {event, eventType, trackingAppEvent} from '@util';

export const SizeComparisonComponent = () => {
  const data = useSelector((state: any) => state?.home?.data);

  const babyProgress = data?.babyProgress;

  const imageBaby = babyProgress?.baby?.image
    ? babyProgress?.baby?.image[0]
    : '';

  const handlePress = () => {
    trackingAppEvent(
      event.BABY_TRACKER.BABY_TRACKER_OPEN,
      {},
      eventType.AFF_FLYER,
    );
    navigate(ROUTE_NAME.SIZE_COMPARISON, {
      option: OptionComparison.EMBRYO,
      // option: 1,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.viewImage}
          activeOpacity={0.9}
          onPress={handlePress}>
          <AppImage uri={imageBaby} style={styles.imagePreview} />
          <View style={styles.button}>
            <Text style={styles.txtButton}>{t('home.mom_and_baby')}</Text>
            <View style={styles.viewButtonNext}>
              <Image source={iconNext} style={styles.iconNext} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scaler(36),
    alignItems: 'center',
    // paddingTop: scaler(28),
  },
  imagePreview: {
    width: widthScreen - scaler(32),
    height: (widthScreen - scaler(32)) / 0.91,
    borderRadius: scaler(32),
  },
  imageView: {
    width: scaler(48),
    height: scaler(48),
    borderRadius: scaler(24),
  },
  customStyleTxt: {
    ...stylesCommon.fontWeight500,
    color: colors.textColor,
    fontSize: scaler(14),
    marginTop: 8,
    textAlign: 'center',
  },
  containerListImage: {
    marginBottom: scaler(23),
    flexDirection: 'row',
    paddingHorizontal: scaler(35),
    justifyContent: 'space-between',
    width: '100%',
  },
  viewImage: {
    width: widthScreen - scaler(32),
    height: (widthScreen - scaler(32)) / 0.91,
    borderRadius: scaler(32),
  },
  button: {
    height: scaler(56),
    borderRadius: scaler(200),
    backgroundColor: '#170B0B66',
    position: 'absolute',
    bottom: scaler(18),
    right: scaler(12),
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: scaler(4),
    paddingLeft: scaler(16),
    justifyContent: 'space-between',
  },
  viewButtonNext: {
    width: scaler(48),
    height: scaler(48),
    borderRadius: scaler(48 / 2),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconNext: {
    width: scaler(24),
    height: scaler(24),
  },
  txtButton: {
    color: '#FFFFFF',
    ...stylesCommon.fontPlus600,
    fontSize: scaler(16),
    lineHeight: scaler(22),
    marginRight: scaler(10),
  },
});
