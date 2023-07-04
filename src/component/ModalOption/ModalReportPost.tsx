import {AppButton, AppModal} from '@component';
import {CaretDown} from '@images';
import {
  colors,
  heightScreen,
  scaler,
  stylesCommon,
  widthScreen,
} from '@stylesCommon';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {HeaderModalPost} from './HeaderModalPost';
import {ModalReason} from './ModalReason';

type IItem = {
  id: number;
  label: string;
  value: number;
};
type Props = {
  onClose: () => void;
  onReport: (reason: number, text: string) => void;
};

export const ModalReportPost = ({onClose, onReport}: Props) => {
  const {t} = useTranslation();
  const heightModal = scaler(480);
  const [reason, setReason] = useState<number>(0);
  const [text, onChangeText] = useState<string>('');

  const refInput = useRef<TextInput>(null);

  const listReason: IItem[] = [
    {id: 1, label: t('post.inappropriate'), value: 1},
    {id: 2, label: t('post.sexual'), value: 2},
    {id: 3, label: t('post.discriminatory'), value: 3},
    {id: 4, label: t('post.others'), value: 4},
  ];

  const refReason = useRef<any>(undefined);

  const disable = reason === 0;

  const handlePressReason = (value: number) => {
    setReason(value);
    refReason.current?.close();
  };

  const handlePressReport = () => {
    onReport(reason, text);
  };

  return (
    <>
      <View style={[styles.containerViewModal, {height: heightModal}]}>
        <HeaderModalPost
          onPress={onClose}
          title={t('post.settings.report')}
          style={{
            borderBottomWidth: 0,
            marginBottom: 0,
          }}
        />
        <KeyboardAwareScrollView
          bounces={false}
          contentContainerStyle={[
            styles.keyboardAwareScrollView,
            {
              paddingHorizontal: scaler(16),
              justifyContent: 'space-between',
              paddingTop: scaler(16),
              flex: 1,
              borderTopWidth: scaler(1),
              borderColor: colors.gray,
            },
          ]}>
          <View>
            <Text
              style={{
                color: colors.textColor,
                fontSize: scaler(14),
                ...stylesCommon.fontWeight600,
              }}>
              {t('post.titleIssue')}
              <Text style={{color: colors.brandMainPinkRed}}>*</Text>
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                // refReport.current?.close();
                refReason.current?.open();
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#F6F6F6',
                height: scaler(56),
                borderRadius: scaler(8),
                paddingHorizontal: scaler(12),
                marginTop: scaler(8),
              }}>
              <Text
                style={{
                  color: reason ? colors.black : colors.borderColor,
                  fontSize: scaler(14),
                  ...stylesCommon.fontWeight500,
                }}>
                {listReason?.find(item => item.value === reason)?.label ||
                  t('post.chooseReason')}
              </Text>
              <Image source={CaretDown} style={{marginLeft: scaler(8)}} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: scaler(16),
                backgroundColor: '#F6F6F6',
                marginTop: scaler(16),
                borderRadius: scaler(8),
                paddingTop: Platform.OS === 'ios' ? scaler(16) : 0,
                paddingLeft: Platform.OS === 'ios' ? scaler(12) : scaler(8),
                height: Platform.OS === 'ios' ? scaler(168) : scaler(150),
              }}
              activeOpacity={1}
              onPress={() => refInput.current?.focus()}>
              <TextInput
                ref={refInput}
                onChangeText={onChangeText}
                value={text}
                placeholder={t('post.typeAny') as string}
                placeholderTextColor={colors.textSmallColor}
                maxLength={1000}
                multiline
                style={{
                  borderRadius: scaler(8),
                  fontSize: scaler(14),
                  ...stylesCommon.fontWeight400,
                  color: colors.black,
                  paddingVertical: Platform.OS === 'ios' ? 0 : scaler(16),
                  marginBottom: Platform.OS === 'ios' ? scaler(4) : 0,
                  textAlignVertical: 'top',
                  // height: scaler(168),
                }}
              />
            </TouchableOpacity>
          </View>
          <AppButton
            titleButton={t('post.report')}
            disable={disable}
            customStyleButton={disable ? {opacity: 0.5} : {}}
            onClick={handlePressReport}
          />
        </KeyboardAwareScrollView>
      </View>
      <AppModal
        position="bottom"
        ref={refReason}
        modalSize={{
          height: heightScreen / 2,
          width: widthScreen,
        }}>
        <ModalReason
          onClose={() => refReason.current?.close()}
          onPress={handlePressReason}
          listReason={listReason}
          value={reason}
        />
      </AppModal>
    </>
  );
};
