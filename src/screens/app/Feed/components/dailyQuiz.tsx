import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

const DailyQuiz = ({item, index, onPress}: any) => {
  const lang = useSelector((state: any) => state.auth.lang);
  const {t} = useTranslation();

  return (
    <TouchableOpacity
      onPress={() => onPress(index, item)}
      style={styles.itemContainer}>
      <View style={styles.tag}>
        <Text style={styles.tagTitle}>{t('feed.dailyQuiz')}</Text>
      </View>
      <View style={styles.contentDailyQuiz}>
        <Text style={styles.contentText}>
          {lang === 1 ? item.question_en : item.question_vi}
        </Text>
      </View>
      {/* <LazyImage source={DailyQuizBackground} style={styles.image} /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: scaler(4),
    flex: 0.48,
    backgroundColor: '#654AC9',
    borderRadius: scaler(8),
    height: scaler(292),
  },
  tag: {
    position: 'absolute',
    zIndex: 1000,
    top: scaler(6),
    right: scaler(6),
    backgroundColor: colors.white,
    paddingVertical: scaler(2),
    paddingHorizontal: scaler(4),
    borderRadius: scaler(12),
  },
  tagTitle: {
    color: colors.red50,
    fontSize: scaler(10),
    ...stylesCommon.fontWeight600,
  },
  contentDailyQuiz: {
    position: 'absolute',
    zIndex: 1000,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    padding: scaler(8),
  },
  contentText: {
    color: colors.white,
    fontSize: scaler(16),
    textAlign: 'center',
    paddingHorizontal: scaler(4),
    ...stylesCommon.fontWeight600,
  },
  image: {
    height: scaler(292),
    borderRadius: scaler(8),
    width: widthScreen / 2 - scaler(16),
  },
});

export default DailyQuiz;
