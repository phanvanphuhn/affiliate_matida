import {SvgCheck, SvgX} from '@images';
import {colors} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from '../style';
type Props = {
  data: any[];
};
export const AnswerList = ({data}: Props) => {
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state.auth.lang);

  const renderItem = ({item, index}: {item: any; index: number}) => {
    const isCorrect = item?.userAnwser?.is_correct;
    return (
      <View
        style={[
          styles.itemAnswer,
          {backgroundColor: isCorrect ? colors.green100 : colors.yellow100},
        ]}>
        <View style={styles.viewQuestionHeader}>
          <Text style={styles.textQuestion}>
            {t('test.question', {index: index + 1})}
          </Text>
          {isCorrect ? <SvgCheck /> : <SvgX />}
        </View>
        <Text style={styles.textNameQuestion}>
          {lang === 2
            ? item?.question?.question_vi
            : item?.question?.question_en}
        </Text>
        <Text style={styles.textAnswer}>
          {t('test.answer')}
          <Text
            style={{
              // color: isCorrect ? colors.success_message : colors.error_message,
              color: colors.textColor,
            }}>
            {lang === 2
              ? item?.userAnwser?.answer_vi
              : item?.userAnwser?.answer_en}
          </Text>
        </Text>
      </View>
    );
  };

  const ListHeaderComponent = () => {
    return <Text style={styles.textList}>{t('test.listAnswer')}</Text>;
  };
  return (
    <View style={styles.viewBody}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        style={styles.answerList}
      />
    </View>
  );
};
