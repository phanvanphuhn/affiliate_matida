import {scaler} from '@stylesCommon';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {HeaderModalPost} from './HeaderModalPost';
type IItem = {
  id: number;
  label: string;
  value: number;
};
type Props = {
  onClose: () => void;
  onPress: (value: number) => void;
  value: number;
  listReason: IItem[];
};

export const ModalReason = ({onClose, onPress, value, listReason}: Props) => {
  const {t} = useTranslation();
  const handlePressReason = (item: IItem) => {
    onPress(item?.value);
  };
  return (
    <View style={[styles.containerViewModal, {height: scaler(400)}]}>
      <HeaderModalPost onPress={onClose} title={t('post.settings.report')} />
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={[
          styles.keyboardAwareScrollView,
          {paddingHorizontal: scaler(16)},
        ]}>
        {listReason.map(item => {
          return (
            <RenderItem
              item={item}
              value={value}
              onPress={handlePressReason}
              key={item?.id}
            />
          );
        })}
      </KeyboardAwareScrollView>
    </View>
  );
};

interface RenderItemProps {
  item: IItem;
  onPress: (item: IItem) => void;
  value: number;
}

const RenderItem = ({item, onPress, value}: RenderItemProps) => {
  const isSelected = item?.value === value;
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={[
        styles.containerItemModal,
        isSelected && styles.viewSelected,
        {borderWidth: 0},
      ]}>
      <Text style={[styles.textLabel, {textAlign: 'center'}]}>
        {item?.label}
      </Text>
    </TouchableOpacity>
  );
};
