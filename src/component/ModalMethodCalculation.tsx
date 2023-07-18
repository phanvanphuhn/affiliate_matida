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

import {
  SvgArrowDown,
  SvgArrowLeft,
  SvgRadioCircle,
  SvgRadioSelected,
} from '@images';
import {colors, scaler, stylesCommon} from '@stylesCommon';
import {DefaultTFuncReturn, t} from 'i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AppButton} from './AppButton';

enum CalculationMethod {
  FIRST_DAY_OF_LAST_PERIOD = 'FIRST_DAY_OF_LAST_PERIOD',
  IVF = 'IVF',
}

interface IItem {
  label: string;
  value: any;
  link: string | undefined;
}

interface Props {
  stylesSelection?: StyleProp<ViewStyle>;
  stylesTextTitle?: StyleProp<TextStyle>;
  stylesTextLabel?: StyleProp<TextStyle>;
  stylesTextPlaceholder?: StyleProp<TextStyle>;
  hideIcon?: boolean;
  titleSelection?: string | DefaultTFuncReturn;
  value: any;
  onPress?: (value: any) => void;
  placeholder?: string | DefaultTFuncReturn;
}

const heightItemModal = scaler(50);

export const ModalMethodCalculation = ({
  stylesSelection,
  stylesTextTitle,
  stylesTextLabel,
  stylesTextPlaceholder,
  hideIcon = false,
  titleSelection = '',
  value,
  onPress = () => {},
  placeholder = '',
}: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [valueChoose, setValueChoose] = useState<any>(value);
  const listItem = [
    {
      label: t('CalculationMethod.first_day_of_last_period'),
      value: CalculationMethod.FIRST_DAY_OF_LAST_PERIOD,
      link: undefined,
    },
    {
      label: t('CalculationMethod.ivf'),
      value: CalculationMethod.IVF,
      link: ` (${t('CalculationMethod.whatIsIVF')})`,
    },
  ];
  const lengthList = listItem.length;
  const itemSelected = listItem.find(item => value === item.value);

  const heightModal = scaler(heightItemModal * lengthList + 100 + scaler(54));
  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setValueChoose(value);
  };

  const handleSelection = (item: IItem) => {
    setValueChoose(item.value);
  };

  const handleSave = () => {
    onPress(valueChoose);
    setVisible(false);
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
          <View
            style={[
              styles.containerViewModal,
              {height: heightModal, paddingVertical: scaler(16)},
            ]}>
            <View style={{marginBottom: scaler(8)}}>
              <Text style={[styles.textTitle, stylesTextTitle]}>
                {titleSelection}
              </Text>
            </View>
            <KeyboardAwareScrollView
              contentContainerStyle={styles.keyboardAwareScrollView}
              bounces={false}>
              {listItem.map((item, index) => (
                <RenderItem
                  item={item}
                  onPress={handleSelection}
                  value={valueChoose}
                  key={index}
                />
              ))}
              <AppButton
                titleButton={t('chooseDueDate.save')}
                customStyleButton={{marginTop: scaler(8)}}
                onClick={handleSave}
              />
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
  const [show, setShow] = useState<boolean>(false);
  const handlePressIVF = () => {
    setShow(true);
  };
  const isIVF = item.value === CalculationMethod.IVF;
  return (
    <>
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={[
          styles.containerItemModal,
          isIVF && {borderTopWidth: scaler(1), borderColor: colors.gray},
        ]}
        activeOpacity={0.9}>
        <View style={styles.radioImg}>
          {isSelected ? (
            <SvgRadioSelected color={'#717D84'} />
          ) : (
            <SvgRadioCircle color={'#717D84'} />
          )}
        </View>
        <Text
          style={[styles.textLabel, {textAlign: 'center'}]}
          numberOfLines={1}>
          {item.label}
        </Text>
        {!!item.link && (
          <TouchableOpacity activeOpacity={0.9} onPress={handlePressIVF}>
            <Text style={[styles.textLabel, styles.textLink]}>{item.link}</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={show}
        onRequestClose={() => setShow(false)}
        animationType="fade">
        <View style={styles.containerModal}>
          <View
            style={styles.viewOut}
            //@ts-ignore
            onStartShouldSetResponder={() => setShow(false)}
          />
          <View
            style={[
              styles.containerViewModal,
              {height: '60%', paddingVertical: scaler(16)},
            ]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => setShow(false)}
                activeOpacity={0.9}
                style={{paddingRight: scaler(8)}}>
                <SvgArrowLeft stroke={colors.gray200} />
              </TouchableOpacity>
              <Text
                style={{
                  ...stylesCommon.fontWeight500,
                  fontSize: scaler(16),
                  color: colors.black,
                }}>
                {t('CalculationMethod.whatIsIVF')}
              </Text>
            </View>
            <KeyboardAwareScrollView
              contentContainerStyle={[
                styles.keyboardAwareScrollView,
                {paddingTop: scaler(28)},
              ]}>
              <Text
                style={{
                  ...stylesCommon.fontWeight400,
                  fontSize: scaler(14),
                  color: colors.gray200,
                }}>
                {t('CalculationMethod.detailIVF')}
              </Text>
            </KeyboardAwareScrollView>
          </View>
        </View>
      </Modal>
    </>
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
    fontSize: scaler(16),
    color: colors.textColor,
  },
  textTitle: {
    ...stylesCommon.fontWeight500,
    color: colors.textSmallColor,
    fontSize: scaler(14),
    // lineHeight: scaler(15),
    marginBottom: scaler(8),
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
    justifyContent: 'flex-start',
    flexDirection: 'row',
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
  radioImg: {
    marginRight: scaler(12),
  },
  textLink: {
    color: colors.brandMainPinkRed,
  },
});
