import {ModalConfirm} from '@component';
import {useFocusEffect} from '@react-navigation/native';
import {colors} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {styles} from '../styles';
import {Item} from './Item';
import {useSelector, useDispatch} from 'react-redux';
import {getListUserPost, deleteListUserPost} from '@redux';

export const AllPostComponent = () => {
  const dispatch = useDispatch();

  const data = useSelector((state: any) => state?.post?.userPost?.posts);
  const total = useSelector((state: any) => state?.post?.userPost?.total);

  const {t} = useTranslation();
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [idDelete, setIdDelete] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);

  const getData = async () => {
    try {
      dispatch(getListUserPost(page));
      setIsLoadMore(false);
    } catch (error) {}
  };

  const getDataRefresh = async () => {
    try {
      dispatch(getListUserPost(1));
      setIsLoadMore(false);
    } catch (error) {}
  };

  useFocusEffect(
    React.useCallback(() => {
      getDataRefresh();
      return () => setPage(1);
    }, []),
  );

  const renderItem = ({item, index}: any) => {
    return (
      <Item
        item={item}
        index={index}
        callBackData={callBackData}
        onDelete={() => deleteItem(item)}
      />
    );
  };

  const deleteItem = (value: any) => {
    setIdDelete(value?.id);
    setModalDelete(true);
  };

  const callBackData = () => {
    onRefresh();
  };

  const handleLoadMore = () => {
    if (data?.length >= total) {
      null;
    } else {
      setPage(prevPage => prevPage + 1);
      setIsLoadMore(true);
    }
  };

  const onConfirmDelete = async () => {
    setModalDelete(false);
    dispatch(deleteListUserPost(idDelete));
  };

  useEffect(() => {
    if (data?.length <= total && isLoadMore === true) {
      getData();
    } else {
      setIsLoadMore(false);
    }
  }, [page]);

  const onRefresh = async () => {
    await setPage(1);
    getDataRefresh();
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          ListEmptyComponent={() => {
            return (
              <View style={styles.viewEmpty}>
                <Text style={styles.txtEmpty}>{t('videoList.noData')}</Text>
              </View>
            );
          }}
          onEndReachedThreshold={0.05}
          onEndReached={handleLoadMore}
          ListFooterComponent={
            <>
              {isLoadMore === true ? (
                <View style={styles.viewLoadmore}>
                  <ActivityIndicator color={colors.primary} size="small" />
                </View>
              ) : null}
            </>
          }
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          keyExtractor={(item: any) => item?.id}
        />
      </View>
      <ModalConfirm
        visible={modalDelete}
        titleHeader={t('post.title_modal_delete')}
        onCancel={() => setModalDelete(false)}
        onConfirm={onConfirmDelete}
      />
    </View>
  );
};
