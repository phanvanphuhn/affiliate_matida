import {SvgComment, SvgHeart, SvgHearted} from '@images';
import {changeStatusLike} from '@redux';
import {addLikePost, addUnLikePost} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {event, trackingAppEvent} from '@util';
import {debounce} from 'lodash';
import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';

export const LikeView = (props: any) => {
  const {data, callBackData, id, onNavigate} = props;
  const dispatch = useDispatch();

  const callApiLike = useCallback(
    //Disble double click
    debounce(async () => {
      try {
        dispatch(changeStatusLike({id: id}));
        const body = {
          post_id: id,
        };
        trackingAppEvent(event.FORUM.LIKE, {content: body});
        if (data?.is_liked) {
          const res = await addUnLikePost(id);
        } else {
          const res = await addLikePost(body);
        }
      } catch (error) {
        dispatch(changeStatusLike({id: id}));
        showMessage({
          message: '',
          type: 'default',
          backgroundColor: colors.transparent,
          color: '#FFFFFF',
        });
      }
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
