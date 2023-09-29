/* eslint-disable react-native/no-inline-styles */
import {iconCalendarCheckup, SvgIconBaby} from '@images';
import {scaler, stylesCommon} from '@stylesCommon';
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
        style={[
          styles.viewItem,
          {
            opacity: status === 1 ? 1 : 0.5,
          },
        ]}>
        <View style={styles.icon}>
          <SvgIconBaby size={72} />
        </View>
        <Text style={styles.txtAT}>{t('home.sizeComparison.embryo')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (status !== 2) {
            onChaneStatus(2);
          }
        }}
        style={[
          styles.viewItem,
          {
            opacity: status === 2 ? 1 : 0.5,
          },
        ]}>
        <View style={styles.icon}>
          <FastImage
            source={iconCalendarCheckup}
            style={[
              {
                width: 72,
                height: 72,
              },
            ]}
          />
        </View>
        <Text style={styles.txtAT}>{t('home.sizeComparison.sympton')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: scaler(24),
    marginBottom: scaler(32),
  },
  txtAT: {
    ...stylesCommon.fontWeight600,
    color: '#252525',
    fontSize: scaler(14),
    marginTop: 8,
    textAlign: 'center',
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
