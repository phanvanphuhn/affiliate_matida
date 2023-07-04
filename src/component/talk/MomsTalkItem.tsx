import {colorRoom, ERoomStatusType} from '@constant';
import {avatarDefault, LogoApp, SvgBookMark, SvgUser} from '@images';
import {navigate} from '@navigation';
import {useFocusEffect} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {saveRoom, unSaveRoom} from '@services';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {AppImage} from '../AppImage';
import {StatusRoom} from '../StatusRoom';

type Props = {
  item: any;
  index: number;
};

export const MomsTalkItem = ({item, index}: Props) => {
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const {t} = useTranslation();

  const [bookmark, setBookMark] = useState<boolean>(
    item?.room?.is_save === 1 ? true : false,
  );

  const indexColor = index % colorRoom.length;
  const color = colorRoom[indexColor];
  const isMyRoom = user?.id === item?.user_id;

  const refBookmark = useRef<boolean>(bookmark);

  useFocusEffect(
    React.useCallback(() => {
      refBookmark.current = item?.room?.is_save === 1 ? true : false;
      setBookMark(item?.room?.is_save === 1 ? true : false);
    }, [item]),
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      onPressBookMark();
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [bookmark]);

  const onPressBookMark = () => {
    if (refBookmark.current !== bookmark) {
      bookmark ? handleSaveRoom() : handleUnSaveRoom();
    }
  };
  const handleSaveRoom = async () => {
    try {
      const res = await saveRoom(item?.room?.id);
      refBookmark.current = bookmark;
    } catch (error) {
      setBookMark(refBookmark.current);
    }
  };

  const handleUnSaveRoom = async () => {
    try {
      const res = await unSaveRoom(item?.room?.id);
      refBookmark.current = bookmark;
    } catch (error) {
      setBookMark(refBookmark.current);
    }
  };
  return (
    <TouchableOpacity
      onPress={() =>
        navigate(ROUTE_NAME.DETAIL_MEETING_ROOM, {id: item?.room?.id})
      }
      style={[s.container, {backgroundColor: color}]}
      activeOpacity={1}>
      <View style={s.header}>
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item?.room?.type === 1 && (
            <View style={s.viewLock}>
              <SvgLock color={color} />
            </View>
          )} */}
        <StatusRoom
          status={item?.room?.status}
          startTime={item?.room?.start_time}
          color={color}
          type={item?.room?.type}
        />
        {/* </View> */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setBookMark(!bookmark)}>
          <SvgBookMark
            fill={bookmark ? colors.white : 'none'}
            stroke={colors.white}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <Text numberOfLines={2} style={s.textTitle}>
          {item?.room?.title}
        </Text>
      </View>
      {item?.room?.status === ERoomStatusType.LIVE && (
        <View style={s.row}>
          <SvgUser />
          <Text style={s.textWatching} numberOfLines={2}>
            {t('talk.membersWatching', {index: item?.room?.total_users ?? 0})}
          </Text>
        </View>
      )}
      <View style={s.line} />
      <View style={s.row}>
        <AppImage user uri={item?.user?.avatar} style={s.image} />

        {isMyRoom ? (
          <Text
            numberOfLines={1}
            style={[s.textHost, {...stylesCommon.fontWeight400}]}>
            {t('talk.myRoom')}
          </Text>
        ) : (
          <Text style={s.textHost} numberOfLines={2}>
            {t('talk.host')}
            <Text style={{...stylesCommon.fontWeight400}}>
              {item?.user?.name}
            </Text>
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    padding: scaler(16),
    backgroundColor: '#654AC9',
    borderRadius: scaler(8),
    width: scaler(300),
    marginLeft: scaler(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaler(12),
  },
  textTitle: {
    color: colors.white,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(16),
    marginBottom: scaler(12),
  },
  textWatching: {
    color: colors.white,
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
    marginLeft: scaler(8),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: scaler(32),
    height: scaler(32),
    borderRadius: scaler(8),
    borderWidth: scaler(1),
    borderColor: colors.white,
    marginRight: scaler(12),
  },
  textHost: {
    color: colors.white,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(12),
  },
  line: {
    height: scaler(1),
    backgroundColor: colors.white,
    marginVertical: scaler(12),
    opacity: 0.2,
  },
  textTime: {
    ...stylesCommon.fontWeight400,
    color: colors.white,
    fontSize: scaler(12),
    marginLeft: scaler(8),
  },
  viewCalendar: {
    backgroundColor: colors.white,
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(5),
    borderRadius: scaler(200),
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewLock: {
    width: scaler(28),
    height: scaler(28),
    borderRadius: scaler(14),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginRight: scaler(8),
  },
});
