import {AppTextUrl, Header} from '@component';
import {
  SvgArrowLeft,
  bacsyHoa,
  bacsyMaiSuong,
  bacsyNguyenTram,
  bacsyPhuongAnh,
} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import React, {useTransition} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';

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
      <ScrollView style={styles.wrapContainer}>
        {data.map((i, index) => {
          return (
            <View style={{flexDirection: 'row'}}>
              <Text style={{width: scaler(20)}}>{`${index + 1}. `}</Text>
              <AppTextUrl style={styles.txtMsg}>{`${i}`}</AppTextUrl>
            </View>
          );
        })}
        <View style={{marginBottom: scaler(8)}}>
          <Text style={styles.txtMsg}>
            Chúng tôi có hợp đồng dịch vụ với những bác sỹ có chuyên môn về mẹ
            và bé tại Việt Nam.
          </Text>
        </View>
        <FastImage source={bacsyHoa} style={styles.image} />
        <FastImage source={bacsyMaiSuong} style={styles.image} />
        <FastImage source={bacsyNguyenTram} style={styles.image} />
        <FastImage source={bacsyPhuongAnh} style={styles.image} />
        <Text style={[styles.txtMsg, {marginBottom: scaler(80)}]}>{`* ${t(
          'chatGPT.contentNote',
        )}`}</Text>
      </ScrollView>
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
  image: {
    width: '100%',
    height: scaler(120),
    marginBottom: scaler(16),
  },
});

export default SourceOfRecommendation;
