import {colors} from '@stylesCommon';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  ImageRequireSource,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';
import FastImage, {
  ImageStyle,
  ResizeMode,
  Source,
} from 'react-native-fast-image';

interface LazyImageProps {
  source?: Source | ImageRequireSource;
  style?: StyleProp<ImageStyle>;
  onLoadCallBack?: () => void;
  resizeMode?: ResizeMode;
}
export const LazyImage = React.memo((props: LazyImageProps) => {
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
