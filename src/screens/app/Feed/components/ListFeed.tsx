import {SvgEye, iconClock} from '@images';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from '../styles';
import {IDataListFeed} from '../type';
import {ROUTE_NAME} from '@routeName';
import {useNavigation} from '@react-navigation/native';
import useDetailFeed from '../../DetailFeed/useDetailFeed';
import {useSelector} from 'react-redux';

const ListFeed = (props: any) => {
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
  const renderItem: ListRenderItem<IDataListFeed> = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onDetailClick(index)}
        style={styles.itemContainer}>
        <View>
          <FastImage source={{uri: getThumbnail(item)}} style={styles.image} />
          {(item.content_type == 'video' || item.content_type == 'podcast') && (
            <View style={styles.leftDescription}>
              <Image source={iconClock} />

              <Text style={styles.description} numberOfLines={1}>
                {item.duration} mins watch
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
              {getTotalView(item)} views
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
          <FastImage source={{uri: item.image}} style={styles.imageAvatar} />

          <Text style={styles.subTitle}>
            Coach by{' '}
            <Text style={{color: colors.success_message}}>
              {item.speaker_name}
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
      />
    </View>
  );
};

export default ListFeed;
