import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ic_send, ic_send_opacity} from '@images';
import {useVideo} from './Container';
import {colors} from '@stylesCommon';

interface InputItemProps {}

const InputItem = (props: InputItemProps) => {
  const {state, setState} = useVideo();
  const onShowComment = () => {
    setState({isShowComment: true, isShowInput: true});
  };
  return (
    <View
      style={[
        styles.containerInput,
        {
          paddingBottom: 20,
        },
      ]}>
      <TextInput
        style={styles.input}
        placeholder={'Comment'}
        placeholderTextColor={'#AAA'}
        onFocus={onShowComment}
      />
      <TouchableOpacity onPress={onShowComment} style={{paddingHorizontal: 10}}>
        <Image source={ic_send_opacity} />
      </TouchableOpacity>
    </View>
  );
};

export default InputItem;

const styles = StyleSheet.create({
  container: {},
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  imageAvatar: {
    height: 30,
    width: 30,
    borderRadius: 20,
  },
  input: {
    backgroundColor: '#F5F5FF30',
    flex: 1,
    borderRadius: 12,
    color: colors.white,
    paddingVertical: 10,
    paddingLeft: 20,
    marginLeft: 12,
  },
});
