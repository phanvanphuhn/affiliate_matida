import {
  iconArrowLeft,
  iconArrowRight,
  iconGoBackNewBorn,
  iconNextNewBorn,
} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {TState} from './Information';

type TProps = {
  onNextPage: () => void;
  onPreviousPage: () => void;
  state: TState;
  onValidate: () => boolean;
  setState: ({}) => void;
  onDone: () => void;
};

const Button = (props: TProps) => {
  const {onNextPage, onPreviousPage, state, onValidate, setState, onDone} =
    props;
  const disableNextBtn = () => {
    if (state.name.length < 1 && (state.page == 3 || state.page == 10)) {
      return true;
    } else if (onValidate()) {
      return true;
    } else if (state.weight.length < 1 && state.page == 6) {
      return true;
    } else if (state.height.length < 1 && state.page == 7) {
      return true;
    } else {
      false;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.nextButton} onPress={onPreviousPage}>
        <Image
          source={iconGoBackNewBorn}
          style={{height: scaler(48), width: scaler(48)}}
        />
      </TouchableOpacity>
      {state.page == 12 && (
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => setState({isKnowDueDate: !state.isKnowDueDate})}>
          <Text style={styles.btnText}>
            {state.isKnowDueDate
              ? `I don't know my due date`
              : `I know my due date`}
          </Text>
        </TouchableOpacity>
      )}
      {!disableNextBtn() && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={state.page == 12 ? onDone : onNextPage}
          disabled={disableNextBtn()}>
          <Image
            source={iconNextNewBorn}
            style={{height: scaler(48), width: scaler(48)}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaler(24),
    alignItems: 'center',
  },
  nextButton: {
    padding: scaler(12),
    borderRadius: 99,
  },
  primaryBtn: {
    justifyContent: 'center',
  },
  btnText: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(14),
    color: colors.primaryBackground,
  },
});

export default Button;
