import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {scaler, colors, stylesCommon} from '@stylesCommon';
import {AppImage} from '@component';
import {iconIsAdmin, avatarDefault} from '@images';

const ViewUser = React.memo((props: any) => {
  const {data} = props;

  return (
    <View style={styles.container}>
      {data?.expert_image?.length > 0 ? (
        <View style={[styles.viewAdmin]}>
          <AppImage user style={styles.avatar} uri={data?.expert_image} />
          <Image source={iconIsAdmin} style={styles.iconIsAdmin} />
        </View>
      ) : (
        <View style={[styles.viewAdmin]}>
          <Image source={avatarDefault} style={styles.avatar} />
          <Image source={iconIsAdmin} style={styles.iconIsAdmin} />
        </View>
      )}
      <View style={styles.viewContent}>
        <Text style={styles.txtTitle}>{data?.expert_name}</Text>
        <Text style={styles.txtContent}>{data?.description}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: scaler(12),
    backgroundColor: '#E8F8F7',
    borderRadius: scaler(8),
    marginTop: scaler(16),
    flexDirection: 'row',
  },
  viewAdmin: {
    width: scaler(44),
    height: scaler(44),
    borderRadius: scaler(44) / 2,
    borderWidth: scaler(2),
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: scaler(40),
    height: scaler(40),
    borderRadius: scaler(40) / 2,
  },
  iconIsAdmin: {
    width: scaler(16),
    height: scaler(16),
    position: 'absolute',
    bottom: scaler(-5),
    right: scaler(-5),
  },
  viewContent: {
    flex: 1,
    marginLeft: scaler(12),
  },
  txtTitle: {
    color: colors.textColor,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight600,
    lineHeight: scaler(21),
  },
  txtContent: {
    color: '#515151',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
    lineHeight: scaler(18),
    marginTop: scaler(8),
  },
});

export {ViewUser};
