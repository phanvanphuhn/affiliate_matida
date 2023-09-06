import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {stylesCommon, scaler, colors} from '@stylesCommon';
import {Header, HeaderMasterClass} from '@component';
import {SvgArrowLeft, iconSave} from '@images';
import {Item} from './component/Item';
import {getListClass} from '@services';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';
import {event, eventType, trackingAppEvent, useUXCam} from '@util';
import {ROUTE_NAME} from '@routeName';
import {SafeAreaView} from 'react-native-safe-area-context';
import {goBack} from '@navigation';

const ListMasterClass = () => {
  const {t} = useTranslation();

  useFocusEffect(
    React.useCallback(() => {
      trackingAppEvent(event.SCREEN.MASTER_CLASS, {}, eventType.AFF_FLYER);
    }, []),
  );

  useUXCam(ROUTE_NAME.LIST_MASTER_CLASS);

  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadMore, setLoadMore] = useState<boolean>(false);

  const refPage = useRef<number>(1);
  const loadRef = useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      refPage.current = 1;
      getData();
    }, []),
  );

  const getData = async () => {
    try {
      loadRef.current = false;
      const res = await getListClass(refPage.current);
      if (refPage.current === 1) {
        setData(res?.data?.data);
      } else {
        setData(data?.concat(res?.data?.data));
      }
      res?.data?.data?.length && refPage.current++;
      setTotal(res?.data?.total);
    } catch (e) {
    } finally {
      setLoading(false);
      setLoadMore(false);
      loadRef.current = true;
    }
  };

  const renderItem = ({item}: {item: any}) => {
    return <Item item={item} />;
  };

  const loadMoreData = () => {
    if (data?.length < total && loadRef.current) {
      setLoadMore(true);
      getData();
    }
  };

  const handleRefresh = () => {
    refPage.current = 1;
    getData();
  };

  return (
    <View style={styles.container}>
      {/* <Header
        title={t('home.masterClass')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
        // ComponentRight={<Image source={iconSave} />}
      /> */}
      <HeaderMasterClass />

      <View style={styles.viewContent}>
        {loading ? (
          <View style={styles.viewLoadmore}>
            <ActivityIndicator color={colors.primary} size="small" />
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item: any, index: any) => index?.toString()}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.1}
            contentContainerStyle={styles.flatList}
            onEndReached={loadMoreData}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={handleRefresh} />
            }
            ListEmptyComponent={() => {
              return (
                <View style={styles.viewEmpty}>
                  <Text style={styles.textNoData}>{t('data.notFind')}</Text>
                </View>
              );
            }}
            ListFooterComponent={
              <>
                {loadMore === true ? (
                  <View style={styles.viewLoadmore}>
                    <ActivityIndicator color={colors.primary} size="small" />
                  </View>
                ) : null}
              </>
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewContent: {
    flex: 1,
  },
  viewEmpty: {
    alignItems: 'center',
    marginTop: scaler(20),
  },
  textNoData: {
    textAlign: 'center',
    marginBottom: scaler(40),
    marginTop: scaler(24),
    color: colors.borderColor,
    fontStyle: 'italic',
  },
  viewLoadmore: {
    alignItems: 'center',
    marginBottom: scaler(8),
  },
  flatList: {
    flexGrow: 1,
    paddingBottom: scaler(50),
  },
});

export {ListMasterClass};
