import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {WEEK_MAX} from '@constant';
import {SvgArrowCircleLeft, SvgArrowCircleRight} from '@images';
import {getDataHomeByWeek} from '@redux';
import {scaler, stylesCommon} from '@stylesCommon';
import {useDispatch, useSelector} from 'react-redux';

export const WeeksPregnant = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const weekPregnant = useSelector((state: any) => state?.home?.weekPregnant);
  const week = useSelector((state: any) => state?.home?.week);
  const [weeksPregnant, setWeeksPregnant] = useState<number>(
    week ?? weekPregnant?.weeks,
  );

  useEffect(() => {
    setWeeksPregnant(week ?? weekPregnant?.weeks);
  }, [week]);

  const handlePressLeft = () => {
    weeksPregnant > 1 && handleChangeWeeks(weeksPregnant - 1);
  };

  const handlePressRight = () => {
    weeksPregnant < WEEK_MAX && handleChangeWeeks(weeksPregnant + 1);
  };

  const handleChangeWeeks = async (weeks: number) => {
    try {
      dispatch(getDataHomeByWeek({week: weeks}));
    } catch (error) {
    } finally {
      // ShowLoadingRef.current = false;
      // GlobalService.hideLoading();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePressLeft}
        activeOpacity={0.8}
        style={styles.button}>
        <SvgArrowCircleLeft />
      </TouchableOpacity>
      <Text style={[styles.text, {fontSize: scaler(20)}]}>
        {t('home.weeks', {weeks: weeksPregnant})}
      </Text>
      <TouchableOpacity
        onPress={handlePressRight}
        activeOpacity={0.8}
        style={styles.button}>
        <SvgArrowCircleRight />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaler(16),
    marginVertical: scaler(24),
  },
  text: {
    ...stylesCommon.fontPlus600,
    fontSize: scaler(25),
    lineHeight: 30,
    color: 'rgba(214, 93, 93, 0.9)',
    textAlign: 'center',
    flex: 1,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scaler(40),
    height: scaler(40),
    backgroundColor: 'rgba(214, 93, 93, 0.9)',
    borderRadius: scaler(40 / 2),
  },
});
