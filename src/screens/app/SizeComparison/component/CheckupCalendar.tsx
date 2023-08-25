/* eslint-disable react-native/no-inline-styles */
import {scaler, stylesCommon} from '@stylesCommon';
import {t} from 'i18next';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const CheckupCalendar = () => {
  const insets = useSafeAreaInsets();

  const LineView = ({
    leftContent,
    rightContent,
    isHeader,
    lastLine,
  }: {
    leftContent?: any;
    rightContent?: any;
    isHeader?: boolean;
    lastLine?: boolean;
  }) => {
    return (
      <View
        style={[
          styles.lineContainer,
          lastLine && {paddingBottom: insets.bottom},
        ]}>
        <View
          style={[
            styles.contentContainer,
            {
              // borderRightWidth: scaler(1),
              paddingRight: scaler(20),
              opacity: leftContent ? 1 : 0,
            },
          ]}>
          {leftContent}
          {leftContent && !isHeader && <View style={styles.dot} />}
        </View>
        <View
          style={{
            height: '100%',
            width: scaler(3),
            backgroundColor: '#E9E9E9',
            zIndex: -50,
          }}
        />
        <View
          style={[
            styles.contentContainer,
            {
              // borderLeftWidth: scaler(1),
              paddingLeft: scaler(20),
              opacity: rightContent ? 1 : 0,
            },
          ]}>
          {rightContent}
          {rightContent && !isHeader && <View style={styles.dotRight} />}
        </View>
      </View>
    );
  };

  const Section = ({content, title}: {title: string; content: string}) => {
    return (
      <View>
        <Text style={styles.txtTitle}>{title}</Text>
        <Text style={styles.txtContent}>{content}</Text>
      </View>
    );
  };

  const Week = ({
    rangeDate,
    rangeWeek,
  }: {
    rangeDate: {start?: string; end?: string};
    rangeWeek: {start?: string; end?: string};
  }) => {
    return (
      <View>
        <Text style={styles.txtWeek}>{`${rangeWeek.start}-${rangeWeek.end} ${t(
          'home.sizeComparison.weeks',
        )}`}</Text>
        <Text
          style={
            styles.txtContent
          }>{`${rangeDate.start}-${rangeDate.end}`}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      <LineView
        leftContent={
          <Section
            title="Test for antibodies"
            content={
              "Your body in week 15 At 15 weeks, you may be boasting a belly that's clearly pregnant"
            }
          />
        }
      />
      <LineView
        leftContent={
          <Week
            rangeDate={{
              end: '30/08/2023',
              start: '18/07/2023',
            }}
            rangeWeek={{end: '25', start: '20'}}
          />
        }
        isHeader
      />
      <LineView
        rightContent={
          <Section
            title="Changes of your body in
            week 20"
            content={
              "Your body in week 15 At 15 weeks, you may be boasting a belly that's clearly pregnant. It's different for every woman, though. If you're a first-time mom, you'll probably start showing later since your abdominal and uterine muscles haven't been stretched by a previous pregnancy."
            }
          />
        }
      />
      <LineView
        leftContent={
          <Section
            title="Nuchal Translucency (NT) Screening"
            content={
              "Your body in week 15 At 15 weeks, you may be boasting a belly that's clearly pregnant"
            }
          />
        }
        lastLine
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scaler(12),
    borderTopWidth: scaler(1),
    borderColor: '#E9E9E9',
  },
  lineContainer: {
    flexDirection: 'row',
  },
  contentContainer: {
    width: '50%',
    flexGrow: 1,
    flexShrink: 1,
    borderColor: '#E9E9E9',
    paddingTop: scaler(24),
  },
  dot: {
    height: scaler(12),
    width: scaler(12),
    backgroundColor: '#E66D6E',
    borderRadius: 12,
    position: 'absolute',
    right: -scaler(7),
    top: scaler(24),
    zIndex: 100,
  },
  dotRight: {
    height: scaler(12),
    width: scaler(12),
    backgroundColor: '#E66D6E',
    borderRadius: 12,
    position: 'absolute',
    left: -scaler(7),
    zIndex: 100,
    top: scaler(24),
  },
  txtTitle: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(14),
    color: '#33302E',
  },
  txtContent: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
    color: '#848484',
    marginTop: scaler(8),
  },
  txtWeek: {
    ...stylesCommon.fontWeight700,
    fontSize: scaler(16),
    color: '#E66D6E',
  },
});
