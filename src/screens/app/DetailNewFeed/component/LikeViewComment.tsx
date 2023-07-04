import {iconReply, SvgHeart, SvgHearted} from '@images';
import {likeComment, unLikeComment} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {AppSocket} from '@util';
import {debounce} from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

export const LikeViewComment = (props: any) => {
  const {getSocket} = AppSocket;
  const socket = getSocket();
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const {data, id, onReply, callBackSocket} = props;
  const [numberLike, setNumberLike] = useState<any>(0);
  const [is_liked, setIsLike] = useState(false);

  useEffect(() => {
    setNumberLike(data?.total_likes);
    setIsLike(data?.is_liked);
  }, [data]);

  const onPressLike = useCallback(
    //Disble double click
    debounce(async () => {
      try {
        if (is_liked) {
          setIsLike(false);
          setNumberLike(Number(numberLike) - 1);
          const res = await unLikeComment(id);
          callBackSocket({
            userId: user?.id,
            commentId: id,
          });
        } else {
          const body = {
            comment_id: id,
          };
          setIsLike(true);
          setNumberLike(Number(numberLike) + 1);
          const res = await likeComment(body);
          callBackSocket({
            userId: user?.id,
            commentId: id,
          });
        }
      } catch (error) {
        if (is_liked) {
          setIsLike(true);
          setNumberLike(Number(numberLike) - 1);
        } else {
          setIsLike(true);
          setNumberLike(Number(numberLike) + 1);
        }
      }
    }, 700),
    [data, is_liked, numberLike, socket, id],
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={onPressLike}
          activeOpacity={0.8}>
          {is_liked ? <SvgHearted /> : <SvgHeart />}
          <Text style={styles.text}>{numberLike}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          activeOpacity={0.8}
          onPress={onReply}>
          <Image source={iconReply} style={styles.iconReply} />
          <Text style={styles.text}>{data?.reply_comments?.length}</Text>
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
  iconReply: {
    width: scaler(24),
    height: scaler(24),
  },
});
