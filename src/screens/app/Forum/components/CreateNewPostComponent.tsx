import {iconEdit} from '@images';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { trackCommunityTab } from '@services/webengageManager.tsx';

export const CreateNewPostComponent = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={() => {
        trackCommunityTab(true);
        navigate(ROUTE_NAME.CREATE_NEWPOST)}}>
        <Image source={iconEdit} />
        <Text style={styles.text}>{t('post.create_new')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaler(16),
    marginTop: scaler(12),
  },
  button: {
    width: '100%',
    paddingHorizontal: scaler(17),
    paddingVertical: scaler(13),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF1F1',
    borderRadius: scaler(8),
  },
  text: {
    color: colors.primary,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight600,
    marginLeft: scaler(9),
  },
});
