import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import HeaderListDetailPost from './HeaderListDetailPost';
import {CreateNewPostComponent} from './CreateNewPostComponent';
import {colors, scaler} from '@stylesCommon';
import {useSelector} from 'react-redux';
import {ItemPostHorizontal} from './ItemPostHorizontal';
import {GlobalService, getDetailListPost} from '@services';
import useDetailPost from './useDetailPost';

const ListDetailPost = (props: any) => {
  const {route} = props;
  const lang = useSelector((state: any) => state?.auth?.lang);

  const [state, setState] = useDetailPost({
    page: 1,
    data: null,
    total: null,
    loading: false,
  });

  const getData = async () => {
    GlobalService.showLoading();
    setState({loading: true});
    const params = {
      page: state.page?.toString(),
      label: route?.params?.data.short_code,
    };
    try {
      const res = await getDetailListPost(params);
      setState({loading: false});
      if (state.page > 1) {
        setState({
          data: [...state.data, ...res.data.posts],
          total: res.data.total,
        });
        GlobalService.hideLoading();
      } else if (res?.success) {
        setState({data: res.data.posts, total: res.data.total});
        GlobalService.hideLoading();
      } else {
        GlobalService.hideLoading();
      }
    } catch (error) {
      console.log('error: ', error);
      GlobalService.hideLoading();
    }
  };

  const handleLoadMore = () => {
    if (state.data?.length < state?.total) {
      setState({page: state.page + 1});
    }
  };

  const pullToRefresh = () => {
    setState({page: 1});
  };

  React.useEffect(() => {
    getData();
  }, [state.page]);

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
        data={state.data}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        numColumns={2}
        contentContainerStyle={styles.listContentContainer}
        onEndReached={handleLoadMore}
        onRefresh={pullToRefresh}
        refreshing={state.loading}
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
