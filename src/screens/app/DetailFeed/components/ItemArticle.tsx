// import {LazyImage} from '@component';
import {LazyImage} from '@component';
import {heightScreen, widthScreen} from '@stylesCommon';
import React, {useEffect} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IDataListFeed} from '../../Feed/type';
import {useVideo} from './Container';
import DoubleClick from './DoubleClick';
import TitleFeed from './TitleFeed';
import {useContentView} from '@util';
import {EContentType} from '@constant';
import {useContentViewFeed} from '../../../../util/hooks/useContentViewFeed';
import FooterFeed from './FooterFeed';
import KeyboardShift from './KeyboardShift';
import InputItem from './InputItem';
import {heightFullScreen, widthFullScreen} from '../useDetailFeed';

interface ItemArticleProps {
  item: IDataListFeed;
  isFocused: boolean;
}
const ItemArticle = (props: ItemArticleProps) => {
  const {setState} = useVideo();
  useContentViewFeed(
    props.item.contentid,
    EContentType.ARTICLE,
    props.isFocused,
  );
  useEffect(() => {
    if (props.isFocused) {
      setState({feed: props.item});
    } else {
    }
    return () => {};
  }, [props.isFocused]);
  return (
    <DoubleClick isShowButtonPlay={false}>
      <View style={{flex: 1}}>
        <LazyImage
          source={{
            uri: props.item.image,
          }}
          resizeMode={'cover'}
          fastImage={true}
          style={styles.fullScreen}
        />
        <LinearGradient
          colors={['#00000000', '#00000090']}
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
          }}
        />
        {!!props.isFocused && <FooterFeed item={props.item} />}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          <InputItem />
        </View>
        <TitleFeed item={props.item} />
      </View>
    </DoubleClick>
  );
};

export default React.memo(ItemArticle);

const styles = StyleSheet.create({
  container: {},
  fullScreen: {
    width: widthFullScreen,
    height: heightFullScreen,
  },
});
