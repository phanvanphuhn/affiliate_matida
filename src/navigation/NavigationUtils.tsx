import {CommonActions, StackActions} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import reactotron from 'reactotron-react-native';
import {store} from '../redux/store';

let _navigator: any; // eslint-disable-line

export function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

export function navigate(routeName: any, params?: any) {
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}

export function goBack() {
  const isLogin = store.getState().auth.statusLogin;
  reactotron.log?.(_navigator.canGoBack(), isLogin);
  if (_navigator.canGoBack()) {
    _navigator.dispatch(CommonActions.goBack());
  } else {
    if (isLogin) {
      reset(ROUTE_NAME.SCREEN_TAB);
    } else {
      reset(ROUTE_NAME.INTRO);
    }
  }
}

function reset(routeName: any) {
  _navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: routeName,
        },
      ],
    }),
  );
}

function pop(value: any) {
  _navigator.dispatch(StackActions.pop(value));
}

function push(routeName: any, params?: any) {
  _navigator.dispatch(StackActions.push(routeName, params));
}

export const NavigationUtils = {
  navigate,
  setTopLevelNavigator,
  goBack,
  pop,
  reset,
  push,
};
