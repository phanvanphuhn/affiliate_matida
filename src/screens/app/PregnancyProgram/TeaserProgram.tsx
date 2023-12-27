import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {
  colors,
  heightScreen,
  scaler,
  stylesCommon,
  widthScreen,
} from '@stylesCommon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  SvgClose,
  SvgLineWave,
  SvgPathBottom,
  SvgPathTop,
  teaser1,
  teaser2,
  teaser3,
  teaser4,
} from '@images';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {setActive} from 'react-native-sound';
import {goBack} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import Swiper from '../DetailFeed/SwiperFlatlist/Swiper';
import ParsedText from 'react-native-parsed-text';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {useTranslation} from 'react-i18next';

interface TeaserProgramProps {
  isHome?: boolean;
}

const TeaserProgram = (props: TeaserProgramProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigation = useNavigation<any>();
  const {t} = useTranslation();

  const data = [
    {
      name: t('pregnancyProgram.directAccess'),
      description:
        'A support group with medical doctors\n& like-minded moms (to be)',
      icon: 'https://s3.ap-southeast-1.amazonaws.com/matida/1703522103400421184.png',
    },
    {
      name: t('pregnancyProgram.weeklyEffort'),
      description:
        "Learn all the pregnancy secrets\n that other moms don't know",
      icon: 'https://s3.ap-southeast-1.amazonaws.com/matida/1703091148471268187.png',
    },
    {
      name: t('pregnancyProgram.supportBaby'),
      description: 'Techniques & habits to\nbest develop your unborn child',
      icon: 'https://s3.ap-southeast-1.amazonaws.com/matida/1703091023669862042.png',
    },
    {
      name: t('pregnancyProgram.beTheBest'),
      description:
        'Personal guidance to understand\nyour strengths & weaknesses',
      icon: 'https://s3.ap-southeast-1.amazonaws.com/matida/1703091058887382131.png',
    },
    {
      name: t('pregnancyProgram.getDiscount'),
      description: 'Vouchers for family related\n shops and services',
      icon: 'https://s3.ap-southeast-1.amazonaws.com/matida/1703091086979230619.png',
    },
  ];

  const onSignUpNow = () => {
    navigation.navigate(ROUTE_NAME.UPDATE_INFORMATION, {});
  };
  const _renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.containerItem}>
        <Image
          source={{uri: item.icon}}
          style={{
            width: '100%',
            aspectRatio: 3 / 2.3,
          }}
        />
        <Text style={styles.textItemName}>{item.name}</Text>
        <ParsedText
          parse={[
            {
              pattern:
                /Vouchers|medical doctors\n& like-minded moms|Learn all the pregnancy secrets|best develop your unborn child|understand\nyour strengths & weaknesses/,
              style: styles.textItemDescBold,
            },
          ]}
          style={styles.textItemDesc}>
          {item.description}
        </ParsedText>
      </View>
    );
  };

  const onCheckOut = () => {
    navigation.navigate(ROUTE_NAME.ABOUT_PROGRAM);
  };
  const pagination = () => {
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: colors.pink200,
        }}
        inactiveDotStyle={{
          backgroundColor: colors.gray,
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
        containerStyle={{marginTop: 0, paddingTop: 0, paddingBottom: 10}}
      />
    );
  };
  return (
    <View style={[styles.container, {}]}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.containerHeader}>
          {!props?.isHome && (
            <TouchableOpacity
              onPress={goBack}
              hitSlop={{top: 20, right: 20, bottom: 20, left: 20}}
              style={styles.buttonClose}>
              <SvgClose color={colors.labelColor} />
            </TouchableOpacity>
          )}

          <Text style={styles.textTitle}>
            {t('pregnancyProgram.aioCourse')}
          </Text>
          <Text
            style={[
              styles.textTitle2,
              {
                marginTop: 10,
              },
            ]}>
            Matida Masterclass
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: widthScreen / 2 + (isIphoneX() ? 10 : 0),
          }}>
          <View
            style={{
              bottom: -8,
              zIndex: 10,
            }}>
            <SvgLineWave color={colors.pink350} />
          </View>
          <View
            style={{
              backgroundColor: colors.white,
              flex: 1,
              paddingTop: 8,
            }}>
            <Swiper
              index={activeSlide}
              horizontal={true}
              loop={false}
              removeClippedSubviews={true}
              loadMinimal={true}
              loadMinimalSize={10}
              lockScrollTimeoutDuration={250}
              nestedScrollEnabled={true}
              bounces={true}
              height={410}
              onIndexChanged={setActiveSlide}>
              {data?.map((item, index) => _renderItem({item, index}))}
            </Swiper>
            {pagination()}

            <View
              style={{
                bottom: -8,
              }}>
              <SvgLineWave color={colors.blue50} />
            </View>
          </View>
          <View style={styles.container3}>
            <Text
              style={{
                fontSize: scaler(15),
                ...stylesCommon.fontWeight400,
                marginBottom: scaler(15),
                textAlign: 'center',
              }}>
              {t('pregnancyProgram.haveQuestion')}{' '}
              <Text
                onPress={onCheckOut}
                style={{textDecorationLine: 'underline', fontWeight: '500'}}>
                {t('pregnancyProgram.checkThisOut')}
              </Text>
            </Text>
            <View style={styles.container4}>
              <View style={styles.container5}>
                <Text style={styles.textOff}>28% off</Text>
              </View>
              <Text style={styles.textPrice1}>
                499,000đ{' '}
                <Text
                  style={{
                    fontSize: scaler(13),
                    ...stylesCommon.fontSarabun600,
                  }}>
                  /{t('pregnancyProgram.liftTime')}
                </Text>
              </Text>
              <Text style={styles.textPriceOld}>
                <Text
                  style={{
                    textDecorationLine: 'line-through',
                    ...stylesCommon.fontSarabun400,
                  }}>
                  669,000đ
                </Text>
                /{t('pregnancyProgram.liftTime')}
              </Text>
            </View>
            <TouchableOpacity onPress={onSignUpNow} style={styles.buttonSignUp}>
              <Text style={styles.textButtonSignUp}>
                {t('pregnancyProgram.signUpEarly')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TeaserProgram;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pink350,
    borderRadius: scaler(16),
  },
  containerHeader: {
    backgroundColor: colors.yellow200,
    height: widthScreen,
    width: widthScreen,
    borderRadius: widthScreen / 2,
    borderColor: colors.white,
    borderWidth: 10,
    justifyContent: 'flex-end',
    paddingBottom: 60,
    transform: [{scaleX: 1.04}],
    alignItems: 'center',
    position: 'absolute',
    top: -widthScreen / 2 + (isIphoneX() ? 60 : 50),
  },
  buttonClose: {
    alignSelf: 'flex-end',
    paddingRight: scaler(16),
  },
  textTitle: {
    fontSize: scaler(20),
    color: colors.labelColor,
    textAlign: 'center',
    ...stylesCommon.fontWeight500,
  },
  textTitle2: {
    fontSize: scaler(26),
    color: colors.neutral10,
    textAlign: 'center',
    ...stylesCommon.fontWeight600,
  },
  container2: {
    backgroundColor: colors.yellow200,
    marginHorizontal: scaler(25),
    borderTopLeftRadius: scaler(24),
    borderTopRightRadius: scaler(24),
    paddingTop: scaler(20),
    paddingBottom: scaler(40),
    bottom: -10,
    marginTop: scaler(10),
  },
  textSpecial: {
    color: colors.pink300,
    fontSize: scaler(20),
    ...stylesCommon.fontWeight600,
    textAlign: 'center',
    marginBottom: scaler(10),
  },
  textPriceOld: {
    color: colors.gray550,
    fontSize: scaler(13),
    marginTop: 5,
    textAlign: 'center',
    ...stylesCommon.fontWeight400,
  },
  textPriceNew: {
    fontSize: scaler(24),
    ...stylesCommon.fontWeight600,
    color: colors.textColor,
    textAlign: 'center',
  },
  textPriceNew2: {
    fontSize: scaler(15),
    ...stylesCommon.fontWeight500,
  },
  buttonSignUp: {
    backgroundColor: colors.yellow200,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButtonSignUp: {
    fontSize: scaler(15),
    color: colors.labelColor,
    ...stylesCommon.fontWeight600,
  },
  container3: {
    marginBottom: scaler(35),
    marginTop: scaler(28),
    marginHorizontal: 25,
  },
  container4: {
    backgroundColor: colors.white,
    borderRadius: scaler(12),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaler(10),
    paddingHorizontal: scaler(55),
    marginBottom: scaler(17),
  },
  container5: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: colors.pink300,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 5,
    paddingHorizontal: 9,
  },
  textOff: {
    color: colors.white,
    fontSize: scaler(11),
    ...stylesCommon.fontWeight600,
  },
  textPrice1: {
    color: colors.pink300,
    fontSize: scaler(18),
    ...stylesCommon.fontWeight600,
  },
  containerItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textItemName: {
    fontSize: scaler(20),
    color: colors.pink300,
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 10,
    ...stylesCommon.fontWeight600,
  },
  textItemDesc: {
    fontSize: scaler(15),
    color: colors.labelColor,
    textAlign: 'center',
    ...stylesCommon.fontWeight400,
  },
  textItemDescBold: {
    fontSize: scaler(15),
    color: '#101012',
    ...stylesCommon.fontWeight600,
  },
});
