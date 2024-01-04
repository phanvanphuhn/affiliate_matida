import {
  SvgArrowLeft,
  iconArrowLeft,
  iconArrowRight,
  iconGoBackNewBorn,
  iconNextNewBorn,
} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {TState} from './Information';
import {useTranslation} from 'react-i18next';

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
  const {t} = useTranslation();
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
      {state.page == 12 && (
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => setState({isKnowDueDate: !state.isKnowDueDate})}>
          <Text style={styles.btnText}>
            {state.isKnowDueDate
              ? t('chooseDueDate.notKnowDueDate')
              : t('chooseDueDate.knowDueDate')}
          </Text>
        </TouchableOpacity>
      )}
      {!disableNextBtn() && (
        <TouchableOpacity
          style={[
            styles.nextButton,
            {
              backgroundColor: colors.pink200,
              transform: [{rotate: '180deg'}],
            },
          ]}
          onPress={state.page == 12 || state.page == 8 ? onDone : onNextPage}
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
