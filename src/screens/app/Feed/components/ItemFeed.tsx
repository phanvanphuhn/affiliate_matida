import {LazyImage} from '@component';
import {SvgEye, iconClock, imageNameAppPink} from '@images';
import {colors, scaler} from '@stylesCommon';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {styles} from '../styles';
import {IDataListFeed} from '../type';

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
        return t('feed.momPrepTest');
      case 'article':
        return 'Articles';
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
        url = item.thumbnails ? item.thumbnails['3x4'] : item.thumbnail || '';
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
              {props.item.durationsString ? props.item.durationsString : '0'}{' '}
              {t('feed.min')}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.rightDescription,
            props.item.content_type == 'article'
              ? {
                  left: scaler(2),
                }
              : {
                  right: scaler(2),
                },
          ]}>
          <SvgEye stroke={colors.borderColor} />

          <Text style={styles.description} numberOfLines={1}>
            {getTotalView(props.item)} {t('feed.views')}
          </Text>
        </View>
      </View>
      <View style={{height: scaler(48)}}>
        <Text style={styles.title} numberOfLines={2}>
          {props.item.content_type == 'package_quizz'
            ? lang === 1
              ? props.item?.name_en
              : props.item?.name_vi
            : props.item.title}
        </Text>
      </View>
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
