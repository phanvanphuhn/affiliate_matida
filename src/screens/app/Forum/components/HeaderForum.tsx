/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {AppImage} from '@component';
import {SvgMessage} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

export const HeaderForum = () => {
  const navigation = useNavigation<any>();
  const {t} = useTranslation();

  const user = useSelector((state: any) => state.auth.userInfo);

  const handlePressAvatar = () => {
    navigation.navigate(ROUTE_NAME.PROFILE_SETTINGS);
  };

  return (
    <SafeAreaView edges={['top']}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePressAvatar} style={styles.btnAvatar}>
          <AppImage uri={user?.avatar} style={styles.avatarImage} user />
        </TouchableOpacity>
        <Text style={styles.text}>{t('bottomTab.community')}</Text>
        <View
          style={{
            width: scaler(72),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <View style={{marginRight: scaler(12)}}>
            <SvgMessage color={'#8D8D8D'} />
          </View> */}
          {/* <TouchableOpacity
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() => {
              navigate(ROUTE_NAME.CREATE_NEWPOST);
            }}>
            <SvgPlus color={'#8D8D8D'} />
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatarImage: {
    width: scaler(42),
    height: scaler(42),
    borderRadius: scaler(42),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: scaler(15),
  },
  btnAvatar: {
    paddingLeft: scaler(20),
    paddingRight: scaler(10),
  },
  text: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(16),
    color: colors.textColor,
    flex: 1,
    textAlign: 'center',
  },
});
