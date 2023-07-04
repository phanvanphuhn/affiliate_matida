import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {IPage, Page} from '../type';

type PropsPage = {
  item: IPage;
  page: Page;
};

export const ComponentPage = ({item, page}: PropsPage) => {
  return (
    <TouchableOpacity
      onPress={item.onPress}
      style={[
        styles.btnPage,
        {
          borderColor: page === item.value ? item.color : colors.gray,
          backgroundColor: page === item.value ? item.color : colors.white,
          marginLeft: item.value === Page.ARTICLE ? 0 : scaler(4),
          marginRight: item.value === Page.VIDEOS ? 0 : scaler(4),
        },
      ]}>
      {item.icon}
      <Text
        style={{
          ...stylesCommon.fontWeight600,
          fontSize: scaler(14),
          color: page === item.value ? colors.white : colors.textColor,
          flex: 1,
          marginLeft: scaler(8),
        }}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnPage: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: scaler(1),
    paddingHorizontal: scaler(9),
    paddingVertical: scaler(8),

    borderRadius: scaler(8),
  },
});
