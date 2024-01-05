import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import {IDataListFeed} from '../type';
import {LazyImage} from '@component';
import {getThumbnail} from './ItemFeed';
import {Page} from '../../Explore/type';
import {colors, scaler} from '@stylesCommon';
import {SvgArticleExplore, SvgMediaExplore, SvgPodcastExplore} from '@images';
import CustomImageRenderer from '../../DetailFeed/components/CustomImageRenderer';
import RenderHtml from 'react-native-render-html';
import {event, eventType, trackingAppEvent} from '@util';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {EPreRoute} from '@constant';
import {SIZE_DEFAULT} from '../../DetailFeed/useDetailFeed';
import {useNavigation} from '@react-navigation/native';

interface ListSearchFeedProps {
  data: IDataListFeed[];
  refreshing?: boolean;
  onRefresh?: () => void;
}

const ListSearchFeed = (props: ListSearchFeedProps) => {
  const navigation = useNavigation<any>();

  const renderIcon = (item: IDataListFeed) => {
    switch (item.content_type) {
      case 'article':
        return <SvgArticleExplore stroke={colors.red50} />;
      case 'podcast':
        return <SvgPodcastExplore stroke={colors.success_message} />;
      case 'video':
        return <SvgMediaExplore stroke={colors.purple} />;
      default:
        return null;
    }
  };
  const onDetailClick = (index: number, item: IDataListFeed) => {
    if (item?.content_type == 'package_quizz') {
      if (!item?.is_active) {
        return;
      }
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
        navigate(ROUTE_NAME.TEST_DETAIL, {quiz: item});
      }
    } else {
      navigation.navigate(ROUTE_NAME.DETAIL_FEED, {
        id: item.contentid,
        content_type: item.content_type,
      });
    }
  };
  const renderItem: ListRenderItem<IDataListFeed> = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onDetailClick(index, item)}
        style={styles.containerItem}>
        <View style={styles.containerIcon}>{renderIcon(item)}</View>
        <RenderHtml
          source={{
            html: `<div>${item.title}</div>`,
          }}
          baseStyle={styles.txtTitle}
          enableExperimentalMarginCollapsing={true}
          enableExperimentalBRCollapsing={true}
          enableExperimentalGhostLinesPrevention={true}
          defaultTextProps={{
            style: {
              ...styles.txtTitle,
            },
          }}
        />
      </TouchableOpacity>
    );
  };
  const keyExtractor = (item: IDataListFeed) =>
    item.content_type + item.contentid;
  return (
    <View style={styles.container}>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshing={props?.refreshing}
        onRefresh={props?.onRefresh}
      />
    </View>
  );
};

export default ListSearchFeed;

const styles = StyleSheet.create({
  container: {flex: 1},
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaler(16),
  },
  containerIcon: {
    backgroundColor: colors.gray,
    padding: scaler(8),
    borderRadius: scaler(16),
  },
  txtTitle: {
    fontSize: scaler(12),
    marginLeft: scaler(8),
    color: colors.textColor,
    flex: 1,
    lineHeight: scaler(24),
  },
});
