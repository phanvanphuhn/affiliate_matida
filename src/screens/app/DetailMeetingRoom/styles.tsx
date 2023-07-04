import React from 'react';
import {StyleSheet} from 'react-native';
import {scaler, stylesCommon, colors} from '@stylesCommon';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewLoading: {
    ...stylesCommon.viewContainer,
    justifyConten: 'center',
    alignItems: 'center',
  },
  viewHeader: {
    width: scaler(36),
    justifyContent: 'center',
    alignItems: 'center',
    height: scaler(36),
    borderRadius: scaler(36) / 2,
    backgroundColor: '#FFF5F4',
    marginLeft: scaler(16),
  },
  iconEdit: {
    width: scaler(24),
    height: scaler(24),
  },
  content: {
    flex: 1,
  },
  txtHeader: {
    color: colors.textColor,
    fontSize: scaler(14),
    marginLeft: scaler(12),
    ...stylesCommon.fontWeight500,
    marginRight: scaler(16),
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
  txtDateTime: {
    color: colors.textColor,
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
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
    // marginTop: 8,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewRowStatusLive: {
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
  imageLive: {
    width: scaler(20),
    height: scaler(20),
    marginRight: scaler(8),
    borderRadius: scaler(20 / 2),
  },
  txtLive: {
    color: '#FFFFFF',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight600,
  },
  txtViewMore: {
    color: colors.primary,
    fontSize: scaler(12),
    ...stylesCommon.fontWeight600,
    marginTop: scaler(5),
  },
  textEnded: {
    color: colors.brandMainPinkRed,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(12),
    marginBottom: scaler(8),
  },
  viewImageAvatar: {
    width: '100%',
    paddingBottom: scaler(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHost: {
    width: scaler(154),
    height: scaler(154),
    borderRadius: scaler(8),
  },
  viewExp: {
    paddingHorizontal: scaler(8),
    paddingVertical: scaler(4),
    borderRadius: scaler(4),
    backgroundColor: colors.primary,
  },
  txtExp: {
    fontSize: scaler(12),
    ...stylesCommon.fontWeight600,
    color: '#FFFFFF',
  },
  buttonShare: {
    flexDirection: 'row',
    borderRadius: scaler(4),
    alignItems: 'center',
    backgroundColor: colors.yellow100,
    marginBottom: scaler(8),
    paddingVertical: scaler(4),
    paddingHorizontal: scaler(8),
    alignSelf: 'flex-end',
  },
  textButtonShare: {
    color: colors.primary,
    ...stylesCommon.fontWeight500,
    fontSize: scaler(14),
    marginLeft: scaler(8),
  },
  buttonEnd: {
    height: scaler(54),
    paddingHorizontal: scaler(20),
    borderWidth: 1,
    borderColor: '#EA3333',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: scaler(8),
  },
  buttonStart: {
    flex: 1,
    paddingHorizontal: scaler(20),
  },
  viewSpace: {
    flex: 1,
  },
  viewRectage:{
    width: scaler(17),
    height: scaler(17),
    backgroundColor: '#EA3333',
    marginRight: scaler(11)
  },
  txtEnd:{
    color: '#EA3333',
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14)
  }
});

export {styles};
