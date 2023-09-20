import {
  ic_comment,
  ic_eye,
  ic_share,
  SvgHeart,
  SvgHearted,
  SvgStar,
} from '@images';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {DEEP_LINK, GlobalService} from '@services';
import {colors} from '@stylesCommon';
import {event, eventType, trackingAppEvent} from '@util';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Share from 'react-native-share';
import {
  favoriteFeedApi,
  getDetailFeedApi,
  likeFeedApi,
} from '../../../../services/feed';
import {useVideo} from './Container';
import {IDataListFeed} from '../../Feed/type';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface FooterFeedProps {
  item: IDataListFeed;
}

const FooterFeed = (props: FooterFeedProps) => {
  const {state, setState} = useVideo();
  const anim = useSharedValue(0);
  const opacityStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(anim.value, [0, 1], [0, 1], Extrapolation.CLAMP),
    };
  }, []);
  const getDetail = async () => {
    if (!props.item) {
      return;
    }
    const res = await getDetailFeedApi(
      props.item?.content_type,
      props.item?.contentid,
    );
    if (res.success) {
      setState({
        is_liked: res?.data?.is_liked,
        total_likes: res?.data?.total_likes,
        is_favorite: res?.data?.is_favorite,
        total_favorites: res?.data?.total_favorites,
        totalComment: res?.data?.total_comments,
        questions: res?.data?.questions || [],
      });
      anim.value = withTiming(1, {
        duration: 500,
      });
    }
  };

  useEffect(() => {
    getDetail();
  }, [props.item?.contentid, props.item?.content_type]);
  const onLike = async () => {
    try {
      if (!props.item) {
        return;
      }
      const res = await likeFeedApi(
        props.item?.content_type,
        props.item?.contentid,
      );
      if (res.success) {
        setState({
          is_liked: res.data?.is_liked,
        });
      }
      switch (props.item?.content_type) {
        case 'podcast':
          trackingAppEvent(
            event.FEED.FEED_LIKE_PODCAST,
            {content_id: props.item?.contentid},
            eventType.MIX_PANEL,
          );
          break;
        case 'video':
          trackingAppEvent(
            event.FEED.FEED_LIKE_VIDEO,
            {content_id: props.item?.contentid},
            eventType.MIX_PANEL,
          );
          break;
        default:
          trackingAppEvent(
            event.FEED.FEED_LIKE_ARTICLE,
            {content_id: props.item?.contentid},
            eventType.MIX_PANEL,
          );
          break;
      }
    } catch (error: any) {}
  };
  const onComment = () => {
    setState({isShowComment: true});
  };
  const onRate = async () => {
    try {
      if (!props.item) {
        return;
      }
      const res = await favoriteFeedApi(
        props.item?.content_type,
        props.item?.contentid,
      );
      if (res.success) {
        setState({is_favorite: res.data?.is_favorite});
      }
    } catch (error: any) {}
  };
  const getThumbnail = () => {
    let url = '';
    switch (props.item?.content_type) {
      case 'video':
        url = props.item?.thumbnail || '';
        break;
      case 'podcast':
      case 'article':
        url = props.item?.image || '';
        break;
    }
    return url;
  };
  const onShare = async () => {
    try {
      if (!props.item?.content_type || !props.item?.contentid) {
        return;
      }
      GlobalService.showLoading();

      const link = await dynamicLinks().buildShortLink(
        {
          link: `${DEEP_LINK}/feed/${props.item.content_type}/${props.item.contentid}`,
          domainUriPrefix: DEEP_LINK,
          android: {
            packageName: 'com.growth.levers.matida',
            fallbackUrl:
              'https://play.google.com/store/apps/details?id=com.growth.levers.matida',
          },
          ios: {
            bundleId: 'com.growth.levers.matida',
            appStoreId: '1671957732',
            fallbackUrl:
              'https://apps.apple.com/vn/app/matida-app-theo-d%C3%B5i-thai-k%E1%BB%B3/id1671957732?l=vi',
          },
          otherPlatform: {
            fallbackUrl: 'https://www.matida.app/',
          },
          social: {
            title: props.item.title,
            descriptionText: 'Matida - Ứng dụng đồng hành cùng Mẹ bầu hiện đại',
            imageUrl: getThumbnail(),
          },
        },
        dynamicLinks.ShortLinkType.UNGUESSABLE,
      );
      await Share.open({
        title: props.item?.title,
        url: link,
      });
    } catch (error: any) {
    } finally {
      GlobalService.hideLoading();
    }
  };
  // const onMenu = () => {
  //   navigate(ROUTE_NAME.MOM_PREP_TEST);
  // };
  return (
    <Animated.View style={[styles.containerFooter, opacityStyles]}>
      <TouchableOpacity onPress={onComment} style={[styles.buttonFooter]}>
        <Image source={ic_comment} style={{tintColor: colors.white}} />
        {!!state.totalComment && (
          <Text style={styles.textTotal}>{state.totalComment}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        onPress={onLike}
        style={styles.buttonFooter}>
        {state?.is_liked ? (
          <SvgHearted strokeWidth={0.5} />
        ) : (
          <SvgHeart color={colors.white} strokeWidth={0.5} />
        )}
        {!!state.total_likes && (
          <Text style={styles.textTotal}>{state.total_likes}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={onRate} style={styles.buttonFooter}>
        {state?.is_favorite ? (
          <SvgStar
            fill={colors.yellow}
            color={colors.white}
            strokeWidth={0.5}
          />
        ) : (
          <SvgStar color={colors.white} strokeWidth={0.5} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={onShare} style={styles.buttonFooter}>
        <Image source={ic_share} style={{tintColor: colors.white}} />
      </TouchableOpacity>
      <View style={styles.buttonFooter}>
        <Image source={ic_eye} style={{tintColor: colors.white}} />
        {!!props.item?.total_views ||
          (props.item?.views && (
            <Text style={styles.textTotal}>
              {props.item?.total_views || props.item?.views}
            </Text>
          ))}
      </View>
    </Animated.View>
  );
};

export default React.memo(FooterFeed);

const styles = StyleSheet.create({
  textTotal: {color: colors.white, fontSize: 12, marginTop: 5},
  buttonFooter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  containerFooter: {
    position: 'absolute',
    right: 10,
    bottom: 80,
    zIndex: 999,
  },
});
