import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {screens} from '../screens';
import {ROUTE_NAME} from './routeName';

import {Tabbar} from '@component';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PregnancyProgram from '../screens/app/PregnancyProgram';
import {navigate} from './NavigationUtils';
import {TouchableOpacity} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const StackTab = () => {
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
      <Tab.Screen name={ROUTE_NAME.TAB_FEED} component={screens.Feed} />
      {/* <Tab.Screen name={ROUTE_NAME.TAB_EXPLORE} component={screens.Explore} /> */}
      <Tab.Screen
        name={ROUTE_NAME.PREGNANCY_PROGRAM}
        component={screens.PregnancyProgram}
      />
      <Tab.Screen name={ROUTE_NAME.TAB_COMMUNITY} component={screens.Forum} />
      <Tab.Screen name={ROUTE_NAME.TAB_DEAL} component={screens.Deal} />
      {/* <Tab.Screen name={ROUTE_NAME.TAB_LIVETALK} component={screens.LiveTalk} /> */}
    </Tab.Navigator>
  );
};

export default StackTab;
