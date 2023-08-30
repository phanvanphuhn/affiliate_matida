import {EPreRoute} from '@constant';
import {navigate} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {event, trackingAppEvent} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ListRenderItem, View} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from '../styles';
import {IDataListFeed} from '../type';
import DailyQuiz from './dailyQuiz';
import MomPrepTest from './momPrepTest';
import ItemFeed from './ItemFeed';
import useListFeed from '../useListFeed';
import {produce} from 'immer';
import {IAnswer} from '../../MomTest/TestDetail/components';

const ListFeed = (props: any) => {
  const {t} = useTranslation();

  const {state, setState, handleLoadMore, onRefresh} = useListFeed();
  const navigation = useNavigation<any>();
  const lang = useSelector((state: any) => state.auth.lang);

  const onDetailClick = (index: number, item: IDataListFeed) => {
    console.log('=>(ListFeed.tsx:47) item', item);
    if (item?.content_type == 'package_quizz') {
      if (!item?.is_active) {
        return;
      }
      if (+item?.maxScore === +item?.total_questions) {
        trackingAppEvent(event.MOM_TEST.START, {content: item?.id});
        navigate(ROUTE_NAME.TEST_RESULT, {
          id: item?.id,
          redoTest: () => {},
          preRoute: EPreRoute.PERIODIC,
        });
      } else {
        trackingAppEvent(event.MOM_TEST.START, {content: item});
        navigate(ROUTE_NAME.TEST_DETAIL, {
          quiz: item,
          onComplete: (result: any) => {
            if (result.maxScore <= item.maxScore) {
              return;
            }
            const newItem = produce(state.data, (draft: IDataListFeed[]) => {
              draft[index] = {
                ...item,
                maxScore: result.maxScore,
              };
            });
            setState({data: newItem});
          },
        });
      }
    } else {
      navigation.navigate(ROUTE_NAME.DETAIL_FEED, {
        id: item.contentid,
        content_type: item.content_type,
      });
    }
  };

  const renderItem: ListRenderItem<IDataListFeed> = ({item, index}) => {
    if (item.content_type == 'daily_quizz') {
      return <DailyQuiz item={item} index={index} onPress={onDetailClick} />;
    } else if (item.content_type == 'package_quizz') {
      return <MomPrepTest item={item} index={index} onPress={onDetailClick} />;
    }
    return <ItemFeed item={item} onDetailClick={onDetailClick} index={index} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index?.toString()}
        numColumns={2}
        initialNumToRender={4}
        maxToRenderPerBatch={8}
        windowSize={10}
        onRefresh={onRefresh}
        refreshing={state.refreshing}
        removeClippedSubviews
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  );
};

export default ListFeed;
