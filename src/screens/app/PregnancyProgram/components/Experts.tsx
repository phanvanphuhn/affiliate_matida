import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {useTranslation} from 'react-i18next';

interface ExpertsProps {}

const Experts = (props: ExpertsProps) => {
  const [state, setState] = useState();
  const {t} = useTranslation();

  const data = [
    {
      name: 'Phạm Huyền',
      description: t('pregnancyProgram.babyExpert'),
      image:
        'https://s3.ap-southeast-1.amazonaws.com/matida/1705151389758484967.png',
    },
    {
      name: 'Phương Anh',
      description: t('pregnancyProgram.obstetrician'),
      image:
        'https://s3.ap-southeast-1.amazonaws.com/matida/1703520600416191297.jpg',
    },
    {
      name: 'Sương',
      description: t('pregnancyProgram.lactation'),
      image:
        'https://s3.ap-southeast-1.amazonaws.com/matida/1703520618216628521.jpg',
    },
    {
      name: 'Mina Chung',
      description: t('pregnancyProgram.financial'),
      image:
        'https://s3.ap-southeast-1.amazonaws.com/matida/1703520637730003352.jpg',
    },
    {
      name: 'Trâm',
      description: t('pregnancyProgram.yoga'),
      image:
        'https://s3.ap-southeast-1.amazonaws.com/matida/1705151430631254507.png',
    },
    {
      name: 'Stephanie',
      description: t('pregnancyProgram.pm'),
      image:
        'https://s3.ap-southeast-1.amazonaws.com/matida/1703520742320445490.jpg',
    },
  ];
  const renderLine = () => {
    return (
      <Svg width="390" height="45" viewBox="0 0 390 45" fill="none">
        <Path
          d="M0 34.4997C23 23.333 85.8 5.39968 153 22.9997C237 44.9997 350.5 58.5 392 3"
          stroke="#FFF66E"
          strokeWidth="4"
          strokeLinecap="square"
        />
      </Svg>
    );
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          bottom: '32.5%',
        }}>
        {renderLine()}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: '57.5%',
        }}>
        {renderLine()}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: scaler(20),
          }}>
          <Text
            style={{
              fontSize: scaler(17),
              ...stylesCommon.fontSarabun500,
            }}>
            {t('pregnancyProgram.MeetOurExperts')}
          </Text>
          <Text
            style={{
              fontSize: scaler(22),
              ...stylesCommon.fontWeight600,
              marginTop: 10,
              marginBottom: 15,
            }}>
            {t('pregnancyProgram.AnEntireCareTeamAtYourFingertips')}
          </Text>
          <Text
            style={{
              fontSize: scaler(15),
              lineHeight: scaler(24),
              color: colors.labelColor,
              ...stylesCommon.fontSarabun400,
            }}>
            {t('pregnancyProgram.contentExperts')}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: 10,
            }}>
            {data.map((item, index) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '33%',
                    marginTop: scaler(25),
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      height: widthScreen / 4.5,
                      width: widthScreen / 4.5,
                      borderRadius: widthScreen / 3 - 30,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: scaler(17),
                      ...stylesCommon.fontWeight500,
                      marginTop: 12,
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: scaler(13),
                      ...stylesCommon.fontWeight400,
                    }}>
                    {item.description}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Experts;

const styles = StyleSheet.create({
  container: {flex: 1},
});
