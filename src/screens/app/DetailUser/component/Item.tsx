import {AppImage} from '@component';
import {colorRoom} from '@constant';
import {
  avatarDefault,
  iconLock,
  iconSavePng,
  iconUnSavePng,
  iconUserLive,
  SvgCalendar,
} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {saveRoom, unSaveRoom} from '@services';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {convertLangMonth} from '@util';
import moment from 'moment';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';

const Item = React.memo((props: any) => {
  const {item, callBackDataSave, index, data} = props;
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const navigation = useNavigation<any>();
  const [save, setSave] = useState<any>(item?.is_saved);
  const {t} = useTranslation();

  const indexColor = props?.index % colorRoom.length;
  const color = colorRoom[indexColor];
  const isMyRoom = user?.id === item?.host?.id;

  const onSave = async () => {
    try {
      if (save === 0) {
        const res = await saveRoom(item?.id);
        setSave(1);
        showMessage({
          message: res?.data?.message,
          type: 'default',
          backgroundColor: colors.success_message,
        });
        callBackDataSave();
      } else {
        const res = await unSaveRoom(item?.id);
        setSave(0);
        showMessage({
          message: res?.data?.message,
          type: 'default',
          backgroundColor: colors.success_message,
        });
        callBackDataSave();
      }
    } catch (error) {}
  };

  const renderViewLive = () => {
    if (item?.status === 2) {
      return (
        <View style={styles.viewRowStatusLive}>
          <Image
            source={require('../../../../images/live.gif')}
            style={styles.imageLive}
          />
          <Text style={styles.txtLive}>{t('allRoomMetting.live')}</Text>
        </View>
      );
    } else if (item?.status === 1) {
      return (
        <View
          style={[
            styles.viewRowStatusLivePending,
            {backgroundColor: colors.white},
          ]}>
          <SvgCalendar color={color} />
          <Text style={[styles.txtLive, {color: color, marginLeft: scaler(8)}]}>
            {moment(item?.start_time, 'YYYY/MM/DD hh:mm:ss').format('DD ')}
            {convertLangMonth(moment(item?.start_time).format('MMMM'))}{' '}
            {moment(item?.start_time).format('YYYY')}{' '}
            {moment(item?.start_time, 'YYYY/MM/DD hh:mm:ss').format(
              ', HH:mm A',
            )}
          </Text>
        </View>
      );
    } else if (item?.status === 3) {
      return (
        <View style={styles.viewRowStatusLive}>
          <Text style={styles.txtLive}>{t('allRoomMetting.end')}</Text>
        </View>
      );
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() =>
        navigation.navigate(ROUTE_NAME.DETAIL_MEETING_ROOM, {id: item?.id})
      }>
      <View style={[styles.viewContent, {backgroundColor: color}]}>
        <View style={[styles.viewRow, {justifyContent: 'space-between'}]}>
          <View style={styles.viewRow}>
            {item?.type === 1 ? (
              <View style={styles.viewPrivate}>
                <Image source={iconLock} style={styles.iconLock} />
              </View>
            ) : null}
            {renderViewLive()}
          </View>
          <TouchableOpacity onPress={onSave}>
            <Image
              source={save === 0 ? iconSavePng : iconUnSavePng}
              style={styles.iconSave}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.txtTitle}>{item?.title}</Text>
        {item?.status === 2 ? (
          <View style={styles.viewRow}>
            <Image source={iconUserLive} style={styles.imageUserLive} />
            <Text style={styles.txtPeople}>
              {t('talk.membersWatching', {index: item?.total_users ?? 0})}
            </Text>
          </View>
        ) : null}
        <View style={styles.viewRowLayout} />
        <View style={styles.viewRow}>
          {item?.host?.avatar?.length > 0 ? (
            <AppImage user uri={item?.host?.avatar} style={styles.avatarhost} />
          ) : (
            <Image source={avatarDefault} style={styles.avatarhost} />
          )}
          {isMyRoom ? (
            <Text style={[styles.txtHostName, {...stylesCommon.fontWeight400}]}>
              {t('talk.myRoom')}
            </Text>
          ) : (
            <Text style={styles.txtHostName} numberOfLines={2}>
              {t('talk.host')}
              <Text style={{...stylesCommon.fontWeight400}}>
                {item?.host?.name}
              </Text>
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: widthScreen - scaler(34),
    marginBottom: scaler(17),
  },
  viewContent: {
    padding: scaler(16),
    borderRadius: scaler(8),
  },
  viewRowStatusLive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: scaler(28),
    backgroundColor: colors.primary,
    borderRadius: scaler(200),
    paddingHorizontal: scaler(8),
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtLive: {
    color: '#FFFFFF',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight600,
  },
  imageLive: {
    width: scaler(20),
    height: scaler(20),
    borderRadius: scaler(20 / 2),
    marginRight: scaler(8),
  },
  txtTitle: {
    marginVertical: scaler(12),
    fontSize: scaler(16),
    lineHeight: scaler(22),
    ...stylesCommon.fontPlus600,
    color: '#FFFFFF',
  },
  imageUserLive: {
    width: scaler(16),
    height: scaler(16),
    marginRight: scaler(8),
  },
  txtPeople: {
    fontSize: scaler(12),
    lineHeight: scaler(18),
    ...stylesCommon.fontWeight400,
    color: '#FFFFFF',
  },
  viewRowLayout: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255, 0.3)',
    marginVertical: scaler(12),
  },
  avatarhost: {
    width: scaler(32),
    height: scaler(32),
    borderRadius: scaler(32 / 2),
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  txtHostName: {
    marginLeft: scaler(12),
    color: '#FFFFFF',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight600,
  },
  viewRowStatusLivePending: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaler(11),
    height: scaler(28),
    backgroundColor: '#0C857E',
    borderRadius: scaler(200),
  },
  viewPrivate: {
    width: scaler(28),
    height: scaler(28),
    borderRadius: scaler(28 / 2),
    backgroundColor: '#0C857E',
    marginRight: scaler(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLock: {
    width: scaler(16),
    height: scaler(16),
  },
  iconSave: {
    width: scaler(20),
    height: scaler(20),
    tintColor: '#FFFFFF',
  },
});

export {Item};
