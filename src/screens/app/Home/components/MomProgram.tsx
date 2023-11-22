import {momProgram, newBornBaby} from '@images';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const MomProgram = () => {
  const onSignUp = () => {};

  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={styles.title}>The Power Mom Program</Text>
        <Text style={styles.subTitle}>
          Sign up here for early,
          <Text style={{color: colors.primary}}> free of charge </Text>
          access before the official launch.
        </Text>
      </View>

      <View style={styles.wrapContentContainer}>
        <Text style={styles.label}>
          • Expert guidance through your pregnancy
        </Text>
        <Text style={styles.label}>• Learn all the mommy & baby secrets</Text>
        <Text style={styles.label}>
          • Access to a medical doctor for questions
        </Text>
        <Text style={styles.label}>• Reduce stress or anxiety</Text>
        <Text style={styles.label}>• Vouchers, offers & bonus surprises</Text>

        <TouchableOpacity style={styles.wrapBtnContainer} onPress={onSignUp}>
          <Text style={styles.btnTitle}>Sign up now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', alignItems: 'center'}}>
          <Text style={styles.subBtnTitle}>
            Free of charge, no strings attached
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Image
          source={momProgram}
          style={{
            width: '100%',
            height: scaler(198),
          }}
          // resizeMethod="resize"
          resizeMode="center"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: scaler(16),
    marginHorizontal: scaler(16),
    borderRadius: scaler(16),
  },
  title: {
    fontWeight: '600',
    fontSize: scaler(24),
    marginBottom: scaler(8),
  },
  subTitle: {
    fontWeight: '400',
    fontSize: scaler(14),
    color: '#39383D',
    textAlign: 'center',
    paddingHorizontal: scaler(16),
    marginBottom: scaler(16),
  },
  wrapContentContainer: {
    paddingHorizontal: scaler(16),
    marginHorizontal: scaler(16),
    paddingTop: scaler(16),
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopRightRadius: scaler(16),
    borderTopLeftRadius: scaler(16),
    marginBottom: scaler(24),
    borderColor: '#F1F0F5',
  },
  label: {
    fontWeight: '500',
    fontSize: scaler(14),
    color: colors.labelColor,
    marginBottom: scaler(8),
  },
  wrapBtnContainer: {
    width: '100%',
    backgroundColor: colors.primaryBackground,
    paddingVertical: scaler(12),
    alignItems: 'center',
    borderRadius: scaler(24),
    marginTop: scaler(24),
    marginBottom: scaler(16),
  },
  btnTitle: {
    fontWeight: '500',
    fontSize: scaler(12),
    color: colors.white,
  },
  subBtnTitle: {
    fontSize: scaler(12),
    fontWeight: '400',
    color: '#85828C',
  },
});

export default MomProgram;
