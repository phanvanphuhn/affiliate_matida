import {
  iconArrowRight,
  iconArrowRightGrey,
  iconPlusCircle,
  iconPregnant,
  iconSend,
} from '@images';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

type TProps = {
  onPress: () => void;
  onNavigateDetailNewBorn: () => void;
};

const BottomSheetNewBorn = (props: TProps) => {
  const {onPress, onNavigateDetailNewBorn} = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onNavigateDetailNewBorn}
        style={[
          styles.wrapContainer,
          {
            justifyContent: 'space-between',
            paddingVertical: scaler(16),
            borderBottomColor: colors.gray,
            borderBottomWidth: 1,
          },
        ]}>
        <View style={styles.wrapContainer}>
          <Image
            source={iconPregnant}
            style={{
              height: scaler(24),
              width: scaler(24),
              marginRight: scaler(8),
            }}
            resizeMode="contain"
          />
          <Text style={styles.title}>Baby Bear</Text>
        </View>
        <View style={styles.wrapContainer}>
          <Text style={styles.desc}>23/06/2023</Text>
          <Image
            source={iconArrowRightGrey}
            style={{
              height: scaler(24),
              width: scaler(24),
              marginLeft: scaler(8),
            }}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.wrapContainer, {paddingVertical: scaler(16)}]}
        onPress={onPress}>
        <Image
          source={iconPlusCircle}
          style={{
            height: scaler(24),
            width: scaler(24),
            marginRight: scaler(8),
          }}
          resizeMode="contain"
        />
        <Text style={[styles.title, {color: '#A3A1AB'}]}>Add baby</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scaler(16),
  },
  wrapContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: scaler(14),
    fontWeight: '500',
  },
  desc: {
    fontSize: scaler(12),
    fontWeight: '400',
    color: '#82808A',
  },
});

export default BottomSheetNewBorn;
