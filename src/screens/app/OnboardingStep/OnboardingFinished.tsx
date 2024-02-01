import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {
  ic_like,
  ic_warning,
  ic_wave_line_bottom,
  ic_wave_line_top,
  iconClose,
} from '@images';
import BarchartOnboarding, {keyItem} from './components/BarchartOnboarding';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {
  event,
  eventType,
  getColorPregnancy,
  trackEventBranch,
  trackingAppEvent,
} from '@util';
import {trackCustomEvent} from '../../../services/webengageManager';

import {NavigationUtils} from '@navigation';
import {NavigationProp, RouteProp} from '@react-navigation/core/src/types';
import LineChart from './components/LineChart';
import Svg, {Line} from 'react-native-svg';

interface OnboardingFinishedProps {}

const OnboardingFinished = (props: OnboardingFinishedProps) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state.auth.lang);
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const route = useRoute<RouteProp<any>>();
  console.log('=>(OnboardingFinished.tsx:31) route', route);

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
  const getLabel = (type: string) => {
    switch (type) {
      case 'love_and_money':
        return lang == 1 ? 'Love & Money' : 'Tài chính & Gia đình';
      case 'newborn_care':
        return lang == 1 ? 'Baby Care' : 'Chăm sóc con yêu';
      case 'core':
        return lang == 1 ? 'Pregnancy Basics' : 'Kiến thức thai kỳ';
      case 'nutrition_and_fitness':
        return lang == 1 ? 'Fitness & Nutrition' : 'Thể chất & Dinh dưỡng';
    }
  };

  const compareValue = (type: string) => {
    let data: any = route.params?.metadata;
    let list = Object.keys(data)
      .filter(key => keyItem?.includes(key))
      .map((key: any) => ({
        key: key,
        value: data[key],
      }));
    let min = Math.min(...list.map(item => item.value));
    let result = list.filter(item => item.value === min);

    return result.some(item => item.key == type);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container2}>
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
        </View>

        <View style={styles.container3}>
          <View style={{top: -8, paddingBottom: 2}}>
            <Image
              source={ic_wave_line_top}
              style={{width: '100%', tintColor: colors.white}}
            />
          </View>

          <Text style={styles.textTitleChart2}>
            {t('pregnancyProgram.yourResults')}
          </Text>
          <View style={styles.containerChart}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                flex: 1,
              }}>
              <View style={{}}>
                <Text style={[{paddingTop: 23}, styles.textLeft]}>
                  {getLabel('core')}
                </Text>
                <Text style={[{paddingTop: 25}, styles.textLeft]}>
                  {getLabel('nutrition_and_fitness')}
                </Text>
                <Text style={[{paddingTop: 26}, styles.textLeft]}>
                  {getLabel('newborn_care')}
                </Text>
                <Text style={[{paddingTop: 26}, styles.textLeft]}>
                  {getLabel('love_and_money')}
                </Text>
              </View>
              <View style={{flex: 1, paddingLeft: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: 7,
                  }}>
                  <Text style={styles.textSub}>
                    {t('pregnancyProgram.newbie')}
                  </Text>
                  <Text style={styles.textSub}>
                    {t('pregnancyProgram.expert')}
                  </Text>
                </View>
                <LineChart
                  isWarning={true}
                  value={route.params?.score / 2}
                  max={route.params?.score}
                />
                <LineChart
                  isWarning={compareValue('nutrition_and_fitness')}
                  value={route.params?.metadata?.nutrition_and_fitness}
                  max={route.params?.score}
                />
                <LineChart
                  isWarning={compareValue('newborn_care')}
                  value={route.params?.metadata?.newborn_care}
                  max={route.params?.score}
                />
                <LineChart
                  isWarning={compareValue('love_and_money')}
                  value={route.params?.metadata?.love_and_money}
                  max={route.params?.score}
                />
                <Svg style={styles.line} fill="none">
                  <Line
                    stroke={colors.pink300}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="2 6"
                    x1="10"
                    y1="0"
                    x2="10"
                    y2={'200%'}
                  />
                </Svg>
              </View>
            </View>
            <View
              style={{
                paddingBottom: 20,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: scaler(18),
                  fontWeight: '600',
                  ...stylesCommon.fontWeight600,
                  paddingBottom: 5,
                }}>
                {t('pregnancyProgram.attention')}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  paddingHorizontal: 15,
                  fontSize: scaler(15),
                  fontWeight: '400',
                  ...stylesCommon.fontSarabun400,
                }}>
                {t('pregnancyProgram.importantAttention')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{backgroundColor: colors.white}}>
        <Image
          source={{
            uri:
              lang == 1
                ? 'https://s3.ap-southeast-1.amazonaws.com/matida/1706621569146254279.png'
                : 'https://s3.ap-southeast-1.amazonaws.com/matida/1706626778111955246.png',
          }}
          style={{
            width: widthScreen - 40,
            aspectRatio: 6 / 2,
            alignSelf: 'center',
          }}
        />
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
                tintColor: colors.pink350,
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
    </View>
  );
};

export default OnboardingFinished;

const styles = StyleSheet.create({
  textSub: {
    fontSize: scaler(13),
    fontWeight: '500',
    color: colors.labelColor,
    ...stylesCommon.fontSarabun500,
  },
  line: {
    width: 20,
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    alignSelf: 'center',
    zIndex: 100,
  },
  textLeft: {
    fontSize: scaler(16),
    fontWeight: '500',
    lineHeight: scaler(20),
    ...stylesCommon.fontWeight500,
  },
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
    marginTop: 30,
  },
  textTitle: {
    fontSize: scaler(18),
    color: colors.labelColor,
    textAlign: 'center',
    ...stylesCommon.fontWeight500,
  },
  textTitle2: {
    fontSize: scaler(22),
    textAlign: 'center',
    color: colors.textColor,
    marginTop: scaler(8),
    ...stylesCommon.fontWeight600,
  },
  container3: {
    backgroundColor: colors.white,
    flex: 1,
    marginTop: '8%',
  },
  textTitleChart: {
    fontSize: scaler(22),
    fontWeight: '600',
    textAlign: 'center',
    marginTop: scaler(20),
    ...stylesCommon.fontWeight600,
  },
  textTitleChart2: {
    fontSize: scaler(18),
    fontWeight: '600',
    textAlign: 'center',
    color: colors.neutral10,
    marginTop: scaler(5),
    ...stylesCommon.fontWeight600,
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
