import {
  SvgArrowLeft,
  iconArrowLeft,
  iconArrowRight,
  iconGoBackNewBorn,
  iconNextNewBorn,
} from '@images';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {TState} from './Information';

type TProps = {
  onNextPage: () => void;
  onPreviousPage: () => void;
  state: TState;
  onValidate: () => boolean;
};

const Button = (props: TProps) => {
  const {onNextPage, onPreviousPage, state, onValidate} = props;

  const disableNextBtn = () => {
    if (state.name.length < 1 && state.page == 3) {
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
      <TouchableOpacity
        style={[
          styles.nextButton,
          {
            backgroundColor: colors.gray350,
          },
        ]}
        onPress={onPreviousPage}>
        <SvgArrowLeft stroke={colors.textColor} size={24} />
      </TouchableOpacity>
      {!disableNextBtn() && (
        <TouchableOpacity
          style={[
            styles.nextButton,
            {
              backgroundColor: colors.pink200,
              transform: [{rotate: '180deg'}],
            },
          ]}
          onPress={onNextPage}
          disabled={disableNextBtn()}>
          <SvgArrowLeft size={24} />
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
  },
  nextButton: {
    padding: scaler(12),
    borderRadius: 99,
  },
});

export default Button;
