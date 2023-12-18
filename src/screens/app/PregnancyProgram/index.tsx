import React, {useCallback, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ListRenderItem,
  ScrollView,
} from 'react-native';
import {colors, heightScreen, scaler, widthScreen} from '@stylesCommon';
import {AppHeader, Header} from '@component';
import ListFeed from '../Feed/components/ListFeed';
import {HeaderComponent} from '../MomTest/TestResult/components';
import {ViewButtonHeader} from '../NotificationList/components';
import {
  bg_pp,
  ic_back,
  ic_back_arrow,
  ic_gift,
  ic_smile,
  SvgArrowLeft,
  SvgLineWave,
} from '@images';
import {useTranslation} from 'react-i18next';
import {clearDataDetailPost} from '@redux';
import {useNavigation} from '@react-navigation/native';
import SnapCarousel from 'react-native-snap-carousel';
import TabProgram from './components/TabProgram';
import DashedLine from './components/DashedLine';
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

  const onCheckOut = () => {
    navigation.navigate(ROUTE_NAME.ABOUT_PROGRAM);
  };
  const onGift = () => {
    navigation.navigate(ROUTE_NAME.MOM_DIARY);
  };
  return (
    <View style={styles.container}>
      <Header
        title={'Cool Mom, Happy Baby'}
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
        ComponentRight={
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
        }
        onPressLeft={goBack}
      />
      <ScrollView nestedScrollEnabled={true}>
        <View
          style={{
            backgroundColor: colors.blue,
            paddingTop: 15,
            zIndex: 100,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: scaler(15),
              fontWeight: '500',
              color: colors.white,
              marginBottom: 10,
            }}>
            Have questions about this course?{' '}
            <Text
              onPress={onCheckOut}
              style={{
                textDecorationLine: 'underline',
              }}>
              Check this out
            </Text>
          </Text>
          <View style={{bottom: -8}}>
            <SvgLineWave color={colors.pink250} />
          </View>
        </View>
        <ListWeek />
        <Image
          style={{
            width: '100%',
            aspectRatio: 3 / 2,
          }}
          source={bg_pp}
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
  },
  textTitle2: {
    fontSize: scaler(14),
    fontWeight: '400',
    color: colors.labelColor,
    marginTop: 5,
    marginBottom: scaler(10),
  },
});
