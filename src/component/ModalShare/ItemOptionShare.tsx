import {colors, scaler, stylesCommon} from '@stylesCommon';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {IItemShare} from './type';

interface RenderItemProps {
  item: IItemShare;
}

export const ItemOptionShare = ({item}: RenderItemProps) => {
  return (
    <TouchableOpacity
      onPress={item.onPress}
      activeOpacity={0.8}
      style={[styles.containerItemModal]}>
      <>
        {item.icon}
        <Text style={[styles.textLabel]}>{item.label}</Text>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerItemModal: {
    paddingVertical: scaler(10),
    height: scaler(50),
    borderTopWidth: scaler(1),
    borderColor: colors.gray,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textLabel: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(16),
    color: colors.textColor,
    marginLeft: scaler(12),
  },
});
