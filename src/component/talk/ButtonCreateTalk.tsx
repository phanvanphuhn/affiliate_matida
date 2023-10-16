import {SvgPlus} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {trackingAppEvent, event, eventType} from '@util';
type Props = {
  onPress?: () => void;
  bottom?: number;
};
export const ButtonCreateTalk = ({
  onPress = () => {
    trackingAppEvent(
      event.LIVE_ROOM.CLICK_CREATE_NEW_ROOM,
      {},
      eventType.AFF_FLYER,
    );
    navigate(ROUTE_NAME.CREATE_ROOM);
  },
  bottom = getBottomSpace() + scaler(16),
}: Props) => {
  const {t} = useTranslation();
  return (
    <View style={[s.container, {bottom: bottom}]}>
      <TouchableOpacity activeOpacity={1} style={s.button} onPress={onPress}>
        <SvgPlus />
        <Text style={s.text}>{t('talk.titleCreate')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.brandMainPinkRed,
    // backgroundColor: 'green',
    flexDirection: 'row',
    borderRadius: scaler(200),
    padding: scaler(12),
  },
  text: {
    color: colors.white,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    marginLeft: scaler(8),
  },
});
