import api from '../api';

const SUBSCRIPTION_PLANS = 'subscription-plans/';
const QUESTION_ONBOARDING = 'package-quizz/pregnancy-program';
const ANSWER_ONBOARDING = 'user-answer/pregnancy-program';
const PACKAGE_QUIZZ = 'package-quizz';
const USER_TASK = 'user-tasks';

export const getPlanByCode: any = async () => {
  const response = await api.get(`${SUBSCRIPTION_PLANS}code/PP`);
  return response;
};

export const requestSubcribePlan: any = async (data: any) => {
  const response = await api.post(`${SUBSCRIPTION_PLANS}request`, data);
  return response;
};

export const getQuestionOnboarding: any = async () => {
  const response = await api.get(`${QUESTION_ONBOARDING}`);
  return response;
};

export const submitAnswerOnboarding: any = async (
  data: any,
  userAnswerId: number,
) => {
  const response = await api.post(`${ANSWER_ONBOARDING}/${userAnswerId}`, {
    data,
  });
  return response;
};
export const getPackageQuizzWithId: any = async (id: number) => {
  const response = await api.get(`${PACKAGE_QUIZZ}/${id}`);
  return response;
};
export const getUserTask: any = async (week: number, status: string) => {
  const response = await api.get(`${USER_TASK}`, {
    params: {
      week,
      status,
    },
  });
  return response;
};
