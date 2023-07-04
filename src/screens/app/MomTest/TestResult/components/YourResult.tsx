import {scaler} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {styles} from '../style';

type Props = {
  onPressLink?: () => void;
  style?: StyleProp<ViewStyle>;
  total: number;
  userScore: number;
};

export const YourResult = ({onPressLink, style, total, userScore}: Props) => {
  const {t} = useTranslation();
  return (
    <View style={[{padding: scaler(16)}, style]}>
      <View style={styles.topResult}>
        <Text style={styles.titleResult}>{t('test.yourResult')}</Text>
      </View>
      <View style={styles.bottomResult}>
        {!!total ? (
          <Text style={styles.textMark}>
            <Text style={{fontSize: scaler(40)}}>
              {!!userScore ? userScore : 0}
            </Text>
            /{total}
          </Text>
        ) : null}
        {!!onPressLink ? (
          <TouchableOpacity activeOpacity={0.9} onPress={onPressLink}>
            <Text style={styles.textSeeAll}>{t('test.seeAllAnswer')}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
