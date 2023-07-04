import {colors, stylesCommon, scaler} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {iconClose} from '@images';
import SwitchToggle from 'react-native-switch-toggle';
import {useSelector, useDispatch} from 'react-redux';
import {changeStatusNotiChat} from '@services';
import {changeStatusMute} from '@redux';

const ModalSetting = React.memo((prop: any) => {
  const dispatch = useDispatch();
  const {titleHeader, onCancel, onConfirm, visible, contentHeader} = prop;
  const closeModal = () => {
    onCancel();
  };
  const {t} = useTranslation();
  const is_mute = useSelector((state: any) => state?.chat?.is_mute);
  const topic_id = useSelector((state: any) => state?.chat?.topic_id);

  const changeStatusNoti = async () => {
    try {
      const res: any = await changeStatusNotiChat(topic_id);
      if (is_mute === true) {
        dispatch(changeStatusMute(false));
      } else {
        dispatch(changeStatusMute(true));
      }
    } catch (error) {}
  };

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
          <View style={styles.viewHeader}>
            <Text style={styles.txtHeader}>{t('chat.title_setting')}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Image source={iconClose} style={styles.iconClose} />
            </TouchableOpacity>
          </View>
          <View style={styles.viewContent}>
            <Text style={styles.txtContent}>{t('chat.message_noti')}</Text>
            <SwitchToggle
              switchOn={!is_mute}
              onPress={changeStatusNoti}
              containerStyle={styles.containerToogle}
              circleStyle={styles.cricle}
              circleColorOn="#FFFFFF"
              circleColorOff="#FFFFFF"
              backgroundColorOff="#CDCCD2"
              backgroundColorOn={colors.primary}
              duration={300}
            />
          </View>
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
  },
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    height: scaler(282),
  },
  viewHeader: {
    width: '100%',
    paddingHorizontal: scaler(16),
    paddingVertical: scaler(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconClose: {
    width: scaler(24),
    height: scaler(24),
    tintColor: '#515151',
  },
  viewOut: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  txtHeader: {
    fontSize: scaler(16),
    textAlign: 'center',
    ...stylesCommon.fontWeight600,
    color: colors.textColor,
  },
  cricle: {
    width: scaler(16),
    height: scaler(16),
    borderRadius: scaler(8),
    backgroundColor: '#FFFFFF',
  },
  containerToogle: {
    width: scaler(36),
    height: scaler(20),
    borderRadius: scaler(200),
    padding: scaler(2),
  },
  viewContent: {
    width: '100%',
    paddingHorizontal: scaler(16),
    paddingVertical: scaler(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },
  txtContent: {
    fontSize: scaler(14),
    textAlign: 'center',
    ...stylesCommon.fontPlus500,
    color: colors.textColor,
  },
});

export {ModalSetting};
