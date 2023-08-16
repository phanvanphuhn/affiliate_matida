import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, heightScreen, widthScreen} from '@stylesCommon';
import TitleFeed from './TitleFeed';
import DoubleClick from './DoubleClick';
import {IAnswers, IDataListFeed} from '../../Feed/type';
import {useDispatch, useSelector} from 'react-redux';
import {useVideo} from './Container';
import {answerDailyQuiz, GlobalService} from '@services';
import {updateDataHome} from '@redux';
import ModalResultQuiz from './ModalResultQuiz';
import {useToast} from 'react-native-toast-message/lib/src/useToast';
import {err} from 'react-native-svg/lib/typescript/xml';
import {showMessage} from 'react-native-flash-message';

interface QuizFeedProps {
  item: IDataListFeed;
  isFocused: boolean;
}
const QuizFeed = (props: QuizFeedProps) => {
  const {setState} = useVideo();
  const [answer, setAnswer] = useState<IAnswers>();
  const [isVisible, setIsvisible] = useState<boolean>(false);
  const lang = useSelector((state: any) => state.auth.lang);
  const data = useSelector((state: any) => state?.home?.data?.dailyQuizz);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.isFocused) {
      setState({feed: props.item});
    } else {
    }
    return () => {};
  }, [props.isFocused]);
  const onAnswerQuiz = async (e: IAnswers) => {
    try {
      setAnswer(e);
      let params = {
        question_id: props.item.id,
        answer_id: e.id,
      };
      GlobalService.showLoading();
      const res = await answerDailyQuiz(params);
      setIsvisible(true);
      dispatch(
        updateDataHome({
          ...data,
          dailyQuizz: {
            ...data?.dailyQuizz,
            ...res.data,
          },
        }),
      );
      GlobalService.hideLoading();
    } catch (error) {
      showMessage({message: error?.response?.data?.message, type: 'danger'});
      GlobalService.hideLoading();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.container2}>
          <Text style={styles.textQuestion}>
            {lang == 1 ? props.item.question_en : props.item.question_vi}
          </Text>
          <View style={styles.containerAnswer}>
            {props.item.answers.map((e, i) => {
              return (
                <TouchableOpacity
                  onPress={() => onAnswerQuiz(e)}
                  style={[
                    styles.buttonAnswer,
                    {marginRight: i == 0 ? '10%' : 0},
                    answer?.id == e.id
                      ? {backgroundColor: e.is_correct ? '#B1D39D' : '#EE999A'}
                      : {},
                  ]}>
                  <Text style={styles.textAnswer}>
                    {lang == 1 ? e.answer_en : e.answer_vi}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
      <ModalResultQuiz isVisible={isVisible} setIsVisible={setIsvisible} />
    </>
  );
};

export default QuizFeed;

const styles = StyleSheet.create({
  textAnswer: {
    fontSize: 16,
  },
  buttonAnswer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E4E4E4',
    borderWidth: 1,
  },
  containerAnswer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '20%',
  },
  textQuestion: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 28,
  },
  container2: {
    backgroundColor: '#FBFBFF',
    borderRadius: 32,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    paddingTop: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
