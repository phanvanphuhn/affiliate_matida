import {heightScreen, widthScreen} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
import {IDataListFeed} from '../../Feed/type';
import TitleFeed from './TitleFeed';
import {useVideo} from './Container';
import FastImage from 'react-native-fast-image';
import DoubleClick from './DoubleClick';

interface ItemArticleProps {
  item: IDataListFeed;
  isFocused: boolean;
}
const ItemArticle = (props: ItemArticleProps) => {
  const {setState} = useVideo();
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
