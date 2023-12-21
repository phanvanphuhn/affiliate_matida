import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  LayoutAnimation,
} from 'react-native';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import Container from '../DetailFeed/components/Container';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ic_back,
  SvgArrowCircleRight,
  SvgArrowLeft,
  SvgPathBottom,
  SvgPathTop,
} from '@images';
import ItemAnswer from './components/ItemAnswer';
import {goBack} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';

interface OnboardingStepProps {}
const Data = [
  {
    question: 'How much sleep is typical for a newborn in a 24-hour period?',
    answers: [
      {name: '8 to 10 hours'},
      {name: '12 to 14 hours'},
      {name: '14 to 17 hours'},
    ],
  },
  {
    question: "By which age has the baby's brain developed significantly?",
    answers: [
      {name: 'By 6 months'},
      {name: 'By 10 year'},
      {name: 'By 3 years'},
    ],
  },
  {
    question: 'How prepared do you feel for parenthood?',
    answers: [
      {name: 'I already have a comprehensive understanding of newborn care'},
      {
        name: 'I have some knowledge, but want to learn more on specific aspects',
      },
      {name: 'First time parent here looking for guidance on where to start'},
    ],
  },
  {
    question: 'What is your family / living situation?',
    answers: [
      {name: 'I am a single mom'},
      {name: 'I live with my partner / husband'},
      {name: 'I live with my family'},
    ],
  },
  {
    question: 'How would you describe your family dynamics?',
    answers: [
      {name: 'Generally harmonious'},
      {name: 'Some complexities, seeking guidance'},
      {name: 'Challenging family dynamics, in need of support'},
    ],
  },
  {
    question: 'How well do you communicate with your partner and / or family?',
    answers: [
      {name: 'Generally open and effective communication'},
      {name: 'Some communication challenges'},
      {name: 'Concerned about potential conflicts regarding parenting roles'},
    ],
  },
  {
    question: 'Are you aware of nutrition for fetal brain development?',
    answers: [
      {
        name: "Yes, I'm well-informed about foods supporting fetal brain development",
      },
      {name: 'I have some knowledge but would love to learn more'},
      {
        name: "I'm not sure, but I'm eager to discover which foods are beneficial",
      },
    ],
  },
  {
    question: 'How would you describe your exercise routine?',
    answers: [
      {name: 'I am an exercise pro'},
      {name: 'I work out sometimes'},
      {name: "I don't do any sports. Should I?"},
    ],
  },
  {
    question: 'Do you know about critical nutrients during pregnancy?',
    answers: [
      {
        name: "I'm familiar with the essential nutrients needed during pregnancy",
      },
      {name: 'I have a basic understanding and want to deepen my knowledge'},
      {
        name: "I'm not sure, but I'm excited to know more about crucial nutrients",
      },
    ],
  },
];

const answerKeys = ['A', 'B', 'C', 'D'];
const OnboardingStep = (props: OnboardingStepProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [listAnswer, setListAnswer] = useState<any>({});
  const navigation = useNavigation<any>();
  const onBackQuestion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

    if (currentQuestion == 0) {
      goBack();
    } else {
      setCurrentQuestion(curr => curr - 1);
    }
  };
  const onNextQuestion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

    if (currentQuestion == Data?.length - 1) {
      navigation.navigate(ROUTE_NAME.ONBOARDING_FINISHED);
    } else {
      setCurrentQuestion(curr => curr + 1);
    }
  };
  const onSelectAnswer = (e, i) => {
    setListAnswer(answer => ({...answer, [currentQuestion]: i}));
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
                {width: `${((currentQuestion + 1) / 9) * 100}%`},
              ]}
            />
          </View>
          <View style={styles.containerTextStep}>
            <Text style={styles.textStep}>
              {currentQuestion + 1}/{Data?.length}
            </Text>
            <Text style={styles.textStep}>Finish</Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.textQuestion}>
            {Data[currentQuestion].question}
          </Text>
          <View
            style={{
              flex: 1,
              paddingTop: scaler(50),
            }}>
            <SvgPathTop />
            <View
              style={{
                backgroundColor: colors.white,
                flex: 1,
              }}>
              {Data[currentQuestion].answers.map((answer, i) => {
                return (
                  <ItemAnswer
                    onSelected={() => onSelectAnswer(answer, i)}
                    title={answer.name}
                    answerKey={answerKeys[i]}
                    isSelected={i == (listAnswer[currentQuestion] ?? 1)}
                  />
                );
              })}
            </View>
            <View style={{marginTop: 1}}>
              <SvgPathBottom />
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
