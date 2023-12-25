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
  const [currentWeek, setCurrentWeek] = useState(0);
  const navigation = useNavigation<any>();
  const week = useSelector((state: any) => state?.home?.week);

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
        title={'Cool Mom, Happy Baby'}
        ComponentRight={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={onGift}>
              <Image
                source={ic_gift}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: colors.black10,
                }}
              />
            </TouchableOpacity>
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
          source={bg_pp}
        />
        <View style={styles.container2}>
          <View style={styles.center}>
            <Text style={styles.textTitle}>You are now in week {week}</Text>
            <Text style={styles.textTitle2}>
              {42 - week} weeks to go. You got this!
            </Text>
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
    fontWeight: '600',
    ...stylesCommon.fontWeight600,
  },
  textTitle2: {
    fontSize: scaler(14),
    fontWeight: '400',
    color: colors.labelColor,
    marginTop: 5,
    marginBottom: scaler(10),
    ...stylesCommon.fontSarabun400,
  },
});
