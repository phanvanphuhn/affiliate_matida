import {t} from 'i18next';
import {CalculationMethod} from './_type';

export interface IItem {
  label: string;
  value: string | number;
}

export const getMethod = (): IItem[] => {
  return [
    {
      label: t('CalculationMethod.first_day_of_last_period'),
      value: CalculationMethod.FIRST_DAY_OF_LAST_PERIOD,
    },
    {
      label: t('CalculationMethod.ivf'),
      value: CalculationMethod.IVF,
    },
  ];
};

export const getCycleLength = () => {
  return [
    {
      label: t('FirstDayLastPeriod.unknown'),
      value: 'UNKNOWN'
    },
    {
      label: t('FirstDayLastPeriod.days', {days: 21}),
      value: 'TWENTY_ONE',
    },
    {
      label: t('FirstDayLastPeriod.days', {days: 22}),
      value: 'TWENTY_TWO',
    },
    {
      label: t('FirstDayLastPeriod.days', {days: 23}),
      value: 'TWENTY_THREE',
    },
    {
      label: t('FirstDayLastPeriod.days', {days: 24}),
      value: 'TWENTY_FOUR',
    },
    {
      label: t('FirstDayLastPeriod.days', {days: 25}),
      value: 'TWENTY_FIVE',
    },
    {
      label: t('FirstDayLastPeriod.days', {days: 26}),
      value: 'TWENTY_SIX',
    },
    {
      label: t('FirstDayLastPeriod.days', {days: 27}),
      value: 'TWENTY_SEVEN',
    },
    {
      label: t('FirstDayLastPeriod.days', {days: 28}),
      value: 'TWENTY_EIGHT',
    },
    {
      label: t('FirstDayLastPeriod.days', {days: 29}),
      value: 'TWENTY_NINE',
    },
    {
      label: t('FirstDayLastPeriod.days', {days: 30}),
      value: 'THIRTY',
    },
    {
      label: t('FirstDayLastPeriod.days', {days: 31}),
      value: 'THIRTY_ONE',
    },
    {
      label: t('FirstDayLastPeriod.days', {days: 32}),
      value: 'THIRTY_TWO',
    },
    {
      label: t('FirstDayLastPeriod.days', {days: 33}),
      value: 'THIRTY_THREE',
    },
    {
      label: t('FirstDayLastPeriod.days', {days: 34}),
      value: 'THIRTY_FOUR',
    },
    {
      label: t('FirstDayLastPeriod.days', {days: 35}),
      value: 'THIRTY_FIVE',
    },
  ];
};

// export const getCycleLength = (): IItem[] => {
//     return Array(10).fill(0).map((_, index) => {
//         const days = index + 25;
//         return {
//             label: t('FirstDayLastPeriod.days', {days: days}),
//             value: days
//         }
//     })
// }

export const getIVFdays = () => {
  return [3, 5].map(day => {
    return {
      label: t('IVFMethod.IVF_day_transfer_date', {day: day}),
      value: `IVF${day}`,
    };
  });
};
