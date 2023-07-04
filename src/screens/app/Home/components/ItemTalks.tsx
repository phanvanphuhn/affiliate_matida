import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {
  avatarDefault,
  SvgBookMark,
  SvgCalendar,
  SvgDotHorizontal,
  SvgStar,
  SvgUser,
} from '@images';
import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import moment from 'moment';
import {AppImage, StatusRoom} from '@component';
import {colorRoom, ETypeHost} from '@constant';
import {useTranslation} from 'react-i18next';
import {ROUTE_NAME} from '@routeName';
import {navigate} from '@navigation';
import {convertTimeRoom} from '@util';
import {useSelector} from 'react-redux';
import {saveRoom, unSaveRoom} from '@services';
import {useFocusEffect} from '@react-navigation/native';

type Props = {
  item: any;
  index: number;
};

export const ItemTalks = ({item, index}: Props) => {
  const {t} = useTranslation();
  const user = useSelector((state: any) => state?.auth?.userInfo);

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
      style={[styles.container, {backgroundColor: color}]}
      onPress={() =>
        navigate(ROUTE_NAME.DETAIL_MEETING_ROOM, {id: item?.room?.id})
      }
      activeOpacity={1}>
      <View style={styles.viewHeader}>
        {item?.room?.type_room === ETypeHost.EXPERT ? (
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setBookMark(!bookmark)}>
          <SvgBookMark
            fill={bookmark ? colors.white : 'none'}
            stroke={colors.white}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginVertical: scaler(16)}}>
        <StatusRoom
          status={item?.room?.status}
          startTime={item?.room?.start_time}
          color={color}
          type={item?.room?.type}
        />
      </View>
      <Text numberOfLines={3} style={styles.textTitle}>
        {item?.room?.title}
      </Text>

      <View style={styles.line} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // width: 32 * 2 - 12 * 1,
            width: 32 * 1 - 12 * 0,
          }}>
          {item?.user?.avatar ? (
            <AppImage
              user
              uri={item?.user?.avatar}
              style={styles.avatarFirst}
            />
          ) : (
            <Image source={avatarDefault} style={styles.avatarFirst} />
          )}
          {/* <Image source={avatarDefault} style={styles.avatarFirst} /> */}
          {/* <Image source={avatarDefault} style={styles.avatarNext} /> */}
        </View>
        <View style={{marginLeft: scaler(12)}}>
          {/* <Text numberOfLines={1} style={styles.textHost}>
            Host:{' '}
            <Text style={{...stylesCommon.fontWeight600}}>
              {item?.user?.name}
            </Text>
          </Text> */}
          {isMyRoom ? (
            <Text
              numberOfLines={1}
              style={[styles.textHost, {...stylesCommon.fontWeight400}]}>
              {t('talk.myRoom')}
            </Text>
          ) : (
            <Text style={styles.textHost} numberOfLines={2}>
              {t('talk.host')}
              <Text style={{...stylesCommon.fontWeight400}}>
                {item?.user?.name}
              </Text>
            </Text>
          )}
          {/* <Text numberOfLines={1} style={styles.textHost}>
            Co-host: AnneLouise
          </Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scaler(260),
    backgroundColor: '#9E8BE7',
    borderRadius: scaler(8),
    padding: scaler(12),
    marginRight: scaler(16),
    marginTop: scaler(16),
  },
  viewHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitle: {
    ...stylesCommon.fontWeight600,
    color: colors.white,
    fontSize: scaler(14),
  },
  textTime: {
    ...stylesCommon.fontWeight400,
    color: colors.white,
    fontSize: scaler(12),
    lineHeight: 15,
    marginLeft: scaler(8),
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
  line: {
    borderTopWidth: scaler(1),
    borderColor: `${colors.gray150}30`,
    marginVertical: scaler(16),
  },
  avatarFirst: {
    width: 32,
    height: 32,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.white,
  },
  avatarNext: {
    width: 32,
    height: 32,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.white,
    position: 'absolute',
    right: 0,
  },
  textHost: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(12),
    color: colors.white,
  },
});
