import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Image,
} from 'react-native';
import {colors} from '@stylesCommon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IDataListFeed} from '../../Feed/type';
import useDetailFeed from '../useDetailFeed';

interface DrawerFeedProps {}

const DrawerFeed = (props: DrawerFeedProps) => {
  const insets = useSafeAreaInsets();
  const {state} = useDetailFeed();

  const renderItem: ListRenderItem<IDataListFeed> = ({item, index}) => {
    return (
      <View style={styles.containerItem}>
        <Image source={{uri: item.thumbnail}} style={styles.imageThumbnail} />
        <Text numberOfLines={2} style={styles.textTitle}>
          {item.title}
        </Text>
      </View>
    );
  };
  const keyExtractor = (item: IDataListFeed, index: number) => index.toString();
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <FlatList
        data={state.data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default DrawerFeed;

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
