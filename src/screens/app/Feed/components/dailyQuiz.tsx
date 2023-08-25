import {LazyImage} from '@component/LazyImage';
import {DailyQuizBackground} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {SIZE_DEFAULT} from '../../DetailFeed/useDetailFeed';

const DailyQuiz = ({item, index}: any) => {
  const navigation = useNavigation<any>();
  const lang = useSelector((state: any) => state.auth.lang);

  const onDetailClick = (index: number) => {
    navigation.navigate(ROUTE_NAME.DETAIL_FEED, {
      index,
      currentPage: Math.ceil((index + 1) / SIZE_DEFAULT),
    });
  };

  return (
    <TouchableOpacity
      onPress={() => onDetailClick(index)}
      style={styles.itemContainer}>
      <View>
        <View style={styles.tag}>
          <Text style={styles.tagTitle}>Daily Quiz</Text>
        </View>
        <View style={styles.contentDailyQuiz}>
          <Text style={styles.contentText}>
            {lang === 1 ? item.question_en : item.question_vi}
          </Text>
        </View>
        <LazyImage source={DailyQuizBackground} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 0.5,
    padding: scaler(8),
    marginBottom: scaler(4),
    borderRadius: scaler(8),
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
    zIndex: 999,
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
    height: scaler(270),
    borderRadius: scaler(8),
  },
});

export default DailyQuiz;
