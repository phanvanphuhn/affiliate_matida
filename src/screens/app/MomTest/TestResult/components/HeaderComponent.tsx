import {SvgVerify} from '@images';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../style';

type Props = {
  perfect?: boolean;
};

export const HeaderComponent = ({perfect = false}: Props) => {
  const {t} = useTranslation();
  return (
    <View style={styles.containerHeader}>
      {/* <SafeAreaView edges={['top']} /> */}
      <SvgVerify />
      <Text style={styles.labelComplete}>
        {perfect ? t('test.yaySuper') : t('test.testComplete')}
      </Text>
    </View>
  );
};
