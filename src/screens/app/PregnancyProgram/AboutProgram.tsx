import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {ic_back_arrow, ic_gift} from '@images';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {Header} from '@component';
import {goBack} from '@navigation';
import About from './components/About';
import Experts from './components/Experts';
import FAQ from './components/FAQ';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
interface AboutProgramProps {}
const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);
const renderScene = SceneMap({
  about: About,
  experts: Experts,
  faq: FAQ,
});
const AboutProgram = (props: AboutProgramProps) => {
  const [state, setState] = useState();
  const layout = useWindowDimensions();
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'about', titleEn: 'About', titleVi: 'Khoá học'},
    {key: 'experts', titleEn: 'Experts', titleVi: 'Chuyên gia'},
    {key: 'faq', titleEn: 'FAQ', titleVi: 'Hỏi đáp'},
  ]);
  const renderTabBar = (props: any) => {
    return (
      <View
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <TabBar
          {...props}
          indicatorStyle={styles.indicatorStyle}
          tabStyle={styles.tabStyle}
          scrollEnabled
          activeColor={colors.pink300}
          inactiveColor={colors.gray550}
          style={styles.tabbar}
          pressColor={colors.transparent}
          renderLabel={({route, focused}) => {
            return (
              <Text
                style={{
                  ...styles.textTab,
                  fontWeight: focused ? '600' : '500',
                  color: focused ? colors.white : colors.gray550,
                }}>
                {lang == 2 ? route.titleVi : route.titleEn}
              </Text>
            );
          }}
        />
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Header
        title={t('pregnancyProgram.aboutTheProgram')}
        IconLeft={
          <Image
            source={ic_back_arrow}
            style={{
              height: 30,
              width: 30,
              tintColor: colors.black10,
            }}
          />
        }
        onPressLeft={goBack}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
        lazyPreloadDistance={0}
        swipeEnabled
      />
    </View>
  );
};

export default AboutProgram;

const styles = StyleSheet.create({
  container: {},
  tabbar: {
    backgroundColor: '#F6F6F9',
    height: scaler(40),
    borderRadius: 500,
    marginBottom: 20,
    marginTop: 10,
  },
  tabStyle: {
    width: widthScreen / 3.5,
  },
  textTab: {
    textAlign: 'center',
    fontSize: 13,
    paddingBottom: 5,
    ...stylesCommon.fontSarabun600,
  },
  indicatorStyle: {
    height: '100%',
    borderRadius: 500,
    backgroundColor: colors.pink200,
  },
});
