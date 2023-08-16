import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {ITEM_WIDTH_SLIDE_INTRO} from '../SlideIntro';
import {ItemSlideIntroProps} from '../SlideIntro.props';
import {styles} from '../SlideIntro.style';

export const ItemSlideIntro = ({item}: ItemSlideIntroProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        width: ITEM_WIDTH_SLIDE_INTRO,
        height: '100%',
      }}>
      <Image
        source={item.source}
        style={{
          width: ITEM_WIDTH_SLIDE_INTRO,
          height: '100%',
          position: 'absolute',
        }}
      />

      <View
        style={{
          paddingTop: insets.top ?? 0,
        }}>
        <View
          style={{
            paddingLeft: scaler(28),
            paddingRight: scaler(21),
            paddingTop: scaler(20),
          }}>
          <Text
            style={[styles.textBold, item.id === 4 && {color: colors.white}]}>
            {item.title}
          </Text>
          <Text
            style={[styles.textNormal, item.id === 4 && {color: colors.white}]}>
            {item.textBody}
          </Text>
        </View>
      </View>
    </View>
  );
};
