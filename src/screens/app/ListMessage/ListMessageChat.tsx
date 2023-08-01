import {useFocusEffect} from '@react-navigation/native';
import {createListChat} from '@redux';
import {getListChat} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useCallback, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ItemMessage} from './components';

export const ListMessageChat = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const user = useSelector((state: any) => state?.auth?.userInfo);
  const dataListChat = useSelector((state: any) => state?.listChat?.list);

  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );

  const getData = async () => {
    try {
      refLoadMore.current = false;
      setLoading(true);
      const res = await getListChat(user?.id, page, '');
      dispatch(createListChat({page: page, data: res?.data?.data}));
      setTotal(res?.data?.total);
      res?.data?.data?.length > 0 && setPage(page + 1);
    } catch (e) {
    } finally {
      setLoadMore(false);
      setLoading(false);
      refLoadMore.current = true;
    }
  };

  const refLoadMore = useRef<boolean>(true);

  const keyExtractor = useCallback((_: any) => _.id, []);

  const onRefresh = useCallback(async () => {
    await setPage(1);
    getData();
  }, []);

  const handleLoadMore = () => {
    if (dataListChat?.length < total && refLoadMore.current) {
      setLoadMore(true);
      getData();
    } else {
      null;
    }
  };

  return (
    <FlatList
      data={dataListChat}
      renderItem={({item}) => <ItemMessage item={item} />}
      keyExtractor={keyExtractor}
      contentContainerStyle={{
        paddingBottom: scaler(60),
        flexGrow: 1,
      }}
      onEndReachedThreshold={0.1}
      onEndReached={handleLoadMore}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={onRefresh}
          style={{backgroundColor: colors.white}}
          tintColor={
            Platform.OS === 'ios' ? colors.brandMainPinkRed : undefined
          }
        />
      }
      ListEmptyComponent={() => {
        return (
          <>
            {loading ? (
              <View style={styles.viewLoadMore}>
                <ActivityIndicator
                  color={colors.brandMainPinkRed}
                  size="small"
                />
              </View>
            ) : (
              <View style={styles.viewEmpty}>
                <Text style={styles.txtEmpty}>{t('data.notData')}</Text>
              </View>
            )}
          </>
        );
      }}
      ListFooterComponent={
        //loadMore === true
        <>
          {loadMore === true ? (
            <View style={styles.viewLoadMore}>
              <ActivityIndicator color={colors.brandMainPinkRed} size="small" />
            </View>
          ) : null}
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  viewEmpty: {
    alignItems: 'center',
    marginTop: scaler(20),
    flex: 1,
    flexGrow: 1,
  },
  txtEmpty: {
    ...stylesCommon.fontWeight500,
    color: colors.borderColor,
    fontSize: scaler(14),
  },
  viewLoadMore: {
    alignItems: 'center',
    marginBottom: scaler(8),
    marginTop: scaler(16),
    // backgroundColor: colors.backgroundDefault,
  },
});
