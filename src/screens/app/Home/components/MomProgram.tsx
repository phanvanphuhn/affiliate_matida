import {momProgram, newBornBaby} from '@images';
import {getProgramJoin} from '@services';
import {colors, scaler} from '@stylesCommon';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

const MomProgram = (props: any) => {
  const {data} = props;
  console.log('data: ', data);

  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);

  const [signUp, setSignUp] = useState();

  const onSignUp = async () => {
    try {
      const res = await getProgramJoin();
      if (res.success) {
        setSignUp(res?.data);
        Toast.show({
          visibilityTime: 4000,
          text1: t('error.success'),
          text1NumberOfLines: 2,
          position: 'top',
        });
      } else {
        Toast.show({
          visibilityTime: 4000,
          text1: t('error.pleaseTryAgain'),
          text1NumberOfLines: 2,
          position: 'top',
          type: 'error',
        });
      }
    } catch (error) {
      Toast.show({
        visibilityTime: 4000,
        text1: t('error.pleaseTryAgain'),
        text1NumberOfLines: 2,
        position: 'top',
        type: 'error',
      });
    }
  };

  return (
    <View style={[styles.container]}>
      {data?.userInProgram ? (
        <>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              style={[
                styles.title,
                {paddingHorizontal: scaler(16), textAlign: 'center'},
              ]}>
              {t('momProgram.powerMom')}
            </Text>
            <Text style={styles.subTitle}>{t('momProgram.thankYou')}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.label}>{t('momProgram.youAreInvite')}</Text>
            <Text
              style={[
                styles.title,
                {paddingHorizontal: scaler(16), textAlign: 'center'},
              ]}>
              {t('momProgram.powerMom')}
            </Text>
            <Text style={styles.subTitle}>
              {t('momProgram.signUpHere')}
              <Text style={{color: colors.primary}}>
                {' '}
                {t('momProgram.free')}{' '}
              </Text>
              {lang === 1 ? t('momProgram.access') : null}
            </Text>
          </View>

          <View style={styles.wrapContentContainer}>
            <Text style={styles.label}>{t('momProgram.sub1')}</Text>
            <Text style={styles.label}>{t('momProgram.sub2')}</Text>
            <Text style={styles.label}>{t('momProgram.sub3')}</Text>
            <Text style={styles.label}>{t('momProgram.sub4')}</Text>

            <TouchableOpacity
              style={styles.wrapBtnContainer}
              onPress={onSignUp}>
              <Text style={styles.btnTitle}>{t('momProgram.accept')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%', alignItems: 'center'}}>
              <Text style={styles.subBtnTitle}>
                {t('momProgram.freeOfCharge')}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <View>
        <Image
          source={momProgram}
          style={{
            width: '100%',
            height: scaler(198),
          }}
          // resizeMethod="resize"
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: scaler(16),
    marginHorizontal: scaler(16),
    borderRadius: scaler(16),
  },
  label: {
    fontWeight: '500',
    fontSize: scaler(14),
  },
  title: {
    fontWeight: '600',
    fontSize: scaler(24),
    marginBottom: scaler(8),
  },
  subTitle: {
    fontWeight: '400',
    fontSize: scaler(14),
    color: '#39383D',
    textAlign: 'center',
    paddingHorizontal: scaler(16),
    marginBottom: scaler(16),
  },
  wrapContentContainer: {
    paddingHorizontal: scaler(16),
    marginHorizontal: scaler(16),
    paddingTop: scaler(16),
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopRightRadius: scaler(16),
    borderTopLeftRadius: scaler(16),
    marginBottom: scaler(24),
    borderColor: '#F1F0F5',
  },
  label: {
    fontWeight: '500',
    fontSize: scaler(14),
    color: colors.labelColor,
    marginBottom: scaler(8),
  },
  wrapBtnContainer: {
    width: '100%',
    backgroundColor: colors.primaryBackground,
    paddingVertical: scaler(12),
    alignItems: 'center',
    borderRadius: scaler(24),
    marginTop: scaler(24),
    marginBottom: scaler(16),
  },
  btnTitle: {
    fontWeight: '500',
    fontSize: scaler(12),
    color: colors.white,
  },
  subBtnTitle: {
    fontSize: scaler(12),
    fontWeight: '400',
    color: '#85828C',
  },
});

export default MomProgram;
