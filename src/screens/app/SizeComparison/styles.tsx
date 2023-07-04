import {StyleSheet} from 'react-native';
import {scaler, colors, stylesCommon} from '@stylesCommon';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  containerPicker: {
    marginTop: scaler(16),
  },
});

export {styles};
