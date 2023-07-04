import {useFocusEffect} from '@react-navigation/native';
import {getListHistoryTest} from '@services';
import {scaler} from '@stylesCommon';
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Text, View} from 'react-native';
import {styles} from '../style';
import {ItemHistory} from './ItemHistory';
import {ViewEmpty} from './ViewEmpty';
import {ViewLoading} from './ViewLoading';

export type HistoryRef = {
  onLoadMore: () => void;
};

export const ListHistoryTest = forwardRef<HistoryRef, any>((_, ref) => {
  const {t} = useTranslation();

  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadMore, setLoadMore] = useState<boolean>(false);

  const pageRef = useRef<number>(1);
  const loadMoreRef = useRef<boolean>(false);

  useImperativeHandle(
    ref,
    () => ({
      onLoadMore,
    }),
    [],
  );

  useFocusEffect(
    React.useCallback(() => {
      pageRef.current = 1;
      // setLoading(true);
      getData();
    }, []),
  );

  const getData = async () => {
    try {
      loadMoreRef.current = false;
      const res = await getListHistoryTest(pageRef.current);
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
      loadMoreRef.current = true;
    }
  };

  const onLoadMore = () => {
    if (+data?.length < +total && loadMoreRef.current) {
      pageRef.current++;
      setLoadMore(true);
      getData();
    }
  };

  const renderItem = ({item}: {item: any}) => {
    return <ItemHistory item={item} />;
  };

  const ListHeaderComponent = () => {
    return (
      <Text style={[styles.labelPeriodic, {fontSize: scaler(18)}]}>
        {t('test.yourTestHistory')}
      </Text>
    );
  };

  const ListFooterComponent = () => {
    return loadMore ? <ViewLoading /> : null;
  };

  return (
    <View>
      <ListHeaderComponent />
      {loading ? (
        <ViewLoading />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(_: any) => _.id}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={<ViewEmpty />}
        />
      )}
    </View>
  );
});
