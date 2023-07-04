import React from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {HeaderModalPost} from './HeaderModalPost';
import {StyleSheet} from 'react-native';
import {stylesCommon, scaler, colors} from '@stylesCommon';

const heightItemModal = scaler(50);

export type IOption = {
  id: number;
  label: string;
  onPress: () => void;
  value: 'BLOCK';
  icon: React.ReactNode;
};

type Props = {
  listItem: IOption[];
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title?: any;
};

export const ModalOption = ({listItem, visible, setVisible, title}: Props) => {
  const {t} = useTranslation();
  const lengthList = listItem.length;
  const heightModal = scaler(heightItemModal * lengthList + 100);
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
      animationType="fade">
      <View style={styles.containerModal}>
        <View
          style={styles.viewOut}
          //@ts-ignore
          onStartShouldSetResponder={() => setVisible(false)}
        />
        <View style={[styles.containerViewModal, {height: heightModal}]}>
          <HeaderModalPost
            onPress={() => setVisible(false)}
            title={t('post.settings.postSettings')}
          />
          <KeyboardAwareScrollView
            contentContainerStyle={styles.keyboardAwareScrollView}>
            {listItem.map(item => (
              <RenderItemOption
                item={item}
                onPress={item?.onPress}
                key={item?.id}
              />
            ))}
          </KeyboardAwareScrollView>
        </View>
      </View>
    </Modal>
  );
};

interface RenderItemProps {
  item: IOption;
  onPress: () => void;
}

const RenderItemOption = ({item, onPress}: RenderItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.containerItemModal,
        {
          borderTopWidth: item.id === 1 ? scaler(1) : scaler(0.5),
          borderBottomWidth: item.id === 2 ? scaler(1) : scaler(0.5),
        },
      ]}>
      {item?.icon}
      <Text style={[styles.textLabel, {textAlign: 'center'}]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
    backgroundColor: '#F6F6F6',
  },
  buttonRight: {
    ...stylesCommon.fontWeight600,
    fontSize: scaler(14),
    color: colors.primary,
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
  viewCreate: {
    width: '100%',
  },
  viewRow: {
    width: '100%',
    paddingHorizontal: scaler(17),
    paddingVertical: scaler(13),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF1F1',
    borderRadius: scaler(8),
  },
  txtCreate: {
    color: colors.primary,
    fontSize: scaler(14),
    ...stylesCommon.fontWeight600,
    marginLeft: scaler(9),
  },
  containerCreate: {
    paddingHorizontal: scaler(20),
    paddingTop: scaler(16),
    backgroundColor: '#FFFFFF',
    marginBottom: scaler(16),
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
  },
  keyboardAwareScrollView: {
    paddingBottom: scaler(30),
  },
  containerItemModal: {
    paddingVertical: scaler(10),
    height: scaler(50),
    alignItems: 'center',
    paddingHorizontal: scaler(16),
    borderWidth: 1,
    borderColor: colors.gray,
    padding: scaler(12),
    flexDirection: 'row',
  },
  textLabel: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(16),
    lineHeight: scaler(19),
    color: colors.textColor,
    marginLeft: scaler(12),
  },
});
