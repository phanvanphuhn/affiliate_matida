import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {screens} from '../screens';
import {ROUTE_NAME} from './routeName';

import {Tabbar} from '@component';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PregnancyProgram from '../screens/app/PregnancyProgram';
import {navigate} from './NavigationUtils';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const StackTab = () => {
  //Render ra bottomTab
  const user = useSelector((state: any) => state?.auth?.userInfo);

  return (
    <Tab.Navigator
      //Custom bottomTab
      tabBar={props => <Tabbar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={
        user?.user_subscriptions?.some(e => e.code == 'PP')
          ? ROUTE_NAME.PREGNANCY_PROGRAM
          : ROUTE_NAME.TAB_HOME
      }>
      <Tab.Screen name={ROUTE_NAME.TAB_HOME} component={screens.Home} />
      <Tab.Screen name={ROUTE_NAME.TAB_FEED} component={screens.Feed} />
      {/* <Tab.Screen name={ROUTE_NAME.TAB_EXPLORE} component={screens.Explore} /> */}
      <Tab.Screen
        name={
          user?.user_subscriptions?.some(e => e.code == 'PP')
            ? ROUTE_NAME.PREGNANCY_PROGRAM
            : ROUTE_NAME.NEW_USER_PROGRAM
        }
        component={
          user?.user_subscriptions?.some(e => e.code == 'PP')
            ? screens.PregnancyProgram
            : screens.NewUserProgram
        }
        options={{
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen name={ROUTE_NAME.TAB_COMMUNITY} component={screens.Forum} />
      <Tab.Screen name={ROUTE_NAME.TAB_DEAL} component={screens.Deal} />
      {/* <Tab.Screen name={ROUTE_NAME.TAB_LIVETALK} component={screens.LiveTalk} /> */}
    </Tab.Navigator>
  );
};

export default StackTab;
