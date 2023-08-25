/* eslint-disable curly */
import {ETypeHost} from '@constant';
import i18next from 'i18next';
import moment, {MomentInput} from 'moment';
import 'moment/min/locales';
import {convertLangMonth} from './functionApp';
const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const day = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const formatDate = (date: MomentInput, format: string) => {
  if (!date) return '';
  return moment(date).locale(i18next.language).format(format);
};

export const getFullMonth = (d: Date) => {
  return month[d.getMonth()];
};

export const getDateMMDDYYY = (d: Date) => {
  return `${getFullMonth(d)} ${d.getDate()} ${d.getFullYear()}`;
};

export const getFullDay = (d: Date) => {
  return day[d.getDay()];
};

export const getTimeCreatedArticle = (d: Date) => {
  return moment(d).format('dddd, MMM DD');
};

export const getTimeCreatedFormNow = (d: Date, lang?: number) => {
  const local = lang === 2 ? 'vi' : 'en';
  return moment(d).locale(local).fromNow();
};

export const getTimeCreatePopular = (d: Date) => {
  return moment(d).format('DD MMM YYYY');
};

export const getTimePregnancy = (d: Date) => {
  return moment(d).format('DD/MM/YYYY');
};

export const getTimeTranslate = (d: string | null) => {
  let str = d ?? '';
  let array = str.split(' ');
  if (array.length < 3) {
    return str;
  } else {
    if (array[0] === 'a' || array[0] === 'an') {
      array[0] = '1';
    }
    //giay
    if (array[1] === 'second' || array[1] === 'seconds') {
      array[1] = 'giây';
    } //phut
    else if (array[1] === 'minute' || array[1] === 'minutes') {
      array[1] = 'phút';
    } //gio
    else if (array[1] === 'hour' || array[1] === 'hours') {
      array[1] = 'giờ';
    } //ngay
    else if (array[1] === 'day' || array[1] === 'days') {
      array[1] = 'ngày';
    } //tuan
    else if (array[1] === 'week' || array[1] === 'weeks') {
      array[1] = 'tuần';
    } // thang
    else if (array[1] === 'month' || array[1] === 'months') {
      array[1] = 'tháng';
    } //nam
    else if (array[1] === 'year' || array[1] === 'years') {
      array[1] = 'năm';
    }
    array[2] = 'trước';
    return array.join(' ');
  }
};

export const convertTimeRoom = (date: string, typeRoom: ETypeHost) => {
  return `${moment(date, 'YYYY/MM/DD hh:mm:ss').format(
    'DD',
  )} ${convertLangMonth(moment(date, 'YYYY/MM/DD hh:mm:ss').format('MMMM'))}${
    typeRoom === ETypeHost.MOM
      ? ` ${moment(date, 'YYYY/MM/DD hh:mm:ss').format('YYYY')}`
      : ''
  }${moment(date, 'YYYY/MM/DD hh:mm:ss').format(', HH:mm A')}`;
};

export const convertTime = (date: string) => {
  return `${moment(date, 'YYYY/MM/DD hh:mm:ss').format(
    'DD',
  )} ${convertLangMonth(
    moment(date, 'YYYY/MM/DD hh:mm:ss').format('MMMM'),
  )} ${moment(date, 'YYYY/MM/DD hh:mm:ss').format('YYYY')}`;
};

export const getTimeEndRoom = (date: string, host: ETypeHost) => {
  if (date) {
    const time = moment(date, 'YYYY/MM/DD hh:mm:ss')
      .add(host === ETypeHost.MOM ? 1 : 3, 'hour')
      .diff(moment());
    const duration = moment?.duration(time);
    const minutes = Math.floor(+duration?.asMinutes());
    return minutes;
  } else {
    return 60;
  }
};

export const getTimeStartRoom = (date: string) => {
  if (date) {
    const time = moment(date, 'YYYY/MM/DD hh:mm:ss').diff(moment());
    const duration = moment?.duration(time);
    const minutes = Math.floor(+duration?.asMinutes());
    return minutes;
  } else {
    return 60;
  }
};

export const getTimeHistoryMomTest = (date: string) => {
  return date
    ? `${convertLangMonth(
        moment(date, 'YYYY/MM/DD hh:mm:ss').format('MMMM'),
      )} ${moment(date, 'YYYY/MM/DD hh:mm:ss').format('DD')}, ${moment(
        date,
        'YYYY/MM/DD hh:mm:ss',
      ).format('YYYY')}`
    : '';
};
