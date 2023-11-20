import {iconArrowRight, newBornBaby, tailArrowRight} from '@images';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {tagsStyles} from '../../DetailArticle/settingHTML';
import {useSelector} from 'react-redux';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';

type TProps = {
  onPress: () => void;
  data: any;
  user: any;
  state: any;
};

const NewBornContainer = (props: TProps) => {
  const {onPress, data, user, state} = props;
  const {baby} = data;

  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const gender = [
    {value: 'male', labelEn: 'Male', labelVi: 'Bé trai'},
    {value: 'female', labelEn: 'Female', labelVi: 'Bé gái'},
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.wrapContentContainer, {marginBottom: scaler(32)}]}>
        {user?.pregnantWeek?.weekPregnant && (
          <Text style={styles.title}>
            {user?.pregnantWeek?.weekPregnant.years > 0
              ? user?.pregnantWeek?.weekPregnant.years +
                (user?.pregnantWeek?.weekPregnant.years > 1
                  ? ` ${t('newBorn.year')}s`
                  : ` ${t('newBorn.year')}`)
              : null}
            {user?.pregnantWeek?.weekPregnant.months > 0
              ? user?.pregnantWeek?.weekPregnant.months +
                (user?.pregnantWeek?.weekPregnant.months > 1
                  ? ` ${t('newBorn.month')}s`
                  : ` ${t('newBorn.month')}`)
              : null}
            {user?.pregnantWeek?.weekPregnant.weeks > 0
              ? user?.pregnantWeek?.weekPregnant.weeks +
                (user?.pregnantWeek?.weekPregnant.weeks > 1
                  ? ` ${t('newBorn.week')}s`
                  : ` ${t('newBorn.week')}`)
              : null}
            {user?.pregnantWeek?.weekPregnant.days > 0
              ? user?.pregnantWeek?.weekPregnant.days +
                (user?.pregnantWeek?.weekPregnant.days > 1
                  ? ` ${t('newBorn.day')}s`
                  : ` ${t('newBorn.day')}`)
              : null}
            {` ${t('newBorn.old')}`}
          </Text>
        )}

        {(user?.due_date || user?.baby_date_of_birth) && (
          <Text style={styles.title}>
            {t('newBorn.bornOn')}{' '}
            {moment(user?.due_date || user?.baby_date_of_birth).format(
              'DD/MM/YYYY',
            )}
          </Text>
        )}
      </View>
      <View style={[styles.wrapContentContainer, {marginBottom: scaler(32)}]}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View>
            <RenderHtml
              contentWidth={100}
              source={{
                html: `<div>${baby?.content}</div>`,
              }}
              baseStyle={styles.description}
              enableExperimentalMarginCollapsing={true}
              enableExperimentalBRCollapsing={true}
              enableExperimentalGhostLinesPrevention={true}
              tagsStyles={{...tagsStyles}}
            />
          </View>
        </View>

        <View>
          <Image
            source={baby?.image ? {uri: baby?.image[0]} : newBornBaby}
            style={{
              width: scaler(155),
              height: scaler(116),
            }}
            // resizeMethod="resize"
            resizeMode="center"
          />
        </View>
      </View>

      <View style={styles.wrapContentContainer}>
        <View style={{flexDirection: 'row'}}>
          <FastImage
            source={user?.avatar ? {uri: user?.avatar} : newBornBaby}
            style={{
              width: scaler(28),
              height: scaler(28),
              marginRight: scaler(8),
              borderRadius: scaler(99),
            }}
            // resizeMethod="resize"
            resizeMode="contain"
          />
          <View>
            <Text style={{fontSize: 11, fontWeight: '500'}}>
              {user?.baby_name}
            </Text>
            <Text style={styles.title}>
              {lang == 1
                ? gender.filter(item => item.value == user?.baby_gender)[0]
                    ?.labelEn
                : gender.filter(item => item.value == user?.baby_gender)[0]
                    ?.labelVi}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.wrapBtnContainer} onPress={onPress}>
          <Text style={styles.btnTitle}>View more</Text>
          <Image
            source={tailArrowRight}
            style={{
              height: scaler(16),
              width: scaler(16),
              marginLeft: scaler(4),
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaler(16),
    marginHorizontal: scaler(16),
    paddingVertical: scaler(16),
    borderRadius: scaler(16),
    backgroundColor: colors.white,
  },
  wrapContentContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    fontSize: scaler(11),
    fontWeight: '500',
    color: '#82808A',
  },
  wrapBtnContainer: {
    paddingVertical: scaler(8),
    paddingHorizontal: scaler(16),
    backgroundColor: '#FFEBEB',
    borderRadius: scaler(40),
    flexDirection: 'row',
  },
  btnTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primaryBackground,
  },
  description: {
    fontSize: scaler(14),
    color: colors.black,
    marginTop: scaler(8),
  },
});

export default NewBornContainer;
