import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scaler, stylesCommon, colors} from '@stylesCommon';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

const ViewContent = React.memo((props: any) => {
  const {data} = props;
  const {t} = useTranslation();
  const isUserDefault = data?.role === 1;

  const convertDat = (value: any) => {
    switch (Number(value)) {
      case 1:
        return t('MonthTime.month_1');
      case 2:
        return t('MonthTime.month_2');
      case 3:
        return t('MonthTime.month_3');
      case 4:
        return t('MonthTime.month_4');
      case 5:
        return t('MonthTime.month_5');
      case 6:
        return t('MonthTime.month_6');
      case 7:
        return t('MonthTime.month_7');
      case 8:
        return t('MonthTime.month_8');
      case 9:
        return t('MonthTime.month_9');
      case 10:
        return t('MonthTime.month_10');
      case 11:
        return t('MonthTime.month_11');
      case 12:
        return t('MonthTime.month_12');
      default:
        return '';
    }
  };

  const Item = (props: any) => {
    const {title, content} = props;

    return (
      <View style={styles.viewItem}>
        <Text style={styles.txtTitle}>{title}</Text>
        <Text style={styles.txtContent} numberOfLines={2}>
          {content?.length > 0 ? content : '-'}
        </Text>
      </View>
    );
  };

  if (data?.role === 3) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitleHeader}>
        {isUserDefault
          ? t('profileSettings.pregnancy_info')
          : t('profileSettings.expert_info')}
      </Text>
      {isUserDefault ? (
        <>
          <Item
            title={t('profileSettings.dueDate')}
            content={`${moment(data?.due_date).format('DD')} ${convertDat(
              moment(data?.due_date).format('M'),
            )} ${moment(data?.due_date).format('YYYY')}`}
          />
          <Item
            title={t('profileSettings.babyName')}
            content={data?.baby_name}
          />
          <Item
            title={t('profileSettings.typeOfPregnancy')}
            content={
              data?.pregnant_type === 2
                ? t('profileSettings.typeOfPregnancyDetail.multiple')
                : t('profileSettings.typeOfPregnancyDetail.one_baby')
            }
          />
        </>
      ) : null}
      <Item
        title={`${t('signUp.phoneNumber')}`}
        content={`${data?.calling_code ? data?.calling_code : ''} ${
          data?.phone_number ? data?.phone_number : ''
        }`}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: scaler(16),
    backgroundColor: '#FFFFFF',
    marginTop: scaler(6),
  },
  viewItem: {
    width: '100%',
    flexDirection: 'row',
    marginTop: scaler(16),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtTitle: {
    color: '#7C7C7C',
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
    maxWidth: '60%',
  },
  txtContent: {
    color: colors.textColor,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
    maxWidth: '40%',
  },
  txtTitleHeader: {
    color: colors.textColor,
    fontSize: scaler(16),
    ...stylesCommon.fontWeight600,
  },
});

export {ViewContent};
