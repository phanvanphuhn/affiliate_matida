import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface IItem {
  id: number;
  label: string;
  value: number;
  amount: number | any;
}

interface IProps {
  list: IItem[];
  indexButton: number;
  onPressButton: (value: number) => void;
  styleContainer?: StyleProp<ViewStyle>;
  styleContainerFocus?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  styleTextFocus?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  styleBody?: StyleProp<ViewStyle>;
  styleBodyFocus?: StyleProp<ViewStyle>;
}
export const ViewButtonChange = ({
  list,
  indexButton,
  onPressButton,
  styleContainer,
  styleContainerFocus,
  styleText,
  styleTextFocus,
  style,
  styleBody,
  styleBodyFocus,
}: IProps) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          paddingHorizontal: scaler(20),
          marginBottom: scaler(11),
          marginTop: scaler(28),
        },
        style,
      ]}>
      {list.map((item: IItem) => {
        const isFocus = indexButton === item.value;
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => onPressButton(item.value)}
            style={[
              styles.containerItem,
              {
                backgroundColor: isFocus ? colors.gray100 : colors.white,
                paddingRight: item.amount !== null ? scaler(4) : scaler(16),
              },
              styleContainer,
              isFocus && styleContainerFocus,
            ]}>
            <View style={[styleBody, isFocus && styleBodyFocus]}>
              <Text
                style={[
                  styles.text,
                  {
                    color: isFocus ? colors.textColor : colors.textSmallColor,
                  },
                  styleText,
                  isFocus && styleTextFocus,
                ]}>
                {item.label}
              </Text>
              {item?.amount !== null && (
                <View
                  style={{
                    backgroundColor: colors.brandMainPinkRed,
                    width: scaler(24),
                    height: scaler(24),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: scaler(100),
                    marginLeft: scaler(8),
                  }}>
                  <Text
                    style={[
                      styles.text,
                      {
                        color: colors.white,
                      },
                    ]}>
                    {item?.amount}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    borderRadius: scaler(40),
    paddingVertical: scaler(8),
    paddingLeft: scaler(16),
    marginRight: scaler(8),
    alignItems: 'center',
  },
  text: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(14),
    lineHeight: 17,
  },
});
