import {iconArrowRight, newBornBaby, tailArrowRight} from '@images';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  Pressable,
} from 'react-native';
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
  isSelectProfileNewBorn: any;
};

const NewBornContainer = (props: TProps) => {
  const {onPress, data, user, state, isSelectProfileNewBorn} = props;
  const {baby, baby_zodiac} = data;

  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const gender = [
    {value: 'male', labelEn: 'Boy', labelVi: 'Bé trai'},
    {value: 'female', labelEn: 'Girl', labelVi: 'Bé gái'},
  ];

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
      <View style={[styles.wrapContentContainer, {marginBottom: scaler(32)}]}>
        {user?.pregnantWeek?.weekPregnant && (
          <Text style={styles.title}>
            {getBabyYearOld() + ' ' + t('newBorn.old')}
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
            {/* <Text>
              {user?.baby_gender == 'male'
                ? baby?.baby_size?.split('#')[0]
                : baby?.baby_size?.split('#')[1]}
            </Text> */}
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

      <View style={[styles.wrapContentContainer, {paddingVertical: scaler(8)}]}>
        <View
          style={{
            flexDirection: 'row',
            paddingRight: scaler(16),
            flex: 1,
          }}>
          <FastImage
            source={
              isSelectProfileNewBorn &&
              isSelectProfileNewBorn[0]?.avatar.length > 0
                ? {uri: isSelectProfileNewBorn[0]?.avatar}
                : newBornBaby
            }
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
            <Text
              style={{fontSize: 11, fontWeight: '500', maxWidth: '80%'}}
              numberOfLines={1}>
              {user?.baby_name}
            </Text>
            <Text style={styles.title}>
              {lang == 1
                ? baby_zodiac?.name_en +
                  ' ' +
                  gender.filter(item => item.value == user?.baby_gender)[0]
                    ?.labelEn
                : gender.filter(item => item.value == user?.baby_gender)[0]
                    ?.labelVi +
                  ' ' +
                  baby_zodiac?.name_vi}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.wrapBtnContainer,
            {width: scaler(128), justifyContent: 'center', elevation: 99},
          ]}
          hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
          onPress={onPress}>
          <Text style={styles.btnTitle}>{t('newBorn.viewMore')}</Text>
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
    flex: 1,
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
