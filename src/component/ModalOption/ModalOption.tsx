import {AppModal} from '@component';
import {reportPostApi} from '@services';
import {heightScreen, scaler, widthScreen} from '@stylesCommon';
import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import {HeaderModalPost} from './HeaderModalPost';
import {ModalReportPost} from './ModalReportPost';
import {styles} from './styles';
import {IOption, Option} from './type';

type Props = {
  listItem: IOption[];
  onClose: () => void;
  idPost: number | string | null;
  title?: any;
};

export const ModalOption = ({listItem, onClose, idPost = 0, title}: Props) => {
  const {t} = useTranslation();

  const refReport = useRef<any>(undefined);

  const handlePressOption = (item: IOption) => {
    item?.onPress();
    if (item?.value === Option.REPORT) {
      refReport.current?.open();
    } else {
      onClose();
    }
  };

  const handleReport = (reason: number, text: string) => {
    refReport.current?.close();
    onClose();
    const params = {
      post_id: idPost ? +idPost : 0,
      reason: reason,
      text: text,
    };
    const toast = setTimeout(() => {
      getReportApi(params);
    }, 4000);
    Toast.show({
      type: 'customToastPost',
      props: {onPress: () => clearTimeout(toast)},
    });
  };

  const getReportApi = async (params: any) => {
    try {
      const res = await reportPostApi(params);
    } catch (e) {
    }
  };

  return (
    <>
      <View style={[styles.containerViewModal]}>
        <HeaderModalPost
          onPress={onClose}
          title={t('post.settings.postSettings')}
          style={{
            borderBottomWidth: 0,
            marginBottom: 0,
          }}
        />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.keyboardAwareScrollView}>
          {listItem.map(item => (
            <RenderItemOption
              item={item}
              onPress={() => handlePressOption(item)}
              key={item?.id}
            />
          ))}
        </KeyboardAwareScrollView>
      </View>
      <AppModal
        position="bottom"
        ref={refReport}
        modalSize={{
          height:
            Platform.OS === 'ios'
              ? (2 * heightScreen) / 3
              : heightScreen - scaler(100),
          width: widthScreen,
        }}>
        <ModalReportPost
          onClose={() => refReport.current?.close()}
          onReport={handleReport}
        />
      </AppModal>
    </>
  );
};

interface RenderItemProps {
  item: IOption;
  onPress: () => void;
  // value: Option;
}

const RenderItemOption = ({item, onPress}: RenderItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.containerItemModal,
        {
          borderTopWidth: item?.id === 1 ? scaler(1) : scaler(0.5),
          borderBottomWidth: item?.id === 2 ? scaler(1) : scaler(0.5),
        },
      ]}>
      {item?.icon}
      <Text style={[styles.textLabel, {textAlign: 'center'}]}>
        {item?.label}
      </Text>
    </TouchableOpacity>
  );
};
