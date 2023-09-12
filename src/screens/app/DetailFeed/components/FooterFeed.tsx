import {SvgHeart, SvgHearted, ic_comment, ic_menu, ic_share} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors} from '@stylesCommon';
import React, {useEffect} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getDetailFeedApi, likeFeedApi} from '../../../../services/feed';
import {useVideo} from './Container';
import Share from 'react-native-share';
import {buildDeepLink} from '@util';
import {DEEP_LINK, GlobalService} from '@services';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {ContentTypeFeed} from '../../Feed/type';
import { event, eventType, trackingAppEvent } from '@util';

interface FooterFeedProps {}

const FooterFeed = (props: FooterFeedProps) => {
  const {state, setState} = useVideo();

  const getDetail = async () => {
    if (!state.feed) {
      return;
    }
    const res = await getDetailFeedApi(
      state.feed?.content_type,
      state.feed?.contentid,
    );
    if (res.success) {
      setState({
        is_liked: res?.data?.is_liked,
        totalComment: res?.data?.total_comments,
        questions: res?.data?.questions || [],
      });
    }
  };

  useEffect(() => {
    getDetail();
  }, [state.feed?.contentid, state.feed?.content_type]);
  const onLike = async () => {
    try {
      if (!state.feed) {
        return;
      }
      const res = await likeFeedApi(
        state.feed?.content_type,
        state.feed?.contentid,
      );
      if (res.success) {
        setState({
          is_liked: res.data?.is_liked,
        });
      }
      switch (state.feed?.content_type) {
        case 'podcast':
          trackingAppEvent(event.FEED.FEED_LIKE_PODCAST, {content_id: state.feed?.contentid}, eventType.MIX_PANEL)
          break;
        case 'video':
          trackingAppEvent(event.FEED.FEED_LIKE_VIDEO, {content_id: state.feed?.contentid}, eventType.MIX_PANEL)
          break;
        default:
          trackingAppEvent(event.FEED.FEED_LIKE_ARTICLE, {content_id: state.feed?.contentid}, eventType.MIX_PANEL)
          break;
      }
    } catch (error: any) {}
  };
  const onComment = () => {
    setState({isShowComment: true});
  };
  const onRate = () => {
    setState({
      feed: {...state.feed, is_rated: !state.feed?.is_rated},
    });
  };
  const getThumbnail = () => {
    let url = '';
    switch (state.feed?.content_type) {
      case 'video':
        url = state.feed?.thumbnail || '';
        break;
      case 'podcast':
      case 'article':
        url = state.feed?.image || '';
        break;
    }
    return url;
  };
  const onShare = async () => {
    try {
      if (!state.feed?.content_type || !state.feed?.contentid) {
        return;
      }
      GlobalService.showLoading();

      const link = await dynamicLinks().buildShortLink(
        {
          link: `${DEEP_LINK}/feed/${state.feed.content_type}/${state.feed.contentid}`,
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
          social: {
            title: state.feed.title,
            imageUrl: getThumbnail(),
          },
        },
        dynamicLinks.ShortLinkType.UNGUESSABLE,
      );
      const shareResponse = await Share.open({
        title: state.feed?.title,
        url: link,
      });
    } catch (error: any) {
    } finally {
      GlobalService.hideLoading();
    }
  };
  const onMenu = () => {
    navigate(ROUTE_NAME.MOM_PREP_TEST);
  };
  return (
    <View style={[styles.containerFooter]}>
      <TouchableOpacity onPress={onLike} style={styles.buttonFooter}>
        {state?.is_liked ? <SvgHearted /> : <SvgHeart />}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onComment}
        style={[
          styles.buttonFooter,
          {flexDirection: 'row', alignItems: 'center'},
        ]}>
        <Image source={ic_comment} />
        {!!state.totalComment && (
          <Text style={{color: colors.white, fontSize: 12, marginLeft: 5}}>
            {state.totalComment}
          </Text>
        )}
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={onRate} style={styles.buttonFooter}>
        {state.feed?.is_rated ? (
          <SvgStar fill={colors.yellow} color={colors.yellow} />
        ) : (
          <SvgStar />
        )}
      </TouchableOpacity> */}
      {state?.feed?.content_type != 'package_quizz' &&
        state?.feed?.content_type != 'daily_quizz' && (
          <TouchableOpacity onPress={onShare} style={styles.buttonFooter}>
            <Image source={ic_share} />
          </TouchableOpacity>
        )}
      <TouchableOpacity style={styles.buttonFooter} onPress={onMenu}>
        <Image source={ic_menu} />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(FooterFeed);

const styles = StyleSheet.create({
  buttonFooter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingTop: 15,
    paddingBottom: 25,
  },
  containerFooter: {
    flexDirection: 'row',
    backgroundColor: '#141414',
    height: '100%',
  },
});
