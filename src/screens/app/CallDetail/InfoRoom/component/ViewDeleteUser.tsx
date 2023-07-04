import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {scaler, stylesCommon, colors} from '@stylesCommon';
import {iconClose} from '@images';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {AppButton} from '@component';
import {useTranslation} from 'react-i18next';

const ViewDeleteUser = React.memo((props: any) => {
  const {closeModal, onKick, dataUserKick} = props;
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View
        style={styles.viewOut}
        //@ts-ignore
        onStartShouldSetResponder={closeModal}
      />
      <View style={styles.viewContent}>
        <View style={styles.viewHeader}>
          <Text style={styles.name}>{dataUserKick?.name}</Text>
          <TouchableOpacity onPress={closeModal}>
            <Image source={iconClose} style={styles.iconClose} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewContentTxt}>
          <Text onPress={onKick}>{t('allRoomMetting.remove')}</Text>
          <AppButton titleButton={`${t('setting.cancel')}`} onClick={closeModal} />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  viewOut: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  viewContent: {
    width: '100%',
    height: scaler(258),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scaler(8),
    borderTopRightRadius: scaler(8),
  },
  viewHeader: {
    width: '100%',
    height: scaler(56),
    paddingHorizontal: scaler(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },
  name: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(16),
    color: colors.textColor,
  },
  iconClose: {
    width: scaler(28),
    height: scaler(28),
    tintColor: colors.textColor,
  },
  viewContentTxt: {
    flex: 1,
    paddingHorizontal: scaler(16),
    paddingTop: scaler(16),
    paddingBottom: getBottomSpace() + scaler(10),
    justifyContent: 'space-between',
  },
});

export {ViewDeleteUser};
