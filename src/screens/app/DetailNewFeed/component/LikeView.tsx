import {SvgComment, SvgHeart, SvgHearted} from '@images';
import {changeLikeForum, changeStatusLike} from '@redux';
import {addLikePost, addUnLikePost} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {AppSocket} from '@util';
import {debounce} from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const LikeView = (props: any) => {
  const dispatch = useDispatch<any>();
  const week = useSelector((state: any) => state?.home?.week);

  const {getSocket} = AppSocket;
  const socket = getSocket();
  const {data} = props;
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const [numberLike, setNumberLike] = useState<any>(0);
  const [is_liked, setIsLike] = useState(false);
  const [numberComment, setNumberComment] = useState<any>(0);

  useEffect(() => {
    setNumberLike(data?.post_like);
    setIsLike(data?.is_liked);
    setNumberComment(data?.comments?.length);
  }, [data]);

  const onPressLike = useCallback(
    debounce(async () => {
      try {
        const body = {
          post_id: data?.id,
        };
        if (is_liked) {
          setIsLike(false);
          setNumberLike(Number(numberLike) - 1);
          const res = await addUnLikePost(data?.id);
          socket.emit('likeComment', {
            userId: user?.id,
            postId: data?.id,
          });
        } else {
          setIsLike(true);
          setNumberLike(Number(numberLike) + 1);
          const res = await addLikePost(body);
          socket.emit('likeComment', {
            userId: user?.id,
            postId: data?.id,
          });
        }
        // dispatch(getDataHomeByWeek({week: week}));
        console.log('is_liked: ', is_liked);
        dispatch(
          changeLikeForum({
            isLike: !is_liked,
            id: data?.id,
            totalLike: is_liked ? +numberLike - 1 : +numberLike + 1,
          }),
        );
        dispatch(changeStatusLike({id: data?.id}));
      } catch (error) {
        if (is_liked) {
          setIsLike(true);
          setNumberLike(Number(numberLike) - 1);
        } else {
          setIsLike(false);
          setNumberLike(Number(numberLike) + 1);
        }
      } finally {
      }
    }, 500),
    [is_liked, numberLike, data, socket],
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
          activeOpacity={0.8}>
          <SvgComment />
          <Text style={styles.text}>{numberComment}</Text>
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
