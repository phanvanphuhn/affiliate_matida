import React, {useMemo, useState} from 'react';
import {Text, View, StyleSheet, TextInput, TextInputProps} from 'react-native';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {getIn, useFormikContext} from 'formik';
import {UpdateInformationState} from '../UpdateInformation';

interface FormInputProps extends TextInputProps {
  name: keyof UpdateInformationState;
  title: string;
  placeholder: string;
}

const FormInput = (props: FormInputProps) => {
  const {handleChange, values, errors, touched} =
    useFormikContext<UpdateInformationState>();
  console.log('=>(FormInput.tsx:16) touched', touched);
  const error = useMemo(() => getIn(errors, props.name), [errors, props.name]);
  console.log('=>(FormInput.tsx:17) error', error);
  const isTouched = useMemo(
    () => getIn(touched, props.name),
    [props.name, touched],
  );
  console.log('=>(FormInput.tsx:22) isTouched', isTouched);
  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>{props.title}</Text>
      <TextInput
        {...props}
        value={values[props.name]}
        onChangeText={handleChange(props.name)}
        style={styles.input}
        placeholder={props.placeholder}
      />
      {!!error && !!isTouched && <Text style={styles.textError}>{error}</Text>}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {},
  textLabel: {
    fontSize: scaler(13),
    fontWeight: '500',
    color: colors.labelColor,
    marginTop: scaler(20),
    textAlign: 'center',
    ...stylesCommon.fontSarabun500,
  },
  input: {
    textAlign: 'center',
    fontSize: scaler(16),
    fontWeight: '500',
    paddingTop: scaler(10),
    ...stylesCommon.fontWeight400,
  },
  textError: {
    textAlign: 'center',
    color: colors.red200,
    fontSize: scaler(13),
    fontWeight: '500',
    marginTop: 8,
    ...stylesCommon.fontSarabun500,
  },
});
