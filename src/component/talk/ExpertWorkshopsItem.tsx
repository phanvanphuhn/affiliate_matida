import {TypeRoom} from '@constant';
import {LogoApp, SvgCalendar, SvgLock, SvgPrevious44} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {getFirstTextElementHTML} from '@util';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {AppImage} from '../AppImage';
import {ViewLockPayment} from '../Payment';
import {StatusRoom} from '../StatusRoom';

type Props = {
  recorded?: boolean;
  item: any;
};

export const ExpertWorkshopsItem = ({recorded = false, item}: Props) => {
  const lang = useSelector((state: any) => state.auth.lang);
  const isPayment = item?.is_payment && !item?.is_paid;
  const [loading, setLoading] = useState<boolean>(true);

  const getTextUser = () => {
    if (recorded) {
      return lang === 2 ? item?.title_vn : item?.title_en;
    }
    return item?.user?.name ?? 'User';
  };

  const getTextTitle = () => {
    if (recorded) {
      const description =
        lang === 2 ? item?.description_vn : item?.description_en;
      return getFirstTextElementHTML(description);
    }
    return item?.room?.title ? `"${item?.room?.title}"` : '';
  };

  const handlePress = () => {
    if (recorded) {
      item?.link &&
        navigate(ROUTE_NAME.DETAIL_VIDEO, {
          url: item?.link,
          id: item?.id,
          isRecord: true,
          item: item,
        });
    } else {
      navigate(ROUTE_NAME.DETAIL_MEETING_ROOM, {id: item?.room?.id});
    }
  };

  return (
    <TouchableOpacity
      style={s.container}
      activeOpacity={1}
      onPress={handlePress}>
      <View style={{width: scaler(154), height: scaler(154)}}>
        {item?.user?.avatar || item?.thumbnail ? (
          <AppImage
            uri={recorded ? item?.thumbnail : item?.user?.avatar}
            style={s.image}
            onLoadCallBack={() => setLoading(false)}
          />
        ) : (
          <Image source={LogoApp} style={s.image} />
        )}

        {isPayment ? (
          <ViewLockPayment
            price={item?.price_vn}
            style={{
              flexDirection: 'column-reverse',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            styleLock={{alignSelf: 'center', marginBottom: scaler(12)}}
            stylePrice={{alignSelf: 'center'}}
          />
        ) : (
          <>
            {recorded && !loading && (
              <View style={s.viewPrevious}>
                <SvgPrevious44 />
              </View>
            )}
          </>
        )}
      </View>
      <View
        style={{
          marginTop: scaler(8),
          flex: 1,
          width: scaler(154),
        }}>
        <Text style={s.textHost}>{getTextUser()}</Text>
        <Text numberOfLines={1} style={s.textTitle}>
          {getTextTitle()}
        </Text>
        {recorded ? null : (
          <>
            <StatusRoom
              status={item?.room?.status}
              startTime={item?.room?.start_time}
              color={colors.black}
              type={item?.room?.type}
              showLock={false}
              colorIcon={colors.primary}
              typeRoom={item?.room?.type_room}
              styleStatusPending={{
                view: {
                  paddingLeft: 0,
                  paddingRight: scaler(16),
                },
              }}
              styleStatusEnd={{
                view: {
                  backgroundColor: colors.gray,
                },
                text: {
                  color: colors.textColor,
                },
              }}
            />
          </>
        )}
      </View>

      {item?.room?.type === TypeRoom.PRIVATE && !recorded && (
        <View style={s.viewLock}>
          <SvgLock color={colors.primary} size={16} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    padding: scaler(16),
    borderRadius: scaler(8),
    width: scaler(154),
    marginRight: scaler(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaler(12),
  },
  textTitle: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(13),
    marginVertical: scaler(4),
  },
  textTime: {
    color: colors.textColor,
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
    marginLeft: scaler(12),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: scaler(154),
    height: scaler(154),
    borderRadius: scaler(8),
    borderWidth: scaler(1),
    borderColor: colors.white,
  },
  textHost: {
    color: colors.brandMainPinkRed,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(12),
  },
  viewPrevious: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
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
    position: 'absolute',
    top: scaler(24),
    left: scaler(24),
  },
});
