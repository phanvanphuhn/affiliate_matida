import {AppImage, StatusRoom} from '@component';
import {colorRoom} from '@constant';
import {
  avatarDefault,
  iconSavePng,
  iconUnSavePng,
  iconUserLive,
  SvgStar,
  SvgUser,
} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {saveRoom, unSaveRoom} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';

const Item = React.memo((props: any) => {
  const {item, callBackDataSave} = props;
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

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() =>
        navigation.navigate(ROUTE_NAME.DETAIL_MEETING_ROOM, {id: item?.id})
      }>
      <View style={[styles.viewContent, {backgroundColor: color}]}>
        <View style={[styles.viewRow, {justifyContent: 'space-between'}]}>
          <StatusRoom
            status={item?.status}
            startTime={item?.start_time}
            color={color}
            type={item?.type}
          />
          <TouchableOpacity onPress={onSave}>
            <Image
              source={save === 0 ? iconSavePng : iconUnSavePng}
              style={styles.iconSave}
            />
          </TouchableOpacity>
        </View>
        {item?.type_room === 1 ? (
          <View style={styles.viewType}>
            <SvgStar color={color} />
            <Text style={[styles.textType, {color: color}]}>
              {t('talk.expertTalkType')}
            </Text>
          </View>
        ) : (
          <View style={styles.viewType}>
            <SvgUser color={color} />
            <Text style={[styles.textType, {color: color}]}>
              {t('talk.momTalkType')}
            </Text>
          </View>
        )}
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
        <TouchableOpacity
          style={styles.viewRow}
          onPress={() => {
            navigation.navigate(ROUTE_NAME.DETAIL_USER, {id: item?.host?.id});
          }}>
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
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: scaler(16),
    paddingHorizontal: scaler(16),
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
  viewType: {
    flexDirection: 'row',
    backgroundColor: '#F3F1FD',
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(4),
    borderRadius: scaler(200),
    alignSelf: 'flex-start',
    marginTop: scaler(8),
  },
  textType: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
    lineHeight: 18,
    // color: '#B6A8ED',
    marginLeft: scaler(8),
  },
});

export {Item};
