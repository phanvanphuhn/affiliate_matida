import {colors, scaler, stylesCommon} from '@stylesCommon';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ViewProgress = React.memo((props: any) => {
  const {title, content, width} = props;

  return (
    <View style={styles.container}>
      <View style={styles.viewTxt}>
        <Text style={styles.title}>{title} </Text>
        <Text style={styles.content}>{content}</Text>
      </View>
      <View style={styles.viewProgress}>
        <View style={[styles.progress, {width: `${width ? width : 0}%`}]} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: scaler(16),
    paddingVertical: scaler(12),
    backgroundColor: '#F6F6F6',
    borderRadius: scaler(8),
    marginTop: scaler(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewTxt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewProgress: {
    width: scaler(136),
    height: scaler(7),
    backgroundColor: '#F6C4C4',
    borderRadius: scaler(20),
  },
  progress: {
    height: '100%',
    width: '50%',
    backgroundColor: colors.primary,
    borderRadius: scaler(20),
  },
  title: {
    color: '#252525',
    fontSize: scaler(14),
    ...stylesCommon.fontWeight700,
  },
  content: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    color: '#252525',
  },
});

export {ViewProgress};
