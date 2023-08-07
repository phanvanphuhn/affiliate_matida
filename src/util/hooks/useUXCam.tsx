import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect} from 'react';
import RNUxcam from 'react-native-ux-cam';

export const useUXCam = (screenName: string): void => {
  // useEffect(() => {
  //   RNUxcam.tagScreenName(screenName);
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      RNUxcam.tagScreenName(screenName);
    }, []),
  );
};
