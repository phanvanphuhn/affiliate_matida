import React, {useState} from 'react';
import {
  Modal,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {SvgArrowDown} from '@images';
import {colors, heightScreen, scaler, stylesCommon} from '@stylesCommon';
import {DefaultTFuncReturn} from 'i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IItem} from './_type';

interface SelectionPickerProps {
  stylesSelection?: StyleProp<ViewStyle>;
  stylesTextTitle?: StyleProp<TextStyle>;
  stylesTextLabel?: StyleProp<TextStyle>;
  stylesTextPlaceholder?: StyleProp<TextStyle>;
  hideIcon?: boolean;
  titleSelection?: string | DefaultTFuncReturn;
  value: any;
  onPress?: (value: any) => void;
  listItem: IItem[];
  longModal?: boolean;
  placeholder?: string | DefaultTFuncReturn;
}

const heightItemModal = scaler(50);
const heightLongModal = scaler((2 * heightScreen) / 3) + scaler(100);

export const SelectionPicker = ({
  stylesSelection,
  stylesTextTitle,
  stylesTextLabel,
  stylesTextPlaceholder,
  hideIcon = false,
  titleSelection = '',
  value,
  onPress = () => {},
  listItem,
  longModal = false,
  placeholder = '',
}: SelectionPickerProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const lengthList = listItem.length;
  const itemSelected = listItem.find(item => value === item.value);
  const heightModal =
    longModal || heightItemModal * lengthList > heightLongModal
      ? heightLongModal
      : scaler(heightItemModal * lengthList + 100);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleSelection = (item: IItem) => {
    onPress(item.value);
    handleCloseModal();
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.container, stylesSelection]}
        onPress={handleOpenModal}>
        <View style={styles.textView}>
          {!!titleSelection && (
            <Text style={[styles.textTitle, stylesTextTitle]}>
              {titleSelection}
            </Text>
          )}
          {!!itemSelected ? (
            <Text style={[styles.textLabel, stylesTextLabel]}>
              {itemSelected.label}
            </Text>
          ) : (
            <Text style={[styles.placeholder, stylesTextPlaceholder]}>
              {placeholder}
            </Text>
          )}
        </View>
        {!hideIcon && <SvgArrowDown style={styles.icon} />}
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => {}}
        animationType="fade">
        <View style={styles.containerModal}>
          <View
            style={styles.viewOut}
            //@ts-ignore
            onStartShouldSetResponder={handleCloseModal}
          />
          <View style={[styles.containerViewModal, {height: heightModal}]}>
            <View style={styles.viewHeaderModal}>
              <Text style={[styles.textTitle, stylesTextTitle]}>
                {titleSelection}
              </Text>
            </View>
            <KeyboardAwareScrollView
              contentContainerStyle={styles.keyboardAwareScrollView}>
              {listItem.map((item, index) => (
                <RenderItem
                  item={item}
                  onPress={handleSelection}
                  value={value}
                  key={index}
                />
              ))}
            </KeyboardAwareScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

interface RenderItemProps {
  item: IItem;
  onPress: (item: IItem) => void;
  value: string;
}
const RenderItem = ({item, onPress, value}: RenderItemProps) => {
  const isSelected = item.value === value;
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={[styles.containerItemModal, isSelected && styles.viewSelected]}>
      <Text style={[styles.textLabel, {textAlign: 'center'}]} numberOfLines={1}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scaler(54),
    backgroundColor: colors.white,
    borderRadius: scaler(8),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: scaler(8),
    paddingHorizontal: scaler(12),
  },
  textView: {
    flex: 1,
    paddingLeft: Platform.OS === 'ios' ? 0 : scaler(4),
  },
  textLabel: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(14),
    lineHeight: scaler(19),
    color: colors.textColor,
  },
  textTitle: {
    ...stylesCommon.fontWeight500,
    color: colors.gray50,
    fontSize: scaler(12),
    lineHeight: scaler(15),
    marginBottom: scaler(4),
  },
  icon: {
    marginLeft: scaler(8),
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  viewOut: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  containerViewModal: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: scaler(10),
    borderTopRightRadius: scaler(10),
    paddingHorizontal: scaler(16),
  },
  containerItemModal: {
    paddingVertical: scaler(10),
    height: heightItemModal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewSelected: {
    backgroundColor: colors.gray,
    borderRadius: scaler(8),
  },
  keyboardAwareScrollView: {
    paddingBottom: scaler(30),
  },
  viewHeaderModal: {
    paddingVertical: scaler(10),
  },
  placeholder: {
    color: colors.borderColor,
    fontSize: scaler(14),
    lineHeight: scaler(17),
    ...stylesCommon.fontWeight500,
  },
});
