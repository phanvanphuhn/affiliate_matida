import {
  iconArrowLeft,
  iconArrowRight,
  iconGoBackNewBorn,
  iconNextNewBorn,
} from '@images';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

type TProps = {
  onNextPage: () => void;
  onPreviousPage: () => void;
};

const Button = (props: TProps) => {
  const {onNextPage, onPreviousPage} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.nextButton} onPress={onPreviousPage}>
        <Image
          source={iconGoBackNewBorn}
          style={{height: scaler(48), width: scaler(48)}}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.nextButton} onPress={onNextPage}>
        <Image
          source={iconNextNewBorn}
          style={{height: scaler(48), width: scaler(48)}}
        />
      </TouchableOpacity>
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
