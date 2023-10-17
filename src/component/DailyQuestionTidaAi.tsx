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

const DailyQuestionTidaAi = ({data, onNnavigateChatAPI}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onNnavigateChatAPI}>
        <Text style={styles.title} numberOfLines={2}>
          {data}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: scaler(6),
  },
  title: {
    color: colors.black,
    fontSize: scaler(14),
    fontWeight: '400',
  },
});

export default DailyQuestionTidaAi;
