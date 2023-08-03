import {heightScreen, widthScreen} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {IDataListFeed} from '../../Feed/type';
import SliderFeed from './SliderFeed';
import TitleFeed from './TitleFeed';

interface ItemArticleProps {
  item: IDataListFeed;
  onNext: () => void;
  isFocused: boolean;
}
const ItemArticle = (props: ItemArticleProps) => {
  const [progress, setProgress] = useState<number>(0);
  const duration = 10000;
  const timeinterval = useRef<any>();
  useEffect(() => {
    if (props.isFocused) {
      timeinterval.current = setInterval(() => {
        setProgress(pro => pro + 1000);
      }, 1000);
    } else {
      onReset();
    }
    return onReset;
  }, [props.isFocused]);
  const onReset = () => {
    setProgress(0);
    if (timeinterval.current) {
      clearInterval(timeinterval.current);
    }
  };
  useEffect(() => {
    if (progress == duration) {
      setProgress(0);
    }
  }, [progress]);
  return (
    <View>
      <Image
        source={{uri: props.item.image}}
        style={{
          width: widthScreen,
          aspectRatio: widthScreen / (heightScreen - 65),
          resizeMode: 'contain',
        }}
      />
      <SliderFeed progress={progress} duration={duration} />
      <TitleFeed item={props.item} />
    </View>
  );
};

export default ItemArticle;

const styles = StyleSheet.create({
  container: {},
});
