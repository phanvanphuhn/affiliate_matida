import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  StyleProp,
  ImageRequireSource,
  ImageSourcePropType,
} from 'react-native';
import FastImage, {
  ResizeMode,
  Source,
  ImageStyle,
} from 'react-native-fast-image';
import {colors} from '@stylesCommon';
import {avatarDefault, LogoApp} from '@images';

interface LazyImageProps {
  source?: Source | ImageRequireSource;
  style?: StyleProp<ImageStyle>;
  onLoadCallBack?: () => void;
  resizeMode?: ResizeMode;
}
const LazyImage = React.memo((props: LazyImageProps) => {
  const {source, style, resizeMode, onLoadCallBack = () => {}} = props;

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
    <View style={style}>
      <FastImage
        source={source}
        style={style}
        resizeMode={resizeMode ? resizeMode : 'cover'}
        onLoadStart={() => onLoadStart()}
        onLoad={() => onLoad()}
        onError={onError}
        // onLoadEnd={onLoadEnd}
      />

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
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
});

export default LazyImage;
