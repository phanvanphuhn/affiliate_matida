/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {AppImage} from '@component';
import {SvgArrowLeft, SvgMessage} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {goBack} from '@navigation';
import {CreateNewPostComponent} from './CreateNewPostComponent';
import {iconEdit} from '@images';

export type Props = {
  title: string;
};

const HeaderListDetailPost = (props: Props) => {
  const {title} = props;

  const handlePressAvatar = () => {
    goBack();
  };

  return (
    <SafeAreaView edges={['top']}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePressAvatar} style={styles.btnAvatar}>
          <SvgArrowLeft stroke={colors.textColor} />
        </TouchableOpacity>
        <Text style={styles.text}>{title}</Text>
        <View
          style={{
            width: scaler(72),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
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

export default HeaderListDetailPost;
