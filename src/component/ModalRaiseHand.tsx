import {colors, stylesCommon, scaler} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {AppButton} from './AppButton';
import {useTranslation} from 'react-i18next';
import {iconRaiseHandModal} from '@images';

const ModalRaiseHand = React.memo((prop: any) => {
  const {titleHeader, onCancel, onConfirm, visible, contentHeader} = prop;
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
          <Image source={iconRaiseHandModal} style={styles.imageHeader} />
          {/* <Text style={styles.txtHeader}>{t('setting.titleModalProfile')}</Text> */}
          <Text style={styles.txtHeader}>
            {t('allRoomMetting.title_modal_rise_hand')}
          </Text>

          {/* <Text style={[styles.txtContent]}>
            {t('setting.contentModalProfile')}
          </Text> */}
          <Text style={styles.txtContent}>
            {t('allRoomMetting.content_modal_rise_hand')}
          </Text>

          <AppButton
            // titleButton={t('setting.confirm')}
            titleButton={`${t('allRoomMetting.button_raise_hand')}`}
            onClick={onConfirm}
            customStyleButton={[
              styles.button,
              {backgroundColor: colors.primary},
            ]}
          />
          <TouchableOpacity onPress={closeModal}>
            {/* <Text style={styles.txtCancle}>{t('setting.cancel')}</Text> */}
            <Text style={styles.txtCancle}>
              {t('allRoomMetting.neverMind')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageHeader: {
    width: scaler(100),
    height: scaler(100),
  },
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scaler(16),
    borderTopRightRadius: scaler(16),
    alignItems: 'center',
    paddingTop: scaler(72),
    paddingHorizontal: scaler(16),
  },
  viewOut: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  txtHeader: {
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
    width: '100%',
  },
  buttonCanle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  txtContent: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    color: '#515151',
    textAlign: 'center',
    marginTop: scaler(19),
    marginBottom: scaler(99),
  },
  txtCancle: {
    color: colors.primary,
    fontSize: scaler(16),
    ...stylesCommon.fontWeight600,
    marginVertical: scaler(30),
  },
});

export {ModalRaiseHand};
