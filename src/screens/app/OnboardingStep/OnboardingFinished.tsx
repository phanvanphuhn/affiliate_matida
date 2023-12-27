import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SvgLineWave} from '@images';
import BarchartOnboarding from './components/BarchartOnboarding';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

interface OnboardingFinishedProps {}

const OnboardingFinished = (props: OnboardingFinishedProps) => {
  const [state, setState] = useState();
  const navigation = useNavigation<any>();
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state.auth.lang);

  const onNext = () => {
    navigation.navigate(ROUTE_NAME.TEASER_PROGRAM);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <SafeAreaView edges={['top']} style={styles.container2}>
          <Text style={styles.textTitle}>
            {t('pregnancyProgram.masterClassResult')}
          </Text>
          <Text style={styles.textTitle2}>
            {t('pregnancyProgram.dontWorry')}
          </Text>
        </SafeAreaView>

        <View style={styles.container3}>
          <View
            style={{
              top: -8,
            }}>
            <SvgLineWave />
          </View>

          <Text style={styles.textTitleChart}>
            {t('pregnancyProgram.here')}
          </Text>
          {lang == 1 && (
            <Text style={styles.textTitleChart2}>
              {t('pregnancyProgram.adjust')}
            </Text>
          )}
          <View style={styles.containerChart}>
            <BarchartOnboarding />
          </View>

          <View style={styles.container4}>
            <View style={{top: -8, paddingBottom: scaler(32)}}>
              <SvgLineWave color={colors.blue50} />
            </View>
            <TouchableOpacity onPress={onNext} style={styles.buttonFinish}>
              <Text style={styles.textFinish}>
                {t('pregnancyProgram.letWork')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OnboardingFinished;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yellow200,
  },
  container2: {
    paddingHorizontal: scaler(10),
    paddingTop: scaler(33),
  },
  textTitle: {
    fontSize: scaler(20),
    color: colors.labelColor,
    textAlign: 'center',
    ...stylesCommon.fontWeight500,
  },
  textTitle2: {
    fontSize: scaler(26),
    textAlign: 'center',
    color: colors.textColor,
    marginTop: scaler(8),
    ...stylesCommon.fontWeight600,
  },
  container3: {
    backgroundColor: colors.white,
    flex: 1,
    marginTop: '15%',
  },
  textTitleChart: {
    fontSize: scaler(22),
    fontWeight: '600',
    textAlign: 'center',
    marginTop: scaler(20),
    ...stylesCommon.fontWeight600,
  },
  textTitleChart2: {
    fontSize: scaler(15),
    fontWeight: '400',
    textAlign: 'center',
    color: colors.labelColor,
    marginTop: scaler(5),
    ...stylesCommon.fontSarabun400,
  },
  containerChart: {
    paddingTop: scaler(20),
    paddingBottom: scaler(10),
    flex: 1,
  },
  container4: {
    backgroundColor: colors.pink350,
    paddingBottom: scaler(50),
  },
  buttonFinish: {
    backgroundColor: colors.yellow200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaler(16),
    alignSelf: 'center',
    width: '85%',
    borderRadius: scaler(40),
  },
  textFinish: {
    fontSize: scaler(15),
    fontWeight: '600',
    ...stylesCommon.fontSarabun600,
  },
});
