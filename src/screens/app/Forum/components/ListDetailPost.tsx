import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import HeaderListDetailPost from './HeaderListDetailPost';
import {CreateNewPostComponent} from './CreateNewPostComponent';
import {colors, scaler} from '@stylesCommon';
import {useSelector} from 'react-redux';
import {ItemPostHorizontal} from './ItemPostHorizontal';

const ListDetailPost = (props: any) => {
  const {route} = props;
  const lang = useSelector((state: any) => state?.auth?.lang);

  const renderItem = ({item}: {item: any; index: number}) => {
    return (
      <ItemPostHorizontal
        item={item}
        key={item?.id}
        index={route?.params.index}
        mgb={scaler(16)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <HeaderListDetailPost
        title={
          lang === 1 ? route?.params.data.name_en : route?.params.data.name_vi
        }
      />
      <CreateNewPostComponent />

      <FlatList
        data={route?.params.data.posts}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        numColumns={2}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: scaler(16),
    paddingBottom: scaler(10),
    backgroundColor: colors.white,
    flex: 1,
  },
  list: {
    flexGrow: 0,
    marginVertical: scaler(16),
  },
  listContentContainer: {
    paddingLeft: scaler(16),
  },
});

export default ListDetailPost;
