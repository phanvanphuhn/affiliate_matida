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
  viewLoading: {
    backgroundColor: 'transparent',
    width: widthScreen,
    paddingHorizontal: scaler(17),
    justifyContent: 'center',
    paddingBottom: scaler(20),
  },
  imagePicker: {
    width: scaler(80),
    height: scaler(80),
    borderRadius: scaler(8),
  },
  iconClose: {
    width: scaler(25),
    height: scaler(25),
    tintColor: colors.textColor,
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
    right: scaler(25),
    bottom: getBottomSpace() + scaler(15),
    width: scaler(35),
    height: scaler(44),
  },
  iconEmojiStyle: {
    width: scaler(28),
    height: scaler(28),
    tintColor: '#E66D6E',
  },
  viewHeaderImage: {
    width: '100%',
    marginTop: getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaler(16),
    alignItems: 'center',
  },
  viewNote: {
    paddingHorizontal: scaler(16),
    paddingVertical: scaler(10),
    backgroundColor: '#FAE2E2',
  },
  txtTitleNote: {
    color: colors.primary,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight600,
  },
  txtContentNote: {
    color: colors.textColor,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
    // textDecorationLine: 'line-through'
  },
});

export {styles};
