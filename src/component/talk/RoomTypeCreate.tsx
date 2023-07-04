import {TypeRoom} from '@constant';
import {SvgLock, SvgUser} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {getUseField} from '@util';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type Props = {
  canEdit?: boolean;
};

export const RoomTypeCreate = ({canEdit = true}: Props) => {
  const {t} = useTranslation();
  const {value, setValue} = getUseField('roomType');

  const data = [
    {
      id: 1,
      label: t('talk.public'),
      icon: (
        <SvgUser
          color={value === TypeRoom.PUBLIC ? colors.white : colors.borderColor}
        />
      ),
      value: TypeRoom.PUBLIC,
      onPress: () => setValue(TypeRoom.PUBLIC),
    },
    {
      id: 2,
      label: t('talk.private'),
      icon: (
        <SvgLock
          color={value === TypeRoom.PRIVATE ? colors.white : colors.borderColor}
        />
      ),
      value: TypeRoom.PRIVATE,
      onPress: () => setValue(TypeRoom.PRIVATE),
    },
  ];
  return (
    <View style={s.container}>
      <Text style={s.textTitle}>{t('talk.roomType')}</Text>
      <View style={s.body}>
        {data.map(item => {
          const isSelected = value === item.value;
          return (
            <TouchableOpacity
              style={[
                s.button,
                {
                  backgroundColor: isSelected
                    ? colors.brandMainPinkRed
                    : colors.white,
                  borderColor: isSelected
                    ? colors.brandMainPinkRed
                    : colors.gray,
                },
              ]}
              onPress={item.onPress}
              key={item.id}
              activeOpacity={0.9}>
              {item.icon}
              <Text
                style={[
                  s.textLabel,
                  {color: isSelected ? colors.white : colors.textColor},
                ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaler(12),
    marginRight: scaler(12),
    borderRadius: scaler(68),
    borderWidth: scaler(1),
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaler(12),
  },
  textTitle: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
  },
  container: {
    paddingTop: scaler(12),
    paddingBottom: scaler(20),
    borderBottomWidth: scaler(1),
    borderBottomColor: colors.gray,
    marginBottom: scaler(20),
  },
  textLabel: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    marginLeft: scaler(8),
  },
});
