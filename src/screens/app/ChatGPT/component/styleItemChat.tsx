import {StyleSheet} from 'react-native';
import {scaler, stylesCommon, colors, widthScreen} from '@stylesCommon';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    // paddingLeft: scaler(17),
    marginBottom: scaler(8),
  },
  containerCurrent: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: scaler(17),
    marginBottom: scaler(8),
  },
  chat: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: scaler(8),
  },
  viewMessageCurrent: {
    maxWidth: '80%',
    padding: scaler(10),
    borderRadius: scaler(8),
    backgroundColor: '#FFFFFF',
  },
  imageAvatar: {
    width: scaler(30),
    height: scaler(30),
    borderRadius: scaler(15),
  },
  viewMessage: {
    maxWidth: '70%',
    padding: scaler(10),
    borderRadius: scaler(8),
    backgroundColor: '#E66D6E',
    marginLeft: scaler(9),
  },
  txtMsgCurrent: {
    color: '#1C272D',
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
  },
  txtMsg: {
    color: '#FFFFFF',
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
  },
  imageMessage: {
    borderRadius: scaler(8),
    marginLeft: scaler(32) + scaler(5),
    marginBottom: scaler(8),
  },
  imageMessageCurrent: {
    borderRadius: scaler(8),
    marginBottom: scaler(8),
  },
  txtDate: {
    fontSize: scaler(12),
    ...stylesCommon.fontWeight400,
    color: '#717D84',
    marginLeft: scaler(32) + scaler(9) + scaler(17),
  },
  viewCenter: {
    width: '100%',
    paddingHorizontal: scaler(10),
    alignItems: 'center',
    marginVertical: scaler(18),
    flexDirection: 'row',
  },
  txtDateCenter: {
    color: '#A8A8A8',
    fontSize: scaler(14),
    ...stylesCommon.fontWeight400,
    marginHorizontal: scaler(13),
  },
  viewRowRight: {
    flex: 1,
    height: scaler(1),
    backgroundColor: '#A8A8A8',
  },
  viewRowLeft: {
    flex: 1,
    height: scaler(1),
    backgroundColor: '#A8A8A8',
  },
  imageMessageItem: {
    width: scaler(160),
    height: scaler(160),
    borderRadius: scaler(8),
  },
  viewSpecialMessage: {
    width: '100%',
    paddingHorizontal: scaler(16),
    marginBottom: scaler(18),
  },
  txtSpecialTop: {
    textAlign: 'center',
    marginBottom: scaler(8),
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    color: colors.textColor,
  },
  txtSpecialTopBold: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    color: colors.textColor,
  },
  containerMessageSpecial: {
    padding: scaler(16),
    borderRadius: scaler(8),
    backgroundColor: '#FFFFFF',
  },
  txtSpecialTitle: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    color: colors.textColor,
  },
  viewRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scaler(20),
  },
  iconCalendar: {
    width: scaler(16),
    height: scaler(16),
  },
  txtTimeSpecial: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
    color: colors.textColor,
    marginLeft: scaler(10),
  },
  viewColumn: {
    height: '100%',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    marginHorizontal: scaler(12),
  },
  txtSpecialHostTitleName: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(12),
    color: colors.textColor,
    flex: 1,
  },
  txtSpecialHostName: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(12),
    color: colors.textColor,
  },
  viewButtonSpecial: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonSpecial: {
    width: (widthScreen - scaler(32) - scaler(32) - scaler(8)) / 2,
    height: scaler(41),
    borderRadius: scaler(4),
  },
  backgroundGray: {
    backgroundColor: '#F6F4F6',
  },
  txtButtonSpecial: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(14),
    color: colors.textColor,
  },
  viewStatus: {
    paddingVertical: scaler(4),
    paddingHorizontal: scaler(8),
    backgroundColor: colors.primary,
    borderRadius: scaler(4),
    marginLeft: scaler(8),
  },
  txtType: {
    color: '#FFFFFF',
    fontSize: scaler(12),
    ...stylesCommon.fontWeight600,
  },
  viewAvatar: {
    width: scaler(32),
    height: scaler(32),
    borderRadius: scaler(32) / 2,
    backgroundColor: '#FFFFFF',
    marginLeft: scaler(17),
  },
});

export {styles};
