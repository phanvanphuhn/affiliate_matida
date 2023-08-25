import {SvgComment, SvgHeart, SvgHearted} from '@images';
import {navigate} from '@navigation';
import {useFocusEffect} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {addLikePost, addUnLikePost} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
export const InteractiveView = (props: any) => {
  const {data, callBackData, id} = props;

  const [isLike, setIsLike] = useState<boolean>(data?.is_liked === 1 ?? false);
  const [totalLike, setTotalLike] = useState<number>(data?.post_like ?? 0);
  const refLike = useRef<boolean>(isLike);
  const refTotal = useRef<number>(totalLike);

  useFocusEffect(
    React.useCallback(() => {
      refLike.current = data?.is_liked === 1 ?? false;
      refTotal.current = +data?.post_like ?? 0;
      setTotalLike(+data?.post_like);
      setIsLike(data?.is_liked === 1 ?? false);
    }, [data]),
  );

  useEffect(() => {
    const debounceLike = setTimeout(() => {
      handleEventLike();
    }, 200);
    return () => {
      clearTimeout(debounceLike);
    };
  }, [isLike]);

  const handleEventLike = async () => {
    if (isLike !== refLike.current) {
      const body = {
        post_id: id,
      };
      try {
        isLike ? await addLikePost(body) : await addUnLikePost(id);
        refLike.current = isLike;
        refTotal.current = totalLike;
      } catch (e) {
        setIsLike(refLike.current);
        setTotalLike(refTotal.current);
      } finally {
        await callBackData();
      }
    }
  };

  const handleLike = () => {
    !isLike ? setTotalLike(totalLike + 1) : setTotalLike(totalLike - 1);
    setIsLike(!isLike);
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={handleLike}
          activeOpacity={0.8}>
          {isLike ? <SvgHearted /> : <SvgHeart />}
          <Text style={styles.text}>{totalLike}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          activeOpacity={0.8}
          onPress={() => navigate(ROUTE_NAME.DETAIL_NEWFEED, {id: data?.id})}>
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
});
