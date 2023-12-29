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
import {useTranslation} from 'react-i18next';
interface ListWeekProps {
  onSelectedWeek: (week: number) => void;
}
const ListWeek = (props: ListWeekProps) => {
  const [state, setState] = useState([]);
  const week = useSelector((state: any) =>
    !state?.home?.weekUserTask || state?.home?.weekUserTask <= 4
      ? 4
      : state?.home?.weekUserTask,
  );
  console.log('=>(ListWeek.tsx:33) week', week);
  const flatlistRef = useRef<FlatList>();
  const {t} = useTranslation();

  useEffect(() => {
    const getData = () => {
      let data = Array.from({length: 40}, (x, i) => ({
        name: `${t('momDiary.week')} ${i + 1}`,
        week: i + 1,
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
          index: week - 4,
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
    if (item.week < 4) {
      return null;
    }
    return (
      <View style={{flexDirection: 'row'}}>
        {index < 4 ? null : (
          <View style={styles.containerDashed}>{renderLine(item)}</View>
        )}
        <TouchableOpacity
          disabled={item.status == 'Upcoming'}
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
              {item.status == 'Upcoming'
                ? t('pregnancyProgram.Upcoming')
                : item.status == 'Completed'
                ? t('pregnancyProgram.Completed')
                : t('pregnancyProgram.Happening')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const getItemLayout = (_, index) => ({
    length: widthScreen / 3 + 17.7, //  WIDTH + (MARGIN_HORIZONTAL * 2)
    offset: (widthScreen / 3 + 17.7) * index, //  ( WIDTH + (MARGIN_HORIZONTAL*2) ) * (index)
    index,
  });
  const keyExtractor = (item, index) => index.toString();
  return (
    <View style={styles.container}>
      <FlatList
        data={state}
        renderItem={renderItem}
        horizontal={true}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
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
    color: colors.textSmallColor,
    ...stylesCommon.fontSarabun400,
  },
  textName: {
    fontSize: scaler(12),
    color: colors.labelColor,
    ...stylesCommon.fontWeight500,
  },
  container: {backgroundColor: colors.gray450, paddingVertical: scaler(20)},
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: scaler(20),
    ...stylesCommon.fontWeight600,
  },
  textTitle2: {
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
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
    ...stylesCommon.fontWeight600,
  },
});
