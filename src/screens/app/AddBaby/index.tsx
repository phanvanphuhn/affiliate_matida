import {iconClose} from '@images';
import {goBack, navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler} from '@stylesCommon';
import React, {useTransition} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const AddBaby = (props: any) => {
  const {route} = props;
  const {t} = useTranslation();

  const onNavigateEditNewBorn = () => {
    navigate(ROUTE_NAME.EDIT_NEW_BORN, {
      isAddNewBaby: route?.params?.isAddNewBaby,
    });
  };

  const onNavigateAddNewBaby = () => {
    navigate(ROUTE_NAME.ADD_NEW_BABY);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TouchableOpacity
        onPress={() => goBack()}
        style={styles.headerButtonContainer}>
        <Image source={iconClose} style={{tintColor: colors.textColor}} />
      </TouchableOpacity>
      <Text style={[styles.title, {marginBottom: scaler(8)}]}>
        {t('newBorn.hi')}
      </Text>
      <Text
        style={[
          styles.desc,
          {
            marginBottom: scaler(56),
          },
        ]}>
        {t('newBorn.hasBaby')}
      </Text>

      <TouchableOpacity
        style={styles.wrapButtonContainer}
        onPress={onNavigateEditNewBorn}>
        <Text style={[styles.desc, {color: colors.white}]}>
          {t('newBorn.yes')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.wrapButtonContainer, {backgroundColor: colors.gray350}]}
        onPress={onNavigateAddNewBaby}>
        <Text>{t('newBorn.no')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaler(16),
  },
  headerButtonContainer: {
    position: 'absolute',
    top: scaler(68),
    right: scaler(16),
  },
  title: {
    fontSize: scaler(24),
    fontWeight: '600',
  },
  desc: {
    fontSize: scaler(14),
    fontWeight: '400',
    color: colors.labelColor,
  },
  wrapButtonContainer: {
    width: '100%',
    padding: scaler(16),
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginBottom: scaler(8),
    borderRadius: scaler(40),
  },
});

export default AddBaby;
