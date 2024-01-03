import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {Header} from '@component';
import {bg_pp, ic_gift, ic_info} from '@images';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import TabProgram from './components/TabProgram';
import ListWeek from './components/ListWeek';
import {ROUTE_NAME} from '@routeName';
import {useSelector} from 'react-redux';

interface PregnancyProgramProps {}

const PregnancyProgram = (props: PregnancyProgramProps) => {
  const navigation = useNavigation<any>();
  const week = useSelector((state: any) =>
    !state?.home?.weekUserTask || state?.home?.weekUserTask <= 4
      ? 4
      : state?.home?.weekUserTask,
  );
  const [currentWeek, setCurrentWeek] = useState(week);
  const lang = useSelector((state: any) => state?.auth?.lang);

  const {t} = useTranslation();
  const goBack = () => {
    navigation.goBack();
  };

  const onGift = () => {
    navigation.navigate(ROUTE_NAME.MOM_DIARY);
  };
  const onAbout = () => {
    navigation.navigate(ROUTE_NAME.ABOUT_PROGRAM);
  };
  return (
    <View style={styles.container}>
      <Header
        title={'Matida Masterclass'}
        ComponentRight={
          <View style={{flexDirection: 'row'}}>
            {/*<TouchableOpacity onPress={onGift} disabled={true}>*/}
            {/*  <Image*/}
            {/*    source={ic_gift}*/}
            {/*    style={{*/}
            {/*      height: 30,*/}
            {/*      width: 30,*/}
            {/*      tintColor: colors.black10,*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</TouchableOpacity>*/}
            <TouchableOpacity style={{paddingLeft: 10}} onPress={onAbout}>
              <Image
                source={ic_info}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: colors.black10,
                }}
              />
            </TouchableOpacity>
          </View>
        }
        onPressLeft={goBack}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ListWeek onSelectedWeek={setCurrentWeek} />
        <Image
          style={{
            width: '100%',
            aspectRatio: 3 / 2,
          }}
          source={{
            uri:
              lang == 1
                ? 'https://s3.ap-southeast-1.amazonaws.com/matida/1703522103400421184.png'
                : 'https://s3.ap-southeast-1.amazonaws.com/matida/1703834983521123611.png',
          }}
        />
        <View style={styles.container2}>
          <View style={styles.center}>
            <Text style={styles.textTitle}>
              {t('pregnancyProgram.youAreNow')} {currentWeek || week}
            </Text>
            {(currentWeek || week) == 40 ? (
              <View style={{height: 25}} />
            ) : (
              <Text style={styles.textTitle2}>
                {lang == 2 && 'Mẹ còn'} {40 - (currentWeek || week)}{' '}
                {t('pregnancyProgram.weekToGo')}
              </Text>
            )}
          </View>
          <TabProgram currentWeek={currentWeek} />
        </View>
      </ScrollView>
    </View>
  );
};

export default PregnancyProgram;

const styles = StyleSheet.create({
  container: {backgroundColor: colors.white, flex: 1},
  container2: {flex: 1, paddingTop: scaler(15)},
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: scaler(20),
    ...stylesCommon.fontWeight600,
  },
  textTitle2: {
    fontSize: scaler(14),
    color: colors.labelColor,
    marginTop: 5,
    marginBottom: scaler(10),
    ...stylesCommon.fontSarabun400,
  },
});
