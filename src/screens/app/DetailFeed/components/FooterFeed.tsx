import {SvgHeart, SvgHearted, ic_comment, ic_menu} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors} from '@stylesCommon';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getDetailFeedApi, likeFeedApi} from '../../../../services/feed';
import {useVideo} from './Container';

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
  const onShare = () => {};
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
      {/* <TouchableOpacity onPress={onShare} style={styles.buttonFooter}>
        <Image source={ic_share} />
      </TouchableOpacity> */}
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
