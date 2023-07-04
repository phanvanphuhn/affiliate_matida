import {colors, scaler, stylesCommon} from '@stylesCommon';
import {convertTopics} from '@util';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const TopicComponent = ({topic}: {topic: number}) => {
  return (
    <View style={[styles.viewMood, {backgroundColor: colors.gray100}]}>
      <Text style={[styles.textMood, {color: colors.textColor}]}>
        {convertTopics(topic)}
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
