import {SvgComment, SvgHeart, SvgHearted} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {addLikePost, addUnLikePost} from '@services';
import {debounce} from 'lodash';

export const LikeView = (props: any) => {
  const {data, callBackData, id, onNavigate} = props;

  const callApiLike = useCallback(
    //Disble double click
    debounce(async () => {
      try {
        const body = {
          post_id: id,
        };
        if (data?.is_liked) {
          const res = await addUnLikePost(id);
        } else {
          const res = await addLikePost(body);
        }
        callBackData();
      } catch (error) {}
    }, 700),
    [data],
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={callApiLike}
          activeOpacity={0.8}>
          {data?.is_liked ? <SvgHearted /> : <SvgHeart />}
          <Text style={styles.text}>{data?.post_like}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          activeOpacity={0.8}
          onPress={onNavigate}>
          <SvgComment />
          <Text style={styles.text}>{data?.total_comment}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: colors.textColor,
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
    lineHeight: 18,
    marginLeft: scaler(8),
    marginRight: scaler(20),
  },
  textTime: {
    color: colors.borderColor,
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
    lineHeight: 15,
  },
});
