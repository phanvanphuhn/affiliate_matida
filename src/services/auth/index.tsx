import api from '../api';

const SIGN_UP_PHONE_NUMBER = '/auth/register/phonenumber';
const VERIFY_PHONE = '/auth/active/phonenumber';
const VERIFY_LOGIN = '/auth/verify/login';
const RESEND_CODE = '/sms/resend-code';
const LOGIN_WITH_PHONENUMBER = '/auth/login/phonenumber';
const LOGIN_FACEBOOK = '/auth/login/facebook';
const LOGIN_ZALO = '/auth/login/zalo';
const LOGIN_APPLE = 'auth/login/apple';
const ON_BOARDING = 'questions/onboarding';
const ANSWER_ONBOARDING = 'user-answer/onboarding/';

export const signUpPhone: any = async (data: any) => {
  const response = await api.post(SIGN_UP_PHONE_NUMBER, data);
  return response;
};

export const verifyPhone: any = async (data: any) => {
  const response = await api.post(VERIFY_PHONE, data);
  return response;
};

export const resendCode: any = async (data: any) => {
  const response = await api.post(RESEND_CODE, data);
  return response;
};

export const loginWithPhone: any = async (data: any) => {
  const response = await api.post(LOGIN_WITH_PHONENUMBER, data);
  return response;
};

export const verifyLogin: any = async (data: any) => {
  const response = await api.post(VERIFY_LOGIN, data);
  return response;
};

export const loginFacebook: any = async (data: any) => {
  const body = {
    access_token: data,
  };
  const response = await api.post(LOGIN_FACEBOOK, body);
  return response;
};

export const loginZalo: any = async (data: any) => {
  const body = {
    access_token: data,
  };
  const response = await api.post(LOGIN_ZALO, body);
  return response;
};

export const loginApple: any = async (data: any) => {
  const body = {
    access_token: data,
  };
  const response = await api.post(LOGIN_APPLE, body);
  return response;
};

export const getQuestionOnboarding: any = async () => {
  const response = await api.get(ON_BOARDING);
  return response;
};

export const postAnswerOnboarding: any = async (id: any, data: any) => {
  const response = await api.post(`${ANSWER_ONBOARDING}${id}`, data);
  return response;
};
