import {AppButton} from '@component';
import {EButtonTest} from '@constant';
import {colors, scaler} from '@stylesCommon';
import {getUseField} from '@util';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {styles} from '../style';

type Props = {
  onPress: (index: number) => Promise<void>;
  total: number;
  onSubmit: () => Promise<void>;
};

export const ViewButtonTest = ({onPress, total, onSubmit}: Props) => {
  const {t} = useTranslation();
  const {value: current, setValue: setCurrent} = getUseField('current');
  const {value: answer, setValue: setAnswer} = getUseField('answer');

  const [disable, setDisable] = useState<boolean>(false);

  const handlePress = async (button: EButtonTest) => {
    if (disable) {
      return;
    }
    setDisable(true);
    if (button === EButtonTest.RIGHT && +current === total - 1) {
      await onSubmit();
    } else {
      let newValue = current;
      if (button === EButtonTest.LEFT) {
        newValue = current - 1;
      } else {
        newValue = current + 1;
      }
      await onPress(newValue);
      setCurrent(newValue);
    }
    setTimeout(() => setDisable(false), 400);
  };

  return (
    <View style={styles.containerButton}>
      {current !== 0 ? (
        <AppButton
          titleButton={t('test.prevQuestion')}
          customStyleButton={[styles.button, styles.buttonRight]}
          customStyleText={styles.textButton}
          onClick={() => handlePress(EButtonTest.LEFT)}
          disable={disable}
        />
      ) : null}
      {!!total ? (
        <AppButton
          titleButton={
            current >= +total - 1 ? t('test.submit') : t('test.next')
          }
          customStyleButton={[styles.button, {marginLeft: scaler(8)}]}
          customStyleText={[styles.textButton, {color: colors.white}]}
          onClick={() => handlePress(EButtonTest.RIGHT)}
          disable={answer[current] === undefined || disable}
        />
      ) : null}
    </View>
  );
};
