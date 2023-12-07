import {AppTextUrl, Header} from '@component';
import {SvgArrowLeft} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useTransition} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet} from 'react-native';

const SourceOfRecommendation = () => {
  const {t} = useTranslation();

  const data = [
    'https://vinmec.com/',
    'https://www.matida.app/',
    'https://www.healthline.com/',
  ];

  return (
    <View style={styles.container}>
      <Header
        title={t('setting.source')}
        IconLeft={<SvgArrowLeft stroke={colors.textColor} />}
      />
      <View style={styles.wrapContainer}>
        {data.map((i, index) => {
          return (
            <AppTextUrl style={styles.txtMsg}>{`${
              index + 1
            }. ${i}`}</AppTextUrl>
          );
        })}
        <Text>{`* ${t('chatGPT.contentNote')}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapContainer: {
    padding: scaler(16),
  },
  txtMsg: {
    color: colors.black,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
    marginBottom: scaler(8),
  },
});

export default SourceOfRecommendation;
