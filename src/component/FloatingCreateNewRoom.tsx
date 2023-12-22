import {SvgPlus, iconPlusCircle, iconPlusCircleWhite} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {trackingAppEvent, event, eventType} from '@util';
type Props = {
  onPress?: () => void;
  bottom?: number;
};
export const FloatingCreateNewRoom = ({
  onPress = () => {
    trackingAppEvent(
      event.LIVE_ROOM.CLICK_CREATE_NEW_ROOM,
      {},
      eventType.AFF_FLYER,
    );
    navigate(ROUTE_NAME.CREATE_ROOM);
  },
}: Props) => {
  const {t} = useTranslation();
  return (
    <View style={[s.container]}>
      <TouchableOpacity activeOpacity={1} style={s.button} onPress={onPress}>
        <Image
          source={iconPlusCircleWhite}
          style={{
            height: scaler(20),
            width: scaler(20),
          }}
        />
        <Text style={s.text}>{t('talk.titleCreate')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: colors.purple4,
    flexDirection: 'row',
    borderRadius: scaler(24),
    paddingHorizontal: scaler(12),
    paddingVertical: scaler(12),
    width: scaler(171),
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(12),
    marginLeft: scaler(8),
    alignSelf: 'center',
  },
});
