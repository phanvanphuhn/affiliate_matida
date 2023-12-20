import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  UIManager,
} from 'react-native';
import {
  colors,
  heightScreen,
  scaler,
  stylesCommon,
  widthScreen,
} from '@stylesCommon';
import Svg, {Circle, G, Path, Line} from 'react-native-svg';
import DashedLine from './DashedLine';
import {ic_default1, ic_default2, ic_gift, SvgArrowLeft} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
interface ListProgramProps {
  tabIndex?: number; // 0 todos || 1 finished
}
const DATA = [
  {
    title: 'Pregnancy Knowledge',
    type: 'core',
    label: 'Core',
    data: [
      {
        name: 'Learn about the Baby Development Milestones',
        description: 'Learn',
        icon: ic_default1,
      },
      {
        name: '1st checkup (Routine tests - Ultrasound, Blood test)',
        description: 'Check up',
        icon: ic_default2,
      },
      {
        name: 'Can you feel the changes happening inside?',
        description: 'Mom diary',
        icon: ic_default2,
      },
    ],
  },
  {
    title: 'Love & Money',
    type: 'personal',
    label: 'Personal challenge',
    data: [
      {
        name: 'Initiate a Family Movie Night',
        description: 'Activity',
        icon: ic_default1,
      },
    ],
  },
  {
    title: 'You are making progress',
    type: 'reward',
    label: 'Basics',
    data: [
      {
        name: 'What should mom eat in week 5?',
        description: 'Learn',
        icon: ic_default2,
      },
    ],
  },
];

const ListProgram = (props: ListProgramProps) => {
  const [state, setState] = useState();
  const refHeight = useRef();
  const navigation = useNavigation<any>();

  const onDetail = (item: any) => {
    navigation.navigate(ROUTE_NAME.DETAIL_TASK_PROGRAM, {
      item,
    });
  };
  const getColor = (type: string) => {
    switch (type) {
      case 'reward':
        return colors.blue;
      case 'core':
        return colors.pink200;
      case 'personal':
        return colors.green250;
      default:
        return colors.primaryBackground;
    }
  };
  return (
    <View style={styles.container}>
      {DATA.map((item, index) => {
        return (
          <View key={index} style={[styles.rowStart, {}]}>
            <View
              style={{
                alignItems: 'flex-start',
                marginRight: item.type == 'reward' ? 0 : 10,
              }}>
              <View
                style={[styles.dot, {backgroundColor: getColor(item.type)}]}
              />
              {item.type == 'reward' ? (
                <Svg style={{width: 20, height: '100%'}} fill="none">
                  <Path
                    d="M1 1V35C1 55.8366 8.16344 52 20 55V55"
                    stroke={getColor(item.type)}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeDasharray="2 4"
                    x={8}
                    y={0}
                  />
                </Svg>
              ) : (
                // <DashedLine
                //   dashLength={3}
                //   dashThickness={1}
                //   dashColor={getColor(item.type)}
                //   axis={'vertical'}
                //   style={{flex: 1, alignSelf: 'center'}}
                // />
                <Svg
                  style={{width: 20, height: '100%', position: 'absolute'}}
                  fill="none">
                  <Path
                    d="M1 1V519"
                    stroke={getColor(item.type)}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="2 4"
                    x={8}
                    y={22}
                  />
                </Svg>
              )}
            </View>
            <View
              style={{
                flex: 1,
                paddingBottom: scaler(10),
              }}>
              <View style={[styles.rowStart, {alignItems: 'center'}]}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontSize: scaler(19),
                      fontWeight: '600',
                      ...stylesCommon.fontSarabun600,
                    }}>
                    {item.title}
                  </Text>
                </View>
                {item.type != 'reward' && (
                  <View
                    style={[
                      styles.containerTag,
                      {backgroundColor: getColor(item.type)},
                    ]}>
                    <Text style={styles.textTag}>{item.label}</Text>
                  </View>
                )}
              </View>
              <View>
                {item.type == 'reward' ? (
                  <View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.blue,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: scaler(16),
                        paddingHorizontal: scaler(16),
                        paddingVertical: scaler(15),
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: scaler(15),
                          fontWeight: '600',
                          ...stylesCommon.fontWeight600,
                        }}>
                        Thanks Mommy, I'm proud of you !
                      </Text>
                      <Image style={{height: 26, width: 26}} source={ic_gift} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  item.data.map((e, i) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        onPress={() => onDetail(e)}
                        style={[
                          styles.containerChild,
                          i == item.data.length - 1
                            ? {
                                marginBottom: 20,
                              }
                            : {},
                        ]}>
                        <View style={{flex: 1}}>
                          <View style={{flex: 1}}>
                            <Text style={styles.textChild}>{e.name}</Text>
                            <Text style={styles.textChildDesc}>
                              {e.description}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => onDetail(e)}
                            style={styles.rowCenter}>
                            <Text style={styles.textSmash}>
                              {props?.tabIndex == 0
                                ? 'Finish the task'
                                : 'Review it'}
                            </Text>
                            <SvgArrowLeft
                              stroke={colors.pink300}
                              size={16}
                              strokeWidth={3}
                              transform={[{rotate: '180deg'}]}
                            />
                          </TouchableOpacity>
                        </View>
                        <Image source={e.icon} style={styles.img} />
                      </TouchableOpacity>
                    );
                  })
                )}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ListProgram;

const styles = StyleSheet.create({
  img: {
    height: widthScreen / 3.5,
    width: widthScreen / 3.5,
    borderRadius: 10,
  },
  textSmash: {
    color: colors.pink300,
    marginRight: 5,
    fontWeight: '600',
    fontSize: scaler(13),
    ...stylesCommon.fontSarabun600,
    marginBottom: 2,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textChild: {
    fontSize: scaler(15),
    fontWeight: '600',
    paddingRight: 5,
    ...stylesCommon.fontWeight600,
  },
  textChildDesc: {
    color: colors.gray500,
    fontSize: scaler(13),
    marginTop: scaler(5),
    paddingRight: scaler(10),
    paddingBottom: scaler(10),
    ...stylesCommon.fontSarabun400,
  },
  containerChild: {
    backgroundColor: colors.gray350,
    padding: scaler(12),
    marginTop: scaler(16),
    borderRadius: scaler(8),
    borderColor: colors.gray,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTag: {
    color: colors.white,
    fontSize: scaler(10),
    fontWeight: '600',
    ...stylesCommon.fontSarabun600,
  },
  containerTag: {
    backgroundColor: colors.primaryBackground,
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(3),
    borderRadius: scaler(25),
  },
  container: {flex: 1, padding: scaler(15)},
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  dot: {
    backgroundColor: colors.primaryBackground,
    height: scaler(16),
    width: scaler(16),
    borderRadius: scaler(8),
    marginTop: 6,
    marginLeft: 1,
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
