import {AppButton} from '@component';
import {backgroundBannerQuiz, lightQuiz} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, View} from 'react-native';

export const BannerTestQuiz = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Image source={backgroundBannerQuiz} style={styles.imageBackground} />
      <View style={styles.viewContainer}>
        <Image source={lightQuiz} style={styles.icon} />
        <View>
          <Text style={styles.textTitle}>{t('home.titleBannerQuiz')}</Text>
          <Text style={styles.textBody}>{t('home.bodyBannerQuiz')}</Text>
        </View>
        <AppButton
          onClick={() => navigate(ROUTE_NAME.MOM_PREP_TEST)}
          titleButton={t('home.buttonBannerQuiz')}
          customStyleButton={{backgroundColor: colors.green150}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scaler(16),
    height: scaler(358),
    marginBottom: scaler(30),
  },
  imageBackground: {
    height: scaler(358),
    width: '100%',
    position: 'absolute',
    borderRadius: scaler(32),
  },
  viewContainer: {
    paddingHorizontal: scaler(35),
    paddingTop: scaler(19),
    paddingBottom: scaler(43),
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  icon: {
    height: scaler(90),
    width: scaler(90),
  },
  textTitle: {
    color: colors.white,
    fontSize: scaler(26),
    ...stylesCommon.fontWeight600,
    textAlign: 'center',
    marginBottom: scaler(17),
  },
  textBody: {
    color: colors.white,
    fontSize: scaler(13),
    ...stylesCommon.fontWeight400,
    textAlign: 'center',
  },
});
