import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  bg1,
  ic_back,
  ic_back_arrow,
  ic_flower,
  SvgLineWave,
  SvgPathBottom,
  SvgPathTop,
} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import Svg, {Path} from 'react-native-svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {goBack} from '@navigation';
import {useNavigation, useRoute} from '@react-navigation/native';

interface DetailTaskProgramProps {}

const DetailTaskProgram = (props: DetailTaskProgramProps) => {
  const [state, setState] = useState();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  console.log('=>(DetailTaskProgram.tsx:32) route', route);
  return (
    <SafeAreaView
      edges={['bottom']}
      style={{flex: 1, backgroundColor: colors.white}}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={
              route?.params?.item?.task?.thumbnail
                ? {uri: route?.params?.item?.task?.thumbnail}
                : bg1
            }
            style={styles.imgBg}>
            <View
              style={{
                bottom: -8,
                width: '100%',
              }}>
              <SvgLineWave />
            </View>
            <TouchableOpacity
              onPress={goBack}
              style={{
                padding: 20,
                position: 'absolute',
                top: 40,
              }}>
              <Image
                source={ic_back_arrow}
                style={{
                  height: 30,
                  width: 30,
                }}
              />
            </TouchableOpacity>
          </ImageBackground>
          <View style={{flex: 1}}>
            <Image source={ic_flower} style={styles.flower} />
            <View style={styles.container2}>
              <Text style={styles.textLearn}>
                {route?.params?.item?.task?.categories?.[0]
                  ?.split('_')
                  ?.join(' ')}
              </Text>
              <Text style={styles.textAbout}>
                {route?.params?.item?.task?.name_en}
              </Text>
              <Text style={styles.text1}>
                Embark on an exciting journey to learn about the early
                development milestones of your baby, a crucial task for
                moms-to-be in the early stages of pregnancy. Understanding these
                milestones is like having a sneak peek into the incredible
                journey your baby is about to embark on.
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                <Text style={styles.text1}>1. </Text>
                <Text style={[styles.text1, {flex: 1}]}>
                  <Text style={{fontWeight: '600'}}>Tiny Movements:</Text>
                  {
                    "\nWitness the beginning of your baby's motor skills with subtlemovements. In the early weeks, they might start wiggling and squirming as their tiny muscles start to form."
                  }
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                <Text style={styles.text1}>2. </Text>
                <Text style={[styles.text1, {flex: 1}]}>
                  <Text style={{fontWeight: '600'}}>Early Sensations:</Text>
                  {
                    '\nDelve into the early cognitive development of your baby. Despite their small size, they can respond to stimuli, indicating the budding awareness and early cognitive functions.'
                  }
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                <Text style={styles.text1}>3. </Text>
                <Text style={[styles.text1, {flex: 1}]}>
                  <Text style={{fontWeight: '600'}}>Early Connections:</Text>
                  {
                    "\nStart building early connections with your baby through the first signs of communication. Though it's too early for words, notice how your baby responds to your voice and other external sounds."
                  }
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                <Text style={styles.text1}>4. </Text>
                <Text style={[styles.text1, {flex: 1}]}>
                  <Text style={{fontWeight: '600'}}>
                    Initial Emotional Bonds:
                  </Text>
                  {
                    "\nFeel the initial stages of social and emotional growth. While it's early days, the bond between you and your baby is already forming, setting the foundation for future smiles and emotional connections."
                  }
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                <Text style={styles.text1}>5. </Text>
                <Text style={[styles.text1, {flex: 1}]}>
                  <Text style={{fontWeight: '600'}}>Early Sleep Patterns:</Text>
                  {
                    "\nObserve the early sleep patterns, acknowledging the importance of rest even in these initial stages. Creating a calm environment can contribute to a supportive sleep routine. \n\nWhile it's just the beginning, each tiny milestone lays the groundwork for the remarkable journey of parenthood. Connect with prenatal classes, read materials specific to early pregnancy, and share experiences with other expectant moms to enhance your understanding of these early development stages. It's a thrilling venture into the wonders of pregnancy, filled with anticipation and the promise of countless heartwarming moments to come."
                  }
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            borderTopColor: colors.borderColor2,
            borderTopWidth: 1,
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={goBack}
            style={{
              backgroundColor: colors.pink200,
              padding: scaler(15),
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: colors.white,
                fontSize: scaler(15),
                fontWeight: '600',
              }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailTaskProgram;

const styles = StyleSheet.create({
  container: {backgroundColor: colors.white, flex: 1},
  imgBg: {width: '100%', aspectRatio: 1, justifyContent: 'flex-end'},
  flower: {
    position: 'absolute',
    right: 0,
    top: scaler(50),
  },
  container2: {padding: scaler(20), paddingTop: scaler(40)},
  textLearn: {
    fontSize: scaler(15),
    fontWeight: '500',
    color: colors.borderColor,
    textTransform: 'capitalize',
    ...stylesCommon.fontSarabun500,
  },
  textAbout: {
    fontSize: scaler(24),
    fontWeight: '600',
    marginTop: scaler(10),
    marginBottom: scaler(24),
    ...stylesCommon.fontWeight600,
  },
  text1: {
    fontSize: scaler(15),
    color: colors.labelColor,
    marginBottom: scaler(30),
    ...stylesCommon.fontSarabun400,
  },
});
