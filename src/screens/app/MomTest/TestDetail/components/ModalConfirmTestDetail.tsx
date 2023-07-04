import {AppButton} from '@component';
import {goBack} from '@navigation';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {styles} from '../style';

type Props = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalConfirmTestDetail = ({setVisible}: Props) => {
  const {t} = useTranslation();
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={s.textCongratulation}>{t('test.titleConfirm')}</Text>
      <Text style={s.textReward}>{t('test.bodyConfirm')}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <AppButton
          titleButton={t('test.cancel')}
          customStyleButton={[styles.button, styles.buttonRight]}
          customStyleText={styles.textButton}
          onClick={() => setVisible(false)}
        />
        <AppButton
          titleButton={t('test.exit')}
          customStyleButton={[styles.button, {marginLeft: scaler(8)}]}
          customStyleText={[styles.textButton, {color: colors.white}]}
          onClick={() => goBack()}
        />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  imageReward: {
    width: scaler(128),
    height: scaler(128),
  },
  textCongratulation: {
    ...stylesCommon.fontPlus600,
    fontSize: scaler(24),
    color: colors.textColor,
    textAlign: 'center',
  },
  textReward: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(14),
    color: colors.textColor,
    textAlign: 'center',
    marginTop: scaler(8),
    marginBottom: scaler(32),
  },
  reward: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(16),
    color: colors.purple,
    marginTop: scaler(16),
    marginBottom: scaler(32),
  },
});
