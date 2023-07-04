import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ROUTE_NAME} from './routeName';
import {screens} from '../screens';

import {Tabbar} from '@component';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const StackTab = () => {
  const renderTabHome = () => {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={ROUTE_NAME.HOME} component={screens.Home} />
        <Stack.Screen
          name={ROUTE_NAME.WEEKLY_ARTICLES}
          component={screens.WeeklyArticles}
        />
      </Stack.Navigator>
    );
  };
  //Render ra bottomTab
  return (
    <Tab.Navigator
      //Custom bottomTab
      tabBar={props => <Tabbar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTE_NAME.TAB_HOME}>
      <Tab.Screen name={ROUTE_NAME.TAB_HOME} component={screens.Home} />
      <Tab.Screen name={ROUTE_NAME.TAB_EXPLORE} component={screens.Explore} />
      <Tab.Screen
        name={ROUTE_NAME.TAB_COMMUNITY}
        component={screens.Community}
      />
      <Tab.Screen name={ROUTE_NAME.TAB_LIVETALK} component={screens.LiveTalk} />
    </Tab.Navigator>
  );
};

export default StackTab;
