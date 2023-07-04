import {StyleSheet} from 'react-native';
import {colors, scaler, stylesCommon} from '@stylesCommon';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaler(20),
    marginVertical: scaler(10),
  },
  inputSearch: {
    height: scaler(45),
    marginLeft: scaler(13),
    width: '100%',
  },
});

export {styles};
