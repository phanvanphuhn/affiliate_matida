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
const duration = 10000;
const ItemArticle = (props: ItemArticleProps) => {
  console.log('=>(ItemArticle.tsx:47) props', props);
  const {setState} = useVideo();
  useEffect(() => {
    if (props.isFocused) {
      setState({feed: props.item});
    } else {
    }
    return () => {};
  }, [props.isFocused]);
  return (
    <DoubleClick
      isShowButtonPlay={false}
      onDoubleClick={() => {
        console.log('=>(ItemVideo.tsx:148) onDoubleClick');
      }}>
      <View style={{flex: 1}}>
        <FastImage
          source={{uri: props.item.image}}
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
