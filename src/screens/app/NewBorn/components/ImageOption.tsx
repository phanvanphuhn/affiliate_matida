import {AppCameraModal2} from '@component';
import {iconAddImage} from '@images';
import {scaler} from '@stylesCommon';
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

  return (
    <>
      {state.image?.length > 0 ? (
        <TouchableOpacity
          style={{padding: scaler(32)}}
          onPress={() => setVisible(true)}>
          <FastImage
            style={{flex: 1, width: SCREEN_WIDTH - 32}}
            source={{
              uri: `${state.image}`,
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Image
            source={iconAddImage}
            style={{height: scaler(120), width: scaler(120)}}
          />
        </TouchableOpacity>
      )}
      <AppCameraModal2
        visible={visible}
        setVisible={setVisible}
        onPress={handleChangeAvatar}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default ImageOption;
