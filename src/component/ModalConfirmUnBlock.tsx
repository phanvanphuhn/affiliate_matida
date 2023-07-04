import {colors, stylesCommon, scaler} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Modal, Text, Image} from 'react-native';
import {AppButton} from './AppButton';
import {useTranslation} from 'react-i18next';
import {SvgConfirmSettings, iconBlock} from '@images';

const ModalConfirmUnBlock = React.memo((prop: any) => {
  const {titleHeader, onCancel, onConfirm, visible, contentHeader, useName} =
    prop;
  const closeModal = () => {
    onCancel();
  };
  const {t} = useTranslation();
  return (
    <Modal
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
      animationType="fade">
      <View style={styles.containerModal}>
        <View
          style={styles.viewOut}
          //@ts-ignore
          onStartShouldSetResponder={closeModal}
        />
        <View style={styles.container}>
          {/* <SvgConfirmSettings /> */}
          <Image source={iconBlock} style={styles.icon} />
          <Text style={styles.txtHeader} numberOfLines={1}>
            {t('block_user.unBlock')} {useName}?
          </Text>
          <Text
            style={[
              styles.txtHeader,
              {
                marginTop: scaler(10),
                fontSize: scaler(14),
                color: colors.gray200,
              },
            ]}>
            {t('block_user.titleModalUnBlock')}
          </Text>
          <AppButton
            titleButton={t('block_user.unBlock')}
            onClick={onConfirm}
            customStyleButton={[
              styles.button,
              {
                backgroundColor: colors.primary,
                marginTop: scaler(32),
                marginBottom: scaler(16),
              },
            ]}
          />
          <AppButton
            titleButton={t('block_user.cancle')}
            onClick={closeModal}
            customStyleButton={[styles.button, styles.buttonCanle]}
            customStyleText={{color: colors.primary}}
          />
        </View>
        <View
          style={styles.viewOut}
          //@ts-ignore
          onStartShouldSetResponder={closeModal}
        />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaler(24),
  },
  icon: {
    width: scaler(64),
    height: scaler(64),
  },
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: scaler(10),
    alignItems: 'center',
    paddingHorizontal: scaler(24),
    paddingTop: scaler(32),
  },
  viewOut: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  txtHeader: {
    // marginVertical: scaler(41),
    marginTop: scaler(32),
    fontSize: scaler(24),
    textAlign: 'center',
    ...stylesCommon.fontWeight600,
    color: colors.textColor,
  },
  viewButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    // width: '48%',
  },
  buttonCanle: {
    backgroundColor: '#FFFFFF',
    borderColor: colors.primary,
    marginBottom: scaler(24),
  },
});

export {ModalConfirmUnBlock};
