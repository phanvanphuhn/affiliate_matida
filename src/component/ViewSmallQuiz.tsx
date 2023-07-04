import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {IconBackgroundImageHome, iconEmoji} from '@images';
import {AppButton} from './AppButton';
import {useSelector} from 'react-redux';
import {navigate} from '@navigation';
import {ROUTE_NAME} from '@routeName';

export const ViewSmallQuiz = React.memo(() => {
  const lang = useSelector((state: any) => state?.auth?.lang);

  return (
    <View style={styles.container}>
      <View style={styles.viewContent}>
        <Image
          source={IconBackgroundImageHome}
          style={styles.imageBackground}
        />
        <View style={styles.viewResult}>
          <Image source={iconEmoji} style={styles.icon} />
          <Text style={styles.txtTitleContent}>
            {lang === 1
              ? 'Perfect reading! Ready to take our test?'
              : 'Làm bài test kiểm tra kiến thức'}
          </Text>
          <Text style={styles.txtContent}>
            {lang === 1
              ? ' Try our test to build your knowledge.'
              : 'Bộ database 100+ câu hỏi kiểm tra kiến thức cho mẹ mang thai'}
          </Text>
          <AppButton
            titleButton={lang === 1 ? 'Do the test' : 'Làm test ngay'}
            customStyleButton={styles.buttonBottom}
            onClick={() => navigate(ROUTE_NAME.MOM_PREP_TEST)}
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: scaler(40),
  },
  viewContent: {
    width: '100%',
    paddingVertical: scaler(20),
    // height: scaler(258),
    backgroundColor: '#654AC9',
    borderRadius: scaler(16),
  },
  imageBackground: {
    width: scaler(134),
    height: scaler(249),
    position: 'absolute',
    right: 0,
    top: scaler(88),
  },
  viewResult: {
    flex: 1,
    paddingHorizontal: scaler(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitleContent: {
    ...stylesCommon.fontPlus600,
    fontSize: scaler(24),
    lineHeight: scaler(33),
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: scaler(8),
  },
  icon: {
    width: scaler(36),
    height: scaler(36),
  },
  txtContent: {
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
    lineHeight: scaler(18),
    color: '#F6F4F6',
    marginTop: scaler(8),
    marginBottom: scaler(24),
    textAlign: 'center',
  },
  buttonBottom: {
    backgroundColor: '#28B4AE',
  },
});
