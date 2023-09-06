import {Header, ViewButtonChange} from '@component';
import {OPTION_NOTIFICATION} from '@constant';
import {SvgArrowLeft} from '@images';
import {useFocusEffect} from '@react-navigation/native';
import {getListNotification, listNotReadNotification} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {t} from 'i18next';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ItemNotification, ViewButtonHeader} from './components';
import {trackingAppEvent, event, useUXCam, eventType} from '@util';
import {ROUTE_NAME} from '@routeName';

export const NotificationList = () => {
  const [indexButton, setIndexButton] = useState<number>(
    OPTION_NOTIFICATION.ALL,
  );
  const [dataAll, setDataAll] = useState<any[]>([]);
  const [dataUnread, setDataRead] = useState<any[]>([]);

  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [total, setTotal] = useState<number>(0);
  const [totalUnRead, setTotalUnRead] = useState<number>(0);

  const refLoadMore = useRef<boolean>(true);
  const refPageAll = useRef<number>(1);
  const refPageUnread = useRef<number>(1);

  useUXCam(ROUTE_NAME.NOTIFICATION_LIST);

  useFocusEffect(
    React.useCallback(() => {
      trackingAppEvent(event.SCREEN.NOTIFICATION_LIST, {}, eventType.AFF_FLYER);
      refPageAll.current = 1;
      refPageUnread.current = 1;
      getData();
    }, [indexButton]),
  );

  const getData = async () => {
    if (indexButton === OPTION_NOTIFICATION.ALL) {
      await getDataAll();
    } else {
      await getDataUnread();
    }
  };

  const getDataAll = async () => {
    try {
      refLoadMore.current = false;
      setLoading(true);

      const res = await getListNotification(refPageAll.current);
      if (refPageAll.current === 1) {
        setDataAll(res?.data?.data);
      } else {
        setDataAll(dataAll?.concat(res?.data?.data));
      }
      setTotal(res?.data?.total);
      setTotalUnRead(res?.data?.totalNotificationUnread);
      res?.data?.data?.length > 0 && refPageAll.current++;
    } catch (e) {
    } finally {
      setLoadMore(false);
      setLoading(false);
      refLoadMore.current = true;
    }
  };

  const getDataUnread = async () => {
    try {
      refLoadMore.current = false;
      const res = await listNotReadNotification(refPageUnread.current);
      if (refPageUnread.current === 1) {
        setDataRead(res?.data?.data);
      } else {
        setDataRead(dataUnread?.concat(res?.data?.data));
      }
      // setTotal(res?.data?.total);
      setTotalUnRead(res?.data?.total);
      res?.data?.data?.length > 0 && refPageUnread.current++;
    } catch (e) {
    } finally {
      setLoadMore(false);
      setLoading(false);
      refLoadMore.current = true;
    }
  };

  const onRefresh = useCallback(async () => {
    refPageAll.current = 1;
    refPageUnread.current = 1;
    getData();
  }, [indexButton]);

  const handleLoadMore = () => {
    const length =
      indexButton === OPTION_NOTIFICATION.ALL
        ? dataAll?.length
        : dataUnread?.length;

    const totalData =
      indexButton === OPTION_NOTIFICATION.ALL ? total : totalUnRead;
    if (length >= totalData) {
      null;
    } else {
      if (refLoadMore.current) {
        setLoadMore(true);
        getData();
      }
    }
  };

  const handlePressButton = (value: number) => {
    refPageAll.current = 1;
    setIndexButton(value);
  };

  const keyExtractor = useCallback(
    (_: any) => `${indexButton}-${_?.id?.toString()}`,
    [indexButton],
  );

  const getDataFlatList = () => {
    switch (indexButton) {
      case OPTION_NOTIFICATION.ALL:
        return dataAll;
      case OPTION_NOTIFICATION.UNREAD:
        return dataUnread;
      default:
        return [];
    }
  };

  const renderItem = ({item}: {item: any}) => (
    <ItemNotification item={item} onCallBack={onRefresh} />
  );

  const ListEmptyComponent = () => {
    return (
      <>
        {loading ? (
          <View style={styles.viewLoadMore}>
            <ActivityIndicator color={colors.brandMainPinkRed} size="small" />
          </View>
        ) : (
          <View style={styles.viewEmpty}>
            <Text style={styles.txtEmpty}>{'Not data'}</Text>
          </View>
        )}
      </>
    );
  };

  const ListFooterComponent = () => {
    return (
      <>
        {loadMore === true ? (
          <View style={styles.viewLoadMore}>
            <ActivityIndicator color={colors.brandMainPinkRed} size="small" />
          </View>
        ) : null}
      </>
    );
  };

  return (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      <Header
        title={'Notification'}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      <ViewButtonHeader
        indexButton={indexButton}
        onPressButton={handlePressButton}
        totalUnRead={totalUnRead}
      />
      <View>
        <FlatList
          data={getDataFlatList()}
          // key={indexButton.toString()}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{paddingBottom: scaler(220), flexGrow: 1}}
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
          ListEmptyComponent={ListEmptyComponent}
          ListFooterComponent={ListFooterComponent}
        />
      </View>
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
    marginVertical: scaler(16),
    // backgroundColor: colors.backgroundDefault,
  },
});
