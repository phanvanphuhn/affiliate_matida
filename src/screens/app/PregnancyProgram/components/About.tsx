import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {bg2} from '@images';
import {colors, scaler, widthScreen} from '@stylesCommon';

interface AboutProps {}

const About = (props: AboutProps) => {
  const [state, setState] = useState();
  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}>
        <Image
          source={bg2}
          style={{
            width: widthScreen - 100,
            height: widthScreen - 100,
          }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: scaler(20),
          }}>
          <Text style={{fontSize: scaler(17), fontWeight: '500'}}>
            About the program
          </Text>
          <Text
            style={{
              fontSize: scaler(22),
              fontWeight: '600',
              lineHeight: scaler(28),
              marginTop: 10,
            }}>
            A holistic program designed for the maternal health journey
          </Text>
          <Text
            style={{
              fontSize: scaler(15),
              marginTop: scaler(20),
              color: colors.labelColor,
              lineHeight: scaler(24),
            }}>
            {
              'Matida\'s "Cool Mom, Happy Baby Program" revolutionizes prenatal care by blending convenience, personalization, and expert advice in a comprehensive app. Tailored for moms-to-be, it ensures thorough preparation for motherhood while addressing women\'s unique needs and challenges. \n\nThis holistic program contains four key modules: pregnancy fundamentals, baby care, fitness & nutrition, and love & money. With a minimal weekly investment of just 15 minutes, you gain essential knowledge for a healthy pregnancy, a happy motherhood journey, and a balanced family life.'
            }
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {flex: 1},
});
