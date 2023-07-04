import {
  AppModal,
  ModalConfirm,
  ViewButtonChange,
  ModalConfirmBlock,
  IOption,
  Option,
  ModalOption,
} from '@component';
import {SvgFlag, SvgProhibit} from '@images';
import {useFocusEffect} from '@react-navigation/native';
import {deleteListUserPost, getListUserPost} from '@redux';
import {GlobalService, blockUserApi} from '@services';
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
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../styles';
import {Item} from './Item';
import {showMessage} from 'react-native-flash-message';

export const AllPostComponent = (props: any) => {
  const {statusRefresh} = props;
  const dispatch = useDispatch();

  const data = useSelector((state: any) => state?.post?.userPost?.posts);
  const total = useSelector((state: any) => state?.post?.userPost?.total);

  const {t} = useTranslation();
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [idDelete, setIdDelete] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [indexButton, setIndexButton] = useState<number>(1);
  const [idPostSelect, setIdPostSelect] = useState<number | string | null>(0);
  const [modalBlock, setModalBlock] = useState<any>(false);
  const [dataUser, setDataUser] = useState<any>(null);
  const refOption = useRef<any>(null);

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
  const listOption: IOption[] = [
    {
      id: 1,
      label: t('post.settings.report'),
      value: Option.REPORT,
      onPress: () => handleReportUser(),
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
    if (statusRefresh > 0) {
      onRefresh();
    }
  }, [statusRefresh]);

  const handleReportUser = () => {};

  const handleBlockUser = () => {
    refOption.current?.close();
    setTimeout(() => {
      setModalBlock(true);
    }, 500);
  };

  const getData = async () => {
    try {
      dispatch(getListUserPost({page: page, typePost: indexButton}));
      setIsLoadMore(false);
    } catch (error) {}
  };

  const getDataRefresh = async () => {
    try {
      dispatch(getListUserPost({page: 1, typePost: indexButton}));
      setIsLoadMore(false);
    } catch (error) {}
  };

  useFocusEffect(
    React.useCallback(() => {
      getDataRefresh();
      setIndexButton(1);
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
        onPressOption={handlePressOption}
      />
    );
  };

  const handlePressOption = (idPost: any, dataUser: any) => {
    setIdPostSelect(idPost ?? 0);
    setDataUser(dataUser);
    refOption.current?.open();
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

  const handlePressButton = (value: number) => {
    GlobalService.showLoading();
    setIndexButton(value);
    dispatch(getListUserPost({page: 1, typePost: value}));
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
      getDataRefresh();
      GlobalService.hideLoading();
    } catch (errro) {
      GlobalService.hideLoading();
    }
  };

  return (
    <>
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
      </View>
    </>
  );
};
