import {useFocusEffect} from '@react-navigation/native';
import {getListUserChat} from '@redux';
import {getListUserApi} from '@services';
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
import {ItemUser} from './components';

export const ListMessageUser = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const dataUser = useSelector((state: any) => state?.listChat?.listUser);
  const search = useSelector((state: any) => state?.listChat?.search);

  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);

  const refPage = useRef<number>(1);

  useFocusEffect(
    React.useCallback(() => {
      refPage.current = 1;
      getData();
    }, [search]),
  );

  const getData = async () => {
    try {
      refLoadMore.current = false;
      if (refPage.current === 1) {
        setLoading(true);
      }
      const res = await getListUserApi(search, refPage.current);
      dispatch(getListUserChat({page: refPage.current, data: res?.data?.data}));
      setTotal(res?.data?.total);
      res?.data?.data?.length > 0 && refPage.current++;
    } catch (e) {
    } finally {
      setLoadMore(false);
      setLoading(false);
      refLoadMore.current = true;
    }
  };

  const refLoadMore = useRef<boolean>(true);

  const keyExtractor = useCallback((_: any) => _.id, []);

  const onRefresh = () => {
    refPage.current = 1;
    getData();
    // dispatch(getSearch(''));
  };

  const handleLoadMore = () => {
    console.log('handleLoadMore');
    if (dataUser?.length < total && refLoadMore.current) {
      setLoadMore(true);
      getData();
    } else {
      null;
    }
  };
  if (loading) {
    return (
      <View style={styles.viewLoadMore}>
        <ActivityIndicator color={colors.brandMainPinkRed} size="small" />
      </View>
    );
  }
  return (
    <FlatList
      data={dataUser}
      renderItem={({item}) => <ItemUser item={item} />}
      keyExtractor={keyExtractor}
      contentContainerStyle={{
        paddingBottom: scaler(60),
        flexGrow: 1,
      }}
      onEndReachedThreshold={0.1}
      keyboardDismissMode="on-drag"
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
