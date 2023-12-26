import {EVideoType, TypeRoom} from '@constant';
import {
  LogoApp,
  SvgCalendar,
  SvgLock,
  SvgPrevious44,
  iconCrown,
  iconFlower,
} from '@images';
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
import {StackRouter} from '@react-navigation/native';
import {styles} from '../AppModal/styles';
import moment from 'moment';

type Props = {
  recorded?: boolean;
  item: any;
};

export const ExpertWorkshopsItemV2 = ({recorded = false, item}: Props) => {
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
          id: item?.id,
          type: EVideoType.RECORD,
          // url: item?.link,
          // isRecord: true,
          // item: item,
        });
    } else {
      navigate(ROUTE_NAME.DETAIL_MEETING_ROOM, {id: item?.room?.id});
    }
  };
  console.log('item: ', item);
  return (
    <TouchableOpacity
      style={s.container}
      activeOpacity={1}
      onPress={handlePress}>
      <View
        style={[
          s.header,
          isPayment
            ? {backgroundColor: colors.pink4}
            : {backgroundColor: colors.gray3},
        ]}>
        <Text
          style={{
            ...stylesCommon.fontWeight600,
            fontSize: 13,
            color: isPayment ? colors.white : colors.black,
          }}>
          {item?.user?.name}
        </Text>
        {isPayment && (
          <Image
            source={iconFlower}
            style={{height: scaler(20), width: scaler(20)}}
          />
        )}
      </View>
      <View style={s.body}>
        <View style={{flex: 1}}>
          <Text style={s.textTitle}>{item?.room?.title}</Text>
          {recorded ? null : (
            <View style={s.row}>
              <SvgCalendar color={colors.black} />
              <Text style={s.textTime}>
                {moment(item?.room?.start_time, 'YYYY/MM/DD hh:mm:ss').format(
                  'DD/MM, HH:mm',
                )}
              </Text>
            </View>
          )}
          <View
            style={[s.row, {marginTop: scaler(12), marginBottom: scaler(16)}]}>
            {isPayment && (
              <Image
                source={iconCrown}
                style={{
                  height: scaler(20),
                  width: scaler(20),
                  marginRight: scaler(8),
                }}
              />
            )}
            {item?.room.status == 2 ? (
              <View
                style={{
                  borderRadius: scaler(16),
                  backgroundColor: colors.pink4,
                }}>
                <Text style={[s.status]}>Live</Text>
              </View>
            ) : item?.room.status == 1 ? (
              <View
                style={{
                  borderRadius: scaler(16),
                  backgroundColor: colors.purple4,
                }}>
                <Text style={[s.status]}>Upcoming</Text>
              </View>
            ) : (
              <View
                style={{
                  borderRadius: scaler(16),
                  backgroundColor: colors.gray2,
                }}>
                <Text style={[s.status, {color: colors.gray7}]}>Finished</Text>
              </View>
            )}
          </View>
        </View>
        <View style={{width: scaler(80), height: scaler(80)}}>
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
      </View>

      {/* <View
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
      )} */}
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    borderRadius: scaler(16),
    width: scaler(264),
    marginRight: scaler(16),
    backgroundColor: colors.white,
    marginBottom: scaler(32),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaler(12),
    paddingHorizontal: scaler(16),
    paddingVertical: scaler(8),
    borderTopLeftRadius: scaler(16),
    borderTopRightRadius: scaler(16),
  },
  body: {
    paddingRight: scaler(12),
    paddingLeft: scaler(16),
    flexDirection: 'row',
    width: '100%',
  },
  textTitle: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(15),
    marginBottom: scaler(8),
  },
  textTime: {
    color: colors.textColor,
    ...stylesCommon.fontWeight400,
    fontSize: scaler(13),
    marginLeft: scaler(12),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    paddingHorizontal: scaler(8),
    paddingVertical: scaler(4),
    fontSize: 11,
    ...stylesCommon.fontWeight600,
    color: colors.white,
  },
  image: {
    width: scaler(80),
    height: scaler(80),
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
