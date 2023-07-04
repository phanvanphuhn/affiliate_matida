import {colors, stylesCommon, scaler} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Modal, Text} from 'react-native';
import {AppButton} from './AppButton';
import {useTranslation} from 'react-i18next';

const ModalConfirm = React.memo((prop: any) => {
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
          <Text style={styles.txtHeader}>{titleHeader}</Text>
          {contentHeader ? (
            <Text style={[styles.txtHeader, {marginTop: 0}]}>
              {contentHeader}
            </Text>
          ) : null}
          <View style={styles.viewButton}>
            <AppButton
              titleButton={t('setting.cancel')}
              onClick={closeModal}
              customStyleButton={[styles.button, styles.buttonCanle]}
              customStyleText={{color: colors.primary}}
            />
            <AppButton
              titleButton={t('setting.confirm')}
              onClick={onConfirm}
              customStyleButton={[
                styles.button,
                {backgroundColor: colors.primary},
              ]}
            />
          </View>
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
    paddingHorizontal: scaler(17),
  },
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: scaler(10),
    alignItems: 'center',
    padding: 10,
  },
  viewOut: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  txtHeader: {
    marginVertical: scaler(41),
    fontSize: scaler(18),
    textAlign: 'center',
    ...stylesCommon.fontWeight500,
    color: colors.textColor,
  },
  viewButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
  },
  buttonCanle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export {ModalConfirm};
