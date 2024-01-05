import React from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ic_wave_bottom,
  ic_wave_top,
  SvgArrowLeft,
  SvgPathBottom,
} from '@images';
import ItemAnswer from './components/ItemAnswer';
import {goBack} from '@navigation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {
  getQuestionOnboarding,
  submitAnswerOnboarding,
} from '../../../services/pregnancyProgram';
import useStateCustom from '../../../util/hooks/useStateCustom';
import {GlobalService} from '@services';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {event, eventType, trackEventBranch, trackingAppEvent} from '@util';
import {trackCustomEvent} from '@services/webengageManager';

interface OnboardingStepProps {}
interface OnboardingStepAnswer {
  answer_en: string;
  answer_vi: string;
  created_at: string;
  id: number;
  is_correct: boolean;
  point: number;
  question_id: number;
  updated_at: string;
}
interface OnboardingStepQuestion {
  answers: OnboardingStepAnswer[];
  baby_type: string;
  category: string;
  created_at: string;
  date_show?: string;
  explain: string;
  id: number;
  is_passed: number;
  package_id: number;
  question_en: string;
  question_vi: string;
  type: number;
  updated_at: string;
}
interface IState {
  dataQuestion?: OnboardingStepQuestion[];
  currentQuestion?: number;
  userAnswerId?: number;
  answers?: object;
}
const answerKeys = ['A', 'B', 'C', 'D'];
const OnboardingStep = (props: OnboardingStepProps) => {
  const route = useRoute<any>();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const {t} = useTranslation();
  const user = useSelector((state: any) => state?.auth?.userInfo);

  const [state, setState] = useStateCustom<IState>({
    dataQuestion: route?.params?.packageQuizz?.questions || [],
    currentQuestion: 0,
    userAnswerId: route?.params?.packageQuizz?.id || 0,
    answers:
      route?.params?.packageQuizz?.questions?.reduce((a, b, i) => {
        a[i] = 1;
        return a;
      }, {}) || {},
  });
  const navigation = useNavigation<any>();

  const onSubmit = async () => {
    try {
      GlobalService.showLoading();
      let listAnswer: any = state.answers || {};
      let data = Object.keys(listAnswer).map((key: any) => {
        let value = listAnswer[key];
        return {
          question_id: state.dataQuestion?.[key]?.id,
          answer_id: state.dataQuestion?.[key]?.answers?.[value]?.id,
        };
      });
      let result = await submitAnswerOnboarding(data, state.userAnswerId);
      if (result.success) {
        navigation.navigate(ROUTE_NAME.ONBOARDING_FINISHED, {
          metadata: result?.data?.metadata,
          score: result?.data?.score,
        });
      } else {
      }
    } catch (error) {
      showMessage({
        message: error?.response?.data?.message,
        type: 'danger',
        backgroundColor: colors.primaryBackground,
      });
    } finally {
      GlobalService.hideLoading();
    }
  };
  const getDataQuestion = async () => {
    GlobalService.showLoading();
    let result = await getQuestionOnboarding();
    console.log('result: ', result);
    let listAnswer = {};
    result?.data.package_quizz?.questions.forEach((question, i) => {
      listAnswer[i] = 1;
    });
    setState({
      dataQuestion: result?.data?.package_quizz?.questions || [],
      answers: listAnswer,
      userAnswerId: result?.data?.package_quizz?.id,
    });
    GlobalService.hideLoading();
  };

  // useEffect(() => {
  //   getDataQuestion();
  // }, []);

  const onBackQuestion = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

    if (state?.currentQuestion == 0) {
      goBack();
    } else {
      setState({currentQuestion: (state.currentQuestion || 0) - 1});
    }
  };
  const onNextQuestion = () => {
    trackingAppEvent(
      `${event.MASTER_CLASS.PP_QUESTION}${(state.currentQuestion ?? 0) + 1}`,
      {id: user?.id},
      eventType.MIX_PANEL,
    );
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    if (state.currentQuestion == (state.dataQuestion || [])?.length - 1) {
      trackCustomEvent(event.MASTER_CLASS.USER_FINISH_ONBOARDING_QUESTIONS, {});
      trackEventBranch(event.MASTER_CLASS.USER_FINISH_ONBOARDING_QUESTIONS, {});
      onSubmit();
    } else {
      setState({
        currentQuestion: (state.currentQuestion ?? 0) + 1,
      });
    }
  };
  const onSelectAnswer = (e: OnboardingStepAnswer, i: number) => {
    setState({
      answers: {...state.answers, [state.currentQuestion ?? 0]: i},
    });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <View style={styles.container2}>
          <View style={styles.containerLineStep}>
            <View
              style={[
                styles.lineStep,
                {width: `${(((state.currentQuestion ?? 0) + 1) / 9) * 100}%`},
              ]}
            />
          </View>
          <View style={styles.containerTextStep}>
            <Text style={styles.textStep}>
              {(state.currentQuestion ?? 0) + 1}/{state?.dataQuestion?.length}
            </Text>
            <Text style={styles.textStep}>{t('newBorn.finish')}</Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.textQuestion}>
            {lang == 1
              ? (state?.dataQuestion || [])[state.currentQuestion ?? 0]
                  ?.question_en
              : (state?.dataQuestion || [])[state.currentQuestion ?? 0]
                  ?.question_vi}
          </Text>
          <View
            style={{
              flex: 1,
              paddingTop: scaler(50),
            }}>
            <Image
              source={ic_wave_top}
              style={{width: '100%', marginBottom: 0}}
            />
            <View
              style={{
                backgroundColor: colors.white,
                flex: 1,
              }}>
              {(state?.dataQuestion || [])[
                state.currentQuestion ?? 0
              ]?.answers.map((answer, i) => {
                return (
                  <ItemAnswer
                    key={i}
                    onSelected={() => onSelectAnswer(answer, i)}
                    title={lang == 1 ? answer.answer_en : answer.answer_vi}
                    answerKey={answerKeys[i]}
                    isSelected={
                      i ==
                      ((state.answers || {})[state.currentQuestion ?? 0] ?? 1)
                    }
                  />
                );
              })}
            </View>
            <View style={{marginTop: 0.9}}>
              <Image source={ic_wave_bottom} style={{width: '100%'}} />
            </View>
          </View>
        </View>

        <View style={styles.containerButtonStep}>
          <TouchableOpacity onPress={onBackQuestion} style={styles.buttonStep}>
            <SvgArrowLeft stroke={colors.textColor} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onNextQuestion}
            style={[
              styles.buttonStep,
              {
                backgroundColor: colors.pink200,
                transform: [{rotate: '180deg'}],
              },
            ]}>
            <SvgArrowLeft size={24} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OnboardingStep;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.pink250,
    flex: 1,
  },
  container2: {
    padding: scaler(20),
  },
  containerLineStep: {
    height: 4,
    width: '100%',
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  lineStep: {
    height: 4,
    width: '10%',
    borderRadius: 20,
    backgroundColor: colors.pink200,
  },
  containerTextStep: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scaler(8),
  },
  textStep: {
    fontSize: scaler(12),
    fontWeight: '500',
    color: colors.labelColor,
  },
  textQuestion: {
    fontSize: scaler(22),
    fontWeight: '600',
    color: colors.labelColor,
    textAlign: 'center',
    paddingHorizontal: scaler(20),
    ...stylesCommon.fontWeight600,
  },
  textAnswer: {
    textAlign: 'center',
    fontSize: scaler(17),
    fontWeight: '500',
    color: colors.borderColor,
  },
  containerButtonStep: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaler(20),
    paddingVertical: scaler(50),
  },
  buttonStep: {
    backgroundColor: colors.white,
    borderRadius: 50,
    padding: 12,
  },
});
