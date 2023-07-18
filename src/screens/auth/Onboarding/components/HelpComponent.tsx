import {colors} from '@stylesCommon';
import {getUseField} from '@util';
import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {TextInput, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {HelpComponentProps} from '../Onboarding.props';
import {styles} from '../Onboarding.style';

export const HelpComponent = ({data}: HelpComponentProps) => {
  const {t} = useTranslation();

  const {value, setValue} = getUseField('help');

  const refInput = useRef<TextInput>(null);
  return (
    <>
      <TouchableOpacity
        style={styles.viewInputBig}
        activeOpacity={1}
        onPress={() => refInput.current?.focus()}>
        <TextInput
          ref={refInput}
          style={styles.inputBig}
          multiline
          value={value}
          onChangeText={(text: string) => setValue(text)}
          maxLength={5000}
          placeholder={t('feedback.help.placeholder') as string}
          placeholderTextColor={`${colors.white}80`}
        />
      </TouchableOpacity>
    </>
  );
};
