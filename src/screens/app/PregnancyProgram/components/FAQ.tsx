import React, {useMemo, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import Collapsible from './Collapsible';
import {useTranslation} from 'react-i18next';

interface FAQProps {}

const colorList = [colors.pink350, colors.yellow200, colors.blue50];
const FAQ = (props: FAQProps) => {
  const [state, setState] = useState();
  const {t} = useTranslation();
  const data = useMemo(
    () => [
      {
        title: t('pregnancyProgram.HowDoesTheProgramWork'),
        content: t('pregnancyProgram.contentHowDoesTheProgramWork'),
      },
      {
        title: t('pregnancyProgram.WhatFeaturesAreIncluded'),
        content: t('pregnancyProgram.contentWhatFeaturesAreIncluded'),
      },
      {
        title: t('pregnancyProgram.WhereDidMatidaSourceItsContent'),
        content: t('pregnancyProgram.contentWhereDidMatidaSourceItsContent'),
      },
      {
        title: t('pregnancyProgram.HowOftenIsTheProgramContentUpdated'),
        content: t(
          'pregnancyProgram.contentHowOftenIsTheProgramContentUpdated',
        ),
      },
      {
        title: t('pregnancyProgram.WhoIsTheMatidaPregnancyProgramDesignedFor'),
        content: t(
          'pregnancyProgram.contentWhoIsTheMatidaPregnancyProgramDesignedFor',
        ),
      },
      {
        title: t('pregnancyProgram.HowLongDoesTheProgramLast'),
        content: t('pregnancyProgram.contentHowLongDoesTheProgramLast'),
      },
      {
        title: t('pregnancyProgram.CanIJoinTheProgramAtAAnyStageOfMyPregnancy'),
        content: t(
          'pregnancyProgram.contentCanIJoinTheProgramAtAAnyStageOfMyPregnancy',
        ),
      },
      {
        title: t('pregnancyProgram.IsTheProgramSuitable'),
        content: t('pregnancyProgram.contentIsTheProgramSuitable'),
      },
      {
        title: t('pregnancyProgram.HowIsTheMatidaProgram'),
        content: t('pregnancyProgram.contentHowIsTheMatidaProgram'),
      },
      {
        title: t('pregnancyProgram.AreThereAnyLiveSessions'),
        content: t('pregnancyProgram.contentAreThereAnyLiveSessions'),
      },
      {
        title: t(
          'pregnancyProgram.CanFamilyMembersOrPartnersParticipateInTheProgram',
        ),
        content: t(
          'pregnancyProgram.contentCanFamilyMembersOrPartnersParticipateInTheProgram',
        ),
      },
      {
        title: t('pregnancyProgram.IHaveMoreQuestions'),
        content: t('pregnancyProgram.contentIHaveMoreQuestions'),
      },
    ],
    [],
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontSize: scaler(17),
            ...stylesCommon.fontWeight500,
          }}>
          {t('pregnancyProgram.FrequentlyAskedQuestions')}
        </Text>
        <Text
          style={{
            fontSize: scaler(22),
            ...stylesCommon.fontWeight600,
            lineHeight: 28,
            marginTop: 6,
            marginBottom: 20,
          }}>
          {t('pregnancyProgram.ThereAreNoStupidQuestions')}
        </Text>

        {data.map((item, index) => {
          return (
            <View
              style={{
                marginBottom: 15,
              }}>
              <Collapsible
                title={item.title}
                content={item.content}
                color={colorList[index % 3]}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaler(20),
  },
});
