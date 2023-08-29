import {LazyImage} from '@component/LazyImage';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RNSlider from 'react-native-slider';
import {useSelector} from 'react-redux';

const MomPrepTest = ({item, index, onPress}: any) => {
  const lang = useSelector((state: any) => state.auth.lang);

  return (
    <TouchableOpacity
      onPress={() => onPress(index, item)}
      style={styles.itemContainer}>
      <View>
        <View style={styles.tag}>
          <Text style={styles.tagTitle}>Mom prep test</Text>
        </View>
        <View style={styles.contentDailyQuiz}>
          <Text style={styles.contentText}>
            {lang === 1 ? item.question_en : item.question_vi}
          </Text>
        </View>
        <LazyImage
          source={{
            uri: item.image,
          }}
          fastImage={true}
          style={styles.image}
        />
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {item.content_type == 'package_quizz'
          ? lang === 1
            ? item?.name_en
            : item?.name_vi
          : item.title}
      </Text>
      <View style={styles.trackContainer}>
        <RNSlider
          maximumValue={Number(item.total_questions)}
          value={Number(item.maxScore)}
          trackStyle={[styles.track]}
          thumbStyle={[styles.thumb]}
          minimumTrackTintColor={'#28B4AE'}
          maximumTrackTintColor={'#E8F8F7'}
        />
        <Text
          style={
            styles.trackTitle
          }>{`${item.maxScore}/${item.total_questions} correct`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: scaler(12),
    flex: 0.48,
    backgroundColor: colors.backgroundFeed,
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
    height: scaler(220),
    width: widthScreen / 2 - scaler(16),
    borderTopRightRadius: scaler(8),
    borderTopLeftRadius: scaler(8),
  },
  title: {
    color: colors.black,
    fontSize: scaler(12),
    ...stylesCommon.fontWeight500,
    marginTop: scaler(8),
    paddingLeft: scaler(8),
    paddingRight: scaler(8),
  },
  trackContainer: {
    paddingLeft: scaler(8),
    paddingRight: scaler(8),
    paddingBottom: scaler(8),
  },
  thumb: {
    width: 0,
    height: 0,
  },
  track: {
    height: scaler(8),
    borderRadius: scaler(8),
    backgroundColor: '#E8F8F7',
  },
  trackTitle: {
    color: '#28B4AE',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight500,
    textAlign: 'center',
  },
});

export default MomPrepTest;
