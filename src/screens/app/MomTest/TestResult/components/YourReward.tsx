import {AppImage} from '@component';
import {scaler} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from '../style';

type Props = {
  badge: any;
};
export const YourReward = ({badge}: Props) => {
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state.auth.lang);
  return (
    <View style={{padding: scaler(16), paddingTop: 0}}>
      <View style={styles.containerReward}>
        <View>
          <Text style={styles.textTitleReward}>{t('test.reward')}</Text>
          <Text style={styles.textReward}>
            {lang === 2 ? badge?.name_vi : badge?.name_en}
          </Text>
        </View>
        <AppImage uri={badge?.image} style={styles.imageReward} />
      </View>
    </View>
  );
};
