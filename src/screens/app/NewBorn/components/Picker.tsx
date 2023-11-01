import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scaler} from '@stylesCommon';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {TPickerOption, TState} from './Information';

type TProps = {
  data: TPickerOption[];
  setState: ({}) => void;
  state: TState;
  type: String;
};

const PickerOption = (props: TProps) => {
  const {data, setState, state, type} = props;
  const pickerRef = useRef<any>(null);

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
        return <Picker.Item label={item.title} value={item.value} />;
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
