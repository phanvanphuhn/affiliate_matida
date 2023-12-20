import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, scaler, widthScreen} from '@stylesCommon';
import {
  chuyengia1,
  ic_line_wave,
  SvgClose,
  SvgLineWave,
  teaser1,
  teaser2,
  teaser3,
  teaser4,
} from '@images';
import {Pagination} from 'react-native-snap-carousel';
import {goBack} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';

interface TeaserProgramProps {
  isHome?: boolean;
}
const TeaserProgram = (props: TeaserProgramProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigation = useNavigation<any>();

  const onSignUpNow = () => {
    navigation.navigate(ROUTE_NAME.UPDATE_INFORMATION, {});
  };
  return (
    <View style={[styles.container, {}]}>
      <View
        style={{
          height: widthScreen / 1.5,
          width: widthScreen / 1.5,
          borderRadius: 500,
          backgroundColor: colors.pink200,
          position: 'absolute',
          right: -30,
          top: 10,
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 0,
        }}>
        <Image source={ic_line_wave} />
      </View>
      <View style={styles.container3}>
        <View style={{flex: 1}}>
          <Text style={styles.textOff}>
            {'Hi new mommy,\nare you ready for the journey?'}
          </Text>
          <Text style={styles.textPrice1}>Cool Mom,</Text>
          <Text style={styles.textPrice1}>Happy Baby</Text>
        </View>
        <TouchableOpacity onPress={onSignUpNow} style={styles.buttonSignUp}>
          <Text style={styles.textButtonSignUp}>Sign up now</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
        }}>
        <Image
          source={chuyengia1}
          style={{
            height: '85%',
            aspectRatio: 1,
          }}
        />
      </View>
    </View>
  );
};

export default TeaserProgram;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yellow200,
    borderRadius: scaler(16),
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'flex-end',
    marginBottom: 18,
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
    backgroundColor: colors.white,
    paddingVertical: 7,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
  },
  textButtonSignUp: {
    fontSize: scaler(13),
    fontWeight: '600',
    color: colors.pink300,
  },
  container3: {
    marginBottom: scaler(16),
    marginTop: scaler(16),
    flex: 1,
    paddingLeft: scaler(15),
  },
  container4: {
    backgroundColor: colors.white,
    borderRadius: scaler(12),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaler(10),
    marginBottom: scaler(17),
  },
  container5: {},
  textOff: {
    color: colors.labelColor,
    fontSize: scaler(11),
    fontWeight: '600',
  },
  textPrice1: {
    color: colors.labelColor,
    fontWeight: '600',
    fontSize: scaler(20),
  },
});
