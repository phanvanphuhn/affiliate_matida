import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {colors, scaler, widthScreen} from '@stylesCommon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IDataListFeed} from '../../Feed/type';
import useDetailFeed, {SIZE_DEFAULT} from '../useDetailFeed';
import {ROUTE_NAME} from '@routeName';
import {useNavigation} from '@react-navigation/native';
import {LazyImage} from '@component';
import DailyQuiz from '../../Feed/components/dailyQuiz';
import MomPrepTest from '../../Feed/components/momPrepTest';
import ItemFeed from '../../Feed/components/ItemFeed';
import {event, trackingAppEvent} from '@util';
import {navigate} from '@navigation';
import {EPreRoute} from '@constant';
import {DailyQuizBackground} from '@images';
import {useSelector} from 'react-redux';
import useListFeed from '../../Feed/useListFeed';

interface DrawerFeedProps {}

const DrawerFeed = (props: DrawerFeedProps) => {
  const insets = useSafeAreaInsets();
  const lang = useSelector((state: any) => state.auth.lang);

  const {state, handleLoadMore} = useListFeed();
  const getThumbnail = (item: IDataListFeed) => {
    let url = '';
    switch (item.content_type) {
      case 'video':
        url = item.thumbnail || '';
        break;
      case 'podcast':
      case 'article':
      case 'package_quizz':
        url = item.image || '';
        break;
    }
    return url;
  };
  const navigation = useNavigation<any>();

  const onDetailClick = (index: number, item: IDataListFeed) => {
    if (item?.content_type == 'package_quizz') {
      if (!item?.is_active) {
        return;
      }
      if (+item?.maxScore === +item?.total_questions) {
        trackingAppEvent(event.MOM_TEST.START, {content: item?.id});
        navigate(ROUTE_NAME.TEST_RESULT, {
          id: item?.id,
          redoTest: () => {},
          preRoute: EPreRoute.PERIODIC,
        });
      } else {
        trackingAppEvent(event.MOM_TEST.START, {content: item});
        navigate(ROUTE_NAME.TEST_DETAIL, {quiz: item});
      }
    } else {
      navigation.replace(ROUTE_NAME.DETAIL_FEED, {
        id: item.contentid,
        content_type: item.content_type,
      });
    }
  };
  const renderItem: ListRenderItem<IDataListFeed> = ({item, index}) => {
    if (item.content_type == 'daily_quizz') {
      return (
        <TouchableOpacity
          onPress={() => onDetailClick(index, item)}
          style={styles.containerItem}>
          <ImageBackground
            source={DailyQuizBackground}
            borderRadius={scaler(10)}
            style={styles.image}>
            <Text
              numberOfLines={4}
              style={[
                styles.textTitle,
                {
                  paddingHorizontal: 10,
                },
              ]}>
              {lang === 1 ? item.question_en : item.question_vi}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => onDetailClick(index, item)}
        style={styles.containerItem}>
        <LazyImage
          fastImage={true}
          source={{uri: getThumbnail(item)}}
          style={styles.imageThumbnail}
        />
        <Text numberOfLines={2} style={styles.textTitle}>
          {item.content_type == 'package_quizz'
            ? lang === 1
              ? item.name_en
              : item.name_vi
            : item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const keyExtractor = (item: IDataListFeed, index: number) => index.toString();
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <FlatList
        data={state.data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.6}
      />
    </View>
  );
};

export default React.memo(DrawerFeed);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    borderRadius: scaler(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerItem: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
    paddingRight: 10,
  },
  imageThumbnail: {
    backgroundColor: colors.white,
    aspectRatio: 1.1,
    resizeMode: 'contain',
    width: '100%',
    borderRadius: 10,
  },
  textTitle: {
    color: colors.white,
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 12,
    fontWeight: '500',
  },
});
