import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ic_wave_line_bottom,
  ic_wave_line_top,
  iconClose,
  SvgLineWave,
} from '@images';
import BarchartOnboarding from './components/BarchartOnboarding';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {event, eventType, trackEventBranch, trackingAppEvent} from '@util';
import {trackCustomEvent} from '@services/webengageManager';
import {goBack, NavigationUtils} from '@navigation';
import {NavigationProp, RouteProp} from '@react-navigation/core/src/types';
import useBackHandler from '../../../util/hooks/useBackHandler';

interface OnboardingFinishedProps {}

const OnboardingFinished = (props: OnboardingFinishedProps) => {
  const [state, setState] = useState();
  const navigation = useNavigation<NavigationProp<any>>();
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state.auth.lang);
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const route = useRoute<RouteProp<any>>();

  const onNext = () => {
    trackingAppEvent(
      event.MASTER_CLASS.PP_LET_WORK_ON_IT_TOGETHER,
      {id: user?.id},
      eventType.MIX_PANEL,
    );
    navigation.navigate(ROUTE_NAME.TEASER_PROGRAM);
  };

  useEffect(() => {
    trackCustomEvent(event.MASTER_CLASS.USER_FINISH_ONBOARDING_QUESTIONS, {});
    trackEventBranch(event.MASTER_CLASS.USER_FINISH_ONBOARDING_QUESTIONS, {});
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <SafeAreaView edges={['top']} style={styles.container2}>
          <TouchableOpacity
            onPress={() => NavigationUtils.pop(2)}
            style={styles.buttonBack}>
            <Image source={iconClose} />
          </TouchableOpacity>
          <Text style={styles.textTitle}>
            {t('pregnancyProgram.masterClassResult')}
          </Text>
          <Text style={styles.textTitle2}>
            {t('pregnancyProgram.dontWorry')}
          </Text>
        </SafeAreaView>

        <View style={styles.container3}>
          <View style={{top: -8, paddingBottom: 2}}>
            <Image source={ic_wave_line_top} style={{width: '100%'}} />
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
            <BarchartOnboarding {...route?.params} />
          </View>

          <View style={styles.container4}>
            <View
              style={{
                top: -9,
                paddingTop: 1,
                paddingBottom: scaler(32),
              }}>
              <Image
                source={ic_wave_line_bottom}
                style={{
                  width: '100%',
                  tintColor: colors.blue50,
                }}
              />
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
  buttonBack: {
    alignItems: 'flex-end',
    paddingHorizontal: scaler(15),
    paddingVertical: scaler(10),
  },
  container: {
    flex: 1,
    backgroundColor: colors.yellow200,
  },
  container2: {
    paddingHorizontal: scaler(10),
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
