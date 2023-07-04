import {ProgressBar} from '@component';
import {SvgArrowLeft} from '@images';
import {colors, scaler} from '@stylesCommon';
import {getUseField} from '@util';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../style';

type Props = {
  title?: string;
  onPressLeft: () => void;
  total: number;
};

export const HeaderTestDetail = ({title, onPressLeft, total}: Props) => {
  const {value} = getUseField('current');
  return (
    <SafeAreaView edges={['top']} style={styles.safeAreaView}>
      <View style={[styles.containerHeader]}>
        <TouchableOpacity
          onPress={onPressLeft}
          activeOpacity={0.9}
          style={[styles.buttonHeaderLeft]}>
          <SvgArrowLeft stroke={colors.textColor} />
        </TouchableOpacity>
        <View style={styles.viewTitle}>
          <Text numberOfLines={1} style={[styles.titleHeader]}>
            {title ? title : 'Mom test'}
          </Text>
          {/* {!!total ? ( */}
          <ProgressBar
            total={total}
            now={value + 1}
            styleProgressBar={styles.progress}
          />
          {/* ) : null} */}
        </View>
        <View style={{flex: 1}} />
      </View>
    </SafeAreaView>
  );
};
