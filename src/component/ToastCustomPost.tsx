import {GlobalService, postSaveArticles} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';

type Props = {
  onPress: () => void;
};
export const ToastCustomPost = ({onPress}: Props) => {
  const handlePressUndo = async () => {
    Toast.hide();
    onPress();
  };
  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#3A1B1B',
        borderRadius: scaler(4),
        marginHorizontal: scaler(16),
        position: 'absolute',
      }}>
      <TouchableOpacity
        style={{padding: scaler(16), flex: 1}}
        activeOpacity={1}
        onPress={() => Toast.hide()}>
        <Text style={styles.textToast}>Report request sent</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{padding: scaler(16)}}
        activeOpacity={0.9}
        onPress={handlePressUndo}>
        <Text style={[styles.textToast, {color: colors.brandMainPinkRed}]}>
          Undo
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  textToast: {
    fontSize: scaler(14),
    ...stylesCommon.fontWeight600,
    color: colors.white,
  },
});
