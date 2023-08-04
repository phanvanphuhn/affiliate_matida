import {colors, scaler, stylesCommon} from '@stylesCommon';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingBottom: scaler(240),
    padding: scaler(8),
  },
  itemContainer: {
    flex: 0.5,
    padding: scaler(8),
  },
  image: {
    height: scaler(220),
    borderTopLeftRadius: scaler(8),
    borderTopRightRadius: scaler(8),
  },
  leftDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: scaler(16),
    left: scaler(8),
  },
  rightDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: scaler(8),
    bottom: scaler(16),
  },
  description: {
    marginLeft: scaler(4),
    color: colors.gray,
    fontSize: scaler(8),
    ...stylesCommon.fontWeight400,
  },
  title: {
    color: colors.black,
    fontSize: scaler(12),
    ...stylesCommon.fontWeight500,
    marginTop: scaler(8),
  },
  wrapAvatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTitle: {
    color: colors.textSmallColor,
    fontSize: scaler(10),
    ...stylesCommon.fontWeight400,
    marginTop: scaler(8),
  },
  imageAvatar: {
    height: scaler(10),
    width: scaler(10),
    borderRadius: 99,
    marginRight: scaler(4),
    alignSelf: 'center',
    marginTop: scaler(6),
  },
  wrapTextInput: {
    height: scaler(45),
    borderRadius: scaler(16),
    borderColor: colors.brandMainPinkRed,
    borderWidth: 1,
    margin: scaler(8),
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingLeft: scaler(8),
  },
  textInputContainer: {
    flex: 1,
  },
  wrapButtonSearch: {
    backgroundColor: colors.brandMainPinkRed,
    borderTopRightRadius: scaler(14),
    borderBottomRightRadius: scaler(14),
    justifyContent: 'center',
  },
  buttonSearchTitle: {
    color: colors.white,
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
    paddingHorizontal: scaler(8),
  },
});

export {styles};
