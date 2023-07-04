import {Header} from '@component';
import {SvgArrowLeft, SvgIconDelete, SvgSearch} from '@images';
import {getListPodCast, getListRecord} from '@services';
import {colors, scaler} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ItemRecord} from './components';
import {styles} from './style';
import {trackingAppEvent, event, useUXCam} from '@util';
import {ROUTE_NAME} from '@routeName';

export const ListRecord = () => {
  const {t} = useTranslation();

  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');
  const [total, setTotal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadMore, setLoadMore] = useState<boolean>(false);

  const refList = useRef<FlatList>(null);
  const loadRef = useRef(false);
  const pageRef = useRef<number>(1);

  useUXCam(ROUTE_NAME.LIST_RECORD);

  useEffect(() => {
    trackingAppEvent(event.SCREEN.LIST_RECORD, {});
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      pageRef.current = 1;
      setTimeout(() => {
        refList?.current?.scrollToOffset({animated: true, offset: 0});
      }, 50);
      getData();
    }, 400);
    return () => {
      clearTimeout(debounce);
    };
  }, [search]);

  const getData = async () => {
    try {
      loadRef.current = false;
      const res = await getListRecord(pageRef.current, search);
      console.log('res?.data?.data: ', res?.data?.data);
      if (pageRef.current === 1) {
        setData(res?.data?.data);
      } else {
        setData(data?.concat(res?.data?.data));
      }
      res?.data?.data?.length && pageRef.current++;
      setTotal(res?.data?.total);
    } catch (error) {
    } finally {
      setLoading(false);
      setLoadMore(false);
      loadRef.current = true;
    }
  };

  const handleLoadMore = () => {
    if (data?.length < total && loadRef.current) {
      setLoadMore(true);
      getData();
    }
  };

  const onRefresh = () => {
    pageRef.current = 1;
    getData();
  };

  const renderItem = ({item}: any) => {
    return <ItemRecord item={item} />;
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('talk.recordedExpert')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      <View style={{paddingHorizontal: scaler(16), paddingBottom: scaler(12)}}>
        {/* <TextInputFilter onPressSave={handleFilter} showFilter={false} /> */}
        <View style={[styles.viewInput, {backgroundColor: '#F6F6F6'}]}>
          <SvgSearch />
          <TextInput
            onChangeText={setSearch}
            value={search}
            style={styles.inputSearch}
            placeholder={t('talk.placeholderSearch') as string}
            editable={!loading}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <SvgIconDelete />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.viewLoadmore}>
            <ActivityIndicator color={colors.primary} size="small" />
          </View>
        ) : (
          <FlatList
            data={data}
            ref={refList}
            renderItem={renderItem}
            keyboardDismissMode="on-drag"
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
                {loadMore === true ? (
                  <View style={styles.viewLoadmore}>
                    <ActivityIndicator color={colors.primary} size="small" />
                  </View>
                ) : null}
              </>
            }
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
            keyExtractor={(item: any) => item.id}
          />
        )}
      </View>
    </View>
  );
};
