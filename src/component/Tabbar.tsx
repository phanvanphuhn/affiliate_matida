import {
  ic_program,
  iconCommunity,
  iconCommunity2,
  iconCommunity3,
  iconTabDeal,
  iconTabExplore,
  iconTabExplore2,
  iconTabFeed,
  iconTabHome,
  iconTabLiveTalk,
} from '@images';
import {trackScreenViewedEvent} from '@services/webengageManager.tsx';
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
  focusDealTab,
  focusExploreTab,
  focusFeedTab,
  focusHomeTab,
  focusLiveTalkTab,
  Option,
  Page,
} from '@redux';
import {event, eventType, trackEventBranch, trackingAppEvent} from '@util';
import {useTranslation} from 'react-i18next';
import {GlobalService} from '@services';
import {getQuestionOnboarding} from '../services/pregnancyProgram';
import useCheckPregnancy from '../util/hooks/useCheckPregnancy';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const active_color = colors.pink200;
const inActive_color = colors.gray550;

type Props = {
  navigation: any;
  state: any;
};

const Tabbar: React.FC<Props> = ({state, navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const checkPlan = useCheckPregnancy();
  const user = useSelector((state: any) => state?.auth?.userInfo);

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
      case ROUTE_NAME.TAB_DEAL:
        return t('bottomTab.deal');
      case ROUTE_NAME.TAB_LIVETALK:
        return t('bottomTab.liveTalks');
      case ROUTE_NAME.PREGNANCY_PROGRAM:
      case ROUTE_NAME.NEW_USER_PROGRAM:
        return t('bottomTab.program');
    }
  };
  const renderIcon = (value: string) => {
    switch (value) {
      case ROUTE_NAME.TAB_EXPLORE:
        return iconTabExplore2;
      case ROUTE_NAME.TAB_FEED:
        return iconTabFeed;
      case ROUTE_NAME.TAB_HOME:
        return iconTabHome;
      case ROUTE_NAME.TAB_COMMUNITY:
        return iconCommunity;
      case ROUTE_NAME.TAB_LIVETALK:
        return iconTabLiveTalk;
      case ROUTE_NAME.TAB_DEAL:
        return iconTabDeal;
      case ROUTE_NAME.PREGNANCY_PROGRAM:
      case ROUTE_NAME.NEW_USER_PROGRAM:
        return ic_program;
    }
  };

  const trackingTab = (value: any) => {
    switch (value) {
      case ROUTE_NAME.TAB_EXPLORE:
        trackScreenViewedEvent('Explore');
        trackingAppEvent(event.TAB.CLICK_TAB_EXPLORE, {}, eventType.MIX_PANEL);
        trackEventBranch(event.TAB.CLICK_TAB_EXPLORE, {});
        break;
      case ROUTE_NAME.TAB_FEED:
        trackScreenViewedEvent('Feed');
        trackingAppEvent(event.TAB.CLICK_TAB_FEED, {}, eventType.MIX_PANEL);
        trackEventBranch(event.TAB.CLICK_TAB_FEED, {});
        break;
      case ROUTE_NAME.TAB_HOME:
        trackScreenViewedEvent('Home');
        trackingAppEvent(event.TAB.CLICK_TAB_HOME, {}, eventType.MIX_PANEL);
        trackEventBranch(event.TAB.CLICK_TAB_HOME, {});
        break;
      case ROUTE_NAME.TAB_COMMUNITY:
        trackScreenViewedEvent('Community');
        trackingAppEvent(
          event.TAB.CLICK_TAB_COMMUNITY,
          {},
          eventType.MIX_PANEL,
        );
        trackEventBranch(event.TAB.CLICK_TAB_COMMUNITY, {});
        break;
      case ROUTE_NAME.TAB_LIVETALK:
        trackScreenViewedEvent('Livetalk');
        trackingAppEvent(
          event.TAB.CLICK_TAB_LIVE_TALKS,
          {},
          eventType.MIX_PANEL,
        );
        trackEventBranch(event.TAB.CLICK_TAB_LIVE_TALKS, {});
        break;
      case ROUTE_NAME.TAB_DEAL:
        trackScreenViewedEvent('Deal');
        trackingAppEvent(event.TAB.CLICK_TAB_DEAL, {}, eventType.MIX_PANEL);
        trackEventBranch(event.TAB.CLICK_TAB_DEAL, {});
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
            if (route.name == ROUTE_NAME.PREGNANCY_PROGRAM) {
              trackingAppEvent(
                event.TAB.CLICK_TAB_MASTERCLASS,
                {
                  id: user?.id,
                  baby_pregnantWeek: new Date(user?.pregnantWeek?.dueDate),
                  baby_trimester: user?.pregnantWeek?.weekPregnant?.trimester,
                  baby_weeks: user?.pregnantWeek?.weekPregnant?.weeks,
                  baby_months: user?.pregnantWeek?.weekPregnant?.months,
                },
                eventType.MIX_PANEL,
              );
              trackEventBranch(event.TAB.CLICK_TAB_MASTERCLASS, {});
              checkPlan();
            } else {
              navigation.navigate(route.name);
              onRefreshExplore();
              if (route.name === ROUTE_NAME.TAB_EXPLORE) {
                isCallExplore.current = true;
              }
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
              case ROUTE_NAME.TAB_DEAL:
                dispatch(focusDealTab());
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
    flex: 1,
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
    height: scaler(2),
    backgroundColor: colors.pink200,
    position: 'absolute',
    top: 0,
  },
});

export {Tabbar};
