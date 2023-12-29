import {IS_ANDROID, WEEK_MAX} from '@constant';
import {setIsFromBranch} from '@redux';
import dayjs from 'dayjs';
import {t} from 'i18next';
import {Mixpanel} from 'mixpanel-react-native';
import {ColorValue, Linking} from 'react-native';
import branch, {BranchEvent} from 'react-native-branch';
// @ts-ignore
import reactotron from 'reactotron-react-native';
import {store} from '../redux/store';
import {event} from './eventTracking';
//@ts-ignore
import WebEngage from 'react-native-webengage';
import {colors} from '@stylesCommon';
var webengage = new WebEngage();

let buoApp: any = null;

const validTag = /^<\/?[A-Za-z]+>$/;
const trackAutomaticEvents = true;
const mixpanel = new Mixpanel(
  'da7e3368476b1df669b65f4a887ccaaa',
  trackAutomaticEvents,
);

//WebEngage
export const initWebEngage = () => {
  if (webengage?.user) {
    IS_ANDROID && webengage?.user?.setDevicePushOptIn(true);
  }
};

export const loginWebEngage = (identify: string) => {
  if (webengage?.user) {
    webengage?.user?.login(identify);
    IS_ANDROID && webengage?.user?.setDevicePushOptIn(true);
  }
};

export const logoutWebEngage = () => {
  webengage?.user?.logout();
};

export const isShowForReviewer = (user: any) => {
  const {id} = user;
  if (id == 89 || id == 18257) {
    return false;
  } else {
    return true;
  }
};

export const eventType = {
  MIX_PANEL: 'mix_panel',
  AFF_FLYER: 'aff_flyer',
  BRANCH_IO: 'branch_io',
};

export const hasWhiteSpace = (s: any) => {
  var regExp = /^\s+$/;
  return regExp.test(s);
};

export const convertArrayScroll = () => {
  let data = [];
  for (let i = 1; i <= WEEK_MAX; i++) {
    data.push({value: i, label: t('sizeComparison.week')});
  }
  return data;
};

export const getFirstTextElementHTML = (content: string | null) => {
  if (content) {
    const startText = content.indexOf('<p');
    if (startText !== -1) {
      const endText = content.indexOf('</p>');
      return content
        .slice(startText, endText)
        .replace(/<[^>]*>/gm, '')
        .replace('&nbsp;', '');
    } else {
      return content.replace(/<[^>]*>/gm, '').replace('&nbsp;', '');
    }
  } else {
    return content;
  }
};

export const getAmountMood = (mood: string) => {
  return mood
    .split(',')
    .filter(item => item.length > 0)
    .map(item => parseInt(item, 10));
};

export const convertLangDay = (value: any) => {
  switch (value) {
    case 'Monday':
      return t('WeekTime.Monday');
    case 'Tuesday':
      return t('WeekTime.Tuesday');
    case 'Wednesday':
      return t('WeekTime.Wednesday');
    case 'Thursday':
      return t('WeekTime.Thursday');
    case 'Friday':
      return t('WeekTime.Friday');
    case 'Saturday':
      return t('WeekTime.Saturday');
    case 'Sunday':
      return t('WeekTime.Sunday');
  }
};

export const convertLangMonth = (value: any) => {
  switch (value) {
    case 'January':
      return t('MonthTime.month_1');
    case 'February':
      return t('MonthTime.month_2');
    case 'March':
      return t('MonthTime.month_3');
    case 'April':
      return t('MonthTime.month_4');
    case 'May':
      return t('MonthTime.month_5');
    case 'June':
      return t('MonthTime.month_6');
    case 'July':
      return t('MonthTime.month_7');
    case 'August':
      return t('MonthTime.month_8');
    case 'September':
      return t('MonthTime.month_9');
    case 'October':
      return t('MonthTime.month_10');
    case 'November':
      return t('MonthTime.month_11');
    case 'December':
      return t('MonthTime.month_12');
  }
};

interface IStyles {
  view: ColorValue;
  text: ColorValue;
}
export interface IMoodStyles {
  title: string;
  style: IStyles;
}

const mood = [
  t('articles.calm'),
  t('articles.nervous'),
  t('articles.grateful'),
  t('articles.sad'),
];
export const convertMood = (array: number[]) => {
  if (array) {
    return array.map(item => mood[item - 1]).join(', ');
  } else {
    return '';
  }
};

export const convertTopics = (topic: number) => {
  const topics = [
    t('articles.pregnancy'),
    t('articles.medical'),
    t('articles.mentalHealth'),
    t('articles.fitnessWellness'),
    t('articles.nutrition'),
    t('articles.lifeCareer'),
    t('articles.labour'),
    t('articles.babyCare'),
  ];
  if (topic < 0 || topic > topics.length) {
    return '';
  } else {
    return topics[topic - 1];
  }
};

export const valid = function (tag: any) {
  return validTag.test(tag);
};

export function convertArrUnique(arr: any, comp: any) {
  const unique = arr
    .map((e: any) => e[comp])
    .map((e: any, i: any, final: any) => final.indexOf(e) === i && i)
    .filter((e: any) => arr[e])
    .map((e: any) => arr[e]);

  return unique;
}

export const trackingAppEvent = async (
  eventName: any,
  eventParams: any,
  type: string,
  user?: any,
) => {
  try {
    trackEventMixpanel(eventName, eventParams, user);
    // trackEventBranch(eventName, eventParams);
  } catch (error) {}
};

export const createBranchUniversalObject = async (
  identifier: string,
  options: any,
) => {
  const result = await branch.createBranchUniversalObject(identifier, options);
  buoApp = result;
};

export const trackEventMixpanel = (
  eventName: any,
  eventParams: any,
  user?: any,
) => {
  if (user) {
    mixpanel.identify(user.id);
  }
  if (eventName === event.SYSTEM.LOG_OUT) {
    mixpanel.reset();
  }
  mixpanel.track(eventName, eventParams);
};

export const trackEventBranch = async (
  eventName: string,
  params: any,
  ignoreBranchState?: boolean,
) => {
  try {
    const branchState = store.getState().auth.isFromBranch;
    if (branchState || ignoreBranchState) {
      const eventLog = new BranchEvent(eventName, null, {
        customData: params,
      });
      eventLog.logEvent();
      reactotron.log?.('LOG EVENT', eventName);
    }
  } catch (error) {
    reactotron.log?.('ERROR LOG EVENT', eventName);
  }
};

export const trackWebEngage = (eventName: any, eventParams: any) => {
  try {
    webengage.track(eventName, eventParams);
  } catch (error) {
    reactotron.log?.('ERROR LOG EVENT WEBENGAGE', eventName);
  }
};

export const initBranchEvent = async () => {
  branch.subscribe({
    onOpenStart: ({uri, cachedInitialEvent}) => {
      // reactotron.log?.(
      //   'subscribe onOpenStart, will open ' +
      //     uri +
      //     ' cachedInitialEvent is ' +
      //     cachedInitialEvent,
      // );
    },
    onOpenComplete: ({error, params, uri}) => {
      if (error) {
        reactotron.log?.('ERROR', error);
        return;
      } else if (params) {
        if (!params['+clicked_branch_link']) {
          if (params['+non_branch_link']) {
            // reactotron.log?.('non_branch_link: ' + uri);
            // Route based on non-Branch links
            return;
          }
        } else {
          // Handle params
          let deepLinkPath = params.$deeplink_path as string;
          let canonicalUrl = params.$canonical_url as string;
          // Route based on Branch link data
          trackEventBranch(
            event.BRANCH.CLICK_DEEPLINK,
            {
              deepLinkPath,
              canonicalUrl,
            },
            true,
          );
          return;
        }
      }
    },
  });

  let installParams = await branch.getFirstReferringParams(); // Params from original install
  if (Object.keys(installParams).length > 0) {
    //sau khi install
    store.dispatch(setIsFromBranch(true));
    trackEventBranch(event.BRANCH.INSTALL_APP, installParams, true);
  }
};

export const getConvertViewer = (view: number | string | null) => {
  if (view) {
    return +view > 1000 ? `${(+view).toFixed(1)}k` : +view;
  } else {
    return 0;
  }
};

export function isSameDay(currentMessage: any, diffMessage: any) {
  if (!diffMessage || !diffMessage.createdAt) {
    return false;
  }
  const currentCreatedAt = dayjs(currentMessage.createdAt);
  const diffCreatedAt = dayjs(diffMessage.createdAt);
  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }
  return currentCreatedAt.isSame(diffCreatedAt, 'day');
}

export const openUrl = async (url: string) => {
  try {
    Linking.canOpenURL(url).then(result => {
      if (result) {
        reactotron.log?.('OPENING ' + url);
        Linking.openURL(url);
      } else {
        reactotron.log?.('CANNOT OPEN ' + url);
      }
    });
  } catch (error) {
    reactotron.log?.('CANNOT OPEN ' + url);
  }
};

export const formatPrice = (value: string) => {
  let price = parseInt(value);
  return price
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    .replace('.00', '');
};

export const getSubTitlePregnancy = (type: string) => {
  switch (type) {
    case 'learn':
      return t('pregnancyProgram.learn');
    case 'check_up':
      return t('pregnancyProgram.checkup');
    case 'mom_diary':
      return t('momDiary.momDiary');
    case 'quiz':
      return t('pregnancyProgram.quiz');
    case 'activity':
      return t('pregnancyProgram.activity');
    default:
      return '';
  }
};
export const getTitlePregnancy = (type: string) => {
  switch (type) {
    case 'reward':
      return '';
    case 'core':
      return t('pregnancyProgram.pregnancyKnowledge');
    case 'love_and_money':
      return t('pregnancyProgram.loveMoney');
    case 'fitness_and_nutrition':
      return t('pregnancyProgram.fitnessNutrition');
    case 'baby_care':
      return t('pregnancyProgram.babyCare');
    default:
      return '';
  }
};

export const getLabelPregnancy = (type: string) => {
  switch (type) {
    case 'reward':
      return '';
    case 'core':
      return 'Core';
    case 'love_and_money':
      return 'Personal challenge';
    case 'fitness_and_nutrition':
      return 'Fitness & Nutrition';
    case 'baby_care':
      return 'Baby care';
    default:
      return '';
  }
};
export const getColorPregnancy = (type: string) => {
  switch (type) {
    case 'reward':
      return colors.blue;
    case 'core':
      return colors.pink200;
    case 'love_and_money':
      return colors.green250;
    default:
      return colors.primaryBackground;
  }
};
