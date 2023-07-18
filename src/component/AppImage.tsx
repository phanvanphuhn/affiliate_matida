import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors} from '@stylesCommon';
import {avatarDefault, LogoApp} from '@images';

const AppImage = React.memo((props: any) => {
  const {
    uri,
    style,
    resizeMode,
    onLoadCallBack = () => {},
    user = false,
  } = props;

  const [loading, setLoading] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);

  const onLoadStart = useCallback(() => {
    setLoading(true);
  }, []);

  const onLoad = useCallback(() => {
    setLoading(false);
    onLoadCallBack();
  }, []);

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <View style={[style, {borderWidth: 0}]}>
      {!uri || error ? (
        <Image source={user ? avatarDefault : LogoApp} style={[style]} />
      ) : (
        <FastImage
          source={{
            uri: uri,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          style={[style]}
          resizeMode={resizeMode ? resizeMode : 'cover'}
          onLoadStart={() => onLoadStart()}
          onLoad={() => onLoad()}
          onError={onError}
          // onLoadEnd={onLoadEnd}
        />
      )}

      {loading ? (
        <View style={[styles.viewLoading, style]}>
          <ActivityIndicator color={colors.primary} size="small" />
        </View>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  viewLoading: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {AppImage};
