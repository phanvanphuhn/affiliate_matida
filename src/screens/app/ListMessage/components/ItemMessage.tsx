import {avatarDefault, SvgBellSimpleSlash} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ROUTE_NAME} from '@routeName';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {AppImage} from '@component';
import moment from 'moment';
import {putReadMessage} from '@services';
import {showMessage} from 'react-native-flash-message';
import {useTranslation} from 'react-i18next';

type Props = {
  item: any;
};
export const ItemMessage = ({item}: Props) => {
  const navigation = useNavigation<any>();
  const {t} = useTranslation();
  const isSeen = +item?.totalUnread === 0;
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const memberChat = getMemberChat(item, user?.id);

  const renderIDuser = () => {
    const arrayUser = item?.topic?.topicMembers;
    let shadowArrayUser = [...arrayUser];
    if (!shadowArrayUser) {
      return null; // or any other appropriate value
    }
    let index = shadowArrayUser.findIndex(
      (element: any) => element?.user_id == user.id,
    );
    if (index > -1) {
      // Use [0] to get the removed element
      return shadowArrayUser.splice(index, 1)[0]?.user_id;
    }
    return null; // or any other appropriate value
  };

  const handlePress = async () => {
    try {
      if (renderIDuser()) {
        navigation.navigate(ROUTE_NAME.DETAIL_CHAT, {
          topic_id: item?.topic_id,
          receiver_id: renderIDuser(),
        });
      }
      const res = await putReadMessage(item?.topic_id);
    } catch (e) {
      showMessage({
        message: '',
        type: 'default',
        backgroundColor: 'transparent',
      });
    } finally {
    }
  };

  const getTimeFormNow = (date: string) => {
    if (date) {
      const time = moment()?.diff(moment(date, 'YYYY/MM/DD hh:mm:ss'));
      const duration = moment?.duration(time);

      const year = Math.floor(+duration?.asYears());
      const days = Math.floor(+duration?.asDays());
      const hours = Math.floor(+duration?.asHours());
      const minutes = Math.floor(+duration?.asMinutes());

      if (year > 0) {
        return moment(date, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY');
      } else {
        if (days > 0 && days <= 366) {
          return moment(date, 'YYYY/MM/DD hh:mm:ss').format('DD/MM');
        } else {
          if (hours > 0 && hours < 24) {
            return `${hours}${t('chat.hour')}`;
          } else {
            if (minutes > 0 && minutes <= 60) {
              return `${minutes}${t('chat.minutes')}`;
            } else {
              return t('chat.justDone');
            }
          }
        }
      }
    }
    return '';
  };

  const getContent = (message: any, userId: number) => {
    return `${+message?.sender_id === +userId ? t('chat.you') : ''} ${
      message?.content ? message?.content.trim() : t('chat.messageNotText')
    }`;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        height: scaler(74),
        padding: scaler(16),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#E9EAEA',
        borderBottomWidth: scaler(1),
        backgroundColor: isSeen ? colors.white : colors.gray250,
      }}
      onPress={handlePress}>
      {memberChat?.user?.avatar ? (
        <AppImage user uri={memberChat?.user?.avatar} style={styles.image} />
      ) : (
        <Image source={avatarDefault} style={styles.image} />
      )}
      <View style={{marginLeft: scaler(12), marginRight: scaler(4), flex: 1}}>
        <Text
          style={{
            color: colors.gray300,
            fontSize: scaler(14),
            ...stylesCommon.fontWeight600,
          }}>
          {memberChat?.user?.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Text
              numberOfLines={1}
              style={[
                {
                  color: colors.gray300,
                  fontSize: scaler(14),
                  ...stylesCommon.fontWeight600,
                  maxWidth: scaler(230),
                },
                isSeen && stylesCommon.fontWeight400,
              ]}>
              {/* {item?.topic?.messages?.length > 0
                ? item?.topic?.messages[0]?.content?.trim()
                : ''} */}
              {item?.topic?.messages?.length > 0
                ? getContent(item?.topic?.messages[0], item?.user_id)
                : t('chat.messageNotText')}
            </Text>
            <Text
              style={{
                color: '#717D84',
                fontSize: scaler(14),
                ...stylesCommon.fontWeight400,
                marginHorizontal: scaler(4),
              }}>
              {getTimeFormNow(
                item?.topic?.messages?.length > 0
                  ? item?.topic?.messages[0]?.created_at
                  : '',
              )}
            </Text>
          </View>
          {memberChat?.is_mute ? <SvgBellSimpleSlash /> : null}
        </View>
      </View>
      {!isSeen && (
        <View
          style={{
            backgroundColor: '#EA1347',
            width: scaler(6),
            height: scaler(6),
            position: 'absolute',
            top: scaler(16),
            right: scaler(16),
            borderRadius: scaler(3),
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: scaler(40),
    height: scaler(40),
    borderRadius: scaler(20),
  },
});

const getMemberChat = (chat: any, id: number) => {
  const arrayMember = chat?.topic?.topicMembers;
  return arrayMember?.length > 0
    ? arrayMember.find((member: any) => +member?.user_id !== +id)
    : {};
};
