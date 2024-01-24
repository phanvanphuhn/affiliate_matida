import api from '../api';

const SUBSCRIPTION_PLANS = 'subscription-plans/';
const QUESTION_ONBOARDING = 'package-quizz/pregnancy-program';
const ANSWER_ONBOARDING = 'user-answer/pregnancy-program';
const PACKAGE_QUIZZ = 'package-quizz';
const USER_TASK = 'user-tasks';
const USER_CONFIRM = 'subscription-plans/request/confirm';
const USER_FEEDBACK = 'user-feedback';
const CHANGE_PAYMENT_METHOD =
  'subscription-plans/request/change-payment-method';

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
export const getContentUserTask: any = async (id: string) => {
  const response = await api.get(`${USER_TASK}/content/${id}`, {});
  return response;
};
export const markAsCompleted: any = async (data: any) => {
  const response = await api.post(`${USER_TASK}/mark-as-completed`, data);
  return response;
};
export const getProgressWeek: any = async () => {
  const response = await api.get(`${USER_TASK}/progress`);
  return response;
};
export const userConfirm: any = async (data: any) => {
  const response = await api.post(`${USER_CONFIRM}`, data);
  return response;
};
export const userCreateFeedBack: any = async (data: any) => {
  const response = await api.post(`${USER_FEEDBACK}`, data);
  return response;
};
export const getFeedBacks: any = async (data: any) => {
  const response = await api.get(`${USER_FEEDBACK}`, {params: data});
  return response;
};

export const changePaymentMethod: any = async (data: any) => {
  const response = await api.post(CHANGE_PAYMENT_METHOD, data);
  return response;
};
