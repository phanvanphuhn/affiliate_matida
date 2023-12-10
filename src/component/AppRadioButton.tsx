import {SvgRadioCircle, SvgRadioSelected} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {IItem} from './_type';

interface AppRadioButtonProps {
  listItem: IItem[];
  onChange: (value: any) => void;
  value: any;
  textStyle?: StyleProp<TextStyle>;
  iconColor?: string;
}

export const AppRadioButton = ({
  listItem,
  onChange,
  value,
  textStyle,
  iconColor,
}: AppRadioButtonProps) => {
  return (
    <View>
      {listItem.map((item, index) => (
        <ItemRadioButton
          item={item}
          value={value}
          key={index}
          onPress={onChange}
          textStyle={textStyle}
          iconColor={iconColor}
        />
      ))}
    </View>
  );
};

interface ItemRadioButtonProps {
  item: IItem;
  onPress: (value: any) => void;
  value: any;
  textStyle?: StyleProp<TextStyle>;
  iconColor?: string;
}

const ItemRadioButton = ({
  item,
  onPress,
  value,
  textStyle,
  iconColor,
}: ItemRadioButtonProps) => {
  const isSelected = item.value === value;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onPress(item.value)}
      style={styles.containerItem}>
      <View style={styles.radioImg}>
        {isSelected ? (
          <SvgRadioSelected color={iconColor} />
        ) : (
          <SvgRadioCircle color={iconColor} />
        )}
      </View>
      <Text style={[styles.textItem, textStyle]}>{item.label}</Text>
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
