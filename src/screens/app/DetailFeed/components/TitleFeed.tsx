import React, {useCallback, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
} from 'react-native';
import {colors, heightScreen, scaler} from '@stylesCommon';
import {IDataListFeed} from '../../Feed/type';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useVideo} from './Container';
import Description from './Description';
import RenderHtml from 'react-native-render-html';

interface TitleFeedProps {
  item: IDataListFeed;
}
const TitleFeed = (props: TitleFeedProps) => {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const insets = useSafeAreaInsets();
  const {state} = useVideo();
  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e: NativeSyntheticEvent<any>) => {
    setLengthMore(e.nativeEvent.lines.length >= 4);
  }, []);
  if (state.isShowComment) {
    return null;
  }

  const getDescription = () => {
    let description = '';
    switch (props.item.content_type) {
      case 'article':
        description = props.item.content;
        break;
      case 'video':
        description = props.item.description;
      case 'podcast':
        description = props.item.desc;
        break;
    }
    return description?.replace(/<[^>]+>/g, '');
  };
  return (
    <View
      style={[
        styles.container,
        textShown
          ? {
              top: 0,
              bottom: 0,
              backgroundColor: '#00000099',
              paddingTop: insets.top + scaler(170),
            }
          : {},
      ]}>
      <View style={{}}>
        <Text style={styles.title}>{props.item.title}</Text>
        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
          <RenderHtml
            contentWidth={100}
            source={{html: `<div>${getDescription()}</div>`}}
            baseStyle={styles.description}
            defaultTextProps={{
              numberOfLines: textShown ? undefined : 4,
              onTextLayout: onTextLayout,
              style: styles.description,
            }}
          />
        </ScrollView>
      </View>
      {lengthMore ? (
        <Text onPress={toggleNumberOfLines} style={styles.showMore}>
          {textShown ? 'See less' : 'See more'}
        </Text>
      ) : null}
    </View>
  );
};

export default TitleFeed;

const styles = StyleSheet.create({
  description: {
    fontSize: 12,
    color: colors.white,
    lineHeight: 16,
  },
  showMore: {
    lineHeight: 21,
    marginTop: 10,
    color: colors.white,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '600',
    paddingBottom: 10,
  },
  container: {
    position: 'absolute',
    paddingBottom: 30,
    bottom: 0,
    padding: 16,
    maxHeight: heightScreen,
    justifyContent: 'flex-end',
  },
});
