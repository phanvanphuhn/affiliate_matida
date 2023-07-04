import {liveGif} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, View} from 'react-native';

export const ViewLive = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Image source={liveGif} style={styles.imageLive} />
      <Text style={styles.text}>{t('talk.live')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imageLive: {
    width: scaler(20),
    height: scaler(20),
    borderRadius: scaler(20 / 2),
    marginRight: scaler(8),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brandMainPinkRed,
    borderRadius: scaler(200),
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(5),
    alignSelf: 'flex-start',
  },
  text: {
    color: colors.white,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(12),
    marginLeft: scaler(8),
  },
});
