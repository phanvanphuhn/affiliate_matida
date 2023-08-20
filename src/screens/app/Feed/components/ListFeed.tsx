import {DailyQuiz, SvgEye, iconClock, imageNameAppPink} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler} from '@stylesCommon';
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
import useDetailFeed from '../../DetailFeed/useDetailFeed';
import {styles} from '../styles';
import {IDataListFeed} from '../type';

const ListFeed = (props: any) => {
  const {t} = useTranslation();

  const {state, onPageSelected, handleLoadMore, handleLoadLess} =
    useDetailFeed();
  const navigation = useNavigation<any>();
  const lang = useSelector((state: any) => state.auth.lang);

  const onDetailClick = (index: number) => {
    navigation.navigate(ROUTE_NAME.DETAIL_FEED, {
      index,
      currentPage: Math.ceil((index + 1) / 10),
    });
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
    return (
      <TouchableOpacity
        onPress={() => onDetailClick(index)}
        style={styles.itemContainer}>
        <View>
          <View style={styles.tag}>
            <Text style={styles.tagTitle}>{renderTag(item)}</Text>
          </View>
          <FastImage
            source={
              item.content_type === 'daily_quizz'
                ? DailyQuiz
                : {uri: getThumbnail(item)}
            }
            style={styles.image}
          />
          {(item.content_type == 'video' || item.content_type == 'podcast') && (
            <View style={styles.leftDescription}>
              <Image source={iconClock} />

              <Text style={styles.description} numberOfLines={1}>
                {item.duration ? item.duration : '0'} {t('feed.min')}
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
        <Text style={styles.title}>
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
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  );
};

export default ListFeed;
