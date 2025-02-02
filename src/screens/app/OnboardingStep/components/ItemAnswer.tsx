import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import {ic_wave_bottom, ic_wave_top, SvgPathBottom, SvgPathTop} from '@images';
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
      <Image
        source={ic_wave_top}
        style={{
          width: '100%',
          tintColor: props.isSelected ? colors.blue : colors.white,
        }}
      />

      <Pressable
        style={{flex: 1, marginBottom: -0.2}}
        onPress={props.onSelected}>
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
      </Pressable>
      <View style={{marginBottom: 1}}>
        <Image
          source={ic_wave_bottom}
          style={{
            width: '100%',
            tintColor: props.isSelected ? colors.blue : colors.white,
          }}
        />
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
