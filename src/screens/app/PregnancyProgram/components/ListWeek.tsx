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
import {getProgressWeek} from '../../../../services/pregnancyProgram';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core/src/types';
import {ROUTE_NAME} from '@routeName';
import useStateCustom from '../../../../util/hooks/useStateCustom';
interface ListWeekProps {
  onSelectedWeek: (week: number) => void;
}
const ListWeek = (props: ListWeekProps) => {
  const [state, setState] = useStateCustom({
    data: [],
    progressWeek: [],
    completed: 0,
    total: 0,
  });
  const week = useSelector((state: any) =>
    !state?.home?.weekUserTask || state?.home?.weekUserTask <= 4
      ? 4
      : state?.home?.weekUserTask,
  );
  const navigation = useNavigation<NavigationProp<any>>();

  const flatlistRef = useRef<FlatList>();
  const {t} = useTranslation();
  const getStatus = (arr: any[], i: number) => {
    if (i + 1 <= week) {
      let isCheck = arr?.some(w => w.week == i + 1 && w.total == w.completed);
      if (isCheck) {
        return 'Completed';
      } else {
        if (i + 1 == week) {
          return 'Happening';
        } else {
          return 'Uncompleted';
        }
      }
    } else {
      return 'Upcoming';
    }
  };
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        let result = await getProgressWeek();
        console.log('=>(ListWeek.tsx:69) result', result);
        let data = Array.from({length: 40}, (x, i) => ({
          name: `${t('momDiary.week')} ${i + 1}`,
          week: i + 1,
          status: getStatus(result?.data, i),
        }));
        let obj = result?.data?.find(e => e.week == week);
        setState({
          data,
          progressWeek: result?.data,
          completed: obj?.completed,
          total: obj?.total,
        });
      };
      getData();
    }, []),
  );

  const scrollToIndex = (index: number) => {
    if (flatlistRef.current && state?.data?.length) {
      console.log('=>(ListWeek.tsx:88) index - 4', index - 4);
      setTimeout(() => {
        flatlistRef.current?.scrollToIndex({
          index: index - 4,
          animated: true,
        });
      }, 500);
    }
  };
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
  const renderLine = useCallback((item, isDisable) => {
    switch (item.status) {
      case 'Completed':
        return (
          <View
            style={{
              height: 2,
              width: '100%',
              backgroundColor: isDisable ? colors.transparent : getColor(item),
            }}
          />
        );
      default:
        return (
          <DashedLine
            dashColor={isDisable ? colors.transparent : getColor(item)}
            dashGap={4}
            dashLength={4}
            dashThickness={1.5}
          />
        );
    }
  }, []);
  const renderProgress = useCallback(() => {
    let progress = state?.progressWeek?.find(e => e.week == week);
    console.log('=>(ListWeek.tsx:131) progress', progress);
    return (
      <View style={styles.container3}>
        <CircularProgress
          size={34}
          width={2}
          fill={
            !progress
              ? 100
              : ((progress?.total - progress?.completed) / progress?.total) *
                100
          }
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
                  height: scaler(25),
                  width: scaler(25),
                },
              ]}>
              <Image source={ic_gift} />
            </View>
          )}
        </CircularProgress>
      </View>
    );
  }, [state?.progressWeek]);

  const renderDot = useCallback(
    (item, index) => {
      switch (item.status) {
        case 'Completed':
        case 'Uncompleted':
          if (index + 1 == week) {
            return renderProgress();
          }
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
                  <Text style={styles.dotText}>{item.week}</Text>
                )}
              </View>
            </View>
          );
        case 'Happening':
          return renderProgress();

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
    },
    [state?.progressWeek],
  );

  const renderItem: ListRenderItem<any> = ({item, index}) => {
    if (item.week < 4) {
      return null;
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          width: 183,
          paddingBottom: scaler(30),
        }}>
        <TouchableOpacity
          disabled={item.status == 'Upcoming'}
          onPress={() => {
            scrollToIndex(index + 1);
            props?.onSelectedWeek && props?.onSelectedWeek(index + 1);
          }}
          style={[{alignItems: 'center', flexDirection: 'row'}]}>
          <View style={styles.containerDashed}>
            {renderLine(item, index < 4)}
          </View>
          <View>
            {renderDot(item, index)}
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: -30,
                width: 100,
                alignSelf: 'center',
              }}>
              <Text
                style={[
                  styles.textName,
                  {
                    color:
                      item.status == 'Happening' || index + 1 == week
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
                      item.status == 'Happening' || index + 1 == week
                        ? colors.pink200
                        : colors.textSmallColor,
                  },
                ]}>
                {item.status == 'Happening'
                  ? t('pregnancyProgram.Happening')
                  : item.status == 'Completed'
                  ? t('pregnancyProgram.Completed')
                  : item?.status == 'Uncompleted'
                  ? t('pregnancyProgram.uncompleted')
                  : t('pregnancyProgram.Upcoming')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const getItemLayout = (_, index) => ({
    length: 182, //  WIDTH + (MARGIN_HORIZONTAL * 2)
    offset: 182 * index, //  ( WIDTH + (MARGIN_HORIZONTAL*2) ) * (index)
    index,
  });
  const keyExtractor = (item, index) => index.toString();
  return (
    <View style={styles.container}>
      <FlatList
        data={state.data}
        renderItem={renderItem}
        horizontal={true}
        ref={flatlistRef}
        onContentSizeChange={() => {
          console.log('=>(ListWeek.tsx:309) a');
          scrollToIndex(week);
        }}
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
    width: '72%',
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
    margin: 9,
    marginTop: 4,
  },
  dotText: {
    color: colors.white,
    fontSize: scaler(16),
    ...stylesCommon.fontWeight600,
  },
});
