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

interface PregnancyProgramProps {}

const PregnancyProgram = (props: PregnancyProgramProps) => {
  const [state, setState] = useState();
  const navigation = useNavigation<any>();

  const {t} = useTranslation();
  const goBack = () => {
    navigation.goBack();
  };

  const onGift = () => {
    navigation.navigate(ROUTE_NAME.MOM_DIARY);
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
            <TouchableOpacity style={{paddingLeft: 10}} onPress={onGift}>
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
        <ListWeek />
        <Image
          style={{
            width: '100%',
            aspectRatio: 3 / 2,
          }}
          source={{
            uri: 'https://s3.ap-southeast-1.amazonaws.com/matida/1703522103400421184.png',
          }}
        />
        <View style={styles.container2}>
          <View style={styles.center}>
            <Text style={styles.textTitle}>You are now in week 5</Text>
            <Text style={styles.textTitle2}>37 weeks to go. You got this!</Text>
          </View>
          <TabProgram />
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
