import {LogoApp} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import RenderHtml from 'react-native-render-html';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IDataListFeed} from '../../Feed/type';
import {heightFullScreen} from '../useDetailFeed';
import {useVideo} from './Container';
import CustomImageRenderer from './CustomImageRenderer';
import clip from './clip';
import {tagsStyles} from './settingsHtml';
import {event, eventType, openUrl, trackingAppEvent} from '@util';
import {useSelector} from 'react-redux';

interface TitleFeedProps {
  item: IDataListFeed;
}
const TitleFeed = (props: TitleFeedProps) => {
  const {t} = useTranslation();
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const navigation = useNavigation<any>();
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const insets = useSafeAreaInsets();
  const {state, setState} = useVideo();
  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };
  useEffect(() => {
    if (state.feed) {
      setTextShown(false);
    }
  }, [state.feed]);

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

  const renderersProps = {
    a: {
      onPress(url, htmlAttribs, target, href) {
        trackingAppEvent(
          event.FEED.FEED_CLICK_LINK_IN_CONTENT,
          {
            params: {
              userId: user.id,
              contentId: props.item.id,
              url: htmlAttribs,
            },
          },
          eventType.MIX_PANEL,
        );
        Linking.canOpenURL(htmlAttribs).then(supported => {
          if (supported) {
            Linking.openURL(htmlAttribs);
          } else {
            return;
          }
        });
      },
    },
  };

  const onPressExpertContainer = (item: IDataListFeed) => {
    navigation.navigate(ROUTE_NAME.DETAIL_USER, {
      id: item?.expert_id,
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
              paddingTop: insets.top + scaler(170),
            }
          : {marginRight: 25},
      ]}>
      {!!textShown && (
        <TouchableWithoutFeedback onPress={() => setTextShown(false)}>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              ...StyleSheet.absoluteFillObject,
            }}
          />
        </TouchableWithoutFeedback>
      )}
      <View
        style={{
          padding: 16,
          backgroundColor: textShown ? colors.white : 'transparent',
          paddingBottom: 30,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>
        <Text style={[styles.title, textShown ? styles.colorWhite : {}]}>
          {props.item.title}
        </Text>
        <TouchableOpacity
          style={styles.wrapAvatarContainer}
          onPress={() => onPressExpertContainer(props.item)}
          disabled={props.item.expert_id ? false : true}>
          <FastImage
            source={
              props.item.expert_image ? {uri: props.item.expert_image} : LogoApp
            }
            style={styles.imageAvatar}
            resizeMode="contain"
          />
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <Text style={styles.subTitle}>{t('feed.by')}</Text>
            <Text
              style={[
                {
                  color: colors.success_message,
                  marginLeft: 8,
                  flex: 1,
                },
                textShown
                  ? {}
                  : {
                      paddingRight: 20,
                    },
              ]}>
              {props.item.expert_name ? props.item.expert_name : 'Matida'}
            </Text>
          </View>
        </TouchableOpacity>
        {!!getFullDescription() && (
          <ScrollView
            style={{maxHeight: '100%'}}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            scrollEnabled={textShown}>
            <TouchableWithoutFeedback>
              <View>
                <RenderHtml
                  contentWidth={100}
                  renderers={{
                    img: CustomImageRenderer,
                  }}
                  renderersProps={renderersProps}
                  source={{
                    html: `<div>${
                      textShown ? getFullDescription() : getDescription(150)
                    }</div>`,
                  }}
                  baseStyle={styles.description}
                  enableExperimentalMarginCollapsing={true}
                  enableExperimentalBRCollapsing={true}
                  enableExperimentalGhostLinesPrevention={true}
                  defaultTextProps={{
                    // numberOfLines: textShown ? undefined : 4,
                    // onTextLayout: onTextLayout,
                    style: {
                      ...styles.description,
                      color: textShown ? colors.textColor : colors.white,
                    },
                  }}
                  tagsStyles={{...tagsStyles}}
                />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        )}
        {getDescription(150)?.length < getFullDescription()?.length ? (
          <Text
            onPress={toggleNumberOfLines}
            style={[styles.showMore, textShown ? styles.colorWhite : {}]}>
            {textShown ? t('feed.seeLess') : t('feed.seeMore')}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default React.memo(TitleFeed);

const styles = StyleSheet.create({
  colorWhite: {
    color: colors.textColor,
  },
  description: {
    fontSize: 12,
    color: colors.white,
    lineHeight: 16,
  },
  showMore: {
    lineHeight: 21,
    marginTop: 10,
    color: colors.white,
    fontSize: 14,
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '600',
    paddingBottom: 10,
    paddingRight: 20,
  },
  container: {
    position: 'absolute',
    bottom: 70,
    maxHeight: heightFullScreen,
    justifyContent: 'flex-end',
    zIndex: 9999,
  },
  wrapAvatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  imageAvatar: {
    height: 20,
    width: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  subTitle: {
    color: colors.textSmallColor,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
});
