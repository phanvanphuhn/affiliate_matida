import {Header, ItemArticles, TextInputFilter} from '@component';
import {SvgArrowLeft} from '@images';
import {ROUTE_NAME} from '@routeName';
import {getListArticlesFilter, GlobalService} from '@services';
import {colors, scaler} from '@stylesCommon';
import {useUXCam} from '@util';
import {t} from 'i18next';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import {styles} from './styles';
interface IFilter {
  search: string;
  Topics: number[];
  Mood: number[];
  Trimester: number | null;
}

export const DailyReadsScreen = () => {
  const [listArticles, setListArticles] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(true);
  const [filter, setFilter] = useState<IFilter>({
    search: '',
    Topics: [],
    Mood: [],
    Trimester: null,
  });
  const [page, setPage] = useState<number>(1);
  const loadRef = useRef(true);

  const refList = useRef<FlatList>(null);

  useUXCam(ROUTE_NAME.DAILY_READS);

  useEffect(() => {
    if (refreshing) {
      getDataArticles(
        filter.search,
        filter.Topics,
        filter.Mood,
        filter.Trimester,
      );
    }
  }, [refreshing]);

  const getDataArticles = async (
    value: string = '',
    topic: number[],
    mood: number[],
    trimester: number | null = null,
  ) => {
    try {
      loadRef.current = true;
      const res = await getListArticlesFilter({
        page: page,
        size: 10,
        search: value,
        topic: topic,
        mood: mood,
        trimester: trimester,
      });
      if (res?.data?.data.length) {
        listArticles.length > 0
          ? setListArticles([...listArticles, ...res?.data?.data])
          : setListArticles([...res?.data?.data]);
        setPage(page + 1);
      }
    } catch (error) {
    } finally {
      setRefreshing(false);
      loadRef.current = false;
    }
  };

  const getDataArticlesFilter = async (
    value: string = '',
    topic: number[],
    mood: number[],
    trimester: number | null = null,
  ) => {
    try {
      GlobalService.showLoading();
      const res = await getListArticlesFilter({
        page: 1,
        size: 10,
        search: value,
        topic: topic,
        mood: mood,
        trimester: trimester,
      });
      setListArticles([...res?.data?.data]);
      if (res?.data?.data) {
        setPage(page + 1);
      }
    } catch (error) {
    } finally {
      GlobalService.hideLoading();
      setRefreshing(false);
    }
  };

  const handleFilter = (values: any) => {
    const {Mood, Topics, search, Trimester} = values;
    setFilter({...values});

    getDataArticlesFilter(search, Topics, Mood, Trimester);
    setTimeout(() => {
      refList?.current?.scrollToOffset({animated: true, offset: 0});
    }, 50);
  };

  const handleRefresh = () => {
    setListArticles([]);
    setPage(1);
    setRefreshing(true);
  };

  const loadMoreData = () => {
    if (!loadRef.current) {
      getDataArticles(
        filter.search,
        filter.Topics,
        filter.Mood,
        filter.Trimester,
      );
    }
  };
  return (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      <Header
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
        title={t('explore.dailyReads')}
      />
      <View style={{paddingHorizontal: scaler(20), paddingTop: scaler(40)}}>
        <TextInputFilter onPressSave={handleFilter} />
        <Text style={styles.textTitle}>{t('explore.dailyReads')}</Text>
        {!refreshing && listArticles.length === 0 && (
          <Text style={styles.textNoData}>{t('data.notFind')}</Text>
        )}
        <FlatList
          ref={refList}
          data={listArticles}
          renderItem={({item}) => <ItemArticles item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          // keyExtractor={_ => _.id.toString()}
          onEndReachedThreshold={0.1}
          onEndReached={loadMoreData}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>
    </View>
  );
};
