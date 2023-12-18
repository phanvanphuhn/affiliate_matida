import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import {colors, scaler, widthScreen} from '@stylesCommon';
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

interface TeaserProgramProps {
  isHome?: boolean;
}
const data = [
  {
    name: 'Direct access to doctors & experts',
    description:
      'A support group with medical doctors\n' + '& like-minded moms (to be)',
    icon: teaser1,
  },
  {
    name: 'Weekly effort of 15 minutes',
    description:
      'All the pregnancy knowledge with\n' + 'weekly effort of only 15 minutes',
    icon: teaser2,
  },
  {
    name: "Support your baby's growth",
    description: 'Techniques & habits to\nbest develop your unborn child',
    icon: teaser3,
  },
  {
    name: 'Be the best version of yourself',
    description:
      'Personal guidance to understand\n' + 'your strengths & weaknesses',
    icon: teaser4,
  },
  {
    name: 'Get everything cheaper',
    description: '2,000,000 vnd discounts \n for family related shops',
    icon: teaser1,
  },
];
const TeaserProgram = (props: TeaserProgramProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigation = useNavigation<any>();

  const onSignUpNow = () => {
    navigation.navigate(ROUTE_NAME.UPDATE_INFORMATION, {});
  };
  const _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
        <Image source={item.icon} />
        <Text
          style={{
            fontSize: scaler(20),
            fontWeight: '600',
            color: colors.pink300,
            marginBottom: 10,
            textAlign: 'center',
            marginTop: 10,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: scaler(17),
            fontWeight: '400',
            color: colors.labelColor,
            textAlign: 'center',
          }}>
          {item.description}
        </Text>
      </View>
    );
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
      <View
        style={{
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
          top: -widthScreen / 2 + 70,
        }}>
        {!props?.isHome && (
          <TouchableOpacity
            onPress={goBack}
            hitSlop={{top: 20, right: 20, bottom: 20, left: 20}}
            style={styles.buttonClose}>
            <SvgClose color={colors.labelColor} />
          </TouchableOpacity>
        )}

        <Text style={styles.textTitle}>The All-in-one Course</Text>
        <Text
          style={[
            styles.textTitle2,
            {
              marginTop: 10,
            },
          ]}>
          Cool mom,
        </Text>
        <Text style={styles.textTitle2}>Happy Baby</Text>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: widthScreen / 2 + 30,
        }}>
        <View
          style={{
            backgroundColor: colors.white,
            flex: 1,
          }}>
          <View
            style={{
              top: -8,
            }}>
            <SvgLineWave color={colors.pink350} />
          </View>
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
          <View style={styles.container4}>
            <View style={styles.container5}>
              <Text style={styles.textOff}>30% off</Text>
            </View>
            <Text style={styles.textPrice1}>
              499,000đ{' '}
              <Text
                style={{
                  fontSize: scaler(13),
                }}>
                /lifetime
              </Text>
            </Text>
            <Text style={styles.textPriceOld}>
              <Text style={{textDecorationLine: 'line-through'}}>669,000đ</Text>
              /lifetime
            </Text>
          </View>
          <TouchableOpacity onPress={onSignUpNow} style={styles.buttonSignUp}>
            <Text style={styles.textButtonSignUp}>
              Sign up for early bird discount
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  buttonClose: {
    alignSelf: 'flex-end',
    padding: scaler(15),
  },
  textTitle: {
    fontSize: scaler(20),
    fontWeight: '500',
    color: colors.labelColor,
    textAlign: 'center',
  },
  textTitle2: {
    fontSize: scaler(28),
    fontWeight: '600',
    color: colors.labelColor,
    textAlign: 'center',
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
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: scaler(10),
  },
  textPriceOld: {
    textDecorationLine: 'line-through',
    color: colors.textColor,
    fontSize: scaler(16),
    fontWeight: '600',
    marginBottom: scaler(4),
    textAlign: 'center',
  },
  textPriceNew: {
    fontSize: scaler(24),
    fontWeight: '600',
    color: colors.textColor,
    textAlign: 'center',
  },
  textPriceNew2: {
    fontSize: scaler(15),
    fontWeight: '500',
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
    fontWeight: '600',
    color: colors.textColor,
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
    fontWeight: '600',
  },
  textPrice1: {
    color: colors.pink300,
    fontWeight: '600',
    fontSize: scaler(18),
  },
  textPriceOld: {
    color: colors.gray550,
    fontSize: scaler(13),
    marginTop: 5,
  },
});
