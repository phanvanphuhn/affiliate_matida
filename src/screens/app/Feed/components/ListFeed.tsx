import {LazyImage} from '@component/LazyImage';
import {EPreRoute} from '@constant';
import {SvgEye, iconClock, imageNameAppPink} from '@images';
import {navigate} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler} from '@stylesCommon';
import {event, trackingAppEvent} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import useDetailFeed, {SIZE_DEFAULT} from '../../DetailFeed/useDetailFeed';
import {styles} from '../styles';
import {IDataListFeed} from '../type';
import DailyQuiz from './dailyQuiz';
import MomPrepTest from './momPrepTest';

const ListFeed = (props: any) => {
  const {t} = useTranslation();

  const {state, onPageSelected, handleLoadMore, handleLoadLess} =
    useDetailFeed();
  const navigation = useNavigation<any>();
  const lang = useSelector((state: any) => state.auth.lang);

  const onDetailClick = (index: number, item: IDataListFeed) => {
    console.log(
      '=>(ListFeed.tsx:36) Math.ceil((index + 1) / SIZE_DEFAULT)',
      Math.ceil((index + 1) / SIZE_DEFAULT),
    );
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
      navigation.navigate(ROUTE_NAME.DETAIL_FEED, {
        index,
        currentPage: Math.ceil((index + 1) / SIZE_DEFAULT),
      });
    }
  };
  const getTotalView = (item: IDataListFeed) => {
    let totalView = 0;
    switch (item.content_type) {
      case 'article':
      case 'video':
        totalView = item.views;
        break;
      case 'podcast':
        totalView = item.total_views;
        break;
    }
    return totalView;
  };
  const getThumbnail = (item: IDataListFeed) => {
    let url = '';
    switch (item.content_type) {
      case 'video':
        url = item.thumbnail || '';
        break;
      case 'article':
      case 'podcast':
      case 'package_quizz':
        url = item.image || '';
        break;
    }
    return url;
  };
  const renderTag = (item: IDataListFeed) => {
    switch (item.content_type) {
      case 'daily_quizz':
        return 'Daily Quiz';
      case 'package_quizz':
        return 'Mom prep test';
      default:
        return item.content_type?.replace(
          /^./,
          item.content_type[0]?.toUpperCase(),
        );
    }
  };
  const renderItem: ListRenderItem<IDataListFeed> = ({item, index}) => {
    if (item.content_type == 'daily_quizz') {
      return <DailyQuiz item={item} index={index} onPress={onDetailClick} />;
    } else if (item.content_type == 'package_quizz') {
      return <MomPrepTest item={item} index={index} onPress={onDetailClick} />;
    }
    return (
      <TouchableOpacity
        onPress={() => onDetailClick(index, item)}
        style={styles.itemContainer}>
        <View>
          <View style={styles.tag}>
            <Text style={styles.tagTitle}>{renderTag(item)}</Text>
          </View>
          <LazyImage
            source={{
              uri: getThumbnail(item),
            }}
            fastImage={true}
            style={styles.image}
          />
          {(item.content_type == 'video' || item.content_type == 'podcast') && (
            <View style={styles.leftDescription}>
              <Image source={iconClock} />

              <Text style={styles.description} numberOfLines={1}>
                {item.durations ? item.durations : '0'} {t('feed.min')}
              </Text>
            </View>
          )}
          <View
            style={[
              styles.rightDescription,
              item.content_type == 'article'
                ? {
                    left: scaler(8),
                  }
                : {
                    right: scaler(8),
                  },
            ]}>
            <SvgEye stroke={colors.borderColor} />

            <Text style={styles.description} numberOfLines={1}>
              {getTotalView(item)} {t('feed.views')}
            </Text>
          </View>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {item.content_type == 'package_quizz'
            ? lang === 1
              ? item?.name_en
              : item?.name_vi
            : item.title}
        </Text>
        <View style={styles.wrapAvatarContainer}>
          <FastImage
            source={item.image ? {uri: item.image} : imageNameAppPink}
            style={styles.imageAvatar}
            resizeMode="contain"
          />

          <Text style={styles.subTitle}>
            {t('feed.by')}{' '}
            <Text style={{color: colors.success_message}}>
              {item.speaker_name ? item.speaker_name : 'Matida'}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index?.toString()}
        numColumns={2}
        initialNumToRender={4}
        maxToRenderPerBatch={8}
        windowSize={10}
        removeClippedSubviews
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  );
};

export default ListFeed;
