import {heightScreen, widthScreen} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
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
  const [progress, setProgress] = useState<{
    progress?: number;
    duration?: number;
  }>({
    progress: 0,
    duration: duration,
  });
  const timeinterval = useRef<any>();
  useEffect(() => {
    if (props.isFocused) {
      timeinterval.current = setInterval(() => {
        setProgress(preState => ({
          ...preState,
          progress: (preState.progress || 0) + 1000,
        }));
      }, 1000);
      setState({feed: props.item});
    } else {
      onReset();
    }
    return () => {
      onReset();
    };
  }, [props.isFocused]);
  const onReset = () => {
    setProgress(prevState => ({...prevState, progress: 0}));
    if (timeinterval.current) {
      clearInterval(timeinterval.current);
    }
  };
  useEffect(() => {
    if (progress.progress == progress.duration) {
      setProgress(prevState => ({...prevState, progress: 0}));
    } else {
      setState({progress: progress.progress, duration: progress.duration});
    }
  }, [progress.duration, progress.progress]);
  return (
    <View style={{flex: 1}}>
      <Image
        source={{uri: props.item.image}}
        style={{
          width: widthScreen,
          aspectRatio: widthScreen / (heightScreen - 65),
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
