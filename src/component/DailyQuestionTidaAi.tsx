import {getDailyQuestion} from '@services';
import {colors, scaler} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Animated} from 'react-native';

const DailyQuestionTidaAi = ({data}: any) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>{data}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: scaler(4),
  },
  title: {
    color: colors.white,
    fontSize: scaler(14),
    fontWeight: '400',
  },
});

export default DailyQuestionTidaAi;
