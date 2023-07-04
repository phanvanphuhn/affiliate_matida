import {colors, scaler, stylesCommon} from '@stylesCommon';
import {IMoodStyles} from '@util';
import {t} from 'i18next';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const TrimesterComponent = ({trimester}: {trimester: number}) => {
  const MoodStyles: IMoodStyles[] = [
    {
      title: t('podcast.trimester', {index: 1}),
      style: {
        text: '#28B4AE',
        view: colors.green50,
      },
    },
    {
      title: t('podcast.trimester', {index: 2}),
      style: {
        text: colors.brandMainPinkRed,
        view: colors.gray150,
      },
    },
    {
      title: t('podcast.trimester', {index: 3}),
      style: {
        text: colors.yellow,
        view: colors.yellow50,
      },
    },
  ];
  const index =
    !trimester || trimester > MoodStyles?.length ? 0 : trimester - 1;

  return (
    <>
      <View
        style={[
          styles.viewMood,
          {backgroundColor: MoodStyles[index]?.style?.view},
        ]}>
        <Text
          style={[styles.textMood, {color: MoodStyles[index]?.style?.text}]}>
          {MoodStyles[index]?.title}
        </Text>
      </View>
      {/* {!!trimester && (
        <View
          style={[
            styles.viewMood,
            {backgroundColor: MoodStyles[index].style.view},
          ]}>
          <Text
            style={[styles.textMood, {color: MoodStyles[index].style.text}]}>
            +{trimester - 1} more
          </Text>
        </View>
      )} */}
    </>
  );
};

const styles = StyleSheet.create({
  viewMood: {
    borderRadius: scaler(40),
    backgroundColor: '#E8F8F7',
    marginRight: scaler(8),
    paddingHorizontal: scaler(8),
    paddingVertical: scaler(4),
  },
  textMood: {
    ...stylesCommon.fontWeight400,
    color: '#10B1A8',
    fontSize: scaler(12),
    lineHeight: 18,
  },
});
