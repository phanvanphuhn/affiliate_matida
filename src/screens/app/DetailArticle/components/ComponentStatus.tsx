import {colors, scaler, stylesCommon} from '@stylesCommon';
import {convertTopics, IMoodStyles} from '@util';
import {t} from 'i18next';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const MoodComponent = ({mood}: {mood: number}) => {
  const index = mood - 1;
  const MoodStyles: IMoodStyles[] = [
    {
      title: t('articles.curious'),
      style: {
        text: colors.purple,
        view: colors.purple50,
      },
    },
    {
      title: t('articles.nervous'),
      style: {
        text: colors.brandMainPinkRed,
        view: colors.gray150,
      },
    },
    {
      title: t('articles.nauseous'),
      style: {
        text: colors.yellow,
        view: colors.yellow50,
      },
    },

    {
      title: t('articles.happy'),
      style: {
        text: colors.green,
        view: colors.green50,
      },
    },
  ];

  return (
    <View
      style={[
        styles.viewMood,
        {backgroundColor: MoodStyles[index]?.style.view},
      ]}>
      <Text style={[styles.textMood, {color: MoodStyles[index]?.style.text}]}>
        {MoodStyles[index]?.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewMood: {
    borderRadius: scaler(40),
    backgroundColor: '#E8F8F7',
    marginRight: scaler(8),
    paddingHorizontal: scaler(8),
    paddingVertical: scaler(4),
    marginVertical: scaler(4),
  },
  textMood: {
    ...stylesCommon.fontWeight400,
    color: '#10B1A8',
    fontSize: scaler(12),
    lineHeight: 18,
  },
});
