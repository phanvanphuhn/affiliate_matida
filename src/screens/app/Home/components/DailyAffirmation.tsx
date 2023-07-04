import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {t} from 'i18next';

import {stylesDailyAffirmation} from '@constant';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {IQuote} from '../types';
import {useSelector} from 'react-redux';
import {SvgCircleRightDailyAffirmation, SvgLogoDailyAffirmation} from '@images';
interface IProps {
  quote: IQuote | undefined;
}
const initEn =
  'A baby fills a place in your heart that you never knew was empty';

const initVi =
  'Một em bé lấp đầy một nơi trong trái tim bạn mà bạn chưa bao giờ biết là trống rỗng';
const initQuote = {
  id: 1,
  week: null,
  content_en: null,
  content_vi: null,
  created_at: null,
  updated_at: null,
};

export const DailyAffirmation = React.memo(({quote = initQuote}: IProps) => {
  const lang = useSelector((state: any) => state?.auth?.lang);
  const {week, content_en, content_vi} = quote;
  const length = stylesDailyAffirmation.length;
  const index = week ? week % length : 0;
  const contentEN = content_en ?? initEn;
  const contentVI = content_vi ?? initVi;
  const content = lang === 1 ? contentEN : contentVI;
  const styleOfWeek = stylesDailyAffirmation[index];
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: styleOfWeek.backgroundColor, overflow: 'hidden'},
      ]}>
      <SvgCircleRightDailyAffirmation
        color={styleOfWeek.colorIcon}
        // color="red"
        style={{position: 'absolute', top: scaler(47), left: -scaler(44)}}
      />
      <SvgLogoDailyAffirmation
        color={styleOfWeek.colorIcon}
        style={{position: 'absolute', top: -scaler(22), right: -scaler(100)}}
      />
      <Text style={[styles.textTitle, {color: styleOfWeek.colorTitle}]}>
        {t('home.dailyAffirmation')}
      </Text>
      <Text style={[styles.textBody, {color: styleOfWeek.colorText}]}>
        {`"${content}"`}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaler(30),
    paddingVertical: scaler(37),
    backgroundColor: colors.brandMainPinkRed,
    marginHorizontal: scaler(20),
    borderRadius: scaler(8),
    borderWidth: scaler(4),
    borderColor: '#FFFFFF',
  },
  textTitle: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(18),
    color: colors.white,
    textAlign: 'center',
    marginBottom: scaler(10),
  },
  textBody: {
    ...stylesCommon.fontDaily400,
    fontSize: scaler(18),
    lineHeight: scaler(25),
    color: colors.white,
    textAlign: 'center',
  },
});
