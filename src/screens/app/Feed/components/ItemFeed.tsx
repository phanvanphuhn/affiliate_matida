import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {iconClock, imageNameAppPink, SvgEye} from '@images';
import {colors, scaler} from '@stylesCommon';
import FastImage from 'react-native-fast-image';
import {IDataListFeed} from '../type';
import {LazyImage} from '@component';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {styles} from '../styles';

interface ItemFeedProps {
  item: IDataListFeed;
  index: number;
  onDetailClick: (index: number, item: IDataListFeed) => void;
}

const ItemFeed = (props: ItemFeedProps) => {
  const [state, setState] = useState();
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state.auth.lang);

  const renderTag = (item: IDataListFeed) => {
    switch (item.content_type) {
      case 'daily_quizz':
        return 'Daily Quiz';
      case 'package_quizz':
        return 'Mom prep test';
      default:
        return item.content_type?.replace(
          /^./,
          item.content_type[0]?.toUpperCase(),
        );
    }
  };
  const getTotalView = (item: IDataListFeed) => {
    let totalView = 0;
    switch (item.content_type) {
      case 'article':
      case 'video':
        totalView = item.views;
        break;
      case 'podcast':
        totalView = item.total_views;
        break;
    }
    return totalView;
  };
  const getThumbnail = (item: IDataListFeed) => {
    let url = '';
    switch (item.content_type) {
      case 'video':
        url = item.thumbnail || '';
        break;
      case 'article':
      case 'podcast':
      case 'package_quizz':
        url = item.image || '';
        break;
    }
    return url;
  };
  return (
    <TouchableOpacity
      onPress={() =>
        props.onDetailClick && props.onDetailClick(props.index, props.item)
      }
      style={styles.itemContainer}>
      <View>
        <View style={styles.tag}>
          <Text style={styles.tagTitle}>{renderTag(props.item)}</Text>
        </View>
        <LazyImage
          source={{
            uri: getThumbnail(props.item),
          }}
          fastImage={true}
          style={styles.image}
        />
        {(props.item.content_type == 'video' ||
          props.item.content_type == 'podcast') && (
          <View style={styles.leftDescription}>
            <Image source={iconClock} />

            <Text style={styles.description} numberOfLines={1}>
              {props.item.durations ? props.item.durations : '0'}{' '}
              {t('feed.min')}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.rightDescription,
            props.item.content_type == 'article'
              ? {
                  left: scaler(8),
                }
              : {
                  right: scaler(8),
                },
          ]}>
          <SvgEye stroke={colors.borderColor} />

          <Text style={styles.description} numberOfLines={1}>
            {getTotalView(props.item)} {t('feed.views')}
          </Text>
        </View>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {props.item.content_type == 'package_quizz'
          ? lang === 1
            ? props.item?.name_en
            : props.item?.name_vi
          : props.item.title}
      </Text>
      <View style={styles.wrapAvatarContainer}>
        <FastImage
          source={props.item.image ? {uri: props.item.image} : imageNameAppPink}
          style={styles.imageAvatar}
          resizeMode="contain"
        />

        <Text style={styles.subTitle}>
          {t('feed.by')}{' '}
          <Text style={{color: colors.success_message}}>
            {props.item.speaker_name ? props.item.speaker_name : 'Matida'}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ItemFeed);
