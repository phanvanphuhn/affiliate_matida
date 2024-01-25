/* eslint-disable react-native/no-inline-styles */
import {iconCalendarCheckup, SvgIconBaby} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {t} from 'i18next';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

type Props = {
  onChaneStatus: (status: number) => void;
  status: number;
};

export const ViewSelectType = (props: Props) => {
  const {onChaneStatus, status} = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (status !== 1) {
            onChaneStatus(1);
          }
        }}
        style={
          status === 1
            ? [
                styles.chooseBtnContainer,
                {
                  opacity: status === 1 ? 1 : 0.5,
                },
              ]
            : [
                styles.btnContainer,
                {
                  opacity: status === 1 ? 1 : 0.5,
                },
              ]
        }>
        <Text style={status === 1 ? styles.chooseTxtAT : styles.txtAT}>
          {t('home.sizeComparison.embryo')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (status !== 2) {
            onChaneStatus(2);
          }
        }}
        style={
          status === 2
            ? [
                styles.chooseBtnContainer,
                {
                  opacity: status === 2 ? 1 : 0.5,
                },
              ]
            : [
                styles.btnContainer,
                {
                  opacity: status === 2 ? 1 : 0.5,
                },
              ]
        }>
        <Text style={status !== 1 ? styles.chooseTxtAT : styles.txtAT}>
          {t('home.sizeComparison.sympton')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: scaler(12),
    marginBottom: scaler(24),
    backgroundColor: colors.gray350,
    marginHorizontal: scaler(16),
    borderRadius: scaler(40),
  },
  chooseTxtAT: {
    ...stylesCommon.fontSarabun600,
    color: colors.white,
    fontSize: scaler(13),
    textAlign: 'center',
  },
  txtAT: {
    ...stylesCommon.fontSarabun600,
    color: colors.gray550,
    fontSize: scaler(13),
    textAlign: 'center',
  },
  chooseBtnContainer: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: colors.pink4,
    borderRadius: scaler(40),
    paddingVertical: scaler(8),
  },
  btnContainer: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: colors.gray350,
    borderRadius: scaler(40),
    paddingVertical: scaler(8),
  },
  viewItem: {
    width: '50%',
    alignItems: 'center',
  },
  icon: {
    height: 72,
    justifyContent: 'flex-end',
  },
});
