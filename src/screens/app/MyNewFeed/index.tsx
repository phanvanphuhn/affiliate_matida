import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import {colors, scaler} from '@stylesCommon';
import {useTranslation} from 'react-i18next';
import {Item} from './component/Item';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {ModalConfirm, ViewButtonChange} from '@component';
import {GlobalService} from '@services';
import {getListMyPost, deleteListUserPost} from '@redux';
import {trackingAppEvent, event, useUXCam, eventType} from '@util';
import {ROUTE_NAME} from '@routeName';
import {trackMyPostsClicked} from '@services/webengageManager.tsx';

const MyNewFeed = (props: any) => {
  const {statusRefresh} = props;
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const data = useSelector((state: any) => state?.post?.userPost?.posts);
  const total = useSelector((state: any) => state?.post?.userPost?.total);

  const navigation = useNavigation<any>();
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [idDelete, setIdDelete] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [indexButton, setIndexButton] = useState<number>(1);

  const listButton = [
    {
      id: 1,
      label: t('post.most_recent'),
      value: 1,
      amount: null,
    },
    {
      id: 2,
      label: t('post.most_popular'),
      value: 2,
      amount: null,
    },
  ];

  useEffect(() => {
    if (statusRefresh > 0) {
      onRefresh();
    }
  }, [statusRefresh]);

  const getData = async () => {
    try {
      dispatch(
        getListMyPost({userId: user?.id, page: page, typePost: indexButton}),
      );
      setIsLoadMore(false);
    } catch (error) {}
  };

  const getDataRefresh = async () => {
    try {
      dispatch(
        getListMyPost({userId: user?.id, page: page, typePost: indexButton}),
      );
      setIsLoadMore(false);
    } catch (error) {}
  };

  useUXCam(ROUTE_NAME.MY_NEWFEED);

  useFocusEffect(
    React.useCallback(() => {
      trackMyPostsClicked(1); // most recent is 1
      trackingAppEvent(event.SCREEN.MY_NEWFEED, {}, eventType.AFF_FLYER);
      setIndexButton(1);
      getDataRefresh();
      return () => setPage(1);
    }, []),
  );

  // useEffect(() => {
  //   getDataRefresh();
  //   return () => setPage(1);
  // }, []);

  const deleteItem = (value: any) => {
    setIdDelete(value?.id);
    setModalDelete(true);
  };

  const onConfirmDelete = () => {
    setModalDelete(false);
    dispatch(deleteListUserPost(idDelete));
  };

  const renderItem = ({item, index}: any) => {
    return (
      <Item
        item={item}
        index={index}
        onDelete={() => deleteItem(item)}
        callBackData={callBackData}
      />
    );
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

  const handlePressButton = (value: number) => {
    trackMyPostsClicked(value);
    GlobalService.showLoading();
    setIndexButton(value);
    dispatch(getListMyPost({userId: user?.id, page: page, typePost: value}));
  };

  return (
    <View style={styles.container}>
      <ViewButtonChange
        list={listButton}
        indexButton={indexButton}
        onPressButton={handlePressButton}
        styleContainerFocus={{backgroundColor: colors.red50}}
        styleTextFocus={{color: colors.white}}
        styleContainer={{
          borderWidth: scaler(1),
          borderColor: colors.red50,
        }}
        styleText={{color: colors.red50}}
        style={{
          marginLeft: scaler(16),
          marginTop: scaler(0),
          marginBottom: scaler(16),
          paddingHorizontal: 0,
        }}
      />
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
          onEndReachedThreshold={0.01}
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

export {MyNewFeed};
