import {AppImage} from '@component';
import {scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

type Props = {
  name: string;
  avatar: string;
  style?: StyleProp<ViewStyle>;
  numberOfLine?: number;
};
export const ViewExpert = ({name, avatar, style, numberOfLine = 1}: Props) => {
  const {t} = useTranslation();

  return (
    <View style={[styles.container, style]}>
      <AppImage user uri={avatar} style={styles.avatar} />
      <View style={{}}>
        <Text style={{marginLeft: scaler(8)}} numberOfLines={numberOfLine}>
          <Text style={styles.date}>{t('podcast.by')} </Text>
          <Text style={styles.name}>{name}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
  },
  date: {
    color: '#7C7C7C',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
    marginVertical: scaler(8),
    lineHeight: scaler(18),
  },
  name: {
    color: '#28B4AE',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight500,
    marginVertical: scaler(8),
    lineHeight: scaler(18),
  },
  avatar: {
    width: scaler(24),
    height: scaler(24),
    borderRadius: scaler(24),
    marginRight: scaler(8),
  },
});
