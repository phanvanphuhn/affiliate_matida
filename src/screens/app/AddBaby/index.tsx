import {iconClose} from '@images';
import {goBack, navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const AddBaby = () => {
  const onNavigateEditNewBorn = () => {
    navigate(ROUTE_NAME.EDIT_NEW_BORN);
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
      <Text style={styles.title}>Hi Mom</Text>
      <Text
        style={[
          styles.desc,
          {
            marginBottom: scaler(56),
          },
        ]}>
        Has your baby been born yet?
      </Text>

      <TouchableOpacity
        style={styles.wrapButtonContainer}
        onPress={onNavigateEditNewBorn}>
        <Text style={[styles.desc, {color: colors.white}]}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.wrapButtonContainer, {backgroundColor: colors.gray350}]}
        onPress={onNavigateAddNewBaby}>
        <Text>No</Text>
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
