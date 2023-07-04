import {widthScreen, scaler, colors, stylesCommon} from '@stylesCommon';
import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

const ViewButton = React.memo((props: any) => {
  const {t} = useTranslation();
  const {indexButton, onPressButton} = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onPressButton(1);
        }}>
        <Text style={indexButton === 1 ? styles.txtActive : styles.txtInActive}>
          {t('post.all_posts')}
        </Text>
        {indexButton === 1 ? <View style={styles.viewActive} /> : null}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onPressButton(2);
        }}>
        <Text style={indexButton === 2 ? styles.txtActive : styles.txtInActive}>
          {t('post.my_post')}
        </Text>
        {indexButton === 2 ? <View style={styles.viewActive} /> : null}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginTop: scaler(12),
  },
  button: {
    width: (widthScreen - scaler(40)) / 2,
    height: scaler(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewActive: {
    width: scaler(100),
    height: scaler(1.5),
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 0,
  },
  txtActive: {
    color: colors.textColor,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight500,
    lineHeight: scaler(21),
  },
  txtInActive: {
    color: '#A8A8A8',
    fontSize: scaler(14),
    ...stylesCommon.fontWeight500,
    lineHeight: scaler(21),
  },
});

export {ViewButton};
