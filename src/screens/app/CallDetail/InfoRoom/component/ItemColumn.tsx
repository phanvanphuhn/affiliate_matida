import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import {scaler, stylesCommon, colors, widthScreen} from '@stylesCommon';
import {avatarDefault} from '@images';
import {useSelector} from 'react-redux';
import {AppImage} from '@component';

const ItemColumn = React.memo((props: any) => {
  const infoInRoom = useSelector((state: any) => state?.liveTalk?.infoInRoom);
  const me = useSelector((state: any) => state?.auth?.userInfo?.id);
  const {item, onKickUser} = props;

  return (
    <>
      {item?.user?.id === infoInRoom?.host?.id ? (
        <View style={styles.viewItem}>
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
                  item?.user?.id === infoInRoom?.host?.id
                    ? colors.primary
                    : colors.textColor,
              },
            ]}
            numberOfLines={1}>
            {item?.user?.name}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.viewItem}
          disabled={me !== infoInRoom?.host?.id}
          onPress={() => {
            onKickUser(item?.user);
          }}>
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
                  item?.user?.id === infoInRoom?.host?.id
                    ? colors.primary
                    : colors.textColor,
              },
            ]}
            numberOfLines={1}>
            {item?.user?.name}
          </Text>
        </TouchableOpacity>
      )}
    </>
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
