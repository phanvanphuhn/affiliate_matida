import {moreInformation, newBornBaby} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import moment from 'moment';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

type TProps = {
  data: any;
  user: any;
  dataNewBorn: any;
};

const ContentUpdate = (props: TProps) => {
  const {dataNewBorn, user, data} = props;
  const {baby} = data;

  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);

  const getBabyYearOld = () => {
    let result = [];
    if (user?.pregnantWeek?.weekPregnant.years) {
      result.push(
        user?.pregnantWeek?.weekPregnant.years > 1 && lang == 1
          ? user?.pregnantWeek?.weekPregnant.years + ` ${t('newBorn.year')}s`
          : user?.pregnantWeek?.weekPregnant.years + ` ${t('newBorn.year')}`,
      );
    }

    if (user?.pregnantWeek?.weekPregnant.months) {
      result.push(
        user?.pregnantWeek?.weekPregnant.months > 1 && lang == 1
          ? user?.pregnantWeek?.weekPregnant.months + ` ${t('newBorn.month')}s`
          : user?.pregnantWeek?.weekPregnant.months + ` ${t('newBorn.month')}`,
      );
    }

    if (user?.pregnantWeek?.weekPregnant.weeks) {
      result.push(
        user?.pregnantWeek?.weekPregnant.weeks > 1 && lang == 1
          ? user?.pregnantWeek?.weekPregnant.weeks + ` ${t('newBorn.week')}s`
          : user?.pregnantWeek?.weekPregnant.weeks + ` ${t('newBorn.week')}`,
      );
    }

    if (user?.pregnantWeek?.weekPregnant.days) {
      result.push(
        user?.pregnantWeek?.weekPregnant.days > 1 && lang == 1
          ? user?.pregnantWeek?.weekPregnant.days + ` ${t('newBorn.day')}s`
          : user?.pregnantWeek?.weekPregnant.days + ` ${t('newBorn.day')}`,
      );
    }

    // return 2 items from result
    return result.slice(0, 2).join(' & ');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.wrapContainer, {marginBottom: scaler(16)}]}>
        <Text style={styles.label}>
          {' '}
          {getBabyYearOld() + ' ' + t('newBorn.old')}
        </Text>
        {dataNewBorn && dataNewBorn[0] && (
          <Text style={styles.label}>
            {t('newBorn.bornOn')}{' '}
            {moment.utc(dataNewBorn[0]?.date_of_birth).format('DD/MM/YYYY')}
          </Text>
        )}
      </View>
      <View style={styles.wrapContainer}>
        <Text style={styles.title}>{t('newBorn.update')}</Text>
        <Image
          source={moreInformation}
          style={{
            width: scaler(187),
            height: scaler(140),
          }}
          // resizeMethod="resize"
          resizeMode="center"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scaler(16),
    paddingBottom: scaler(32),
    marginBottom: scaler(16),
    backgroundColor: colors.white,
    borderRadius: scaler(16),
  },
  label: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(11),
    color: '#85828C',
  },
  wrapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(16),
    flex: 1,
  },
});

export default ContentUpdate;
