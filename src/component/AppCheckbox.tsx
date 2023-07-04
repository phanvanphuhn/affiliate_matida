import {scaler, colors, stylesCommon} from '@stylesCommon';
import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native';
import {iconTick} from '@images';
import {useTranslation} from 'react-i18next';

const AppCheckBox = React.memo((props: any) => {
  const {t} = useTranslation();
  const {disable, onPress, active, title} = props;

  return (
    <TouchableOpacity
      style={[styles.container, {opacity: disable === true ? 0.7 : 1}]}
      onPress={onPress}
      disabled={disable}>
      <View
        style={[
          styles.viewBox,
          {backgroundColor: active === true ? colors.primary : '#FFFFFF'},
        ]}>
        <Image source={iconTick} style={styles.iconTick} />
      </View>
      <Text style={styles.txtTitle}>
        {title ? title : t('allRoomMetting.inviteAll')}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: scaler(16),
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '60%',
  },
  viewBox: {
    width: scaler(22),
    height: scaler(22),
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primary,
  },
  iconTick: {
    width: scaler(14),
    height: scaler(14),
    tintColor: '#FFFFFF',
  },
  txtTitle: {
    marginLeft: scaler(10),
    color: colors.textColor,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight500,
  },
});

export {AppCheckBox};
