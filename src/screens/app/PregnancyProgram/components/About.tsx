import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {bg2} from '@images';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {useTranslation} from 'react-i18next';

interface AboutProps {}

const About = (props: AboutProps) => {
  const [state, setState] = useState();
  const {t} = useTranslation();

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
          <Text style={{fontSize: scaler(17), ...stylesCommon.fontSarabun500}}>
            {t('pregnancyProgram.AboutTheProgram')}
          </Text>
          <Text
            style={{
              fontSize: scaler(22),
              ...stylesCommon.fontWeight600,
              lineHeight: scaler(28),
              marginTop: 10,
            }}>
            {t('pregnancyProgram.aHolisticProgram')}
          </Text>
          <Text
            style={{
              fontSize: scaler(15),
              marginTop: scaler(20),
              color: colors.labelColor,
              lineHeight: scaler(24),
              ...stylesCommon.fontSarabun400,
            }}>
            {t('pregnancyProgram.contentAboutTheProgram')}
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
