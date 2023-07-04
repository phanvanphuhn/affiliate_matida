import {AppImage} from '@component';
import {iconViewMeeting} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

const ViewInfoHost = React.memo(() => {
  const {t} = useTranslation();
  const infoRoom = useSelector((state: any) => state?.liveTalk?.info);
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.viewContent}>
        <TouchableOpacity
          style={styles.viewRow}
          onPress={() =>
            navigation.navigate(ROUTE_NAME.DETAIL_USER, {
              id: infoRoom?.host?.id,
            })
          }>
          <AppImage user uri={infoRoom?.host?.avatar} style={styles.avatar} />
          <View style={{marginLeft: scaler(12)}}>
            <Text style={styles.txtTitle}>{t('allRoomMetting.host')}:</Text>
            <Text style={styles.txtName}>{infoRoom?.host?.name}</Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.viewRow, {justifyContent: 'flex-end'}]}>
          <View style={styles.viewType}>
            <Text style={styles.txtType}>
              {infoRoom?.room?.type === 1
                ? t('allRoomMetting.private')
                : t('allRoomMetting.public')}
            </Text>
          </View>
          <Image source={iconViewMeeting} style={styles.viewPeopel} />
          <Text style={styles.txtNumberViewing}>
            {infoRoom?.participants?.length}
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
