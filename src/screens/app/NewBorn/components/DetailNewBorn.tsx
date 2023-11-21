import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {
  LogoApp,
  SvgArrowBackLogin,
  iconEdit,
  iconEditGrey,
  iconPen,
} from '@images';
import {navigate, goBack} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler} from '@stylesCommon';
import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TBaby} from '../../Home/components/BottomSheetNewBorn';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {birth_experience, gender} from './EditNewBorn';
import {useSelector} from 'react-redux';
import {getBabyInfo} from '@services';

const DetailNewBorn = (props: any) => {
  const {route} = props;
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);

  console.log('route: ', route?.params);

  const onEditBaby = () => {
    if (route?.params?.type == 'newborn') {
      navigate(ROUTE_NAME.EDIT_NEW_BORN, route?.params);
    } else {
      navigate(ROUTE_NAME.ADD_NEW_BABY, route?.params);
    }
  };

  const getDataBabyInfo = async () => {
    const res = await getBabyInfo(route?.params?.id);
    console.log('res: ', res);
  };

  useEffect(() => {
    getDataBabyInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => goBack()}>
          <SvgArrowBackLogin fill={'transparent'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEditBaby}>
          <Image
            source={iconEditGrey}
            style={{
              height: scaler(24),
              width: scaler(24),
              marginRight: scaler(16),
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.wrapImageContainer}>
          <FastImage
            source={
              route?.params?.avatar ? {uri: route?.params?.avatar} : LogoApp
            }
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.wrapContentContainer}>
          <View style={{alignItems: 'center', marginBottom: scaler(24)}}>
            <Text style={styles.title}>
              {route?.params?.name ? route?.params?.name : 'Baby Bear 1'}
            </Text>
            {route?.params?.type == 'newborn' ? (
              <Text
                style={[
                  styles.label,
                  {fontSize: scaler(14), color: colors.labelColor},
                ]}>
                2 months old
              </Text>
            ) : (
              <Text
                style={[
                  styles.label,
                  {fontSize: scaler(14), color: colors.labelColor},
                ]}>
                40 tuần tuổi
              </Text>
            )}
          </View>

          {route?.params?.type == ('pregnant' || 'pregnant-overdue') ? (
            <View
              style={{
                paddingVertical: scaler(16),
                borderTopWidth: scaler(1),
                borderBottomWidth: scaler(1),
                borderColor: '#F1F0F5',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles.label,
                  {
                    fontSize: scaler(12),
                    color: '#8B8484',
                    marginBottom: scaler(8),
                  },
                ]}>
                Ngày dự sinh
              </Text>
              <Text style={styles.text}>
                {route?.params?.date_of_birth
                  ? moment
                      .utc(route?.params?.date_of_birth)
                      .format('DD/MM/YYYY')
                  : route?.params?.due_date
                  ? moment.utc(route?.params?.due_date).format('DD/MM/YYYY')
                  : 'DD/MM/YYYY'}{' '}
              </Text>
            </View>
          ) : (
            <View
              style={{
                paddingVertical: scaler(16),
                flexDirection: 'row',
                justifyContent: 'space-around',
                borderTopWidth: scaler(1),
                borderBottomWidth: scaler(1),
                borderColor: '#F1F0F5',
              }}>
              <View
                style={{
                  borderRightWidth: scaler(1),
                  paddingRight: scaler(16),
                  borderColor: '#F1F0F5',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    styles.label,
                    {fontSize: scaler(12), color: '#8B8484'},
                  ]}>
                  {t('newBorn.dob')}
                </Text>
                <Text style={styles.text}>
                  {route?.params?.date_of_birth
                    ? moment
                        .utc(route?.params?.date_of_birth)
                        .format('DD/MM/YYYY')
                    : route?.params?.due_date
                    ? moment.utc(route?.params?.due_date).format('DD/MM/YYYY')
                    : 'DD/MM/YYYY'}
                </Text>
              </View>

              <View
                style={{
                  borderRightWidth: scaler(1),
                  paddingRight: scaler(16),
                  borderColor: '#F1F0F5',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    styles.label,
                    {fontSize: scaler(12), color: '#8B8484'},
                  ]}>
                  {t('newBorn.tob')}
                </Text>
                <Text style={styles.text}>
                  {route?.params?.date_of_birth
                    ? moment.utc(route?.params?.date_of_birth).format('HH:mm')
                    : route?.params?.due_date
                    ? moment.utc(route?.params?.due_date).format('HH:mm')
                    : 'HH:MM am'}
                </Text>
              </View>

              <View style={{alignItems: 'center', paddingRight: scaler(16)}}>
                <Text
                  style={[
                    styles.label,
                    {fontSize: scaler(12), color: '#8B8484'},
                  ]}>
                  {t('newBorn.gender')}
                </Text>
                <Text style={styles.text}>
                  {lang == 1
                    ? gender.filter(
                        item => item.value == route?.params?.gender,
                      )[0]?.label
                    : gender.filter(
                        item => item.value == route?.params?.gender,
                      )[0]?.labelVi}
                </Text>
              </View>
            </View>
          )}

          {route?.params?.type !== ('pregnant' || 'pregnant-overdue') && (
            <>
              <View style={[styles.wrapDescription, {marginTop: scaler(16)}]}>
                <Text
                  style={[
                    styles.label,
                    {fontSize: scaler(12), color: '#8B8484'},
                  ]}>
                  {t('newBorn.birthExperience')}
                </Text>
                <Text style={styles.text}>
                  {lang == 1
                    ? birth_experience.filter(
                        item => item.value == route?.params?.birth_experience,
                      )[0]?.label
                    : birth_experience.filter(
                        item => item.value == route?.params?.birth_experience,
                      )[0]?.labelVi}
                </Text>
              </View>
              <View style={styles.wrapDescription}>
                <Text
                  style={[
                    styles.label,
                    {fontSize: scaler(12), color: '#8B8484'},
                  ]}>
                  {t('newBorn.babyWeight')}
                </Text>
                <Text style={styles.text}>
                  {route?.params.weight / 1000} kg
                </Text>
              </View>
              <View style={styles.wrapDescription}>
                <Text
                  style={[
                    styles.label,
                    {fontSize: scaler(12), color: '#8B8484'},
                  ]}>
                  {t('newBorn.babyHeight')}
                </Text>
                <Text style={styles.text}>{route?.params.height} cm</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: scaler(72),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: scaler(24),
    paddingHorizontal: scaler(16),
  },
  wrapImageContainer: {
    position: 'absolute',
    top: scaler(-60),
    left: SCREEN_WIDTH / 2 - 60,
  },
  image: {
    height: scaler(120),
    width: scaler(120),
    borderRadius: scaler(99),
  },
  wrapContentContainer: {
    marginTop: scaler(84),
  },
  title: {
    fontSize: scaler(24),
    fontWeight: '600',
  },
  label: {
    fontWeight: '400',
  },
  text: {
    fontSize: scaler(14),
    fontWeight: '500',
  },
  wrapDescription: {
    paddingVertical: scaler(16),
    borderBottomWidth: scaler(1),
    borderColor: '#F1F0F5',
  },
});

export default DetailNewBorn;
