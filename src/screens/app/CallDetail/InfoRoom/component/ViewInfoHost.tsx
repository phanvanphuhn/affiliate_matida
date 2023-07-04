import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {scaler, colors, stylesCommon} from '@stylesCommon';
import {avatarDefault, iconViewMeeting} from '@images';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {AppImage} from '@component';

const ViewInfoHost = React.memo(() => {
  const {t} = useTranslation();
  const infoInRoom = useSelector((state: any) => state?.liveTalk?.infoInRoom);

  return (
    <View style={styles.container}>
      <View style={styles.viewContent}>
        <View style={styles.viewRow}>
          {infoInRoom?.host?.avatar?.length > 0 ? (
            <AppImage
              user
              uri={infoInRoom?.host?.avatar}
              style={styles.avatar}
            />
          ) : (
            <Image source={avatarDefault} style={styles.avatar} />
          )}
          <View style={{marginLeft: scaler(12)}}>
            <Text style={styles.txtTitle}>{t('allRoomMetting.host')}:</Text>
            <Text style={styles.txtName}>{infoInRoom?.host?.name}</Text>
          </View>
        </View>
        <View style={[styles.viewRow, {justifyContent: 'flex-end'}]}>
          <View style={styles.viewType}>
            <Text style={styles.txtType}>
              {infoInRoom?.room?.type === 1
                ? t('allRoomMetting.private')
                : t('allRoomMetting.public')}
            </Text>
          </View>
          <Image source={iconViewMeeting} style={styles.viewPeopel} />
          <Text style={styles.txtNumberViewing}>
            {infoInRoom?.participants?.length}
          </Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: scaler(12),
    paddingHorizontal: scaler(16),
  },
  viewContent: {
    width: '100%',
    paddingBottom: scaler(12),
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewRow: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: scaler(32),
    height: scaler(32),
    borderRadius: scaler(32 / 2),
  },
  txtTitle: {
    color: colors.textColor,
    fontSize: scaler(12),
    ...stylesCommon.fontWeight600,
  },
  txtName: {
    color: '#7C7C7C',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
    marginTop: scaler(6),
  },
  viewType: {
    paddingVertical: scaler(4),
    paddingHorizontal: scaler(8),
    backgroundColor: '#FFF5F4',
    borderRadius: scaler(4),
  },
  txtType: {
    color: colors.primary,
    fontSize: scaler(12),
    ...stylesCommon.fontWeight600,
  },
  viewPeopel: {
    width: scaler(16),
    height: scaler(16),
    marginLeft: scaler(19),
  },
  txtNumberViewing: {
    color: '#7C7C7C',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
    marginLeft: scaler(10),
  },
});

export {ViewInfoHost};
