/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {scaler, stylesCommon} from '@stylesCommon';
import {event, eventType, openUrl, trackingAppEvent} from '@util';
import {t} from 'i18next';
import React, {useCallback, useEffect, useRef} from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  data: any;
  weekSelected: number;
  onLayoutItem: (top: number, index: number) => void;
  onRendered: () => void;
};

export const CheckupCalendar = (props: Props) => {
  const {data = {}, weekSelected, onLayoutItem, onRendered} = props;

  const insets = useSafeAreaInsets();

  const listData = Object.values(data);
  const listPosition = useRef([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    onRendered();
    trackingAppEvent(
      event.BABY_TRACKER.CHANGE_TO_CALENDAR,
      {},
      eventType.MIX_PANEL,
    );
  }, []);

  const LineView = ({
    content,
    isRightContent,
    isHeader,
    lastLine,
    onLayout,
    onPress,
  }: {
    content?: any;
    isRightContent?: boolean;
    isHeader?: boolean;
    lastLine?: boolean;
    onLayout?: (event: LayoutChangeEvent) => void;
    onPress?: () => void;
  }) => {
    return (
      <View
        onLayout={onLayout}
        style={[
          styles.lineContainer,
          lastLine && {paddingBottom: insets.bottom},
        ]}>
        <TouchableOpacity
          disabled={isRightContent || !onPress}
          onPress={onPress}
          style={[
            styles.contentContainer,
            {
              // borderRightWidth: scaler(1),
              paddingRight: scaler(20),
              opacity: !isRightContent ? 1 : 0,
            },
          ]}>
          {content}
          {!isRightContent && !isHeader && <View style={styles.dot} />}
        </TouchableOpacity>
        <View
          style={{
            height: '100%',
            width: scaler(3),
            backgroundColor: '#E9E9E9',
            zIndex: -50,
          }}
        />
        <TouchableOpacity
          disabled={!isRightContent || !onPress}
          onPress={onPress}
          style={[
            styles.contentContainer,
            {
              // borderLeftWidth: scaler(1),
              paddingLeft: scaler(20),
              opacity: isRightContent ? 1 : 0,
            },
          ]}>
          {content}
          {isRightContent && !isHeader && <View style={styles.dotRight} />}
        </TouchableOpacity>
      </View>
    );
  };

  const Section = ({
    content,
    title,
    left,
  }: {
    title: string;
    content: string;
    left?: boolean;
  }) => {
    return (
      <View
        style={
          left && {
            alignItems: 'flex-end',
          }
        }>
        <Text
          style={[
            styles.txtTitle,
            left && {
              textAlign: 'right',
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.txtContent,
            left && {
              textAlign: 'right',
            },
          ]}>
          {content}
        </Text>
      </View>
    );
  };

  const Week = ({
    rangeDate,
    rangeWeek,
    afterBirth,
  }: {
    rangeDate: {start?: string; end?: string; range?: string};
    rangeWeek: {start?: string; end?: string; range?: string};
    afterBirth?: boolean;
  }) => {
    return (
      <View>
        <Text style={styles.txtWeek}>
          {afterBirth
            ? t('sizeComparison.afterBirth')
            : `${t('sizeComparison.weeks')
                .replace('%start', rangeWeek?.start ?? '')
                .replace('%end', rangeWeek?.end ?? '')}`}
        </Text>
        <Text style={styles.txtContent}>
          {rangeDate?.range
            ? rangeDate?.range
            : `${rangeDate.start} - ${rangeDate.end}`}
        </Text>
      </View>
    );
  };

  const ItemGroups = useCallback(
    ({groups, indexGroups}: {groups: any; indexGroups: number}) => {
      const period = groups?.contents[0]?.period_number ?? [];
      return (
        <View
          onLayout={e => {
            const top = e.nativeEvent.layout.y;
            if (top > 0) {
              listPosition.current[indexGroups] = top;
            }
            onLayoutItem(top, indexGroups);
          }}
          style={[
            {
              paddingHorizontal: scaler(12),
            },
            indexGroups % 2 ? {backgroundColor: '#FFF8F8'} : undefined,
          ]}>
          <LineView
            content={
              <Week
                rangeDate={{
                  range: groups?.dateRange,
                }}
                rangeWeek={{end: period[1] ?? '0', start: period[0] ?? '0'}}
                afterBirth={indexGroups === listData.length - 1}
              />
            }
            isHeader
          />
          {groups?.contents?.map((week: any, index: number) => {
            return week?.url ? (
              <LineView
                content={
                  <Section
                    title={week?.title}
                    content={week?.description ?? ''}
                    left={week?.position === 'left'}
                  />
                }
                lastLine={
                  indexGroups === listData?.length - 1 &&
                  index === groups?.contents?.length - 1
                }
                isRightContent={week?.position === 'right'}
                onPress={
                  week?.url &&
                  (() => {
                    trackingAppEvent(
                      event.BABY_TRACKER.OPEN_ARTICLE,
                      {
                        url: week?.url,
                        period: week?.period_number,
                        title: week?.title,
                      },
                      eventType.MIX_PANEL,
                    );
                    openUrl(week?.url);
                  })
                }
              />
            ) : null;
          })}
        </View>
      );
    },
    [],
  );

  return (
    <View style={[styles.container]}>
      {listData?.length > 0 &&
        listData?.map((groups: any, indexGroups: number) => {
          return <ItemGroups groups={groups} indexGroups={indexGroups} />;
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: scaler(12),
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
