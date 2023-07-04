import React, {useCallback, useEffect, useState} from 'react';
// import * as ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {AppSelectionModal} from './AppSelectionModal';
import {IItem} from './_type';
enum CameraOption {
  CAMERA = 'CAMERA',
  LIBRARY = 'LIBRARY',
}

interface AppCameraModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onPress: (response: any) => void;
}

// interface Action {
//   camera: ImagePicker.CameraOptions;
//   library: ImagePicker.ImageLibraryOptions;
// }

// const includeExtra = true;
// const actions: Action = {
//   camera: {
//     saveToPhotos: true,
//     mediaType: 'photo',
//     includeBase64: false,
//     includeExtra,
//   },
//   library: {
//     selectionLimit: 1,
//     mediaType: 'photo',
//     includeBase64: false,
//     includeExtra,
//   },
// };

const listCameraOption: IItem[] = [
  {
    label: 'Camera',
    value: CameraOption.CAMERA,
  },
  {
    label: 'Library',
    value: CameraOption.LIBRARY,
  },
];

export const AppCameraModal = ({
  visible,
  setVisible,
  onPress,
}: AppCameraModalProps) => {
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    if (response) {
      onPress(response);
    }
  }, [response]);

  // const handlePressOptionCamera = useCallback(async (item: IItem) => {
  //   if (item.value === CameraOption.CAMERA) {
  //     ImagePicker.launchCamera(actions.camera, setResponse);
  //   } else if (item.value === CameraOption.LIBRARY) {
  //     let a = await ImagePicker.launchImageLibrary(
  //       actions.library,
  //       setResponse,
  //     );
  //   }
  // }, []);

  const handlePressOptionCamera = useCallback(async (item: IItem) => {
    if (item.value === CameraOption.CAMERA) {
      ImagePicker.openCamera({
        mediaType: 'photo',
        width: 300,
        height: 300,
        cropping: true,
      }).then(image => {
        setResponse(image);
      });
    } else if (item.value === CameraOption.LIBRARY) {
      ImagePicker.openPicker({
        mediaType: 'photo',
        width: 300,
        height: 300,
        cropping: true,
      })
        .then(image => {
          setResponse(image);
        })
        .catch(e => {});
    }
  }, []);

  return (
    <AppSelectionModal
      visible={visible}
      setVisible={setVisible}
      listItem={listCameraOption}
      value={''}
      onPress={handlePressOptionCamera}
    />
  );
};
