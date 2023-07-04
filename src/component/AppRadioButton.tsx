import {RadioButton, RadioButtonSelected} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IItem} from './_type';

interface AppRadioButtonProps {
  listItem: IItem[];
  onChange: (value: any) => void;
  value: any;
}

export const AppRadioButton = ({
  listItem,
  onChange,
  value,
}: AppRadioButtonProps) => {
  return (
    <View>
      {listItem.map((item, index) => (
        <ItemRadioButton
          item={item}
          value={value}
          key={index}
          onPress={onChange}
        />
      ))}
    </View>
  );
};

interface ItemRadioButtonProps {
  item: IItem;
  onPress: (value: any) => void;
  value: any;
}

const ItemRadioButton = ({item, onPress, value}: ItemRadioButtonProps) => {
  const isSelected = item.value === value;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onPress(item.value)}
      style={styles.containerItem}>
      <Image
        source={isSelected ? RadioButtonSelected : RadioButton}
        style={styles.radioImg}
      />
      <Text style={styles.textItem}>{item.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaler(14),
  },
  radioImg: {
    marginRight: scaler(12),
  },
  textItem: {
    ...stylesCommon.fontWeight500,
    color: colors.white,
    lineHeight: scaler(15),
    fontSize: scaler(14),
  },
});
