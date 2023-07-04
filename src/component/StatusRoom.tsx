import {ERoomStatusType, ETypeHost, TypeRoom} from '@constant';
import {SvgCalendar, SvgLock} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {convertTimeRoom} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {ViewLive} from './talk';

type StyleStatus = {
  view?: StyleProp<ViewStyle>;
  text?: StyleProp<TextStyle>;
};

type Props = {
  status: any;
  startTime: string;
  color: ColorValue | undefined;
  type: any;
  typeRoom?: any;
  showLock?: boolean;
  colorIcon?: ColorValue | undefined;
  styleStatusPending?: StyleStatus;
  styleStatusEnd?: StyleStatus;
};

export const StatusRoom = ({
  status,
  startTime,
  color,
  type,
  showLock = true,
  colorIcon,
  styleStatusPending,
  styleStatusEnd,
  typeRoom = ETypeHost.MOM,
}: Props) => {
  const {t} = useTranslation();
  const renderViewLive = () => {
    switch (status) {
      case ERoomStatusType.PENDING:
        return (
          <View style={[s.viewCalendar, styleStatusPending?.view]}>
            <SvgCalendar color={colorIcon || color} />
            <Text
              style={[s.textTime, {color: color}, styleStatusPending?.text]}>
              {!!startTime ? convertTimeRoom(startTime, typeRoom) : ''}
            </Text>
          </View>
        );
      case ERoomStatusType.LIVE:
        return <ViewLive />;
      case ERoomStatusType.ENDED:
        return (
          <View style={[s.viewRowStatusLive, styleStatusEnd?.view]}>
            <Text style={[s.txtLive, {color}, styleStatusEnd?.text]}>
              {t('allRoomMetting.end')}
            </Text>
          </View>
        );
      default:
        return <></>;
    }
  };
  return (
    <View style={s.viewRow}>
      {type === TypeRoom.PRIVATE && showLock ? (
        <View style={s.viewLock}>
          <SvgLock color={color} size={16} />
        </View>
      ) : null}
      {renderViewLive()}
    </View>
  );
};

const s = StyleSheet.create({
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  viewCalendar: {
    backgroundColor: colors.white,
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(5),
    borderRadius: scaler(200),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTime: {
    ...stylesCommon.fontWeight400,
    color: colors.white,
    fontSize: scaler(12),
    marginLeft: scaler(8),
  },
  viewRowStatusLive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: scaler(28),
    backgroundColor: colors.white,
    borderRadius: scaler(200),
    paddingHorizontal: scaler(12),
    alignSelf: 'flex-start',
  },
  txtLive: {
    color: colors.white,
    fontSize: scaler(12),
    ...stylesCommon.fontWeight600,
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
