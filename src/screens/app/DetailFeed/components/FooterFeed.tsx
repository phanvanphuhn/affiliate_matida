import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ic_comment,
  ic_heart,
  ic_menu,
  ic_share,
  ic_star,
  SvgHeart,
  SvgHearted,
} from '@images';
import {useVideo} from './Container';

interface FooterFeedProps {}

const FooterFeed = (props: FooterFeedProps) => {
  const {state, setState} = useVideo();
  const onHearth = () => {
    setState({
      feed: {...state.feed, is_liked: !state.feed?.is_liked},
    });
  };
  const onComment = () => {
    // setState({isShowComment: true});
    console.log('=>(FooterFeed.tsx:12) state.feed', state.feed);
  };
  const onRate = () => {
    console.log('=>(FooterFeed.tsx:12) state.feed', state.feed);
  };
  const onShare = () => {
    console.log('=>(FooterFeed.tsx:12) state.feed', state.feed);
  };
  return (
    <View
      style={[
        styles.containerFooter,
        {
          paddingBottom: useSafeAreaInsets().bottom,
        },
      ]}>
      <TouchableOpacity onPress={onHearth} style={styles.buttonFooter}>
        {state.feed?.is_liked ? <SvgHearted /> : <SvgHeart />}
      </TouchableOpacity>
      <TouchableOpacity onPress={onComment} style={styles.buttonFooter}>
        <Image source={ic_comment} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onRate} style={styles.buttonFooter}>
        <Image source={ic_star} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onShare} style={styles.buttonFooter}>
        <Image source={ic_share} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonFooter}>
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
  },
  containerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#141414',
    paddingTop: 15,
  },
});
