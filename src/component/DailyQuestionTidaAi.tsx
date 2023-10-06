import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {getDailyQuestion} from '@services';
import {colors, scaler} from '@stylesCommon';
import {event, eventType, trackingAppEvent} from '@util';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';

const DailyQuestionTidaAi = ({data}: any) => {
  const navigation = useNavigation();

  const onNnavigateChatAPI = () => {
    trackingAppEvent(event.TIDA.TIDA_OPEN, {}, eventType.MIX_PANEL);
    navigation.navigate(ROUTE_NAME.CHAT_GPT, {data: data});
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={onNnavigateChatAPI}>
        <Text style={styles.title}>{data}</Text>
      </TouchableOpacity>
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
