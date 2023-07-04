import api from '../api';

const ANSWER_DAILY_QUIZ = 'user-answer/daily-quizz';
const MOM_PREP_TEST = 'package-quizz/own';
const TEST_DETAIL = 'package-quizz';
const TEST_SUBMIT = 'user-answer/package-quizz';
const LIST_REWARD_USER = 'user-badget';
const TEST_HISTORY = 'package-quizz/history';

export const answerDailyQuiz: any = async (body: any) => {
  const response = await api.post(ANSWER_DAILY_QUIZ, body);
  return response;
};

export const getListPeriodicTest: any = async (page: number) => {
  const response = await api.get(`${MOM_PREP_TEST}?page=${page}&limit=3`);
  return response;
};

export const getTestDetailById: any = async (id: any) => {
  const response = await api.get(`${TEST_DETAIL}/${id}`);
  return response;
};

export const postSubmitTest: any = async (id: any, params: any) => {
  const response = await api.post(`${TEST_SUBMIT}/${id}`, params);
  return response;
};

export const getAllAnswerById: any = async (id: any) => {
  const response = await api.get(`${TEST_SUBMIT}/${id}/history`);
  return response;
};

export const getListReward: any = async (user_id: any) => {
  const response = await api.get(`${LIST_REWARD_USER}/${user_id}?page=1&limit=10000`);
  return response;
};


export const getListHistoryTest: any = async (page: any) => {
  const response = await api.get(`${TEST_HISTORY}?page=${page}&limit=10`);
  return response;
};
