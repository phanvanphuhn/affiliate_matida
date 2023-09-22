// import {LazyImage} from '@component';
import {LazyImage} from '@component';
import {EContentType} from '@constant';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useContentViewFeed} from '../../../../util/hooks/useContentViewFeed';
import {IDataListFeed} from '../../Feed/type';
import {heightFullScreen, widthFullScreen} from '../useDetailFeed';
import {useVideo} from './Container';
import DoubleClick from './DoubleClick';
import FooterFeed from './FooterFeed';
import InputItem from './InputItem';
import ListFloatingComment from './ListFloatingComment';
import TitleFeed from './TitleFeed';

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
        {!!props.isFocused && <ListFloatingComment />}
        {!!props.isFocused && <ListFloatingComment item={props?.item} />}
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
  floatingContainer: {
    position: 'absolute',
    top: '40%',
    width: '100%',
  },
});
