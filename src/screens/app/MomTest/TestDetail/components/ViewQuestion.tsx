import {SvgLogoDailyAffirmation} from '@images';
import {colors, scaler} from '@stylesCommon';
import {getUseField} from '@util';
import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from '../style';

type Props = {
  question: any;
  total: number;
};

export const ViewQuestion = ({question, total}: Props) => {
  const lang = useSelector((state: any) => state.auth.lang);
  const {value} = getUseField('current');
  return (
    <View style={styles.viewQuestion}>
      <SvgLogoDailyAffirmation
        color={colors.white}
        style={{position: 'absolute', top: scaler(15), right: -scaler(60)}}
      />
      <View style={styles.viewIndexQuestion}>
        {!!total ? (
          <Text style={styles.textIndexQuestion}>
            {value + 1 > total ? total : value + 1}/{total}
          </Text>
        ) : null}
      </View>
      <Text style={styles.textQuestion}>
        {lang === 2 ? question?.question_vi : question?.question_en}
      </Text>
    </View>
  );
};
