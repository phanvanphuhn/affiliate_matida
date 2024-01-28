import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scaler, stylesCommon, colors} from '@stylesCommon';

const ViewBackgroundText = React.memo((props: any) => {
  const {title} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>{title}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    // width: scaler(63),
    height: scaler(23),
    borderRadius: scaler(8),
    paddingHorizontal: scaler(12),
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: scaler(12),
    backgroundColor: '#8FA0FF',
    marginTop: scaler(6),
    alignSelf: 'flex-start',
  },
  txtTitle: {
    fontSize: scaler(12),
    ...stylesCommon.fontWeight600,
    color: colors.white,
  },
});

export {ViewBackgroundText};
