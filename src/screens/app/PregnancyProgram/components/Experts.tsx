import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {colors, scaler, widthScreen} from '@stylesCommon';

interface ExpertsProps {}
const data = [
  {
    name: 'Hoa',
    description: 'Obstetrician',
    image:
      'https://i.pinimg.com/236x/77/82/f0/7782f0c631b3765abca616306f416a61.jpg',
  },
  {
    name: 'Phương Anh',
    description: 'Obstetrician',
    image:
      'https://i.pinimg.com/236x/74/20/58/742058099ee4749d2da5d820396870eb.jpg',
  },
  {
    name: 'Sương',
    description: 'Lactation Expert',
    image:
      'https://image.baophapluat.vn/1200x630/Uploaded/2023/athlrainaghat/2023_04_01/anh-minh-hoa-anh-tackexinhcom-8033.jpeg',
  },
  {
    name: 'Tú Anh',
    description: 'Life Coach',
    image:
      'https://cpad.ask.fm/450/774/576/-29996968-1tfd7tc-gpggmmc5d0og3a0/original/image.jpg',
  },
  {
    name: 'Trâm',
    description: 'Yoga Coach',
    image:
      'https://i.pinimg.com/236x/77/82/f0/7782f0c631b3765abca616306f416a61.jpg',
  },
];
const Experts = (props: ExpertsProps) => {
  const [state, setState] = useState();
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
          bottom: '25%',
        }}>
        {renderLine()}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: '55%',
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
              fontWeight: '500',
            }}>
            Meet our experts
          </Text>
          <Text
            style={{
              fontSize: scaler(22),
              fontWeight: '600',
              marginTop: 10,
              marginBottom: 15,
            }}>
            An entire care team at your fingertips
          </Text>
          <Text
            style={{
              fontSize: scaler(15),
              lineHeight: scaler(24),
              color: colors.labelColor,
            }}>
            The Matida pregnancy program was crafted by our expert medical team,
            offering the most valuable and supportive content for your journey.
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
                      fontWeight: '500',
                      marginTop: 12,
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: scaler(13),
                      fontWeight: '400',
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
