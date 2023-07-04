import {OPTION_NOTIFICATION} from '@constant';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
interface IItem {
  id: number;
  label: string;
  value: number;
  amount: number | any;
}
type Props = {
  indexButton: OPTION_NOTIFICATION;
  onPressButton: (value: OPTION_NOTIFICATION) => void;
  totalUnRead: number;
};
export const ViewButtonHeader = ({
  indexButton,
  onPressButton,
  totalUnRead,
}: Props) => {
  const {t} = useTranslation();
  const listButton = [
    {
      id: 1,
      label: t('notification.all'),
      value: OPTION_NOTIFICATION.ALL,
      amount: totalUnRead,
    },
    {
      id: 2,
      label: t('notification.unread'),
      value: OPTION_NOTIFICATION.UNREAD,
      amount: null,
    },
  ];
  return (
    <View style={styles.container}>
      {listButton.map((item: IItem) => {
        const isFocus = indexButton === item.value;
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => onPressButton(item.value)}
            style={[
              styles.containerItem,
              {
                backgroundColor: colors.white,
                paddingRight: item.amount !== null ? scaler(4) : scaler(16),
              },
            ]}>
            <View
              style={[
                styles.body,
                isFocus && {
                  borderBottomWidth: scaler(1.5),
                  borderBottomColor: colors.brandMainPinkRed,
                },
              ]}>
              <Text
                style={[
                  styles.text,
                  {
                    color: isFocus ? colors.textColor : colors.textSmallColor,
                  },
                ]}>
                {item.label}
              </Text>
              {item?.amount !== null && item?.amount > 0 && (
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
                    {+item?.amount > 99 ? '99+' : item?.amount}
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
  container: {
    flexDirection: 'row',
    paddingHorizontal: scaler(20),
    marginBottom: scaler(11),
    marginTop: scaler(28),
  },
  containerItem: {
    flexDirection: 'row',
    borderRadius: scaler(40),
    paddingLeft: scaler(16),
    marginRight: scaler(8),
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    paddingVertical: 0,
  },
  text: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(14),
    lineHeight: 17,
  },
  body: {
    paddingHorizontal: scaler(20),
    borderBottomWidth: scaler(0),
    justifyContent: 'center',
    paddingVertical: scaler(8),
    alignItems: 'center',
    flexDirection: 'row',
  },
});
