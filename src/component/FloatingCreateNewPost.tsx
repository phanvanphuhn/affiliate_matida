import {iconEdit, iconEditWhite} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {trackCommunityTab} from '@services/webengageManager.tsx';

export const FloatingCreateNewPost = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={() => {
          trackCommunityTab(true);
          navigate(ROUTE_NAME.CREATE_NEWPOST);
        }}>
        <Image
          source={iconEditWhite}
          style={{height: scaler(20), width: scaler(20)}}
        />
        <Text style={styles.text}>{t('post.create_new')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    width: scaler(171),
    paddingHorizontal: scaler(12),
    paddingVertical: scaler(12),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.pink4,
    borderRadius: scaler(24),
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontSize: scaler(12),
    ...stylesCommon.fontWeight600,
    marginLeft: scaler(9),
  },
});
