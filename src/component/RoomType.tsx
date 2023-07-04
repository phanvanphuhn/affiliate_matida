import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {scaler, colors, stylesCommon} from '@stylesCommon';
import {useTranslation} from 'react-i18next';
import {iconPhoneCall, iconLiveStream} from '@images';

const RoomType = React.memo((props: any) => {
  const {t} = useTranslation();
  const {value, changeValue, disable, valueMedia, changeValueMedia} = props;

  return (
    <>
      <View style={[styles.container, {opacity: disable ? 0.7 : 1}]}>
        <Text style={styles.textTitle}>{t('talk.mode')}</Text>
        <View style={[styles.container, {borderBottomWidth: 0}]}>
          <View style={[styles.viewRow]}>
            <TouchableOpacity
              style={
                valueMedia === 1
                  ? styles.buttonMediaActive
                  : styles.buttonMediaInActive
              }
              onPress={() => {
                changeValueMedia(1);
              }}
              disabled={disable}>
              <Image source={iconPhoneCall} style={styles.imageIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={
                valueMedia === 2
                  ? styles.buttonMediaActive
                  : styles.buttonMediaInActive
              }
              onPress={() => {
                changeValueMedia(2);
              }}
              disabled={disable}>
              <Image source={iconLiveStream} style={styles.imageIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: scaler(16),
    borderColor: '#EAEAEA',
  },
  viewRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonInActive: {
    width: '48%',
    height: scaler(52),
    borderRadius: scaler(8),
    borderWidth: 1,
    borderColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    width: '48%',
    height: scaler(52),
    borderRadius: scaler(8),
    borderWidth: 1,
    borderColor: colors.backgroundOpacity,
    backgroundColor: colors.backgroundOpacity,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButtonActive: {
    fontSize: scaler(16),
    color: colors.primary,
    ...stylesCommon.fontPlus600,
  },
  txtButtonInActive: {
    fontSize: scaler(16),
    color: colors.textColor,
    ...stylesCommon.fontPlus600,
  },
  textTitle: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    marginBottom: scaler(16),
  },
  buttonMediaActive: {
    width: '48%',
    height: scaler(100),
    borderRadius: scaler(8),
    borderWidth: 1,
    borderColor: colors.backgroundOpacity,
    backgroundColor: colors.backgroundOpacity,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonMediaInActive: {
    width: '48%',
    height: scaler(100),
    borderRadius: scaler(8),
    borderWidth: 1,
    borderColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon: {
    width: scaler(40),
    height: scaler(40),
  },
});

export {RoomType};
