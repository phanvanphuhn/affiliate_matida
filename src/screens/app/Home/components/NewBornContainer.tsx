import {iconArrowRight, newBornBaby, tailArrowRight} from '@images';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const NewBornContainer = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.wrapContentContainer, {marginBottom: scaler(32)}]}>
        <Text style={styles.title}>5 month</Text>

        <Text style={styles.title}>born on</Text>
      </View>
      <View style={[styles.wrapContentContainer, {marginBottom: scaler(32)}]}>
        <View
          style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontSize: 14, fontWeight: '500'}}>
              Baby may develop
            </Text>
            <Text style={{fontSize: 20, fontWeight: '600'}}>first flexes</Text>
            <Text style={{fontSize: 12, fontWeight: '400'}}>
              startles, suckles, burps, ...
            </Text>
          </View>

          <View>
            <Text style={{fontSize: 12, fontWeight: '500'}}>
              ~ 1.2 kg & 0.5 cm
            </Text>
          </View>
        </View>

        <View>
          <Image
            source={newBornBaby}
            style={{
              width: scaler(155),
              height: scaler(116),
            }}
            // resizeMethod="resize"
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.wrapContentContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={newBornBaby}
            style={{
              width: scaler(28),
              height: scaler(28),
              marginRight: scaler(8),
            }}
            // resizeMethod="resize"
            resizeMode="contain"
          />
          <View>
            <Text style={{fontSize: 11, fontWeight: '500'}}>Baby Bear</Text>
            <Text style={styles.title}>Libra girl</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.wrapBtnContainer}>
          <Text style={styles.btnTitle}>View more</Text>
          <Image
            source={tailArrowRight}
            style={{
              height: scaler(16),
              width: scaler(16),
              marginLeft: scaler(4),
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaler(16),
    marginHorizontal: scaler(16),
    paddingVertical: scaler(16),
    borderRadius: scaler(16),
    backgroundColor: colors.white,
  },
  wrapContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: scaler(11),
    fontWeight: '500',
    color: '#82808A',
  },
  wrapBtnContainer: {
    paddingVertical: scaler(8),
    paddingHorizontal: scaler(16),
    backgroundColor: '#FFEBEB',
    borderRadius: scaler(40),
    flexDirection: 'row',
  },
  btnTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primaryBackground,
  },
});

export default NewBornContainer;
