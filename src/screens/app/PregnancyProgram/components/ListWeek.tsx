import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ListRenderItem,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import DashedLine from './DashedLine';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {
  ic_gift,
  ic_lock,
  SvgBlocked,
  SvgCheck,
  SvgLock,
  SvgLockPayment,
} from '@images';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path} from 'react-native-svg';
import * as Progress from 'react-native-progress';
import CircularProgress from './CircularProgress';
import {useSelector} from 'react-redux';
interface ListWeekProps {
  onSelectedWeek: (week: number) => void;
}
const ListWeek = (props: ListWeekProps) => {
  const [state, setState] = useState([]);
  const week = useSelector((state: any) => state?.home?.week);
  const flatlistRef = useRef<FlatList>();

  useEffect(() => {
    const getData = () => {
      let data = Array.from({length: 42}, (x, i) => ({
        name: `Week ${i + 1}`,
        status:
          i + 1 < week ? 'Completed' : i + 1 == week ? 'Happening' : 'Upcoming',
      }));
      setState(data);
    };
    getData();
  }, []);
  useEffect(() => {
    if (flatlistRef.current && state?.length) {
      setTimeout(() => {
        flatlistRef.current?.scrollToIndex({
          index: week - 1,
          animated: true,
        });
      }, 1000);
    }
  }, [state, week]);
  const getColor = useCallback(item => {
    switch (item.status) {
      case 'Completed':
        return colors.green250;
      case 'Uncompleted':
        return colors.primaryBackground;
      case 'Happening':
        return colors.pink200;
      default:
        return colors.gray50;
    }
  }, []);
  const renderLine = useCallback(item => {
    switch (item.status) {
      case 'Completed':
        return (
          <View
            style={{
              height: 2,
              width: '100%',
              backgroundColor: getColor(item),
            }}
          />
        );
      default:
        return (
          <DashedLine
            dashColor={getColor(item)}
            dashGap={4}
            dashLength={4}
            dashThickness={1.5}
          />
        );
    }
  }, []);
  const renderDot = useCallback(item => {
    switch (item.status) {
      case 'Completed':
      case 'Uncompleted':
        return (
          <View
            style={{
              backgroundColor: colors.gray450,
              borderRadius: 50,
              padding: 10,
            }}>
            <View
              style={[
                styles.containerDotText,
                {backgroundColor: getColor(item)},
              ]}>
              {item?.status == 'Completed' ? (
                <SvgCheck stroke={colors.white} />
              ) : (
                <Text style={styles.dotText}>1</Text>
              )}
            </View>
          </View>
        );
      case 'Happening':
        return (
          <View style={styles.container3}>
            <CircularProgress
              size={40}
              width={2}
              fill={50}
              tintColor={colors.gray}
              style={{
                transform: [{rotate: '90deg'}],
              }}
              backgroundColor={colors.pink200}>
              {fill => (
                <View
                  style={[
                    styles.containerDotText,
                    {
                      backgroundColor: colors.pink200,
                      position: 'absolute',
                      transform: [{rotate: '-90deg'}],
                    },
                  ]}>
                  <Image source={ic_gift} />
                </View>
              )}
            </CircularProgress>
          </View>
        );
      default:
        return (
          <View
            style={{
              backgroundColor: colors.gray450,
              borderRadius: 50,
              padding: 10,
            }}>
            <View
              style={[
                styles.containerDotText,
                {backgroundColor: colors.white},
              ]}>
              <Image source={ic_lock} />
            </View>
          </View>
        );
    }
  }, []);
  const renderItem: ListRenderItem<any> = ({item, index}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        {index == 0 ? null : (
          <View style={styles.containerDashed}>{renderLine(item)}</View>
        )}
        <TouchableOpacity
          onPress={() => {
            props?.onSelectedWeek && props?.onSelectedWeek(index + 1);
          }}
          style={[{alignItems: 'center'}]}>
          {renderDot(item)}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={[
                styles.textName,
                {
                  color:
                    item.status == 'Happening'
                      ? colors.pink200
                      : colors.gray500,
                },
              ]}>
              {item.name}
            </Text>
            <Text
              style={[
                styles.textStatus,
                {
                  color:
                    item.status == 'Happening'
                      ? colors.pink200
                      : colors.textSmallColor,
                },
              ]}>
              {item.status}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const keyExtractor = (item, index) => index.toString();
  return (
    <View style={styles.container}>
      <FlatList
        data={state}
        renderItem={renderItem}
        horizontal={true}
        ref={flatlistRef}
        onScrollToIndexFailed={info => {
          setTimeout(
            () =>
              flatlistRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              }),
            500,
          );
        }}
        contentContainerStyle={{paddingHorizontal: 20}}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default ListWeek;

const styles = StyleSheet.create({
  textStatus: {
    fontSize: scaler(11),
    fontWeight: '400',
    color: colors.textSmallColor,
    ...stylesCommon.fontSarabun400,
  },
  textName: {
    fontSize: scaler(12),
    fontWeight: '500',
    color: colors.labelColor,
    ...stylesCommon.fontWeight600,
  },
  container: {backgroundColor: colors.gray450, paddingVertical: scaler(20)},
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: scaler(20),
    fontWeight: '600',
  },
  textTitle2: {
    fontSize: scaler(14),
    fontWeight: '400',
  },
  containerDashed: {
    width: widthScreen / 4,
    top: 25,
  },
  containerDotText: {
    backgroundColor: colors.primaryBackground,
    height: scaler(30),
    width: scaler(30),
    borderRadius: scaler(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  container3: {
    backgroundColor: colors.gray450,
    borderRadius: 50,
    margin: 10,
    marginTop: 4,
  },
  dotText: {
    color: colors.white,
    fontSize: scaler(16),
    fontWeight: '600',
  },
});
