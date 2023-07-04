import {WEEK_MAX} from '@constant';
import {colors} from '@stylesCommon';
import {t} from 'i18next';
import {ColorValue} from 'react-native';
import appsFlyer from 'react-native-appsflyer';
import dayjs from 'dayjs';

const validTag = /^<\/?[A-Za-z]+>$/;

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

export const trackingAppEvent = (eventName: any, eventParams: any) => {
  try {
    appsFlyer.logEvent(
      eventName,
      eventParams,
      res => {
        console.log('TrackingEvent', eventName, eventParams, res);
      },
      err => {
        console.error('TrackingEvent', eventName, eventParams, err);
      },
    );
  } catch (error) {}
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
