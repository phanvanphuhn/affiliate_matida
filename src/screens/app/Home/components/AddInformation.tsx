import {newBornBaby} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
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
          <Text style={styles.label}>{t('addInformation.babySize')}</Text>
          <Text
            style={{
              fontSize: scaler(20),
              ...stylesCommon.fontWeight600,
              marginBottom: scaler(16),
            }}>
            {t('addInformation.mystery')}
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
    ...stylesCommon.fontWeight500,
    color: '#85828C',
    marginBottom: scaler(24),
  },
  label: {
    fontSize: scaler(14),
    ...stylesCommon.fontWeight500,
    color: colors.black,
  },
  wrapBtnContainer: {
    paddingVertical: scaler(12),
    paddingHorizontal: scaler(16),
    backgroundColor: colors.pink200,
    borderRadius: scaler(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitle: {
    fontSize: scaler(12),
    ...stylesCommon.fontWeight500,
    color: colors.white,
  },
});

export default AddInformation;
