import {
  AppModal,
  IOption,
  ModalConfirm,
  ModalConfirmBlock,
  ModalOption,
  Option,
} from '@component';
import {SvgFlag, SvgProhibit} from '@images';
import {deleteListUserPost, deletePostForum, getForumByTab} from '@redux';
import {blockUserApi, GlobalService} from '@services';
import {colors, scaler, widthScreen} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../Forum.style';
import {ItemPost} from './ItemPost';
import {ListActivePeople} from './ListActivePeople';
import {ListPostHorizontal} from './ListPostHorizontal';

export const ListPost = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const forum = useSelector((state: any) => state?.forum?.forum);
  const total = useSelector((state: any) => state?.forum?.total);
  const short_code: string | null = useSelector(
    (state: any) => state?.forum?.tab?.short_code,
  );
  const loadMoreRedux: boolean = useSelector(
    (state: any) => state?.forum?.loadMore,
  );
  const loadList: boolean = useSelector((state: any) => state?.forum?.loadList);

  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalBlock, setModalBlock] = useState<boolean>(false);
  const [idPostSelect, setIdPostSelect] = useState<number | string | null>(0);
  const [idDelete, setIdDelete] = useState(null);
  const [dataUser, setDataUser] = useState<any>(null);
  const [loadMore, setLoadMore] = useState<boolean>(false);

  const refOption = useRef<any>(null);
  const refPage = useRef<number>(1);

  const listOption: IOption[] = [
    {
      id: 1,
      label: t('post.settings.report'),
      value: Option.REPORT,
      onPress: () => {},
      icon: <SvgFlag />,
    },
    {
      id: 2,
      label: t('post.settings.block'),
      value: Option.BLOCK,
      onPress: () => handleBlockUser(),
      icon: <SvgProhibit />,
    },
  ];

  useEffect(() => {
    if (short_code) {
      refPage.current = 1;
      getData();
    }
  }, [short_code]);

  const getData = () => {
    dispatch(
      getForumByTab({short_code: short_code?.trim(), page: refPage.current}),
    );
  };

  const handleBlockUser = () => {
    refOption.current?.close();
    setTimeout(() => {
      setModalBlock(true);
    }, 500);
  };

  const blockUser = async () => {
    try {
      GlobalService.showLoading();
      const res = await blockUserApi(dataUser?.user_id);
      showMessage({
        message: res?.data?.message,
        type: 'default',
        backgroundColor: colors.success_message,
      });
      refPage.current = 1;
      getData();
      GlobalService.hideLoading();
    } catch (errro) {
      GlobalService.hideLoading();
    }
  };

  const onConfirmDelete = async () => {
    setModalDelete(false);
    dispatch(deleteListUserPost(idDelete));
    dispatch(deletePostForum(idDelete));
  };

  const deleteItem = (value: any) => {
    setIdDelete(value?.id);
    setModalDelete(true);
  };

  const handlePressOption = (idPost: any, dataUser: any) => {
    setIdPostSelect(idPost ?? 0);
    setDataUser(dataUser);
    refOption.current?.open();
  };

  const onRefresh = async () => {
    refPage.current = 1;
    getData();
  };

  const handleLoadMore = () => {
    if (forum?.length < total && loadMoreRedux && short_code !== 'all') {
      refPage.current++;
      setLoadMore(true);
      getData();
    }
  };

  const renderItem = ({item, index}: any) => {
    return short_code === 'all' ? (
      <ListPostHorizontal data={item} index={index} />
    ) : (
      <ItemPost
        item={item}
        onDelete={() => deleteItem(item)}
        onPressOption={handlePressOption}
      />
    );
  };
  return (
    <>
      <View style={{flex: 1}}>
        <FlatList
          data={loadList ? [] : forum}
          renderItem={renderItem}
          // ListHeaderComponent={<ListTopTab />}
          style={{backgroundColor: colors.gray250}}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.05}
          onEndReached={handleLoadMore}
          ListEmptyComponent={() => {
            return (
              <>
                {loadList ? (
                  <View
                    style={[styles.viewLoadMore, {marginVertical: scaler(16)}]}>
                    <ActivityIndicator color={colors.primary} size="small" />
                  </View>
                ) : (
                  <View style={styles.viewEmpty}>
                    <Text style={styles.textNoData}>{t('data.notFind')}</Text>
                  </View>
                )}
              </>
            );
          }}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          ListFooterComponent={
            <>
              {loadMore === true ? (
                <View style={styles.viewLoadMore}>
                  <ActivityIndicator color={colors.primary} size="small" />
                </View>
              ) : null}
            </>
          }
          ListHeaderComponent={<ListActivePeople />}
          keyExtractor={(item: any) => item?.id}
        />
      </View>
      <ModalConfirm
        visible={modalDelete}
        titleHeader={t('post.title_modal_delete')}
        onCancel={() => setModalDelete(false)}
        onConfirm={onConfirmDelete}
      />
      <AppModal
        position="bottom"
        ref={refOption}
        modalSize={{
          height: scaler(200),
          width: widthScreen,
        }}>
        <ModalOption
          onClose={() => refOption.current?.close()}
          listItem={listOption}
          idPost={idPostSelect}
        />
      </AppModal>
      <ModalConfirmBlock
        visible={modalBlock}
        onCancel={() => setModalBlock(false)}
        onConfirm={() => {
          setModalBlock(false);
          blockUser();
        }}
        useName={dataUser?.name}
      />
    </>
  );
};
