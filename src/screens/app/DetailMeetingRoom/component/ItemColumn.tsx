import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import {scaler, stylesCommon, colors, widthScreen} from '@stylesCommon';
import {avatarDefault} from '@images';
import {useSelector} from 'react-redux';
import {AppImage} from '@component';
import {ROUTE_NAME} from '@routeName';
import {navigate} from '@navigation';
import {ERoomStatusType} from '@constant';

const ItemColumn = React.memo((props: any) => {
  const infoRoom = useSelector((state: any) => state?.liveTalk?.info);
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const {item, onKickUser} = props;
  const isCanEdit = infoRoom?.host?.id === user?.id;
  const handlePressUser = (userSelect: any) => {
    if (
      infoRoom?.room?.status === ERoomStatusType.LIVE &&
      isCanEdit &&
      userSelect?.id !== user?.id
    ) {
      onKickUser(userSelect);
    } else {
      navigate(ROUTE_NAME.DETAIL_USER, {id: item?.user?.id});
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.viewItem}
      onPress={() => handlePressUser(item?.user)}>
      {item?.user?.avatar?.length > 0 ? (
        <AppImage user uri={item?.user?.avatar} style={styles.avatar} />
      ) : (
        <Image source={avatarDefault} style={styles.avatar} />
      )}
      <Text
        style={[
          styles.txtName,
          {
            color:
              item?.user?.id === infoRoom?.host?.id
                ? colors.primary
                : colors.textColor,
          },
        ]}
        numberOfLines={1}>
        {item?.user?.name}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  viewItem: {
    marginTop: scaler(28),
    width: (widthScreen - scaler(32) - scaler(126)) / 3,
    marginHorizontal: scaler(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: (widthScreen - scaler(32) - scaler(126)) / 3,
    height: (widthScreen - scaler(32) - scaler(126)) / 3,
    borderRadius: (widthScreen - scaler(32) - scaler(126)) / 3 / 2,
  },
  txtName: {
    color: colors.textColor,
    marginTop: scaler(12),
    fontSize: scaler(14),
    ...stylesCommon.fontWeight600,
  },
});

export {ItemColumn};
