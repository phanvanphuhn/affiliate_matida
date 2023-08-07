import {heightScreen, widthScreen} from '@stylesCommon';
import React, {useEffect, useRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {IDataListFeed} from '../../Feed/type';
import TitleFeed from './TitleFeed';
import {useVideo} from './Container';

interface ItemArticleProps {
  item: IDataListFeed;
  isFocused: boolean;
}
const duration = 10000;
const ItemArticle = (props: ItemArticleProps) => {
  const {state, setState} = useVideo();
  const timeinterval = useRef<any>();
  useEffect(() => {
    if (props.isFocused) {
      timeinterval.current = setInterval(() => {
        setState({progress: (state.progress || 0) + 1000, duration});
      }, 1000);
      setState({feed: props.item});
    } else {
      onReset();
    }
    return onReset;
  }, [props.isFocused]);
  const onReset = () => {
    setState({progress: 0});
    if (timeinterval.current) {
      clearInterval(timeinterval.current);
    }
  };
  useEffect(() => {
    if (state.progress == state.duration) {
      setState({progress: 0});
    }
  }, [state.progress]);
  return (
    <View style={{flex: 1}}>
      <Image
        source={{uri: props.item.image}}
        style={{
          width: widthScreen,
          aspectRatio: widthScreen / (heightScreen - 45),
          resizeMode: 'contain',
        }}
      />
      <TitleFeed item={props.item} />
    </View>
  );
};

export default ItemArticle;

const styles = StyleSheet.create({
  container: {},
});
