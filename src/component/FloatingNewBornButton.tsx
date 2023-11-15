import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {iconNewBorn} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {useTranslation} from 'react-i18next';

type TProps = {
  onPress: () => void;
};

export const FloatingNewBornButton = (props: TProps) => {
  const {onPress} = props;

  const {t} = useTranslation();

  return (
    <View style={[styles.container]}>
      <View style={styles.wrapContent}>
        <Text style={styles.title}>{t('newBornTida.reportBirth')}</Text>
      </View>
      <TouchableOpacity style={styles.wrapButtonContainer} onPress={onPress}>
        <Image source={iconNewBorn} style={styles.button} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    position: 'absolute',
    bottom: scaler(50),
    alignItems: 'flex-end',
    right: scaler(8),
    // flex: 1,
    // width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: scaler(8),
  },
  wrapContent: {
    backgroundColor: '#FFF0F0',
    paddingHorizontal: scaler(12),
    paddingVertical: scaler(4),
    marginBottom: scaler(4),
    borderRadius: scaler(16),
  },
  wrapButtonContainer: {},
  title: {
    fontSize: scaler(12),
    fontWeight: '500',
    color: colors.brandMainPinkRed,
  },
  button: {
    height: scaler(60),
    width: scaler(60),
  },
});
