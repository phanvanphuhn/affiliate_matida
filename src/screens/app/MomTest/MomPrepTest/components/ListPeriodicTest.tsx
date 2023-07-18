import {useFocusEffect} from '@react-navigation/native';
import {getListPeriodicTest} from '@services';
import {scaler} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../style';
import {ItemPeriodic} from './ItemPeriodic';
import {ViewEmpty} from './ViewEmpty';
import {ViewLoading} from './ViewLoading';

export const ListPeriodicTest = () => {
  const {t} = useTranslation();
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadMore, setLoadMore] = useState<boolean>(false);

  const pageRef = useRef<number>(1);

  useFocusEffect(
    React.useCallback(() => {
      pageRef.current = 1;
      setLoading(true);
      getData();
    }, []),
  );

  const getData = async () => {
    try {
      const res = await getListPeriodicTest(pageRef.current);
      if (pageRef.current === 1) {
        setData(res?.data?.data);
      } else {
        setData(data?.concat(res?.data?.data));
      }
      setTotal(res?.data?.total);
    } catch (e) {
    } finally {
      setLoading(false);
      setLoadMore(false);
    }
  };

  const handleSeeMore = () => {
    pageRef.current++;
    setLoadMore(true);
    getData();
  };

  const renderItem = ({item}: {item: any}) => {
    return <ItemPeriodic item={item} />;
  };

  const ListHeaderComponent = () => {
    return (
      <Text style={[styles.labelPeriodic, {fontSize: scaler(18)}]}>
        {t('test.periodicTests')}
      </Text>
    );
  };

  const ListFooterComponent = () => {
    if (+data?.length < +total) {
      return loadMore ? (
        <ViewLoading />
      ) : (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleSeeMore}
          style={styles.btnSeeMore}>
          <Text style={styles.textSeeMore}>{t('test.seeMore')}</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{paddingBottom: scaler(32), paddingTop: scaler(24)}}>
      <ListHeaderComponent />
      {loading ? (
        <ViewLoading />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(_: any) => _.id}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={<ViewEmpty title={t('test.noDataQuiz')} />}
        />
      )}
    </View>
  );
};
