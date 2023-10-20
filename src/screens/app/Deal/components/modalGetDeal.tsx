import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';

const ModalGetDeal = (props: any) => {
  const {visible, onCancel, onConfirm, dealCode} = props;

  const closeModal = () => {
    onCancel();
  };

  return (
    <Modal
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
      animationType="fade">
      <View style={styles.modalContainer}>
        <View
          style={styles.viewOut}
          //@ts-ignore
          onStartShouldSetResponder={closeModal}
        />
        <View style={styles.container}>
          <Text style={styles.title}>Deal Code</Text>
          <View style={styles.wrapDesc}>
            <Text style={styles.desc}>{dealCode}</Text>
          </View>
          <TouchableOpacity
            style={styles.wrapConfirmButton}
            onPress={onConfirm}>
            <Text style={styles.confirmButtonTitle}>
              Copy code & go to website
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapCancelButton}
            onPress={closeModal}>
            <Text style={styles.cancelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: scaler(16),
    paddingRight: scaler(16),
  },
  viewOut: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: scaler(24),
    paddingTop: scaler(36),
    paddingBottom: scaler(16),
    position: 'absolute',
    top: '30%',
    backgroundColor: colors.white,
    borderRadius: scaler(16),
  },
  title: {
    fontSize: scaler(24),
    fontWeight: '500',
    marginBottom: scaler(16),
  },
  wrapDesc: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.gray,
    padding: scaler(8),
    marginBottom: scaler(24),
    borderRadius: scaler(8),
    alignItems: 'center',
  },
  desc: {
    fontSize: scaler(20),
    fontWeight: '300',
  },
  wrapConfirmButton: {
    width: '100%',
    backgroundColor: colors.brandMainPinkRed,
    paddingVertical: scaler(16),
    borderRadius: scaler(8),
    alignItems: 'center',
    marginBottom: scaler(8),
  },
  confirmButtonTitle: {
    fontSize: scaler(16),
    color: colors.white,
    fontWeight: '500',
  },
  wrapCancelButton: {
    width: '100%',
    paddingVertical: scaler(16),
    borderRadius: scaler(8),
    alignItems: 'center',
  },
  cancelButtonTitle: {
    fontSize: scaler(16),
    color: colors.brandMainPinkRed,
    fontWeight: '500',
  },
});

export default ModalGetDeal;
