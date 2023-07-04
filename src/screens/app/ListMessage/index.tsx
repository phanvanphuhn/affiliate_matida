import {Header} from '@component';
import {SvgArrowLeft} from '@images';
import {useFocusEffect} from '@react-navigation/native';
import {createListChat} from '@redux';
import {getListChat} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useCallback, useRef, useState, useEffect} from 'react';
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
import {ItemMessage, ListHeaderComponent} from './components';
import {trackingAppEvent, event, useUXCam} from '@util';
import {ROUTE_NAME} from '@routeName';

export const ListMessage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const dataListChat = useSelector((state: any) => state?.listChat?.list);
  const {t} = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  const refLoadMore = useRef<boolean>(true);

  useUXCam(ROUTE_NAME.LIST_MESSAGE);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [search]),
  );

  useEffect(() => {
    trackingAppEvent(event.SCREEN.LIST_MESSAGE, {});
  }, []);

  const getData = async () => {
    try {
      refLoadMore.current = false;
      setLoading(true);
      const res = await getListChat(user?.id, page, search);

      // if (page === 1) {
      //   setData(res?.data?.data);
      // } else {
      //   setData(data?.concat(res?.data?.data));
      // }
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

  const onRefresh = useCallback(async () => {
    await setPage(1);
    // getData();
    if (search === '') {
      getData();
    } else {
      setSearch('');
    }
  }, []);

  const handleLoadMore = () => {
    if (dataListChat?.length < total && refLoadMore.current) {
      setLoadMore(true);
      getData();
    } else {
      null;
    }
  };

  const keyExtractor = useCallback((_: any) => _.id, []);

  const handleSearch = async (value: string) => {
    await setPage(1);
    setSearch(value);
  };

  return (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      <Header
        title={t('chat.title')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      {/* <View style={{flexGrow: 1}}></View> */}
      <FlatList
        // data={data}
        data={dataListChat}
        renderItem={({item}) => <ItemMessage item={item} />}
        keyExtractor={keyExtractor}
        contentContainerStyle={{
          paddingBottom: scaler(60),
          flexGrow: 1,
        }}
        ListHeaderComponent={
          <ListHeaderComponent onSearch={handleSearch} search={search} />
        }
        onEndReachedThreshold={0.5}
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
                <ActivityIndicator
                  color={colors.brandMainPinkRed}
                  size="small"
                />
              </View>
            ) : null}
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray250,
    borderRadius: scaler(8),
    flex: 1,
    marginRight: scaler(12),
    height: scaler(50),
    paddingHorizontal: scaler(12),
    marginHorizontal: scaler(16),
  },
  inputSearch: {
    flex: 1,
    marginLeft: scaler(12),
    height: '100%',
  },
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
