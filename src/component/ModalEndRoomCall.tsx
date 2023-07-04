import {colors, stylesCommon, scaler} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Modal, Text} from 'react-native';
import {AppButton} from './AppButton';
import {useTranslation} from 'react-i18next';
import {SvgConfirmSettings} from '@images';

const ModalEndRoomCall = React.memo((prop: any) => {
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
          <View style={styles.viewTop}>
            <View style={styles.viewRectage} />
          </View>
          <Text style={styles.txtHeader}>{t('modalEndCall.title')}</Text>
          <Text style={styles.txtContent}>
            <Text style={styles.txtContentNormal}>
              {t('modalEndCall.content1')}
            </Text>{' '}
            <Text style={styles.txtContentBold}>
              "{t('modalEndCall.buttonConfirm')}"
            </Text>{' '}
            <Text style={styles.txtContentNormal}>
              {t('modalEndCall.content2')}
            </Text>{' '}
            <Text style={styles.txtContentBold}>
              "{t('modalEndCall.buttonCancle')}"
            </Text>{' '}
            <Text style={styles.txtContentNormal}>
              {t('modalEndCall.content3')}
            </Text>
          </Text>
          <AppButton
            titleButton={t('modalEndCall.buttonConfirm')}
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
            titleButton={t('modalEndCall.buttonCancle')}
            onClick={closeModal}
            customStyleButton={[styles.button, styles.buttonCanle]}
            customStyleText={{color: colors.primary}}
          />
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
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scaler(10),
    borderTopRightRadius: scaler(10),
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
  viewTop: {
    width: scaler(56),
    height: scaler(56),
    backgroundColor: '#FFF5F4',
    borderRadius: scaler(56) / 2,
    marginTop: scaler(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewRectage: {
    width: scaler(17),
    height: scaler(17),
    backgroundColor: '#EA3333',
  },
  txtContent: {
    marginTop: scaler(16),
    marginBottom: scaler(114),
    textAlign: 'center',
    lineHeight: scaler(21),
  },
  txtContentNormal: {
    color: '#515151',
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
  },
  txtContentBold: {
    color: '#515151',
    ...stylesCommon.fontWeight700,
    fontSize: scaler(14),
  },
});

export {ModalEndRoomCall};
