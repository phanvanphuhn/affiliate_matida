import {AppCameraModal, AppCameraModal2} from '@component';
import {SvgIconDelete, iconAddImage} from '@images';
import {colors, scaler} from '@stylesCommon';
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {TState} from './Information';
import FastImage from 'react-native-fast-image';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';

type TProps = {
  setState: ({}) => void;
  state: TState;
};

const ImageOption = (props: TProps) => {
  const {setState, state} = props;
  const [visible, setVisible] = useState<boolean>(false);

  const handleChangeAvatar = (value: any) => {
    setVisible(false);
    setState({image: value.sourceURL});
  };

  const onDeleteImage = () => {
    setState({image: []});
  };

  return (
    <>
      {state.image?.length > 0 ? (
        <TouchableOpacity onPress={() => setVisible(true)}>
          <FastImage
            style={{height: scaler(120), width: scaler(120), borderRadius: 99}}
            source={{
              uri: `${state.image}`,
            }}
          />
          <TouchableOpacity
            style={styles.wrapDeleteContainer}
            onPress={onDeleteImage}>
            <SvgIconDelete fill={colors.red} />
          </TouchableOpacity>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Image
            source={iconAddImage}
            style={{height: scaler(120), width: scaler(120)}}
          />
        </TouchableOpacity>
      )}
      <AppCameraModal
        visible={visible}
        setVisible={setVisible}
        onPress={handleChangeAvatar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrapDeleteContainer: {
    position: 'absolute',
    top: scaler(4),
    right: scaler(16),
    height: scaler(12),
    width: scaler(12),
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
  },
});

export default ImageOption;
