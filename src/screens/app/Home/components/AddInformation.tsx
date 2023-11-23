import {newBornBaby} from '@images';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Touchable,
} from 'react-native';
import FastImage from 'react-native-fast-image';

type TProps = {
  onPress: () => void;
};

const AddInformation = (props: TProps) => {
  const {onPress} = props;
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('addInformation.helpCalculate')}</Text>
      <View style={styles.wrapContainer}>
        <View style={{flex: 1, marginRight: scaler(32)}}>
          <Text style={styles.label}>
            {t('addInformation.babySize')}
            <Text
              style={{
                fontSize: scaler(20),
                fontWeight: '600',
              }}>
              {t('addInformation.mystery')}
            </Text>
          </Text>
          <TouchableOpacity style={styles.wrapBtnContainer} onPress={onPress}>
            <Text style={styles.btnTitle}>
              {t('addInformation.addInformation')}
            </Text>
          </TouchableOpacity>
        </View>
        <FastImage
          source={newBornBaby}
          style={{
            width: scaler(150),
            height: scaler(110),
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scaler(16),
    backgroundColor: colors.white,
    borderRadius: scaler(16),
    paddingBottom: scaler(32),
  },
  wrapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: scaler(11),
    fontWeight: '500',
    color: '#85828C',
    marginBottom: scaler(24),
  },
  label: {
    fontSize: scaler(14),
    fontWeight: '500',
    color: colors.black,
    marginBottom: scaler(16),
  },
  wrapBtnContainer: {
    paddingVertical: scaler(12),
    paddingHorizontal: scaler(16),
    backgroundColor: colors.primaryBackground,
    borderRadius: scaler(24),
  },
  btnTitle: {
    fontSize: scaler(12),
    fontWeight: '500',
    color: colors.white,
  },
});

export default AddInformation;
