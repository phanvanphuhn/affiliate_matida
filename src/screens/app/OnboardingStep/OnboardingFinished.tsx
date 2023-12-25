import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SvgLineWave} from '@images';
import BarchartOnboarding from './components/BarchartOnboarding';

interface OnboardingFinishedProps {}

const OnboardingFinished = (props: OnboardingFinishedProps) => {
  const [state, setState] = useState();
  const navigation = useNavigation<any>();

  const onNext = () => {
    navigation.navigate(ROUTE_NAME.TEASER_PROGRAM);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.container2}>
        <Text style={styles.textTitle}>
          We have identified your challenges.
        </Text>
        <Text style={styles.textTitle2}>
          But don't worry. You still have time to improve.
        </Text>
      </SafeAreaView>

      <View style={styles.container3}>
        <View
          style={{
            top: -8,
          }}>
          <SvgLineWave />
        </View>

        <Text style={styles.textTitleChart}>Here’s what we'll focus on</Text>
        <Text style={styles.textTitleChart2}>
          You can always adjust it later
        </Text>
        <View style={styles.containerChart}>
          <BarchartOnboarding />
        </View>

        <View style={styles.container4}>
          <View style={{top: -8, paddingBottom: scaler(40)}}>
            <SvgLineWave color={colors.blue50} />
          </View>
          <TouchableOpacity onPress={onNext} style={styles.buttonFinish}>
            <Text style={styles.textFinish}>Let's work on it together</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingHorizontal: scaler(20),
    paddingTop: scaler(33),
  },
  textTitle: {
    fontSize: scaler(20),
    fontWeight: '500',
    color: colors.labelColor,
    textAlign: 'center',
    ...stylesCommon.fontWeight500,
  },
  textTitle2: {
    fontSize: scaler(26),
    fontWeight: '600',
    textAlign: 'center',
    color: colors.textColor,
    marginTop: scaler(8),
    paddingHorizontal: scaler(20),
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
    paddingVertical: scaler(13),
    alignSelf: 'center',
    width: '85%',
    borderRadius: scaler(50),
  },
  textFinish: {
    fontSize: scaler(15),
    fontWeight: '600',
    ...stylesCommon.fontSarabun600,
  },
});
