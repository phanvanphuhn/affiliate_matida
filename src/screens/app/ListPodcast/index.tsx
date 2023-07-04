import {Header, ItemPodCast, TextInputFilter} from '@component';
import {SvgArrowLeft, SvgIconDelete, SvgSearch} from '@images';
import {useFocusEffect} from '@react-navigation/native';
import {getListPodCast, GlobalService} from '@services';
import {colors, scaler} from '@stylesCommon';
import {t} from 'i18next';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {trackingAppEvent, event, useUXCam} from '@util';
import {ROUTE_NAME} from '@routeName';

interface IFilter {
  search: string;
  Topics: number[];
  Mood: number[];
  Trimester: number | null;
}

export const ListPodcast = () => {
  const [listPodCast, setListPodCast] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [total, setTotal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadMore, setLoadMore] = useState<boolean>(false);

  const loadRef = useRef(false);
  const pageRef = useRef<number>(1);

  const refList = useRef<FlatList>(null);

  useUXCam(ROUTE_NAME.LIST_PODCAST);

  useFocusEffect(
    React.useCallback(() => {
      trackingAppEvent(event.SCREEN.LIST_PODCAST, {});
    }, []),
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      pageRef.current = 1;
      setTimeout(() => {
        refList?.current?.scrollToOffset({animated: true, offset: 0});
      }, 50);
      getDataPodCast();
    }, 400);
    return () => {
      clearTimeout(debounce);
    };
  }, [search]);

  const getDataPodCast = async () => {
    try {
      loadRef.current = false;
      const res = await getListPodCast({
        page: pageRef.current,
        search: search,
      });
      if (pageRef.current === 1) {
        setListPodCast(res?.data?.data);
      } else {
        setListPodCast(listPodCast?.concat(res?.data?.data));
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

  const handleRefresh = () => {
    pageRef.current = 1;
    getDataPodCast();
  };

  const loadMoreData = () => {
    if (listPodCast?.length < total && loadRef.current) {
      setLoadMore(true);
      getDataPodCast();
    }
  };

  return (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      <Header
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
        title={t('podcast.headerList')}
      />
      <View style={{backgroundColor: colors.white}}>
        <View
          style={{paddingHorizontal: scaler(16), paddingBottom: scaler(12)}}>
          {/* <TextInputFilter onPressSave={handleFilter} showFilter={false} /> */}
          <View style={[styles.viewInput, {backgroundColor: '#F6F6F6'}]}>
            <SvgSearch />
            <TextInput
              onChangeText={setSearch}
              value={search}
              style={styles.inputSearch}
              placeholder={t('explore.search') as string}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <SvgIconDelete />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{backgroundColor: colors.gray250, height: '100%'}}>
          {loading ? (
            <View style={styles.viewLoadmore}>
              <ActivityIndicator color={colors.primary} size="small" />
            </View>
          ) : (
            <FlatList
              ref={refList}
              data={listPodCast}
              renderItem={({item}) => (
                <ItemPodCast item={item} onCallBack={getDataPodCast} />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatList}
              keyboardDismissMode="on-drag"
              keyExtractor={_ => _.id.toString()}
              onEndReachedThreshold={0.1}
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
    </View>
  );
};
