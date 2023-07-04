import {scaler} from '@stylesCommon';
import {getUseField} from '@util';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from '../style';
import {ItemAnswer} from './ItemAnswer';
import {ViewQuestion} from './ViewQuestion';

type Props = {
  item: any;
  total: number;
};

export const PageTest = ({item, total}: Props) => {
  const {value: current, setValue: setCurrent} = getUseField('current');
  const {value: answer, setValue: setAnswer} = getUseField('answer');

  // console.log('answer: ', answer);
  return (
    <View style={styles.containerPage}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          paddingHorizontal: scaler(16),
          paddingTop: scaler(16),
        }}>
        <ViewQuestion question={item} total={total} />
        <View style={{marginTop: scaler(16)}}>
          {item?.answers?.length > 0
            ? item?.answers?.map((ans: any, index: number) => {
                return (
                  <ItemAnswer
                    key={index}
                    index={index}
                    answerCurrent={answer[current]}
                    idQuestion={item?.id ?? 0}
                    item={ans}
                  />
                );
              })
            : null}
        </View>
      </ScrollView>
    </View>
  );
};
