import {floating_button} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {scaler} from '@stylesCommon';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

export const FLoatingAIButton = () => {
  const navigation = useNavigation<any>();

  const onNnavigateChatAPI = () => {
    navigation.navigate(ROUTE_NAME.CHAT_GPT);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onNnavigateChatAPI}>
      <Image source={floating_button} style={styles.button} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: scaler(20),
    right: scaler(15),
    height: scaler(60),
    width: scaler(60),
    zIndex: 1000,
  },
  button: {
    height: scaler(60),
    width: scaler(60),
  },
});
