import {EContentType} from '@constant';
import {heightScreen, widthScreen} from '@stylesCommon';
import {useContentView} from '@util';
import React, {useEffect} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {IDataListFeed} from '../../Feed/type';
import {useVideo} from './Container';
import DoubleClick from './DoubleClick';
import TitleFeed from './TitleFeed';

interface ItemArticleProps {
  item: IDataListFeed;
  isFocused: boolean;
}
const ItemArticle = (props: ItemArticleProps) => {
  const {setState} = useVideo();
  useContentView(props.item.id, EContentType.ARTICLE);
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
        <FastImage
          source={{
            uri: props.item.image,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={'contain'}
          style={{
            width: widthScreen,
            aspectRatio: Platform.select({
              android: widthScreen / (heightScreen - 27),
              ios: widthScreen / (heightScreen - 65),
            }),
          }}
        />
        <TitleFeed item={props.item} />
      </View>
    </DoubleClick>
  );
};

export default ItemArticle;

const styles = StyleSheet.create({
  container: {},
});
