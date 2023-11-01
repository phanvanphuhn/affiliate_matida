import {scaler} from '@stylesCommon';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {iconNewBorn} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';

export const FloatingNewBornButton = () => {
  const navigation = useNavigation<any>();

  const onNavigateNewBorn = () => {
    navigation.navigate(ROUTE_NAME.NEW_BORN);
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={styles.wrapButtonContainer}
        onPress={onNavigateNewBorn}>
        <Image source={iconNewBorn} style={styles.button} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: scaler(50),
    alignItems: 'center',
    right: scaler(8),
    // flex: 1,
    // width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: scaler(8),
  },
  wrapButtonContainer: {},
  button: {
    height: scaler(60),
    width: scaler(60),
  },
});
