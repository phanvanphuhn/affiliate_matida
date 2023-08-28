import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors} from '@stylesCommon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IDataListFeed} from '../../Feed/type';
import useDetailFeed, {SIZE_DEFAULT} from '../useDetailFeed';
import {ROUTE_NAME} from '@routeName';
import {useNavigation} from '@react-navigation/native';
import {LazyImage} from '@component';

interface DrawerFeedProps {}

const DrawerFeed = (props: DrawerFeedProps) => {
  const insets = useSafeAreaInsets();
  const {state, handleLoadMore} = useDetailFeed();
  const getThumbnail = (item: IDataListFeed) => {
    let url = '';
    switch (item.content_type) {
      case 'video':
        url = item.thumbnail || '';
        break;
      case 'podcast':
      case 'article':
        url = item.image || '';
        break;
    }
    return url;
  };
  const navigation = useNavigation<any>();

  const onDetail = (index: number) => {
    navigation.replace(ROUTE_NAME.DETAIL_FEED, {
      index,
      currentPage: Math.ceil((index + 1) / SIZE_DEFAULT),
    });
  };
  const renderItem: ListRenderItem<IDataListFeed> = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onDetail(index)}
        style={styles.containerItem}>
        <LazyImage
          fastImage={true}
          source={{uri: getThumbnail(item)}}
          style={styles.imageThumbnail}
        />
        <Text numberOfLines={2} style={styles.textTitle}>
          {item.title}
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
