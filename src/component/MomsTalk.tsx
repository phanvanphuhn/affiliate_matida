import {SvgComment, SvgLike} from '@images';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppImage} from './AppImage';

interface IProps {
  post: any;
}

export const MomsTalk = ({post}: IProps) => {
  const {created_at, post_like, total_comment, user_avatar, user_name, title} =
    post;
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: colors.white,
          ...stylesCommon.fontWeight700,
          fontSize: scaler(16),
          lineHeight: 22,
        }}
        numberOfLines={2}>
        {title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: scaler(12),
          marginBottom: scaler(27),
        }}>
        <AppImage
          user
          uri={user_avatar}
          style={{
            height: scaler(24),
            width: scaler(24),
            borderRadius: scaler(24),
          }}
        />
        <Text
          style={{
            ...stylesCommon.fontWeight400,
            fontSize: scaler(14),
            lineHeight: 17,
            color: colors.white,
            marginLeft: scaler(6),
          }}>
          Created by {}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SvgLike />
          <Text style={[styles.textCount, {marginRight: scaler(15)}]}>12</Text>
          <SvgComment />
          <Text style={styles.textCount}>3</Text>
        </View>
        <Text
          style={[
            styles.textCount,
            {...stylesCommon.fontWeight400, textAlign: 'right'},
          ]}>
          1 hour ago
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5BC65',
    borderRadius: scaler(8),
    padding: scaler(28),
    paddingBottom: scaler(25),
    paddingRight: scaler(17),
    width: widthScreen * 0.75,
    marginRight: scaler(16),
  },
  textCount: {
    color: colors.white,
    ...stylesCommon.fontWeight500,
    fontSize: scaler(12),
    lineHeight: 15,
    marginLeft: scaler(7),
  },
});
