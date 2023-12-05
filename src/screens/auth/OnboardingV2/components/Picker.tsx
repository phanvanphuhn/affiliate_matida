import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scaler} from '@stylesCommon';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {TPickerOption, TState} from './Information';
import {useTranslation} from 'react-i18next';

type TProps = {
  data: TPickerOption[];
  setState: ({}) => void;
  state: TState;
  type: String;
};

const PickerOption = (props: TProps) => {
  const {data, setState, state, type} = props;
  const pickerRef = useRef<any>(null);
  const {t} = useTranslation();

  const renderLabel = (value: string) => {
    switch (value) {
      case 'male':
        return t('newBorn.male');
      case 'female':
        return t('newBorn.female');
      case 'notToSay':
        return t('newBorn.notToSay');
      case 'natural_birth':
        return t('newBorn.naturalBirth');
      case 'c_section':
        return t('newBorn.cSection');
    }
  };

  return (
    <Picker
      ref={pickerRef.current}
      selectedValue={type == 'sex' ? state.sex : state.deliver}
      onValueChange={(itemValue, itemIndex) => {
        if (type == 'sex') {
          setState({sex: itemValue});
        } else {
          setState({deliver: itemValue});
        }
      }}
      style={{flex: 1, width: '100%'}}>
      {data.map(item => {
        return (
          <Picker.Item label={renderLabel(item.value)} value={item.value} />
        );
      })}
    </Picker>
  );
};

const styles = StyleSheet.create({
  slide: {
    marginTop: scaler(52),
  },
});

export default PickerOption;
