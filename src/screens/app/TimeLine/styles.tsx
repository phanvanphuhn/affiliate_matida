import {StyleSheet} from 'react-native';
import {stylesCommon, scaler, colors} from '@stylesCommon';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewTxtHeader: {
    paddingHorizontal: scaler(20),
    marginTop: scaler(16),
  },
  txtShortDate: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    color: colors.primary,
  },
  txtLongDate: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(18),
    color: colors.primary,
    lineHeight: scaler(36),
    marginTop: scaler(4),
  },
  viewPickTime: {
    width: '100%',
    paddingHorizontal: scaler(30),
    marginTop: scaler(35),
  },
  viewContent: {
    flex: 1,
    paddingHorizontal: scaler(20),
    marginTop: scaler(30),
  },
  itemView: {
    height: scaler(50),
    borderRadius: scaler(8),
    backgroundColor: '#ED8989',
    justifyContent: 'center',
    paddingHorizontal: scaler(20),
    marginBottom: scaler(25),
  },
  txtContent: {
    ...stylesCommon.fontWeight400,
    fontSize: scaler(14),
    color: colors.white,
  },
  styleLeft: {
    alignItems: 'flex-start',
  },
  styleRight: {
    alignItems: 'flex-end',
  },
  styleCenter: {
    alignItems: 'center',
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
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtStt: {
    color: colors.primary,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight600,
  },
  viewRing1: {
    width: scaler(24),
    height: scaler(24),
    borderRadius: scaler(24 / 2),
    backgroundColor: '#E8F8F7',
    position: 'absolute',
    right: scaler(61),
    top: scaler(296),
  },
  viewRing2: {
    width: scaler(11),
    height: scaler(11),
    borderRadius: scaler(3),
    backgroundColor: '#F3F1FD',
    position: 'absolute',
    right: scaler(46),
    top: scaler(508),
  },
  viewRing3: {
    width: scaler(11),
    height: scaler(11),
    borderRadius: scaler(3),
    backgroundColor: '#FDF1F1',
    position: 'absolute',
    left: scaler(140),
    bottom: scaler(187),
  },
  viewRing4: {
    width: scaler(11),
    height: scaler(11),
    borderRadius: scaler(3),
    backgroundColor: '#FDF1F1',
    position: 'absolute',
    right: scaler(29),
    bottom: scaler(170),
  },
});

export {styles};
