import {SvgArrowLeft} from '@images';
import {goBack} from '@navigation';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

export const HeaderMasterClass = () => {
  const {t} = useTranslation();
  const showStripe = useSelector((state: any) => state?.check?.showStripe);

  const handlePressAlert = () => {
    Alert.alert(t('home.masterClass'), t('payment.tooltip') as string);
  };

  return (
    <SafeAreaView edges={['top']}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => goBack()}
          activeOpacity={0.9}
          style={styles.btnLeft}>
          <SvgArrowLeft stroke={colors.textColor} />
        </TouchableOpacity>
        <View style={styles.viewCenter}>
          <Text style={[styles.titleText]}>{t('home.masterClass')}</Text>
          {showStripe ? null : (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.viewModal}
              onPress={handlePressAlert}>
              <Text style={[styles.titleText]}>!</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{flex: 1, paddingRight: scaler(20)}} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: scaler(16),
    color: '#000000',
    ...stylesCommon.fontWeight500,
  },
  container: {
    flexDirection: 'row',
    marginTop: scaler(20),
    justifyContent: 'space-between',
  },
  btnLeft: {
    flex: 1,
    paddingLeft: scaler(20),
  },
  viewCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    flex: 4,
    justifyContent: 'center',
  },
  viewModal: {
    borderRadius: scaler(11),
    borderWidth: scaler(1),
    height: scaler(22),
    width: scaler(22),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scaler(8),
  },
});
