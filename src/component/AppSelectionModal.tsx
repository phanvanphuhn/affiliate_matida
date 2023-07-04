import { colors, heightScreen, scaler, stylesCommon } from '@stylesCommon';
import { DefaultTFuncReturn } from 'i18next';
import React from 'react'
import { Modal, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IItem } from './_type';

interface AppSelectionModalProps {
  visible: boolean;
  listItem: IItem[];
  value: any;
  longModal?: boolean;
  titleSelection?: string | DefaultTFuncReturn;
  stylesTextTitle?: StyleProp<TextStyle>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  onPress?: (item: IItem) => void;
}

const heightItemModal = scaler(50);
const heightLongModal = scaler((2 * heightScreen) / 3) + scaler(100);


export const AppSelectionModal = ({
  visible,
  listItem,
  value,
  longModal = false,
  titleSelection,
  stylesTextTitle,
  setVisible,
  onPress = () => { },
}: AppSelectionModalProps) => {

  const lengthList = listItem.length;
  const heightModal =
    (longModal || heightItemModal * lengthList > heightLongModal)
      ? heightLongModal
      : scaler(heightItemModal * lengthList + 100);

  const handlePress = (item: IItem) => {
    onPress(item);
  }
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => { }}
      animationType="fade">
      <View style={styles.containerModal}>
        <View
          style={styles.viewOut}
          //@ts-ignore
          onStartShouldSetResponder={() => setVisible(false)}
        />
        <View style={[styles.containerViewModal, { height: heightModal }]}>
          <View style={styles.viewHeaderModal}>
            <Text style={[styles.textTitle, stylesTextTitle]}>{titleSelection}</Text>
          </View>
          <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAwareScrollView}>
            {listItem.map((item, index) => (
              <RenderItem
                item={item}
                onPress={() => handlePress(item)}
                value={value}
                key={index} />
            ))}
          </KeyboardAwareScrollView>
        </View>
      </View>
    </Modal>
  )
}

interface RenderItemProps {
  item: IItem;
  onPress: (item: IItem) => void;
  value: string;
}

const RenderItem = ({ item, onPress, value }: RenderItemProps) => {
  const isSelected = item.value === value
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={[styles.containerItemModal, isSelected && styles.viewSelected]}
    >
      <Text style={[styles.textLabel, { textAlign: 'center' }]}>{item.label}</Text>
    </TouchableOpacity>
  )
}

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
    paddingHorizontal: scaler(12)
  },
  textView: {
    flex: 1
  },
  textLabel: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(16),
    lineHeight: scaler(19),
    color: colors.textColor
  },
  textTitle: {
    ...stylesCommon.fontWeight500,
    color: colors.gray50,
    fontSize: scaler(12),
    lineHeight: scaler(15),
    marginBottom: scaler(4)
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
    justifyContent: 'center'
  },
  viewSelected: {
    backgroundColor: colors.gray,
    borderRadius: scaler(8)
  },
  keyboardAwareScrollView: {
    paddingBottom: scaler(30)
  },
  viewHeaderModal: {
    paddingVertical: scaler(10)
  },
  placeholder: {
    color: colors.borderColor,
    fontSize: scaler(14),
    lineHeight: scaler(17),
    ...stylesCommon.fontWeight500,

  }
});
