import {stylesCommon, colors, scaler} from '@stylesCommon';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Header, ModalConfirmUnBlock} from '@component';
import {iconEdit, SvgArrowLeft, avatarDefault} from '@images';
import {useTranslation} from 'react-i18next';
import {AppImage} from '@component';
import {listUserBlockApi} from '@services';
import {showMessage} from 'react-native-flash-message';
import {useFocusEffect} from '@react-navigation/native';
import {GlobalService, blockUserApi} from '@services';
import {trackingAppEvent, event, useUXCam} from '@util';
import {ROUTE_NAME} from '@routeName';

const BlockUser = () => {
  const {t} = useTranslation();
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState<any>(null);

  const [dataUser, setDataUser] = useState<any>(null);
  const [showModal, setShowModal] = useState<any>(false);

  useUXCam(ROUTE_NAME.LIST_BLOCKED_USER);

  useFocusEffect(
    React.useCallback(() => {
      getDataRefresh();
      trackingAppEvent(event.SCREEN.LIST_BLOCKED_USER, {});
      return () => setPage(1);
    }, []),
  );

  const getDataRefresh = async () => {
    try {
      const res = await listUserBlockApi(1);
      setData(res?.data?.data);
      setTotal(res?.data?.total);
      setIsLoadMore(false);
    } catch (error) {}
  };

  const onRefresh = async () => {
    await setPage(1);
    getDataRefresh();
  };

  const handleLoadMore = () => {
    if (data?.length >= total) {
      null;
    } else {
      setPage(prevPage => prevPage + 1);
      setIsLoadMore(true);
    }
  };

  const getData = async () => {
    try {
      const res = await listUserBlockApi(page);
      setData(data?.concat(res?.data?.data));
      setTotal(res?.data?.total);
      setIsLoadMore(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (data?.length <= total && isLoadMore === true) {
      getData();
    } else {
      setIsLoadMore(false);
    }
  }, [page]);

  const unBlockUser = async () => {
    try {
      const res = await blockUserApi(dataUser?.blocked_user?.id);
      showMessage({
        message: res?.data?.message,
        type: 'default',
        backgroundColor: colors.success_message,
      });
      const dataClone = [...data];
      const index = dataClone.findIndex(
        (element: any) => element?.id == dataUser?.id,
      );
      if (index > -1) {
        dataClone.splice(index, 1);
      }
      setTotal(dataClone?.length);
      setData(dataClone);
    } catch (errro) {}
  };

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.viewItem}>
        <View style={styles.viewRow}>
          {item?.blocked_user?.avatar?.length > 0 ? (
            <AppImage
              user
              style={styles.avatar}
              uri={item?.blocked_user?.avatar}
            />
          ) : (
            <Image source={avatarDefault} style={styles.avatar} />
          )}
          <Text numberOfLines={1} style={styles.txtName}>
            {item?.blocked_user?.name}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonUnblock}
          onPress={() => {
            setDataUser(item);
            setShowModal(true);
          }}>
          <Text style={styles.txtUnblock}>{t('block_user.unBlock')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('block_user.titleHeader')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      <View style={styles.viewContent}>
        <FlatList
          data={data}
          renderItem={renderItem}
          onEndReachedThreshold={0.05}
          onEndReached={handleLoadMore}
          ListEmptyComponent={() => {
            return (
              <View style={styles.viewEmpty}>
                <Text style={styles.txtEmpty}>{t('block_user.noData')}</Text>
              </View>
            );
          }}
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
      <ModalConfirmUnBlock
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          unBlockUser();
        }}
        useName={dataUser?.blocked_user?.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewContent: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingTop: scaler(3),
  },
  viewItem: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginBottom: scaler(3),
    paddingHorizontal: scaler(16),
    paddingVertical: scaler(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: scaler(40),
    height: scaler(40),
    borderRadius: scaler(20),
  },
  buttonUnblock: {
    paddingHorizontal: scaler(12),
    paddingVertical: scaler(8),
    borderRadius: scaler(40),
    backgroundColor: colors.primary,
    marginLeft: scaler(8),
  },
  txtUnblock: {
    color: '#FFFFFF',
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
  },
  txtName: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    color: colors.textColor,
    marginLeft: scaler(12),
  },
  viewLoadmore: {
    alignItems: 'center',
    marginBottom: scaler(8),
  },
  viewEmpty: {
    alignItems: 'center',
    marginTop: scaler(20),
  },
  txtEmpty: {
    ...stylesCommon.fontWeight500,
    color: colors.borderColor,
    fontSize: scaler(14),
  },
});

export {BlockUser};
