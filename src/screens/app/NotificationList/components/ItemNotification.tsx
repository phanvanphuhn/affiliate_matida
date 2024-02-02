import {AppImage, AppTextUrl} from '@component';
import {ETypeRedirectBroadcast, EVideoType, OptionComparison} from '@constant';
import {avatarDefault, LogoApp} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {readNotification} from '@services';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {NOTIFICATION} from '@util';
import moment from 'moment';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {useSelector} from 'react-redux';
import {systemFonts, tagsStyles} from './settingHTML';
type Props = {
  item: any;
  onCallBack: () => void;
};

// const regex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
export const ItemNotification = ({item, onCallBack}: Props) => {
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const lang = useSelector((state: any) => state?.auth?.lang);
  const {t} = useTranslation();
  const isNotificationUser = !!item?.sender;
  const title = lang === 1 ? item?.title_en : item?.title_vi;
  const body = lang === 1 ? item?.body_en : item?.body_vi;

  const getTimeFormNow = (date: string) => {
    if (date) {
      const time = moment()?.diff(moment(date, 'YYYY/MM/DD hh:mm:ss'));
      const duration = moment?.duration(time);

      const year = Math.floor(+duration?.asYears());
      const days = Math.floor(+duration?.asDays());
      const hours = Math.floor(+duration?.asHours());
      const minutes = Math.floor(+duration?.asMinutes());

      if (year > 0) {
        return moment(date, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY');
      } else {
        if (days > 0 && days <= 366) {
          return moment(date, 'YYYY/MM/DD hh:mm:ss').format('DD/MM');
        } else {
          if (hours > 0 && hours < 24) {
            return `${hours}${t('chat.hour')}`;
          } else {
            if (minutes > 0 && minutes <= 60) {
              return `${minutes}${t('chat.minutes')}`;
            } else {
              return t('chat.justDone');
            }
          }
        }
      }
    }
    return '';
  };

  const handlePress = async () => {
    try {
      await readNotification(item?.id);
      onCallBack();
    } catch (e) {
    } finally {
      switch (item?.type) {
        case NOTIFICATION.BROAD_CAST:
          handleNotificationBroadCast();
          break;
        case NOTIFICATION.LIKE:
          handleNotificationLike();
          break;
        case NOTIFICATION.REPLY_COMMENT:
        case NOTIFICATION.COMMENT:
          handleNotificationComment();
          break;
        case NOTIFICATION.CHECKUP:
          handleNotificationCheckUp();
          break;
        case NOTIFICATION.LIST_ARTICLE:
          handleNotificationArticle();
          break;

        case NOTIFICATION.REQUEST_TO_ROOM:
        case NOTIFICATION.REMINDER_ROOM:
        case NOTIFICATION.INVITE_TO_ROOM:
        case NOTIFICATION.CREATE_NEW_TALK:
          handleNotificationRoom();
          break;
        default:
          return;
      }
    }
  };

  const handleNotificationBroadCast = () => {
    switch (+item?.model_type) {
      case ETypeRedirectBroadcast.PODCAST:
      case ETypeRedirectBroadcast.VIDEO:
      case ETypeRedirectBroadcast.ARTICLE:
        handleNavigateToDetailFeed();
        break;
      case ETypeRedirectBroadcast.ROOM:
        handleCreateNewTalk();
        break;
      case ETypeRedirectBroadcast.RECORD_ROOM:
        handleBroadCastVideo(true);
        break;
      default:
        break;
    }
  };

  const handleNavigateToDetailFeed = () => {
    let contentType = '';
    switch (item.model_type) {
      case 1:
        contentType = 'podcast';
      case 2:
        contentType = 'video';
      case 4:
        contentType = 'article';
    }
    if (item) {
      navigate(ROUTE_NAME.DETAIL_FEED, {
        id: item?.model_id,
        content_type: contentType,
      });
    }
  };

  const handleBroadCastArticle = () => {
    if (item) {
      navigate(ROUTE_NAME.DETAIL_ARTICLE, {
        article: {id: +item?.table_id, trimester: [], topic: [], mood: []},
      });
    }
  };

  const handleCreateNewTalk = () => {
    if (item) {
      navigate(ROUTE_NAME.DETAIL_MEETING_ROOM, {id: +item?.table_id});
    }
  };

  const handleBroadCastPodCast = () => {
    if (item) {
      navigate(ROUTE_NAME.DETAIL_PODCAST, {
        podcast: {id: +item?.table_id, trimester: [], topic: []},
      });
    }
  };

  const handleBroadCastVideo = (record: boolean) => {
    if (item) {
      navigate(ROUTE_NAME.DETAIL_VIDEO, {
        id: item?.table_id,
        type: record ? EVideoType.RECORD : EVideoType.VIDEO,
        // url: item?.link,
        // isRecord: isRecord,
        // item: item,
      });
    }
  };

  const handleNotificationRoom = () => {
    const obj = JSON.parse(item?.data_json);
    navigate(ROUTE_NAME.DETAIL_MEETING_ROOM, {id: +obj?.room_id});
  };

  const handleNotificationArticle = () => {
    const dataJson = JSON.parse(item.data_json) as {week: string};
    const week = parseInt(dataJson.week, 10);
    navigate(ROUTE_NAME.SIZE_COMPARISON, {
      option: 1,
      week: week,
    });
  };

  const handleNotificationCheckUp = () => {
    // navigate(ROUTE_NAME.TIME_LINE);
    const dataJson = JSON.parse(item.data_json) as {week: string};
    const week = parseInt(dataJson.week, 10);
    navigate(ROUTE_NAME.SIZE_COMPARISON, {
      option: 1,
    });
  };

  const handleNotificationLike = () => {
    if (item?.table_id) {
      navigate(ROUTE_NAME.DETAIL_NEWFEED, {id: +item?.table_id});
    }
  };

  const handleNotificationComment = () => {
    if (item?.table_id) {
      navigate(ROUTE_NAME.DETAIL_NEWFEED, {id: +item?.table_id});
    }
  };

  const getContentNotification = () => {
    switch (+item?.type) {
      case NOTIFICATION.LIKE:
        return (
          <>
            <Text numberOfLines={3} style={styles.textBody}>
              <Text
                style={{...stylesCommon.fontWeight600, color: colors.black}}>
                {isNotificationUser ? `${item?.sender?.name} ` : 'Matida '}
              </Text>
              {`${title} ${item?.suffix_noti ? `"${item?.suffix_noti}"` : ''}`}
            </Text>
          </>
        );
      case NOTIFICATION.REPLY_COMMENT:
      case NOTIFICATION.COMMENT:
        return (
          <>
            <Text numberOfLines={2} style={styles.textBody}>
              {title}
              <Text
                style={{...stylesCommon.fontWeight600, color: colors.black}}>
                {isNotificationUser ? ` ${item?.sender?.name} ` : ' Matida '}
              </Text>
            </Text>
            <Text style={styles.textBody} numberOfLines={3}>
              <Text
                style={{...stylesCommon.fontWeight600, color: colors.black}}>
                {item?.prefix_noti}
              </Text>
              {` ${body} ${item?.suffix_noti ? `"${item?.suffix_noti}"` : ''}`}
            </Text>
          </>
        );

      case NOTIFICATION.BROAD_CAST:
        return (
          <>
            <Text numberOfLines={2} style={styles.textBody}>
              <Text
                style={{...stylesCommon.fontWeight600, color: colors.black}}>
                {isNotificationUser ? ` ${item?.sender?.name} ` : ' Matida '}
              </Text>
              {title}
            </Text>
            <Text numberOfLines={4}>
              <Text
                style={[
                  styles.textBody,
                  {...stylesCommon.fontWeight600, color: colors.black},
                ]}>
                {item?.prefix_noti}
              </Text>
              <AppTextUrl
                color={colors.primary}
                onCallback={handlePress}
                style={styles.textBody}>
                {` ${body} ${
                  item?.suffix_noti ? `"${item?.suffix_noti}"` : ''
                }`}
              </AppTextUrl>
            </Text>
          </>
        );
      default:
        return (
          <>
            <Text numberOfLines={2} style={styles.textBody}>
              <Text
                style={{...stylesCommon.fontWeight600, color: colors.black}}>
                {isNotificationUser ? `${item?.sender?.name} ` : 'Matida '}
              </Text>
              {title}
            </Text>
            <RenderHtml
              contentWidth={scaler(236)}
              systemFonts={systemFonts}
              tagsStyles={{...tagsStyles}}
              source={{
                html: body,
              }}
              enableExperimentalMarginCollapsing={true}
              enableExperimentalBRCollapsing={true}
              enableExperimentalGhostLinesPrevention={true}
              // enableExperimentalPercentWidth={true}
              renderersProps={{
                img: {
                  enableExperimentalPercentWidth: true,
                },
              }}
            />
          </>
        );
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      style={{
        flexDirection: 'row',
        paddingVertical: scaler(16),
        borderTopWidth: scaler(1),
        borderColor: '#E6EEFF',
        paddingHorizontal: scaler(20),
        backgroundColor: item?.is_read ? colors.white : colors.gray250,
      }}>
      {isNotificationUser && <></>}
      {item?.sender?.avatar ? (
        <AppImage user style={styles.image} uri={item?.sender?.avatar} />
      ) : (
        <Image source={LogoApp} style={styles.image} />
      )}
      <View style={{flex: 1, marginHorizontal: scaler(12)}}>
        {getContentNotification()}

        {/* <Text numberOfLines={1} style={styles.textBody}>
          {getFirstTextElementHTML(body)}
        </Text> */}
      </View>

      <Text
        style={{
          color: colors.textSmallColor,
          fontSize: scaler(12),
          ...stylesCommon.fontWeight400,
        }}>
        {getTimeFormNow(item?.created_at)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: scaler(40),
    height: scaler(40),
    borderRadius: scaler(6),
  },
  textBody: {
    ...stylesCommon.fontWeight400,
    color: colors.gray200,
    fontSize: scaler(14),
    lineHeight: 21,
  },
});
