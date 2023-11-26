import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useTranslation} from 'react-i18next';

const ModalGetDeal = (props: any) => {
  const {visible, onCancel, onConfirm, dealCode, requiredData, onChangeText} =
    props;
  const {t} = useTranslation();

  const closeModal = () => {
    onCancel();
  };

  const renderTitle = (item: String) => {
    switch (item) {
      case 'name':
        return t('deal.name');
      case 'email':
        return t('deal.email');
      case 'address':
        return t('deal.address');
      case 'phone_number':
        return t('deal.phoneNumber');
    }
  };

  return (
    <Modal
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
      animationType="fade">
      <View style={styles.modalContainer}>
        {requiredData && requiredData?.length > 0 ? (
          <>
            <View
              style={styles.viewOut}
              //@ts-ignore
              onStartShouldSetResponder={closeModal}
            />
            <View style={[styles.container, {top: '20%'}]}>
              <Text style={styles.title}>{t('deal.getOffer')}</Text>
              {requiredData.map((item: String) => {
                return (
                  <View style={styles.wrapTexInputContainer}>
                    <Text style={styles.textInputTitle}>
                      {renderTitle(item)}
                    </Text>
                    <TextInput
                      onChangeText={value => onChangeText(value, item)}
                    />
                  </View>
                );
              })}
              <TouchableOpacity
                style={[styles.wrapConfirmButton, {marginTop: scaler(24)}]}
                onPress={onConfirm}>
                <Text style={styles.confirmButtonTitle}>
                  {t('deal.submit')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.wrapCancelButton}
                onPress={closeModal}>
                <Text style={styles.cancelButtonTitle}>{t('deal.cancel')}</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View
              style={styles.viewOut}
              //@ts-ignore
              onStartShouldSetResponder={closeModal}
            />
            <View style={styles.container}>
              <Text style={styles.title}>{t('deal.dealCode')}</Text>
              <View style={styles.wrapDesc}>
                <Text style={styles.desc}>{dealCode}</Text>
              </View>
              <TouchableOpacity
                style={styles.wrapConfirmButton}
                onPress={onConfirm}>
                <Text style={styles.confirmButtonTitle}>
                  {t('deal.copyCode')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.wrapCancelButton}
                onPress={closeModal}>
                <Text style={styles.cancelButtonTitle}>{t('deal.cancel')}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
  wrapTexInputContainer: {
    width: '100%',
    backgroundColor: colors.gray100,
    marginTop: scaler(12),
    padding: scaler(8),
    borderRadius: scaler(16),
    height: scaler(54),
  },
  textInputTitle: {
    fontSize: scaler(12),
    fontWeight: '400',
    color: colors.textSmallColor,
    marginBottom: scaler(4),
  },
});

export default ModalGetDeal;
