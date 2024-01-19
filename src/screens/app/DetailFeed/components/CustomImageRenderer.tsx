import React, {ReactNode, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {
  IMGElementContainer,
  IMGElementContentError,
  useIMGElementProps,
  useIMGElementState,
} from 'react-native-render-html';
import {InternalRendererProps} from 'react-native-render-html/src/shared-types';
import {TBlock} from '@native-html/transient-render-engine';
import {IMGElementState} from 'react-native-render-html/src/elements/img-types';
import {widthScreen} from '@stylesCommon';

interface CustomImageRendererProps extends InternalRendererProps<TBlock> {}

function IMGElementContentLoading({dimensions, altColor}: IMGElementState) {
  return (
    <View style={[dimensions, styles.containerLoading]}>
      <ActivityIndicator color={altColor} size="large" />
    </View>
  );
}
function IMGElementContentSuccess({source}: IMGElementState) {
  const {uri} = source;
  const [height, setHeight] = useState(0);
  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      const aspectRatio = width / height;
      const newHeight = widthScreen / aspectRatio;
      setHeight(newHeight);
    });
  }, [uri]);
  return (
    <ImageBackground
      source={{uri}}
      style={{
        width: '100%',
        height,
      }}
    />
  );
}

function CustomImageRenderer(props: CustomImageRendererProps) {
  const imgElementProps = useIMGElementProps(props);
  const state = useIMGElementState(imgElementProps);
  let content: ReactNode = false;
  if (state.type === 'error') {
    content = React.createElement(IMGElementContentError, state);
  } else if (state.type == 'loading') {
    content = React.createElement(IMGElementContentLoading, state);
  } else {
    content = React.createElement(IMGElementContentSuccess, state);
  }
  return (
    <IMGElementContainer
      onPress={imgElementProps.onPress}
      style={state.containerStyle}>
      {content}
    </IMGElementContainer>
  );
}

export default React.memo(CustomImageRenderer);

const styles = StyleSheet.create({
  container: {},
  containerLoading: {justifyContent: 'center', alignItems: 'center'},
});
