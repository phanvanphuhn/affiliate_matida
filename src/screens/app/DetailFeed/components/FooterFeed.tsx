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
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useVideo} from './Container';
import Extrapolate = module;

interface FooterFeedProps {}

const FooterFeed = (props: FooterFeedProps) => {
  const {state, setState} = useVideo();

  const onHearth = () => {
    setState({
      feed: {...state.feed, is_liked: !state.feed?.is_liked},
    });
  };
  const onComment = () => {
    setState({isShowComment: true});
    console.log('=>(FooterFeed.tsx:12) state.feed', state.feed);
  };
  const onRate = () => {
    setState({
      feed: {...state.feed, isRated: !state.feed?.isRated},
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
      <TouchableOpacity onPress={onHearth} style={styles.buttonFooter}>
        {state.feed?.is_liked ? <SvgHearted /> : <SvgHeart />}
      </TouchableOpacity>
      <TouchableOpacity onPress={onComment} style={styles.buttonFooter}>
        <Image source={ic_comment} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onRate} style={styles.buttonFooter}>
        {state.feed?.isRated ? (
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
