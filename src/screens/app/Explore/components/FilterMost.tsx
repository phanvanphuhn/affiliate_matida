import {SvgCaretDown} from '@images';
import {changePageExplore} from '@redux';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {t} from 'i18next';
import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {IOption, Option, Page} from '../type';
import {HeaderFilter} from './HeaderFilter';

const heightItemModal = scaler(50);

type Props = {
  onCallback: () => void;
  pageExplore: Page;
};

export const FilterMost = ({onCallback, pageExplore}: Props) => {
  const filter = useSelector((state: any) => state?.explore?.filter);
  const value = filter?.option;
  const dispatch = useDispatch();

  const [visible, setVisible] = useState<boolean>(false);

  const listItem: IOption[] = [
    {
      id: 1,
      label: t('explore.recent'),
      value: Option.RECENT,
    },
    {
      id: 2,
      label: t('explore.popular'),
      value: Option.POPULAR,
    },
  ];

  const lengthList = listItem.length;
  const heightModal = scaler(heightItemModal * lengthList + 100);

  const handlePress = (item: IOption) => {
    setVisible(false);
    onCallback();
    dispatch(
      changePageExplore({
        page: 1,
        pageExplore: pageExplore,
        expert: '',
        option: item.value,
        trimesters: filter?.filterTopic?.trimesters,
        topics: filter?.filterTopic?.topics,
      }),
    );
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        activeOpacity={0.9}
        style={[
          styles.btnOption,
          {
            marginRight: scaler(5),
            marginLeft: 0,
            backgroundColor: '#F7F7F7',
          },
        ]}>
        <Text
          style={{
            ...stylesCommon.fontWeight400,
            fontSize: scaler(14),
            textAlign: 'center',
          }}>
          {listItem.find(item => item.value === value)?.label}
        </Text>
        <SvgCaretDown stroke={colors.gray200} />
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
            onStartShouldSetResponder={() => setVisible(false)}
          />
          <View style={[styles.containerViewModal, {height: heightModal}]}>
            <HeaderFilter
              onPress={() => setVisible(false)}
              title={t('explore.titleSort')}
            />
            <KeyboardAwareScrollView
              contentContainerStyle={styles.keyboardAwareScrollView}>
              {listItem.map(item => (
                <RenderItem
                  item={item}
                  onPress={() => handlePress(item)}
                  value={value}
                  key={item.id}
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
  item: IOption;
  onPress: (item: IOption) => void;
  value: Option;
}

const RenderItem = ({item, onPress, value}: RenderItemProps) => {
  const isSelected = item.value === value;
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={[
        styles.containerItemModal,
        isSelected && styles.viewSelected,
        {
          borderTopWidth: item.id === 1 ? scaler(1) : scaler(0.5),
          borderBottomWidth: item.id === 2 ? scaler(1) : scaler(0.5),
        },
      ]}>
      <Text style={[styles.textLabel, {textAlign: 'center'}]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scaler(10),
    paddingHorizontal: scaler(12),
    borderRadius: scaler(40),
  },
  textLabel: {
    ...stylesCommon.fontWeight500,
    fontSize: scaler(16),
    lineHeight: scaler(19),
    color: colors.textColor,
  },
  containerItemModal: {
    paddingVertical: scaler(10),
    height: heightItemModal,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: scaler(16),
    borderWidth: 1,
    borderColor: colors.gray,
    padding: scaler(12),
  },
  viewSelected: {
    backgroundColor: colors.gray,
    borderRadius: scaler(8),
  },
  keyboardAwareScrollView: {
    paddingBottom: scaler(30),
  },
  containerViewModal: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: scaler(10),
    borderTopRightRadius: scaler(10),
    // paddingHorizontal: scaler(16),
  },
  viewOut: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});
