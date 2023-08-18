/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {AppButton, Header} from '@component';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import reactotron from 'reactotron-react-native';
import {ItemQuestion} from './ItemQuestion';

export const Question3 = () => {
  const [indexSelected, setIndexSelected] = useState<undefined | number>();
  const [value, setValue] = useState('');

  const listQuestion = [
    {
      id: 1,
      value: t('chooseDueDate.option1'),
    },
    {
      id: 2,
      value: t('chooseDueDate.option2'),
    },
    {
      id: 3,
      value: t('chooseDueDate.option3'),
    },
  ];

  const onChangeText = (text: string) => {
    !!text.length && setIndexSelected(undefined);
    setValue(text);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.contentContainer}>
        <Text style={[styles.text, styles.textTitle]}>
          {t('chooseDueDate.titleQuestion3')}
        </Text>
        <View style={styles.viewContent}>
          {listQuestion.map(question => {
            return (
              <ItemQuestion
                active={indexSelected === question.id}
                text={question.value}
                onPress={() => {
                  setIndexSelected(question.id);
                }}
              />
            );
          })}
          <View style={styles.viewInput}>
            <TextInput
              style={styles.input}
              placeholder={t('chooseDueDate.placeholderOption4').toString()}
              placeholderTextColor={'rgba(255,255,255,0.5)'}
              multiline
              onChangeText={onChangeText}
            />
          </View>
        </View>
        <View style={styles.viewButton}>
          <AppButton
            titleButton={t('chooseDueDate.submit')}
            customStyleButton={styles.button}
            customStyleText={styles.textButton}
            customStyleDisable={styles.disableButton}
            disable={!indexSelected && !value.length}
            // onClick={handlePressButton}
          />
          <View style={{width: scaler(16)}} />
          <AppButton
            titleButton={t('chooseDueDate.skip')}
            customStyleButton={styles.button}
            customStyleText={styles.textButton}
            // onClick={handlePressButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  contentContainer: {
    paddingHorizontal: scaler(16),
  },
  text: {
    color: colors.white,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
    lineHeight: scaler(21),
    marginTop: scaler(40),
  },
  textTitle: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(32),
    lineHeight: scaler(48),
    marginBottom: scaler(12),
  },
  button: {
    backgroundColor: colors.white,
    marginTop: scaler(103),
    flexShrink: 1,
    flexGrow: 0,
  },
  textButton: {
    color: colors.brandMainPinkRed,
  },
  disableButton: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  viewButton: {
    flexDirection: 'row',
    gap: scaler(16),
  },
  viewContent: {
    gap: scaler(8),
    marginTop: scaler(52),
  },
  input: {
    ...stylesCommon.fontWeight600,
    color: 'white',
    fontSize: scaler(14),
    paddingVertical: scaler(8),
    // paddingHorizontal: scaler(12),
    paddingHorizontal: 0,
    textAlignVertical: 'top',
  },
  viewInput: {
    minHeight: scaler(60),
    backgroundColor: '#AE5151',
    borderRadius: scaler(8),
    marginTop: scaler(8),
    paddingHorizontal: scaler(12),
  },
});
