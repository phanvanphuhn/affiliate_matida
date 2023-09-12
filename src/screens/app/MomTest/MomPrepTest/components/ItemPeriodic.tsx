import {AppImage, ProgressBar} from '@component';
import {EPreRoute} from '@constant';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler} from '@stylesCommon';
import {event, eventType, trackingAppEvent} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from '../style';

type Props = {
  item: any;
};

export const ItemPeriodic = ({item}: Props) => {
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state.auth.lang);

  const handlePress = () => {
    if (!item?.is_active) {
      return;
    }
    if (+item?.maxScore === +item?.total_questions) {
      trackingAppEvent(event.MOM_TEST.START, {content: item?.id}, eventType.MIX_PANEL);
      navigate(ROUTE_NAME.TEST_RESULT, {
        id: item?.id,
        redoTest: () => {},
        preRoute: EPreRoute.PERIODIC,
      });
    } else {
      trackingAppEvent(event.MOM_TEST.START, {content: item}, eventType.MIX_PANEL);
      navigate(ROUTE_NAME.TEST_DETAIL, {quiz: item});
    }
  };
  return (
    <TouchableOpacity
      style={[styles.containerPeriodic, !item?.is_active && {opacity: 0.4}]}
      disabled={!item?.is_active}
      activeOpacity={0.9}
      onPress={handlePress}>
      <AppImage uri={item?.image} style={styles.imagePeriodic} />
      <View style={{marginLeft: scaler(16), flex: 1}}>
        <Text style={styles.labelPeriodic} numberOfLines={1}>
          {lang === 2 ? item?.name_vi : item?.name_en}
        </Text>
        <Text style={styles.textPeriodic} numberOfLines={2}>
          {lang === 2 ? item?.description_vi : item?.description_en}
        </Text>
        <View style={styles.viewProgress}>
          <ProgressBar
            total={item?.total_questions ?? 0}
            now={item?.maxScore ?? 0}
          />
          <Text
            style={[
              styles.textProgress,
              {color: !item?.is_start ? colors.purple : colors.success_message},
            ]}>
            {item?.is_start
              ? t('test.completedTest', {
                  index:
                    +item?.total_questions > 0
                      ? Math.floor(
                          (+item?.maxScore / +item?.total_questions) * 100,
                        )
                      : 0,
                })
              : t('test.notStarted')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
