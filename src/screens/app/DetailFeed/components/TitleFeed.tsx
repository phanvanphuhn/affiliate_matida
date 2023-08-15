import React, {ReactNode, useCallback, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  ActivityIndicator,
  Image,
} from 'react-native';
import {colors, heightScreen, scaler, widthScreen} from '@stylesCommon';
import {IDataListFeed} from '../../Feed/type';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useVideo} from './Container';
import Description from './Description';
import RenderHtml, {
  CustomBlockRenderer,
  IMGElementContainer,
  IMGElementContentError,
  TNodeChildrenRenderer,
  useIMGElementProps,
  useIMGElementState,
} from 'react-native-render-html';
import clip from './clip';
import CustomImageRenderer from './CustomImageRenderer';

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

  if (state.isShowComment) {
    return null;
  }

  const getFullDescription = () => {
    let description = '';
    switch (props.item.content_type) {
      case 'article':
        description = props.item.content;
        break;
      case 'video':
        description = props.item.description;
        break;
      case 'podcast':
        description = props.item.desc;
        break;
    }
    return description;
  };
  const getDescription = (length: number) => {
    return clip(getFullDescription(), length, {
      html: true,
    });
  };
  return (
    <View
      style={[
        styles.container,
        textShown
          ? {
              top: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              paddingTop: insets.top + scaler(170),
            }
          : {},
      ]}>
      <View style={{}}>
        <Text style={styles.title}>{props.item.title}</Text>
        {!!getFullDescription() && (
          <ScrollView
            style={{maxHeight: '100%'}}
            showsVerticalScrollIndicator={false}
            scrollEnabled={textShown}>
            <RenderHtml
              contentWidth={100}
              renderers={{
                img: CustomImageRenderer,
              }}
              source={{
                html: `<div>${
                  textShown ? getFullDescription() : getDescription(150)
                }</div>`,
              }}
              baseStyle={styles.description}
              defaultTextProps={{
                // numberOfLines: textShown ? undefined : 4,
                // onTextLayout: onTextLayout,
                style: styles.description,
              }}
            />
          </ScrollView>
        )}
      </View>
      {getDescription(150)?.length < getFullDescription()?.length ? (
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
