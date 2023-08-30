import {colors, scaler, stylesCommon} from '@stylesCommon';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundDefault,
    // paddingBottom: scaler(240),
    padding: scaler(8),
    flex: 1,
  },
  itemContainer: {
    flex: 0.48,
    marginBottom: scaler(12),
    borderRadius: scaler(8),
    backgroundColor: colors.backgroundFeed,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    height: scaler(220),
    borderTopLeftRadius: scaler(8),
    borderTopRightRadius: scaler(8),
  },
  tag: {
    position: 'absolute',
    zIndex: 1000,
    top: scaler(6),
    right: scaler(6),
    backgroundColor: colors.white,
    paddingVertical: scaler(2),
    paddingHorizontal: scaler(4),
    borderRadius: scaler(12),
  },
  tagTitle: {
    color: colors.red50,
    fontSize: scaler(10),
    ...stylesCommon.fontWeight600,
  },
  leftDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: scaler(8),
    left: scaler(2),
  },
  rightDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: scaler(8),
  },
  description: {
    marginLeft: scaler(4),
    color: colors.gray50,
    fontSize: scaler(8),
    ...stylesCommon.fontWeight400,
  },
  title: {
    color: colors.black,
    fontSize: scaler(12),
    ...stylesCommon.fontWeight500,
    marginTop: scaler(8),
    paddingLeft: scaler(8),
    paddingRight: scaler(8),
  },
  wrapAvatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scaler(8),
    paddingRight: scaler(8),
    paddingBottom: scaler(4),
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
