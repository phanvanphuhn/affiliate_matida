import {AppCameraModal, AppCameraModal2} from '@component';
import {SvgIconDelete, iconAddImage} from '@images';
import {colors, scaler} from '@stylesCommon';
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {TState} from './Information';
import FastImage from 'react-native-fast-image';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {GlobalService, uploadImage} from '@services';

type TProps = {
  setState: ({}) => void;
  state: any;
};

const ImageOption = (props: TProps) => {
  const {setState, state} = props;
  const [visible, setVisible] = useState<boolean>(false);

  const handleChangeAvatar = async (response: any) => {
    setVisible(false);
    GlobalService.showLoading();
    try {
      const data = new FormData();
      const imageUpload = {
        uri:
          Platform.OS === 'ios'
            ? response?.path.replace('file://', '')
            : response?.path,
        type: 'image/jpeg',
        name: response?.fileName ? response?.fileName : response?.path,
      };
      data.append('file', imageUpload);
      const res = await uploadImage(data);
      setState({avatar: res?.data?.url});
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  const onDeleteImage = () => {
    setState({avatar: ''});
  };

  return (
    <>
      {state.avatar?.length > 0 ? (
        <TouchableOpacity onPress={() => setVisible(true)}>
          <FastImage
            style={{height: scaler(120), width: scaler(120), borderRadius: 99}}
            source={{
              uri: state.avatar,
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
