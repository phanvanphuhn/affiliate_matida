import {StyleSheet} from 'react-native';
import {scaler, colors, stylesCommon} from '@stylesCommon';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '90%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scaler(8),
    borderTopRightRadius: scaler(8),
    position: 'absolute',
    bottom: 0,
  },
  viewHeader: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
    paddingVertical: scaler(17),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: scaler(16),
  },
  content: {
    flex: 1,
  },
  txtHeader: {
    color: colors.textColor,
    fontSize: scaler(14),
    marginLeft: scaler(12),
    ...stylesCommon.fontWeight500,
  },
  viewItem: {
    flex: 1,
    marginTop: scaler(17),
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaler(16),
  },
  viewStatusLive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: scaler(200),
    marginLeft: scaler(16),
    marginBottom: scaler(8),
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(10),
  },
  txtDateTime: {
    color: '#FFFFFF',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight600,
    marginLeft: scaler(10),
  },
  viewTitle: {
    paddingHorizontal: scaler(16),
    paddingVertical: scaler(13),
  },
  txtTitle: {
    color: colors.textColor,
    fontSize: scaler(16),
    ...stylesCommon.fontWeight600,
  },
  txtContent: {
    color: '#515151',
    fontSize: 12,
    marginTop: 8,
    ...stylesCommon.fontWeight400,
    lineHeight: 15,
    width: '100%',
  },
  viewTxtToogle: {
    width: '85%',
  },
  containerToogle: {
    width: scaler(36),
    height: scaler(20),
    borderRadius: scaler(200),
    padding: scaler(2),
  },
  cricle: {
    width: scaler(16),
    height: scaler(16),
    borderRadius: scaler(8),
    backgroundColor: '#FFFFFF',
  },
  txtTitleToogle: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
  },
  txtContentToogle: {
    color: '#515151',
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
    marginTop: scaler(8),
  },
  viewListUser: {
    width: '100%',
    paddingHorizontal: scaler(16),
  },
  viewButton: {
    width: '100%',
    paddingTop: scaler(12),
    paddingBottom: scaler(32),
    paddingHorizontal: scaler(16),
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-end',
  },
  iconLive: {
    width: scaler(20),
    height: scaler(20),
    borderRadius: scaler(20/2),
  },
  buttonRaiseHand: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scaler(133),
    height: scaler(48),
    borderRadius: scaler(200),
    justifyContent: 'center',
    backgroundColor: '#F6F4F6',
  },
  txtRaiseHand: {
    ...stylesCommon.fontWeight600,
    color: colors.textColor,
    fontSize: scaler(14),
    marginLeft: scaler(8),
  },
  iconHand: {
    width: scaler(32),
    height: scaler(32),
  },
  iconLeave: {
    width: scaler(24),
    height: scaler(24),
    tintColor: colors.primary,
  },
  txtViewMore: {
    color: colors.primary,
    fontSize: scaler(12),
    ...stylesCommon.fontWeight600,
    marginTop: scaler(5),
  },
});

export {styles};
