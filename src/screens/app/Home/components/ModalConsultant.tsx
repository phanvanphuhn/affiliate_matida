import {iconClose} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';

const ModalConsultant = (props: any) => {
  const {visible, closeModal} = props;

  const navigation = useNavigation<any>();

  const {t} = useTranslation();

  const onNavigateConsultant = () => {
    closeModal();
    navigation.navigate(ROUTE_NAME.TEASER_PROGRAM, {
      isConsultant: true,
    });
  };

  const onNavigateChatGPT = () => {
    closeModal();
    navigation.navigate(ROUTE_NAME.CHAT_GPT);
  };

  return (
    <Modal
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
      animationType="fade">
      <View style={[styles.modalContainer]}>
        <View
          style={styles.viewOut}
          //@ts-ignore
          onStartShouldSetResponder={closeModal}
        />
        <View style={styles.container}>
          <View style={styles.viewClose}>
            <TouchableOpacity onPress={closeModal}>
              <Image
                source={iconClose}
                style={{
                  tintColor: colors.textColor,
                  height: scaler(24),
                  width: scaler(24),
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Select your consultant</Text>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={onNavigateConsultant}>
            <FastImage
              source={{
                uri: 'https://s3.ap-southeast-1.amazonaws.com/matida/1709604755240778567.png',
              }}
              style={{
                width: '100%',
                height: scaler(64),
                marginTop: scaler(24),
                marginBottom: scaler(8),
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={{width: '100%'}} onPress={onNavigateChatGPT}>
            <FastImage
              source={{
                uri: 'https://s3.ap-southeast-1.amazonaws.com/matida/1709604882962130896.png',
              }}
              style={{
                width: '100%',
                height: scaler(64),
              }}
              resizeMode="contain"
            />
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
    padding: scaler(16),
    position: 'absolute',
    top: '40%',
    backgroundColor: colors.white,
    borderRadius: scaler(16),
  },
  viewClose: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  title: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(22),
  },
});

export default ModalConsultant;
