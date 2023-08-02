import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ic_comment, ic_heart, ic_menu, ic_share, ic_star} from '@images';

interface FooterFeedProps {}

const FooterFeed = (props: FooterFeedProps) => {
  const [state, setState] = useState();
  return (
    <View
      style={[
        styles.containerFooter,
        {
          paddingBottom: useSafeAreaInsets().bottom,
        },
      ]}>
      <TouchableOpacity style={styles.buttonFooter}>
        <Image source={ic_heart} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonFooter}>
        <Image source={ic_comment} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonFooter}>
        <Image source={ic_star} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonFooter}>
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
