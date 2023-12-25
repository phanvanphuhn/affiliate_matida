import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ListProgram from './ListProgram';
import {
  colors,
  heightScreen,
  scaler,
  stylesCommon,
  widthScreen,
} from '@stylesCommon';
import PagerView from 'react-native-pager-view';

interface TabProgramProps {
  currentWeek: number;
}
const TabProgram = (props: TabProgramProps) => {
  const [tabIndex, setIndex] = useState<number>(0);

  const [routes] = React.useState([
    {key: 'todo', title: 'To do'},
    {key: 'finished', title: 'Finished'},
  ]);
  const onIndexChange = (index: number) => {
    setIndex(index);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.containerTab}>
        {routes.map((route, index) => {
          const isFocused = index === tabIndex;
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => {
                onIndexChange(index);
              }}
              style={[
                styles.buttonTab,
                isFocused
                  ? {backgroundColor: colors.pink200}
                  : {backgroundColor: colors.gray350},
              ]}>
              <Text
                style={[
                  styles.textTab,
                  isFocused
                    ? {color: colors.white, fontWeight: '600'}
                    : {
                        fontWeight: '500',
                      },
                ]}>
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ListProgram tabIndex={tabIndex} currentWeek={props?.currentWeek} />
    </View>
  );
};

export default TabProgram;

const styles = StyleSheet.create({
  container: {},
  buttonTab: {
    backgroundColor: colors.pink200,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    borderRadius: 20,
  },
  containerTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray350,
    alignSelf: 'center',
    borderRadius: 20,
  },
  tabbar: {
    backgroundColor: colors.gray350,
    height: scaler(36),
    width: '50%',
  },
  tabStyle: {},
  textTab: {
    textAlign: 'center',
    fontSize: scaler(13),
    color: colors.gray50,
    ...stylesCommon.fontSarabun600,
  },
  indicatorStyle: {
    height: '100%',
    width: '100%',
    borderRadius: scaler(40),
    backgroundColor: colors.pink200,
  },
  textStatusDetail: {
    paddingTop: scaler(10),
    paddingLeft: scaler(32),
    color: colors.textColor,
  },
});
