import {SvgHeart, SvgHearted} from '@images';
import {likeReplyMessage, unLikeReplyMessage} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {debounce} from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

export const LikeViewReply = (props: any) => {
  const {data, id, callBackSocket, idComment} = props;
  const user = useSelector((state: any) => state?.auth?.userInfo);
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
          const res = await unLikeReplyMessage(id);
        } else {
          const body = {
            reply_comment_id: id,
          };
          setIsLike(true);
          setNumberLike(Number(numberLike) + 1);
          const res = await likeReplyMessage(body);
        }
        callBackSocket({
          userId: user?.id,
          replyCommentId: id,
          commentId: idComment,
        });
      } catch (error) {
        if (is_liked) {
          setIsLike(true);
          setNumberLike(Number(numberLike) - 1);
        } else {
          setIsLike(false);
          setNumberLike(Number(numberLike) + 1);
        }
      }
    }, 500),
    [data, is_liked, numberLike],
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
