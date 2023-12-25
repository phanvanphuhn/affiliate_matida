import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {SvgPathBottom, SvgPathTop} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';

interface ItemAnswerProps {
  isSelected?: boolean;
  onSelected: () => void;
  title: string;
  answerKey: string;
}

const ItemAnswer = (props: ItemAnswerProps) => {
  const [state, setState] = useState();
  return (
    <View style={styles.container}>
      <SvgPathTop color={props.isSelected ? colors.blue : colors.white} />
      <TouchableWithoutFeedback style={{flex: 1}} onPress={props.onSelected}>
        <View
          style={{
            backgroundColor: props.isSelected ? colors.blue : colors.white,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: scaler(20),
          }}>
          <Text
            style={[
              styles.textAnswer,
              props.isSelected ? {color: colors.white, fontWeight: '600'} : {},
            ]}>
            {props.answerKey}.
          </Text>
          <Text
            style={[
              styles.textAnswer,
              props.isSelected ? {color: colors.white, fontWeight: '600'} : {},
              {paddingHorizontal: 20},
            ]}>
            {props.title}
          </Text>
          <View style={{width: 10}} />
        </View>
      </TouchableWithoutFeedback>
      <View style={{marginBottom: 1}}>
        <SvgPathBottom color={props.isSelected ? colors.blue : colors.white} />
      </View>
    </View>
  );
};

export default ItemAnswer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginBottom: -1,
  },
  textAnswer: {
    textAlign: 'center',
    fontSize: scaler(17),
    fontWeight: '500',
    color: colors.borderColor,
    ...stylesCommon.fontSarabun600,
  },
});
