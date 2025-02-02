import {EPreRoute} from '@constant';
import {navigate} from '@navigation';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {event, eventType, isShowForReviewer, trackingAppEvent} from '@util';
import React, {useCallback, useRef} from 'react';
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
import {ListPackage} from '../../DetailFeed/components/Container';
import {FLoatingAIButton} from '@component';
import ItemDeal from '../../DetailFeed/components/ItemDeal';

const ListFeed = (props: any) => {
  const {t} = useTranslation();
  const flatlistRef = useRef<FlatList>();
  const {state, setState, onReload, handleLoadMore, onRefresh} = useListFeed();
  const navigation = useNavigation<any>();
  const lang = useSelector((state: any) => state.auth.lang);
  const user = useSelector((state: any) => state?.auth?.userInfo);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (flatlistRef?.current && state?.data?.length) {
  //       flatlistRef.current?.scrollToIndex({index: 0});
  //     }
  //     onRefresh();
  //   }, []),
  // );
  const onDetailClick = (index: number, item: IDataListFeed) => {
    if (item?.content_type == 'package_quizz') {
      if (+item?.maxScore === +item?.total_questions) {
        trackingAppEvent(
          event.MOM_TEST.START,
          {content: item?.id},
          eventType.MIX_PANEL,
        );
        navigate(ROUTE_NAME.TEST_RESULT, {
          id: item?.id,
          redoTest: () => {},
          preRoute: EPreRoute.PERIODIC,
        });
      } else {
        trackingAppEvent(
          event.MOM_TEST.START,
          {content: item},
          eventType.MIX_PANEL,
        );
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
    } else if (item?.content_type == 'deal') {
      trackingAppEvent(
        event.DEAL.CLICK_DEAL,
        {
          params: {
            userId: user.id,
            dealName: item.name_vi,
            dealCode: item.code,
            // providerName: item.provider.name,
          },
        },
        eventType.MIX_PANEL,
      );
      navigation.navigate(ROUTE_NAME.DETAIL_DEAL, {data: item});
    } else {
      trackingAppEvent(
        event.FEED.FEED_OPEN_CONTENT,
        {
          params: {
            id: item.contentid,
            content_type: item.content_type,
          },
        },
        eventType.MIX_PANEL,
      );
      navigation.navigate(ROUTE_NAME.DETAIL_FEED, {
        id: item.contentid,
        content_type: item.content_type,
        is_payment: item.is_payment,
        onComplete: (results: ListPackage[]) => {
          if (results?.length) {
            let newItem = [...state?.data];
            results.forEach(result => {
              let i = state?.data?.findIndex(
                el =>
                  el.contentid == result.id &&
                  el.content_type == result.content_type,
              );

              if (i == -1) {
                return;
              }
              if (result.maxScore <= state?.data?.[i]?.maxScore) {
                return;
              }
              newItem[i] = produce(newItem[i], (draft: IDataListFeed) => {
                draft.maxScore = result.maxScore;
              });
            });
            setState({data: newItem});
          }
        },
      });
    }
  };

  const renderItem: ListRenderItem<IDataListFeed> = ({item, index}) => {
    if (item.content_type == 'daily_quizz') {
      return <DailyQuiz item={item} index={index} onPress={onDetailClick} />;
    } else if (item.content_type == 'package_quizz') {
      return <MomPrepTest item={item} index={index} onPress={onDetailClick} />;
    } else if (item.content_type == 'deal') {
      return (
        <ItemDeal item={item} onDetailClick={onDetailClick} index={index} />
      );
    } else {
      return (
        <ItemFeed item={item} onDetailClick={onDetailClick} index={index} />
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state.data}
        ref={flatlistRef}
        renderItem={renderItem}
        keyExtractor={(item, index) => index?.toString()}
        numColumns={2}
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={10}
        onRefresh={onRefresh}
        refreshing={state.refreshing}
        removeClippedSubviews
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
      {isShowForReviewer(user) && <FLoatingAIButton />}
    </View>
  );
};

export default ListFeed;
