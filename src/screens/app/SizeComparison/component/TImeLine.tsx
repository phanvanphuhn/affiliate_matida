/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {FLoatingAIButton, Header, PickerWeek} from '@component';
import {SvgArrowLeft} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {useTranslation} from 'react-i18next';
import {getValueTimeLine, GlobalService} from '@services';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {useUXCam} from '@util';
import {trackingAppEvent, event} from '@util';

type Props = {
  week: any;
  data: any[];
};

export const Timeline = (props: Props) => {
  const {week, data} = props;

  const {t} = useTranslation();
  const navigation = useNavigation<any>();

  const [weekLocal, setWeekLocal] = useState(null);

  const renderItem = ({item, index}: any) => {
    const renderStyle = () => {
      if (item?.left === true && item?.right === true) {
        return styles.styleCenter;
      } else if (item?.left === true) {
        return styles.styleLeft;
      } else if (item?.right === true) {
        return styles.styleRight;
      }
    };

    const renderWidth = () => {
      if (item?.left === true && item?.right === true) {
        return '100%';
      } else if (item?.right === true) {
        return '70%';
      } else if (item?.left === true) {
        return '70%';
      }
    };

    const renderColor = () => {
      switch (item?.type) {
        case 1:
          return '#F7C984';
        case 2:
          return '#ED8989';
        case 3:
          return '#40C1B9';
        case 4:
          return '#3E7BFF';
        default:
          return '#A36977';
      }
    };

    const renderColorText = () => {
      switch (item?.type) {
        case 1:
          return '#252525';
        default:
          return '#FFFFFF';
      }
    };

    return (
      <View style={renderStyle()}>
        <TouchableOpacity
          style={[
            styles.itemView,
            {
              width: renderWidth(),
              backgroundColor: renderColor(),
            },
          ]}
          onPress={() => {
            const param = {
              content: item?.content,
              image: item?.thumbnail,
              title: item?.title,
              created_at: item?.created_at,
              id: item?.id,
              isTimeline: true,
            };
            navigation.navigate(ROUTE_NAME.DETAIL_ARTICLE, {article: param});
          }}>
          <Text
            style={[styles.txtContent, {color: renderColorText()}]}
            numberOfLines={2}>
            {item?.title ?? ''}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.viewContent}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={() => {
          return (
            <View style={styles.viewEmpty}>
              <Text style={styles.txtEmpty}>{t('videoList.noData')}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item?.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewTxtHeader: {
    paddingHorizontal: scaler(20),
    marginTop: scaler(16),
  },
  txtShortDate: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    color: colors.primary,
  },
  txtLongDate: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(18),
    color: colors.primary,
    lineHeight: scaler(36),
    marginTop: scaler(4),
  },
  viewPickTime: {
    width: '100%',
    paddingHorizontal: scaler(30),
    marginTop: scaler(35),
  },
  viewContent: {
    flex: 1,
    paddingHorizontal: scaler(20),
    marginTop: scaler(30),
  },
  itemView: {
    height: scaler(50),
    borderRadius: scaler(8),
    backgroundColor: '#ED8989',
    justifyContent: 'center',
    paddingHorizontal: scaler(20),
    marginBottom: scaler(25),
  },
  txtContent: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    color: colors.white,
  },
  styleLeft: {
    alignItems: 'flex-start',
  },
  styleRight: {
    alignItems: 'flex-end',
  },
  styleCenter: {
    alignItems: 'center',
  },
  viewEmpty: {
    alignItems: 'center',
    marginTop: scaler(20),
  },
  txtEmpty: {
    ...stylesCommon.fontWeight500,
    color: colors.borderColor,
    fontSize: scaler(14),
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtStt: {
    color: colors.primary,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight600,
  },
  viewRing1: {
    width: scaler(24),
    height: scaler(24),
    borderRadius: scaler(24 / 2),
    backgroundColor: '#E8F8F7',
    position: 'absolute',
    right: scaler(61),
    top: scaler(296),
  },
  viewRing2: {
    width: scaler(11),
    height: scaler(11),
    borderRadius: scaler(3),
    backgroundColor: '#F3F1FD',
    position: 'absolute',
    right: scaler(46),
    top: scaler(508),
  },
  viewRing3: {
    width: scaler(11),
    height: scaler(11),
    borderRadius: scaler(3),
    backgroundColor: '#FDF1F1',
    position: 'absolute',
    left: scaler(140),
    bottom: scaler(187),
  },
  viewRing4: {
    width: scaler(11),
    height: scaler(11),
    borderRadius: scaler(3),
    backgroundColor: '#FDF1F1',
    position: 'absolute',
    right: scaler(29),
    bottom: scaler(170),
  },
});
