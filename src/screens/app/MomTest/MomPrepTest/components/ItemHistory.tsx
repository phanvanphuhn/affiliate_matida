import {AppImage} from '@component';
import {EPreRoute} from '@constant';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {scaler} from '@stylesCommon';
import {getTimeHistoryMomTest} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from '../style';

type Props = {
  item: any;
};

export const ItemHistory = ({item}: Props) => {
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state.auth.lang);

  const handlePress = () => {
    navigate(ROUTE_NAME.TEST_RESULT, {
      id: item?.package_quiz_id,
      redoTest: () => {},
      preRoute: EPreRoute.HISTORY,
    });
  };
  return (
    <TouchableOpacity
      style={styles.containerPeriodic}
      activeOpacity={0.9}
      onPress={handlePress}>
      <AppImage uri={item?.package_quiz?.image} style={styles.imagePeriodic} />
      <View style={{marginLeft: scaler(24), flex: 1}}>
        <Text style={styles.textTimeHistory}>
          {getTimeHistoryMomTest(item?.created_at)}
        </Text>
        <Text style={styles.labelPeriodic} numberOfLines={2}>
          {t('test.completedNameTest', {
            name: '',
          })}
          {lang === 2
            ? item?.package_quiz?.name_vi
            : item?.package_quiz?.name_en}
        </Text>
        <View style={styles.line} />
        <View style={styles.viewReward}>
          <View style={{flex: 1}}>
            <Text style={styles.textTitleReward}>{t('test.reward')}</Text>
            <Text style={styles.textReward} numberOfLines={2}>
              {lang === 2
                ? item?.package_quiz?.badge?.name_vi
                : item?.package_quiz?.badge?.name_en}
            </Text>
          </View>
          <AppImage
            uri={item?.package_quiz?.badge?.image}
            style={{
              width: scaler(32),
              height: scaler(32),
              marginLeft: scaler(4),
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
