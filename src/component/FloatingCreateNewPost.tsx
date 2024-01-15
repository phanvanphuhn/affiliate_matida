import {iconEdit, iconEditWhite} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {trackCommunityTab} from '@services/webengageManager.tsx';
import {useSelector} from 'react-redux';

export const FloatingCreateNewPost = () => {
  const user = useSelector((state: any) => state?.auth?.userInfo);
  const {t} = useTranslation();

  return (
    <View style={[styles.container, user?.role == 1 ? {flex: 0.5} : {}]}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={() => {
          trackCommunityTab(true);
          navigate(ROUTE_NAME.CREATE_NEWPOST);
        }}>
        <Image
          source={iconEditWhite}
          style={{height: scaler(24), width: scaler(24)}}
        />
        <Text style={styles.text} adjustsFontSizeToFit={true} numberOfLines={1}>
          {t('post.create_new')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.pink4,
    borderRadius: scaler(24),
    justifyContent: 'center',
    paddingVertical: scaler(12),
    paddingHorizontal: scaler(16),
    flex: 1,
  },
  text: {
    color: colors.white,
    fontSize: scaler(15),
    ...stylesCommon.fontSarabun600,
    marginLeft: scaler(9),
  },
});
