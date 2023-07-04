import {colors, scaler, stylesCommon, widthScreen} from '@stylesCommon';
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  iconClose: {
    width: scaler(24),
    height: scaler(24),
  },
  viewContent: {
    ...stylesCommon.viewContainer,
    paddingHorizontal: scaler(20),
  },
  viewListComment: {
    ...stylesCommon.viewContainer,
  },
  viewInput: {
    width: '100%',
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    paddingTop: scaler(8),
    paddingBottom: Platform.OS === 'ios' ? scaler(8) : scaler(1),
  },
  txtTitleReply: {
    color: '#515151',
    ...stylesCommon.fontWeight400,
    marginLeft: scaler(14),
    fontSize: scaler(12),
  },
  txtNameReply: {
    color: colors.textColor,
    ...stylesCommon.fontWeight600,
    fontSize: scaler(12),
    maxWidth: '70%',
  },
  viewRepLy: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingBottom: scaler(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: scaler(32),
    height: scaler(32),
    borderRadius: scaler(32) / 2,
    marginRight: scaler(12),
  },
  viewInputBottom: {
    width:
      widthScreen -
      scaler(32) -
      scaler(45) -
      scaler(12) -
      scaler(9) -
      scaler(40),

    borderRadius: scaler(37),
    backgroundColor: colors.gray100,
    marginRight: scaler(9),
    paddingHorizontal: scaler(16),
    paddingVertical: scaler(4),
    maxHeight: scaler(120),
  },
  buttonSend: {
    width: scaler(40),
    height: scaler(40),
  },
  viewInputReply: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: scaler(1),
    paddingTop: scaler(8),
    borderTopColor: colors.gray100,
    paddingHorizontal: scaler(20),
  },
  input: {
    color: colors.textColor,
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    minHeight: Platform.OS == 'ios' ? scaler(30) : scaler(26),
  },
  viewEmpty: {
    alignItems: 'center',
    marginTop: scaler(20),
  },
  txtEmpty: {
    ...stylesCommon.fontWeight500,
    color: colors.borderColor,
    fontSize: scaler(14),
  },
  viewLoadmore: {
    alignItems: 'center',
    marginBottom: scaler(8),
  },
  iconReply: {
    width: scaler(16),
    height: scaler(16),
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textNotData: {
    textAlign: 'center',
    fontSize: scaler(18),
    ...stylesCommon.fontWeight500,
    color: colors.gray50,
    marginTop: scaler(24),
    marginHorizontal: scaler(24),
  },
});

export {styles};
