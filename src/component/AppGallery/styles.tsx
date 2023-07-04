import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: widthScreen,
  },

  upper: {
    marginTop: 56,
    justifyContent: 'center',
  },

  main: {
    paddingHorizontal: 24,
    flex: 1,
  },

  lower: {
    flex: 1,
    marginBottom: 32,
    justifyContent: 'center',
    paddingHorizontal: 24,
    alignItems: 'center',
    flexDirection: 'row',
  },

  heading: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(15),
    color: colors.white,
  },

  desc: {
    ...stylesCommon.fontWeight600,
    fontSize: 17,
    color: colors.gray,
    marginTop: 16,
    marginBottom: 40,
    lineHeight: 28,
    // lineHeight: Spacing.height20,
  },

  phone: {
    fontSize: 17,
    marginBottom: 40,
  },

  input: {
    marginBottom: 16,
    height: 54,
  },
  iconMutil: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 24,
    width: 24,
    tintColor: '#fff',
  },
  headerPostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blockContainer: {
    flex: 1,
    marginLeft: 8,
  },
  blockContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
  },
  postContent: {
    marginTop: 16,
  },
  fileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  blurImage: {
    width: widthScreen - scaler(40),
    aspectRatio: 1,
    borderRadius: 14,
  },
  iconContainer: {
    position: 'absolute',
    opacity: 0.9,
  },
  tag: {
    position: 'absolute',
    opacity: 0.9,
    bottom: 10,
    left: 10,
  },
  rowMargin: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  rowMarginTop: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerKrunk: {
    flex: 0.6,
  },
  contentKrunk: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalUserContainer: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    backgroundColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appButton: {
    paddingHorizontal: 20,
    flex: 0.6,
  },
  rowFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  rowFooterContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLike: {
    marginLeft: 10,
    marginRight: 15,
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 52 / 2,
  },
  scroll: {
    flexGrow: 1,
    width: widthScreen - scaler(40),
  },
  button: {
    width: widthScreen - scaler(40),
  },
  playIcon: {
    position: 'absolute',
    opacity: 0.9,
  },
  indexImageContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 20,
  },
});
