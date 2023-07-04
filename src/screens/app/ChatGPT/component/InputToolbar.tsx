import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Platform, View, Text, TextInput} from 'react-native';
import {InputToolbar, Actions, Composer, Send} from 'react-native-gifted-chat';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
import {colors} from '@stylesCommon';
import {scaler, widthScreen} from '@stylesCommon';
import {avatarDefault, iconSend} from '@images';
import {useTranslation} from 'react-i18next';

export const renderSend = (props: any) => {
  return (
    <Send
      {...props}
      disabled={!props.text.trim()}
      containerStyle={styles.sendBtn}>
      <Image
        source={iconSend}
        style={styles.iconEmojiStyle}
        resizeMode="contain"
      />
    </Send>
  );
};

export const renderComposer = (props: any) => {
  const {t} = useTranslation();
  if (props && props.textInputProps) {
    return (
      <View style={styles.composerContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            {...props}
            style={styles.inputMessage}
            onKeyPress={props.textInputProps.onKeyPress}
            textAlignVertical="center"
            value={props?.text}
            onChangeText={(value: any) => {
              props.onInputTextChanged(value);
            }}
            multiline={true}
            placeholder={`${t('chat.type_chat')}`}>
            {props.formattedText}
          </TextInput>
        </View>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  sendBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: scaler(25),
    top: scaler(14),
    width: scaler(35),
    height: scaler(44),
  },
  iconStyle: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    flex: 1,
  },
  toolBar: {
    borderTopWidth: 0,
  },
  inputMessage: {
    // borderRadius: scaler(4),
    paddingLeft: scaler(10),
    minHeight: scaler(28),
    paddingRight: scaler(43),
    width: widthScreen - scaler(44) - scaler(17) - scaler(17) - scaler(8),
    // borderWidth: 1,
    // backgroundColor: '#EAEAEA',
    // borderColor: '#EAEAEA',
    // paddingTop: Platform.OS === 'ios' ? scaler(12) : undefined,
    // paddingBottom: Platform.OS === 'ios' ? scaler(12) : undefined,
  },
  iconEmojiStyle: {
    width: scaler(28),
    height: scaler(28),
  },

  sendIconStyle: {
    height: 30,
    width: 30,
  },
  composerContainer: {
    // width: '100%',
    // flexDirection: 'row',
    // paddingTop: scaler(14),
    // paddingBottom: getBottomSpace() + scaler(14),
    // paddingHorizontal: scaler(17),
    // backgroundColor: '#FFFFFF',
    width: '100%',
    flexDirection: 'row',
    paddingTop: scaler(14),
    paddingBottom: getBottomSpace() + scaler(14),
    paddingHorizontal: scaler(17),
  },
  inputContainer: {
    // width: '100%',
    maxHeight: scaler(120),
    paddingTop: Platform.OS === 'ios' ? scaler(4) : undefined,
    paddingBottom: Platform.OS === 'ios' ? scaler(4) : undefined,
    backgroundColor: '#EAEAEA',
    borderRadius: scaler(4),
    borderWidth: 1,
    borderColor: '#EAEAEA',
    minHeight: scaler(44),
    justifyContent: 'center',
  },
});
