import {
  iconCommunity,
  iconTabExplore,
  iconTabFeed,
  iconTabHome,
  iconTabLiveTalk,
} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useRef} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {useDispatch, useSelector} from 'react-redux';
import {ROUTE_NAME} from '../navigation/routeName';
// import {t} from 'i18next';
import {
  changePageExplore,
  focusExploreTab,
  focusFeedTab,
  focusHomeTab,
  focusLiveTalkTab,
  Option,
  Page,
} from '@redux';
import {event, trackingAppEvent} from '@util';
import {useTranslation} from 'react-i18next';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const active_color = colors.brandMainPinkRed;
const inActive_color = colors.textSmallColor;

type Props = {
  navigation: any;
  state: any;
};

const Tabbar: React.FC<Props> = ({state, navigation}) => {
  const {t} = useTranslation();
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const dispatch = useDispatch();

  const isCallExplore = useRef<boolean>(true);

  const renderLabel = (value: string) => {
    switch (value) {
      case ROUTE_NAME.TAB_EXPLORE:
        return t('bottomTab.explore');
      case ROUTE_NAME.TAB_FEED:
        return t('bottomTab.feed');
      case ROUTE_NAME.TAB_HOME:
        return t('bottomTab.home');
      case ROUTE_NAME.TAB_COMMUNITY:
        return t('bottomTab.community');
      case ROUTE_NAME.TAB_LIVETALK:
        return t('bottomTab.liveTalks');
    }
  };
  const renderIcon = (value: string) => {
    switch (value) {
      case ROUTE_NAME.TAB_EXPLORE:
        return iconTabExplore;
      case ROUTE_NAME.TAB_FEED:
        return iconTabFeed;
      case ROUTE_NAME.TAB_HOME:
        return iconTabHome;
      case ROUTE_NAME.TAB_COMMUNITY:
        return iconCommunity;
      case ROUTE_NAME.TAB_LIVETALK:
        return iconTabLiveTalk;
    }
  };

  const trackingTab = (value: any) => {
    switch (value) {
      case ROUTE_NAME.TAB_EXPLORE:
        trackingAppEvent(event.TAB.CLICK_TAB_EXPLORE, {});
        break;
      case ROUTE_NAME.TAB_FEED:
        trackingAppEvent(event.TAB.CLICK_TAB_FEED, {});
        break;
      case ROUTE_NAME.TAB_HOME:
        trackingAppEvent(event.TAB.CLICK_TAB_HOME, {});
        break;
      case ROUTE_NAME.TAB_COMMUNITY:
        trackingAppEvent(event.TAB.CLICK_TAB_COMMUNITY, {});
        break;
      case ROUTE_NAME.TAB_LIVETALK:
        trackingAppEvent(event.TAB.CLICK_TAB_LIVE_TALKS, {});
        break;
    }
  };

  const onRefreshExplore = () => {
    if (isCallExplore.current) {
      dispatch(
        changePageExplore({
          page: 1,
          pageExplore: Page.ARTICLE,
          expert: '',
          option: Option.RECENT,
          trimesters: [],
          topics: [],
        }),
      );
      isCallExplore.current = false;
    }
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
            onRefreshExplore();
            if (route.name === ROUTE_NAME.TAB_EXPLORE) {
              isCallExplore.current = true;
            }
          } else {
            switch (route.name) {
              case ROUTE_NAME.TAB_HOME:
                dispatch(focusHomeTab());
                break;
              case ROUTE_NAME.TAB_EXPLORE:
                dispatch(focusExploreTab());
                break;
              case ROUTE_NAME.TAB_LIVETALK:
                dispatch(focusLiveTalkTab());
                break;
              case ROUTE_NAME.TAB_FEED:
                dispatch(focusFeedTab());
                break;
              default:
                return;
            }
          }
          trackingTab(route.name);
        };
        return (
          <TouchableOpacity
            onPress={onPress}
            style={styles.button}
            key={index}
            disabled={isFocused ? true : false}>
            {isFocused ? <View style={styles.viewActive} /> : null}
            <Image
              source={renderIcon(route.name)}
              style={[
                {
                  tintColor: isFocused ? active_color : inActive_color,
                },
                styles.icon,
              ]}
            />
            <Text
              style={[
                {
                  color: isFocused ? active_color : inActive_color,
                },
                styles.txtLabel,
              ]}
              numberOfLines={1}>
              {renderLabel(route.name)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width,
    backgroundColor: '#FFFFFF',
    paddingBottom: getBottomSpace() > 0 ? getBottomSpace() : scaler(12),
    borderTopWidth: 0.4,
    borderColor: '#A8A8A8',
  },
  button: {
    width: width / 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: scaler(24),
    height: scaler(24),
    marginTop: scaler(18),
  },
  txtLabel: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(10),
    marginTop: scaler(8),
  },
  iconHome: {
    width: scaler(36),
    height: scaler(36),
  },
  viewButtonHome: {
    width: scaler(58),
    height: scaler(58),
    borderRadius: scaler(58 / 2),
    backgroundColor: colors.brandMainPinkRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewActive: {
    width: scaler(48),
    height: scaler(3),
    backgroundColor: colors.primary,
    position: 'absolute',
    top: 0,
  },
});

export {Tabbar};
