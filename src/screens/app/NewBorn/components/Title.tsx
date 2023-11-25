import {scaler} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet} from 'react-native';

type TProps = {
  page: Number;
};

const Title = (props: TProps) => {
  const {page} = props;
  const {t} = useTranslation();

  const renderTitle = () => {
    switch (page) {
      case 1:
        return (
          <>
            <Text style={styles.title}>{t('newBorn.congratulation')}</Text>
            <Text style={styles.description}>{t('newBorn.whichDate')}</Text>
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.title}>{t('newBorn.congratulation')}</Text>
            <Text style={styles.description}>{t('newBorn.whatTime')}</Text>
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.title}>{t('newBorn.congratulation')}</Text>
            <Text style={styles.description}>{t('newBorn.whatName')}</Text>
          </>
        );
      case 4:
        return (
          <>
            <Text style={styles.title}>{t('newBorn.congratulation')}</Text>
            <Text style={styles.description}>{t('newBorn.whatGender')}</Text>
          </>
        );
      case 5:
        return (
          <>
            <Text style={styles.title}>{t('newBorn.congratulation')}</Text>
            <Text style={styles.description}>{t('newBorn.howDeliver')}</Text>
          </>
        );
      case 6:
        return (
          <>
            <Text style={styles.title}>{t('newBorn.congratulation')}</Text>
            <Text style={styles.description}>{t('newBorn.whatWeight')}</Text>
          </>
        );
      case 7:
        return (
          <>
            <Text style={styles.title}>{t('newBorn.congratulation')}</Text>
            <Text style={styles.description}>{t('newBorn.whatHeight')}</Text>
          </>
        );
      case 8:
        return (
          <>
            <Text style={styles.title}>{t('newBorn.congratulation')}</Text>
            <Text style={styles.description}>{t('newBorn.havePicture')}</Text>
          </>
        );
      case 9:
        return (
          <>
            <Text style={styles.title}>{t('newBorn.welcome')}</Text>
            <Text style={styles.title}>{t('newBorn.journey')}</Text>
          </>
        );
      default:
        return (
          <>
            <Text style={styles.title}>{t('newBorn.hi')}</Text>
            <Text style={styles.description}>{t('newBorn.hasBaby')}</Text>
          </>
        );
    }
  };

  return <>{renderTitle()}</>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: scaler(12),
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
  },
});

export default Title;
