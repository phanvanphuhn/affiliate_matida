import {GlobalService, postSaveArticles} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';

type Props = {
  id: number;
  onPressUndo: () => void;
};
export const ToastCustom = ({id, onPressUndo}: Props) => {
  const handlePressUndo = async () => {
    try {
      GlobalService.showLoading();
      await postSaveArticles(id);
      onPressUndo();
      Toast.hide();
    } catch (e) {
    } finally {
      GlobalService.hideLoading();
    }
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
        <Text style={styles.textToast}>Article has been unsaved</Text>
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
