import {CommonActions, StackActions} from '@react-navigation/native';

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
  if (_navigator.canGoBack()) {
    _navigator.dispatch(CommonActions.goBack());
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

export const NavigationUtils = {
  navigate,
  setTopLevelNavigator,
  goBack,
  pop,
  reset
};
