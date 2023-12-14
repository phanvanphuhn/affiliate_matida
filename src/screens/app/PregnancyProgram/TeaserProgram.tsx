import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {colors, scaler, widthScreen} from '@stylesCommon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SvgClose, SvgPathBottom, SvgPathTop, teaser1, teaser2, teaser3, teaser4} from '@images';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {setActive} from "react-native-sound";
import {goBack} from "@navigation";
import {useNavigation} from "@react-navigation/native";
import {ROUTE_NAME} from "@routeName";

interface TeaserProgramProps {
    isHome?:boolean
}
const data = [
  {
    name: 'Get 1:1 medical support',
    description:
      'A support group with medical doctors\n' + '& like-minded moms (to be)',
    icon: teaser1,
  },
  {
    name: 'Learn all the pregnancy secrets',
    description:
      'All the pregnancy knowledge with\n' + 'weekly effort of only 15 minutes',
    icon: teaser2,
  },
  {
    name: "Support your baby's growth",
    description: 'Techniques & habits to best develop your unborn child',
    icon: teaser3,
  },
  {
    name: 'Be the best version of yourself',
    description: 'Personal guidance to understand\n' +
        'your strengths & weaknesses',
    icon: teaser4,
  },
  {
    name: 'Get everything cheaper',
    description: '2,000,000 vnd discounts for family related shops',
    icon: teaser1,
  },
];
const TeaserProgram = (props: TeaserProgramProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
    const navigation = useNavigation<any>();

  const onSignUpNow =()=>{
      navigation.navigate(ROUTE_NAME.UPDATE_INFORMATION, {
      });
  }
  const _renderItem = ({item, index}) => {
    return (
      <View style={{
          alignItems: 'center',
          justifyContent: 'center',
      }}>
          <Image source={item.icon} />
        <Text style={{
            fontSize:scaler(20),
            fontWeight:'600',
            color:colors.pink300,
            marginBottom:10,
            textAlign: 'center',
            marginTop:10
        }}>{item.name}</Text>
        <Text style={{
            fontSize:scaler(17),
            fontWeight:'400',color:colors.labelColor,
            textAlign: 'center'
        }}>{item.description}</Text>
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
          backgroundColor: colors.pink200
        }}
        inactiveDotStyle={
          {
              backgroundColor: colors.gray
          }
        }
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  };
  return (
    <View  style={[styles.container,{paddingTop:30}]}>
        {!props?.isHome&&<TouchableOpacity onPress={goBack} style={styles.buttonClose}>
            <SvgClose color={colors.white}/>
        </TouchableOpacity>}

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

      <View style={styles.container2}>
        <Text style={styles.textSpecial}>Special price for early birds</Text>
        <Text style={styles.textPriceOld}>699,000 vnd</Text>
        <Text style={styles.textPriceNew}>
          499,000 vnd <Text style={styles.textPriceNew2}>/lifetime</Text>
        </Text>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <SvgPathTop />
        <View
          style={{
            backgroundColor: colors.white,
            flex: 1,
              paddingBottom:30
          }}>
          {pagination()}
          <Carousel
            data={data}
            renderItem={_renderItem}
            itemWidth={props?.isHome?widthScreen-32:widthScreen}
            sliderWidth={props?.isHome?widthScreen-32:widthScreen}
            windowSize={10}
            onSnapToItem={(index) => setActiveSlide( index ) }
          />
            <TouchableOpacity onPress={onSignUpNow} style={styles.buttonSignUp}>
                <Text style={styles.textButtonSignUp}>Sign up now</Text>
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
      backgroundColor: colors.blue,
      borderRadius:scaler(16)
  },
  buttonClose: {
    alignSelf: 'flex-end',
    padding: scaler(15),
  },
  textTitle: {
    fontSize: scaler(20),
    fontWeight: '500',
    color: colors.white,
    textAlign: 'center',
  },
  textTitle2: {
    fontSize: scaler(28),
    fontWeight: '600',
    color: colors.white,
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
    buttonSignUp:{
        backgroundColor:colors.pink200,
        paddingVertical:15,
        marginHorizontal:25,
        borderRadius:50,
        alignItems:'center',
        justifyContent: 'center',
        marginTop:scaler(20)
    },
    textButtonSignUp:{
        fontSize:scaler(15),
        fontWeight:'600',
        color:colors.white
    }
});
