import {StyleSheet} from 'react-native';
import {
  stylesCommon,
  scaler,
  colors,
  heightScreen,
  widthScreen,
} from '@stylesCommon';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewListMessage: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  containerMessage: {
    backgroundColor: '#F6F6F6',
  },
  viewBottom: {
    height: heightScreen >= 812 ? scaler(90) : scaler(50),
  },
  addBtn: {
    width: scaler(44),
    height: scaler(44),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getBottomSpace() + scaler(14),
  },
  iconUpload: {
    width: scaler(44),
    height: scaler(44),
    borderRadius: scaler(44 / 2),
  },
  viewSelectImage: {
    height: scaler(100),
    backgroundColor: '#FFFFFF',
    width: widthScreen,
    paddingHorizontal: scaler(17),
    justifyContent: 'center',
  },
  imagePicker: {
    width: scaler(80),
    height: scaler(80),
    borderRadius: scaler(8),
  },
  btnClose: {
    backgroundColor: `${colors.gray50}20`,
    padding: scaler(10),
    borderRadius: scaler(24),
  },
  iconClose: {
    width: scaler(25),
    height: scaler(25),
    tintColor: colors.white,
    borderRadius: scaler(14),
  },
  buttonClose: {
    position: 'absolute',
    top: scaler(10),
    right: scaler(10),
  },
  sendBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: scaler(20),
    bottom: getBottomSpace() + scaler(15),
    width: scaler(35),
    height: scaler(44),
  },
  iconEmojiStyle: {
    width: scaler(28),
    height: scaler(28),
  },
  viewHeaderImage: {
    width: '100%',
    marginTop: getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaler(16),
    alignItems: 'center',
    paddingTop: scaler(8),
  },
});

export {styles};
