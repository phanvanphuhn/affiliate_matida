import {LazyImage} from '@component';
import {
  LogoApp,
  SvgEye,
  iconClock,
  iconCrown,
  iconCrownWhite,
  iconFlowerWhite,
} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {styles} from '../styles';
import {IDataListFeed} from '../type';
import useCheckPregnancy from '@util/hooks/useCheckPregnancy';
import LinearGradient from 'react-native-linear-gradient';
import {event, eventType, trackingAppEvent} from '@util';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';

interface ItemFeedProps {
  item: IDataListFeed;
  index: number;
  onDetailClick: (index: number, item: IDataListFeed) => void;
}

const ItemFeed = (props: ItemFeedProps) => {
  const [state, setState] = useState();
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state.auth.lang);
  const checkPlan = useCheckPregnancy();
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const navigation = useNavigation<any>();

  const renderTag = (item: IDataListFeed) => {
    switch (item.content_type) {
      case 'daily_quizz':
        return t('feed.dailyQuiz');
      case 'package_quizz':
        return t('feed.momPrepTest');
      case 'article':
        return t('feed.article');
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
        url = item.thumbnails ? item.thumbnails['3x4'] : item.image || '';
        break;
    }
    return url;
  };
  return (
    <TouchableOpacity
      onPress={() => {
        if (Number(props.item.is_payment) == 1) {
          if (user?.user_subscriptions?.some(e => e.code == 'PP')) {
            props.onDetailClick && props.onDetailClick(props.index, props.item);
          } else {
            navigation.navigate(ROUTE_NAME.NEW_USER_PROGRAM);
          }
        } else {
          props.onDetailClick && props.onDetailClick(props.index, props.item);
        }
      }}
      style={styles.itemContainer}>
      <View>
        {user?.user_subscriptions?.some(e => e.code == 'PP')
          ? null
          : Number(props.item.is_payment) == 1 && (
              <View style={[styles.tag, {left: scaler(6)}]}>
                <Image
                  source={iconFlowerWhite}
                  style={{
                    height: scaler(20),
                    width: scaler(20),
                    // marginRight: scaler(8),
                  }}
                />
              </View>
            )}
        <View
          style={[
            styles.tag,
            {
              backgroundColor: colors.white,
              paddingVertical: scaler(2),
              paddingHorizontal: scaler(4),
            },
          ]}>
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
              {props.item.durationsString ? props.item.durationsString : '0'}
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
        {user?.user_subscriptions?.some(e => e.code == 'PP')
          ? null
          : Number(props.item.is_payment) == 1 && (
              <LinearGradient
                colors={['#0006', '#00000090']}
                style={{
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: scaler(8),
                  borderTopRightRadius: scaler(8),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: scaler(8),
                    paddingHorizontal: scaler(12),
                    backgroundColor: colors.pink4,
                    borderRadius: scaler(24),
                  }}>
                  <Image
                    source={iconCrownWhite}
                    style={{
                      height: scaler(24),
                      width: scaler(24),
                      marginRight: scaler(8),
                    }}
                  />
                  <Text
                    style={{
                      ...stylesCommon.fontSarabun600,
                      fontSize: scaler(13),
                      color: colors.white,
                    }}>
                    {t('myPurchases.signUpNow')}
                  </Text>
                </View>
              </LinearGradient>
            )}
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
          source={LogoApp}
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
