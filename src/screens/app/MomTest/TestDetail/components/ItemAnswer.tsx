import {lengthListPreAnswer, listPreAnswer} from '@constant';
import {colors} from '@stylesCommon';
import {getUseField} from '@util';
import {produce} from 'immer';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from '../style';
import {trackQuizChallengeClicked} from '@services/webengageManager.tsx';
export type IAnswer = {
  question_id: number;
  answer_id: number;
};

type Props = {
  index: number;
  answerCurrent: IAnswer;
  item: any;
  idQuestion: number;
};

export const ItemAnswer = ({index, answerCurrent, item, idQuestion}: Props) => {
  const lang = useSelector((state: any) => state.auth.lang);
  const {value: answer, setValue} = getUseField('answer');
  const {value: current} = getUseField('current');
  const handlePress = () => {
    const newAnswer = produce(answer, (draft: IAnswer[]) => {
      draft[current] = {
        question_id: +idQuestion,
        answer_id: +item?.id,
      };
    });
    trackQuizChallengeClicked(item?.id,idQuestion);
    setValue(newAnswer);
  };
  const isSelected = +answerCurrent?.answer_id === +item?.id;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={[styles.itemAnswer, isSelected && {borderColor: colors.purple}]}>
      <Text
        style={[styles.textAnswer, isSelected && {color: colors.purple}]}>{`${
        listPreAnswer[index % lengthListPreAnswer]
      }. ${lang === 2 ? item?.answer_vi : item?.answer_en}`}</Text>
    </TouchableOpacity>
  );
};
