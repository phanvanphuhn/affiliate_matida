import {avatarDefault, LogoApp} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {getUseField} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppImage} from '../AppImage';

export const MemberParticipant = () => {
  const {t} = useTranslation();

  const {value} = getUseField('participants');
  const length = value?.length;
  const members = length > 4 ? value.slice(0, 4) : value;
  const lengthMember = members?.length ?? 0;
  //   const overMembers = length > 5 ? length - 5 : 0;
  const widthViewImage =
    lengthMember * scaler(32) - scaler(10) * (lengthMember - 1);
  return (
    <>
      {value?.length > 0 ? (
        <View style={s.container}>
          <View
            style={[
              s.body,
              {
                width: widthViewImage,
              },
            ]}>
            {members?.map((member: any, index: number) => {
              return (
                <View
                  style={[s.viewImage, {left: scaler(22) * index}]}
                  key={index}>
                  {member?.user?.avatar || member?.avatar ? (
                    <AppImage
                      user
                      uri={
                        member?.user?.avatar
                          ? member?.user?.avatar
                          : member?.avatar
                      }
                      style={s.image}
                    />
                  ) : (
                    <Image source={avatarDefault} style={s.image} />
                  )}
                </View>
              );
            })}
          </View>
          <Text style={s.textSelected}>
            {t('talk.usersSelected', {index: value?.length})}
          </Text>
        </View>
      ) : null}
    </>
  );
};

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scaler(32),
    marginRight: scaler(12),
  },
  image: {
    width: scaler(32),
    height: scaler(32),
    borderRadius: scaler(16),
    borderWidth: scaler(1),
    borderColor: colors.white,
  },
  viewImage: {
    position: 'absolute',
  },
  textSelected: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    color: colors.brandMainPinkRed,
  },
});
