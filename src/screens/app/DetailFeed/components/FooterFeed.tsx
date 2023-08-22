import {
  SvgHeart,
  SvgHearted,
  SvgStar,
  ic_comment,
  ic_menu,
  ic_share,
} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors} from '@stylesCommon';
import React, {useCallback, useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useVideo} from './Container';
import Extrapolate = module;
import {
  commentFeedApi,
  getDetailFeedApi,
  likeFeedApi,
} from '../../../../services/feed';

interface FooterFeedProps {}

const FooterFeed = (props: FooterFeedProps) => {
  const {state, setState} = useVideo();

  const getDetail = async () => {
    if (!state.feed) {
      return;
    }
    const res = await getDetailFeedApi(
      state.feed?.content_type,
      state.feed?.id,
    );
    if (res.success) {
      console.log('=>(useCommentFeed.ts:49) res', res);
      setState({
        is_liked: res?.data?.is_liked,
      });
    }
  };

  useEffect(() => {
    getDetail();
  }, [state.feed?.id, state.feed?.content_type]);
  const onLike = async () => {
    try {
      if (!state.feed) {
        return;
      }
      const res = await likeFeedApi(state.feed?.content_type, state.feed?.id);
      if (res.success) {
        console.log('=>(useCommentFeed.ts:49) res', res);
        setState({
          is_liked: res.data?.is_liked,
        });
      }
    } catch (error: any) {}
  };
  const onComment = () => {
    setState({isShowComment: true});
    console.log('=>(FooterFeed.tsx:12) state.feed', state.feed);
  };
  const onRate = () => {
    setState({
      feed: {...state.feed, is_rated: !state.feed?.is_rated},
    });
    console.log('=>(FooterFeed.tsx:12) state.feed', state.feed);
  };
  const onShare = () => {
    console.log('=>(FooterFeed.tsx:12) state.feed', state.feed);
  };
  const onMenu = () => {
    navigate(ROUTE_NAME.MOM_PREP_TEST);
  };
  return (
    <View style={[styles.containerFooter]}>
      <TouchableOpacity onPress={onLike} style={styles.buttonFooter}>
        {state?.is_liked ? <SvgHearted /> : <SvgHeart />}
      </TouchableOpacity>
      <TouchableOpacity onPress={onComment} style={styles.buttonFooter}>
        <Image source={ic_comment} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onRate} style={styles.buttonFooter}>
        {state.feed?.is_rated ? (
          <SvgStar fill={colors.yellow} color={colors.yellow} />
        ) : (
          <SvgStar />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={onShare} style={styles.buttonFooter}>
        <Image source={ic_share} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonFooter} onPress={onMenu}>
        <Image source={ic_menu} />
      </TouchableOpacity>
    </View>
  );
};

export default FooterFeed;

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
