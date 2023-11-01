import {colors, scaler} from '@stylesCommon';
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('screen').width;

type TProps = {
  page: number;
};

const ProcessBar = (props: TProps) => {
  const {page} = props;
  return (
    <View style={styles.container}>
      <View style={styles.processBar}>
        <View
          style={{
            backgroundColor: colors.primary,
            height: scaler(4),
            width: (page / 8) * (screenWidth - 32),
            borderRadius: scaler(4),
          }}
        />
      </View>
      <View style={styles.wrapProcessContent}>
        <Text style={styles.title}>{page?.toString()}/8</Text>
        <Text style={styles.title}>Finish</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scaler(16),
  },
  processBar: {
    height: scaler(4),
    width: '100%',
    backgroundColor: '#E8E3E8',
    borderRadius: scaler(4),
    marginBottom: scaler(4),
  },
  wrapProcessContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ProcessBar;
