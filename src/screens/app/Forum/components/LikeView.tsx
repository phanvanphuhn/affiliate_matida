/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {SvgComment, SvgHeart, SvgHearted} from '@images';
import {useFocusEffect} from '@react-navigation/native';
import {changeLikeForum} from '@redux';
import {addLikePost, addUnLikePost} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';

export const LikeView = (props: any) => {
  const {data, id, onNavigate, color} = props;
  console.log('data: ', data, id);
  const dispatch = useDispatch();

  const [isLike, setIsLike] = useState<boolean>(!!data?.is_liked);
  const [totalLike, setTotalLike] = useState<number>(+data?.post_like ?? 0);

  useFocusEffect(
    React.useCallback(() => {
      // trackingAppEvent(event.SCREEN.HOME, {});
      setTotalLike(+data?.post_like ?? 0);
      setIsLike(!!data?.is_liked);
    }, []),
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
    if (isLike !== !!data?.is_liked) {
      const body = {
        post_id: data.id,
      };
      try {
        isLike ? await addLikePost(body) : await addUnLikePost(data.id);
        dispatch(
          changeLikeForum({
            isLike: isLike,
            id: id,
            totalLike: totalLike,
          }),
        );
      } catch (e) {
        showMessage({
          message: '',
          type: 'default',
          backgroundColor: colors.transparent,
          color: '#FFFFFF',
        });
        setIsLike(!!data?.is_liked);
        setTotalLike(+data?.post_like ?? 0);
      }
    }
  };

  const handlePressLike = () => {
    !isLike ? setTotalLike(totalLike + 1) : setTotalLike(totalLike - 1);
    setIsLike(!isLike);
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={handlePressLike}
          activeOpacity={0.8}>
          {isLike ? (
            <SvgHearted color={color && colors.red50} />
          ) : (
            <SvgHeart color={color && colors.gray300} />
          )}
          <Text
            style={[
              styles.text,
              color && {
                color: colors.black,
              },
            ]}>
            {totalLike}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          activeOpacity={0.8}
          onPress={onNavigate}>
          <SvgComment color={color && colors.gray300} />
          <Text
            style={[
              styles.text,
              color && {
                color: colors.black,
              },
            ]}>
            {
              parseInt(data?.total_comment ?? '0', 10)
              // +
              //   parseInt(data?.total_reply_comment ?? '0', 10)
            }
          </Text>
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
