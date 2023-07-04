import {iconSend} from '@images';
import {scaler, widthScreen} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Platform, StyleSheet, TextInput, View} from 'react-native';
import {Send} from 'react-native-gifted-chat';
import {getBottomSpace} from 'react-native-iphone-x-helper';

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
            value={props?.text}
            textAlignVertical="center"
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
    minHeight: scaler(28),
    width: widthScreen - scaler(44) - scaler(17) - scaler(17) - scaler(8),
    paddingLeft: scaler(10),
    paddingRight: scaler(43),
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
    width: '100%',
    flexDirection: 'row',
    paddingTop: scaler(14),
    paddingBottom: getBottomSpace() + scaler(14),
    paddingHorizontal: scaler(17),
  },
  inputContainer: {
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
