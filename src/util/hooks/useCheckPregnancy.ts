import React, {useState} from 'react';
import {getQuestionOnboarding} from '../../services/pregnancyProgram';
import {ROUTE_NAME} from '@routeName';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FeedbackTask from '../../screens/app/PregnancyProgram/FeedbackTask';

interface Props {}

const useCheckPregnancy = () => {
  const [state, setState] = useState();
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const navigation = useNavigation<any>();
  const getDataQuestion = async () => {
    let result = await getQuestionOnboarding();
    if (result?.data?.user_score?.score) {
      navigation.navigate(ROUTE_NAME.ONBOARDING_FINISHED, {
        metadata: result?.data?.user_score?.metadata,
        score: result?.data?.user_score?.score,
      });
    } else {
      navigation.navigate(ROUTE_NAME.ONBOARDING_STEP, {
        packageQuizz: result?.data?.package_quizz,
      });
    }
  };
  const checkPlan = () => {
    if (user.user_subscriptions.some(e => e.code == 'PP')) {
      navigation.navigate(ROUTE_NAME.PREGNANCY_PROGRAM);
    } else {
      if (user.payments.some(e => e.status == 'processing')) {
        navigation.navigate(ROUTE_NAME.COMPLETE_PAYMENT, {
          values: user.payments.find(e => e.status == 'processing'),
          isBack: true,
        });
      } else {
        getDataQuestion();
      }
    }
  };
  return checkPlan;
};

export default useCheckPregnancy;
