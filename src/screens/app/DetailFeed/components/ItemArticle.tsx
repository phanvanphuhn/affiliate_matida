// import {LazyImage} from '@component';
import {LazyImage} from '@component';
import {heightScreen, widthScreen} from '@stylesCommon';
import React, {useEffect} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IDataListFeed} from '../../Feed/type';
import {useVideo} from './Container';
import DoubleClick from './DoubleClick';
import TitleFeed from './TitleFeed';
import {useContentView} from '@util';
import {EContentType} from '@constant';
import {useContentViewFeed} from '../../../../util/hooks/useContentViewFeed';

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
      console.log('=>(ItemArticle.tsx:19) props.item', props.item);
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
          style={{
            width: widthScreen,
            aspectRatio: Platform.select({
              android: widthScreen / (heightScreen - 27),
              ios: widthScreen / (heightScreen - 65),
            }),
          }}
        />
        <LinearGradient
          colors={['#00000000', '#00000090']}
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
          }}
        />
        <TitleFeed item={props.item} />
      </View>
    </DoubleClick>
  );
};

export default React.memo(ItemArticle);

const styles = StyleSheet.create({
  container: {},
});
