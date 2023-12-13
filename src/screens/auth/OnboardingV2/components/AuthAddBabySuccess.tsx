import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {LogoApp} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const AuthAddBabySuccess = (props: any) => {
  const {route} = props;
  const {params} = route;
  const {t} = useTranslation();

  const onNavigateHomePage = () => {
    if (params?.state?.page < 10) {
      navigate(ROUTE_NAME.TAB_HOME);
    }
    navigate(ROUTE_NAME.SLIDE_INTRO);
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: colors.white, padding: scaler(16)}}>
      <ScrollView style={{flex: 1}}>
        <Text style={styles.title}>{params?.data?.text}</Text>

        <Image
          source={
            params?.data?.image ? {uri: params?.data?.image?.url} : LogoApp
          }
          style={{height: SCREEN_WIDTH, width: '100%'}}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.wrapBtnContainer}
          onPress={onNavigateHomePage}>
          <Text style={styles.btnTitle}>{t('resultDueDate.tellMeMore')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: scaler(24),
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
    marginTop: scaler(56),
    marginBottom: scaler(24),
  },
  wrapBtnContainer: {
    width: '100%',
    backgroundColor: colors.brandMainPinkRed,
    paddingVertical: scaler(16),
    alignItems: 'center',
    borderRadius: scaler(40),
  },
  btnTitle: {
    fontSize: scaler(14),
    fontWeight: '500',
    color: colors.white,
  },
});

export default AuthAddBabySuccess;
