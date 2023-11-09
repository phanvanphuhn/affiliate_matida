import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {
  LogoApp,
  SvgArrowBackLogin,
  iconEdit,
  iconEditGrey,
  iconPen,
} from '@images';
import {navigate, goBack} from '@navigation';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';

const DetailNewBorn = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => goBack()}>
          <SvgArrowBackLogin />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate(ROUTE_NAME.EDIT_NEW_BORN)}>
          <Image
            source={iconEditGrey}
            style={{
              height: scaler(24),
              width: scaler(24),
              marginRight: scaler(16),
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.wrapImageContainer}>
          <FastImage
            source={LogoApp}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.wrapContentContainer}>
          <View style={{alignItems: 'center', marginBottom: scaler(24)}}>
            <Text style={styles.title}>Baby Bear</Text>
            <Text
              style={[
                styles.label,
                {fontSize: scaler(14), color: colors.labelColor},
              ]}>
              2 months old
            </Text>
          </View>

          <View
            style={{
              paddingVertical: scaler(16),
              flexDirection: 'row',
              justifyContent: 'space-around',
              borderTopWidth: scaler(1),
              borderBottomWidth: scaler(1),
              borderColor: '#F1F0F5',
            }}>
            <View
              style={{
                borderRightWidth: scaler(1),
                paddingRight: scaler(16),
                borderColor: '#F1F0F5',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles.label,
                  {fontSize: scaler(12), color: '#8B8484'},
                ]}>
                Date of birth
              </Text>
              <Text style={styles.text}>10/05/2023</Text>
            </View>

            <View
              style={{
                borderRightWidth: scaler(1),
                paddingRight: scaler(16),
                borderColor: '#F1F0F5',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles.label,
                  {fontSize: scaler(12), color: '#8B8484'},
                ]}>
                Time of birth
              </Text>
              <Text style={styles.text}>10:10 am</Text>
            </View>

            <View style={{alignItems: 'center', paddingRight: scaler(16)}}>
              <Text
                style={[
                  styles.label,
                  {fontSize: scaler(12), color: '#8B8484'},
                ]}>
                Gender
              </Text>
              <Text style={styles.text}>Female</Text>
            </View>
          </View>

          <View style={[styles.wrapDescription, {marginTop: scaler(16)}]}>
            <Text
              style={[styles.label, {fontSize: scaler(12), color: '#8B8484'}]}>
              Birth experience
            </Text>
            <Text style={styles.text}>Natural</Text>
          </View>
          <View style={styles.wrapDescription}>
            <Text
              style={[styles.label, {fontSize: scaler(12), color: '#8B8484'}]}>
              Birth weight
            </Text>
            <Text style={styles.text}>3.0 kg</Text>
          </View>
          <View style={styles.wrapDescription}>
            <Text
              style={[styles.label, {fontSize: scaler(12), color: '#8B8484'}]}>
              Birth height
            </Text>
            <Text style={styles.text}>80 cm</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: scaler(72),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: scaler(24),
    paddingHorizontal: scaler(16),
  },
  wrapImageContainer: {
    position: 'absolute',
    top: scaler(-60),
    left: SCREEN_WIDTH / 2 - 60,
  },
  image: {
    height: scaler(120),
    width: scaler(120),
    borderRadius: scaler(99),
  },
  wrapContentContainer: {
    marginTop: scaler(84),
  },
  title: {
    fontSize: scaler(24),
    fontWeight: '600',
  },
  label: {
    fontWeight: '400',
  },
  text: {
    fontSize: scaler(14),
    fontWeight: '500',
  },
  wrapDescription: {
    paddingVertical: scaler(16),
    borderBottomWidth: scaler(1),
    borderColor: '#F1F0F5',
  },
});

export default DetailNewBorn;
