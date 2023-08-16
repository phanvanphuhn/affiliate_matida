import axios from 'axios';
import {describeSuccessResponse, describeErrorResponse} from './logger';
import {showMessage} from 'react-native-flash-message';
import {store} from '../redux/store';
import {NavigationUtils} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {logOut} from '@redux';
import {colors} from '@stylesCommon';
import {BASEURL} from '@util';
// import {BASEURL} from '@env';

const api = axios.create();

export const WEB_API_KEY = 'AIzaSyC97bqy22ssFYx7piwjAB5yFhaqoXfTEX4';
export const DEEP_LINK = 'https://matida.page.link';
export const OLD_DEEP_LINK = 'https://matida1.page.link';

api.interceptors.request.use(
  async (config: any) => {
    config.baseURL = BASEURL;
    const state = store.getState();
    //@ts-ignore
    const token = state?.auth?.token;
    config.lang = state?.auth?.lang === 2 ? 'vi' : 'en';
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...config.headers,
      };
    }
    if (config?.method?.toUpperCase() === 'GET') {
      config.params = {...config.params};
    }
    config.headers = {
      ...config.headers,
      lang: state?.auth?.lang === 2 ? 'vi' : 'en',
    };
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  //response success
  function (response: any) {
    //Hàm log trả về response (Có thể bật và tắt trong file logger)
    describeSuccessResponse(response);
    try {
      return response?.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  //error
  function (error) {
    const {errors} = error?.response?.data;
    if (error?.response?.status == 401 || error?.response?.data?.code === 401) {
      // showMessage({
      //   message: errors ? errors?.toString() : 'Network Error',
      //   type: 'danger',
      // });
      store.dispatch(logOut());
    } else {
      // showMessage({
      //   message: errors ? errors?.toString() : 'Network Error',
      //   type: 'default',
      //   backgroundColor: colors.error_message,
      //   color: '#FFFFFF',
      // });
    }

    //Hàm log trả về error (Có thể bật và tắt trong file logger)
    describeErrorResponse(error);
    return Promise.reject(error);
  },
);

export default api;
