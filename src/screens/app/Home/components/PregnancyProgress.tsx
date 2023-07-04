import React, {useCallback} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {WEEK_MAX} from '@constant';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {getTimePregnancy} from '@util';
import {t} from 'i18next';
import {useSelector} from 'react-redux';

export const PregnancyProgress = () => {
  const weekPregnant = useSelector((state: any) => state?.home?.weekPregnant);
  const navigation = useNavigation<any>();
  const week =
    useSelector(
      (state: any) => state?.auth?.userInfo?.pregnantWeek?.weekPregnant?.weeks,
    ) ?? 40;
  const duaDate = useSelector((state: any) => state?.auth?.userInfo?.due_date);
  const trimester = getTrimester(weekPregnant?.weeks ?? week);

  const onNavigateSize = useCallback(() => {
    navigation.navigate(ROUTE_NAME.TIME_LINE);
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onNavigateSize}
      activeOpacity={1}>
      <Text
        style={{
          color: colors.primary,
          ...stylesCommon.fontWeight600,
          fontSize: scaler(12),
          textAlign: 'center',
        }}>
        {t(`home.trimester.${trimester - 1}`)}
      </Text>
      <ProgressBar
        now={weekPregnant?.weeks ?? week}
        total={WEEK_MAX}
        segmentNumber={3}
        styleProgressBar={{
          marginHorizontal: scaler(16),
          marginTop: scaler(12),
        }}
      />
      <Text style={styles.textTitle}>
        {t('home.pregnancy.pregnant', {
          weeks: weekPregnant.weeks,
          days: weekPregnant.days,
        })}
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.textTime}>{t('home.dueDate')}</Text>
        <View style={{borderBottomWidth: 1, borderColor: colors.textColor}}>
          <Text
            style={{
              ...stylesCommon.fontWeight600,
              color: colors.textColor,
              fontSize: scaler(12),
            }}>
            {getTimePregnancy(new Date(duaDate))}
          </Text>
        </View>
      </View>

      {/* <SvgPregnancy
      // style={{position: 'absolute', top: scaler(-8), right: scaler(-8)}}
      /> */}
    </TouchableOpacity>
  );
};

const ProgressBar = ({
  now,
  total,
  segmentNumber = 0,
  styleProgressBar,
}: {
  now: number;
  total: number;
  segmentNumber?: number;
  styleProgressBar?: StyleProp<ViewStyle>;
}) => {
  const width = (now / total) * 100 < 100 ? (now / total) * 100 : 100;
  return (
    <View style={[styles.progressBar, styleProgressBar]}>
      <View style={[styles.progress, {width: `${width}%`}]} />
      {/* <View style={{flexDirection: 'row', flex: 1}}>
        {segmentNumber > 1 &&
          Array(segmentNumber)
            .fill(0)
            .map((_, index) => (
              <View
                style={[
                  styles.segment,
                  {
                    borderLeftWidth: index === 0 ? 0 : 2,
                  },
                ]}
                key={index}
              />
            ))}
      </View> */}
    </View>
  );
};

const getTrimester = (weeks: number) => {
  const trimester = WEEK_MAX / weeks;
  if (trimester >= 3) {
    return 1;
  } else if (trimester >= 3 / 2) {
    return 2;
  } else {
    return 3;
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: scaler(24),
    borderRadius: scaler(16),
    // alignItems: 'center',s
  },
  icon: {
    marginRight: scaler(14),
  },
  body: {
    flex: 1,
  },
  textTitle: {
    ...stylesCommon.fontWeight600,
    color: colors.textColor,
    fontSize: scaler(16),
    lineHeight: scaler(19),
    textAlign: 'center',
    marginVertical: scaler(16),
  },
  textTime: {
    ...stylesCommon.fontWeight400,
    color: colors.textColor,
    fontSize: scaler(12),
  },
  text: {
    color: colors.white,
    ...stylesCommon.fontWeight700,
    fontSize: scaler(14),
    lineHeight: 17,
    marginRight: scaler(50),
  },
  progressContainer: {
    justifyContent: 'space-between',
    marginTop: scaler(32),
  },
  progress: {
    height: '100%',
    backgroundColor: '#FE8187',
    borderRadius: 10,
    position: 'absolute',
  },
  progressBar: {
    backgroundColor: '#F6F4F6',
    height: scaler(14),
    borderRadius: scaler(40),
    flex: 1,
  },
  segment: {
    height: '100%',
    flex: 1,
    borderColor: '#DA494B',
  },
});
