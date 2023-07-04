import {colors, stylesCommon, scaler} from '@stylesCommon';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {iconClose} from '@images';
import SwitchToggle from 'react-native-switch-toggle';
import {useSelector, useDispatch} from 'react-redux';
import {getListSuggestGPT} from '@services';
import {changeStatusMute} from '@redux';
import {getBottomSpace} from 'react-native-iphone-x-helper';

const ModalSuggest = React.memo((prop: any) => {
  const dispatch = useDispatch();
  const {
    titleHeader,
    onCancel,
    onConfirm,
    visible,
    contentHeader,
    handleValue,
  } = prop;
  const closeModal = () => {
    onCancel();
  };
  const {t} = useTranslation();
  const lang = useSelector((state: any) => state?.auth?.lang);
  const [loading, setLoading] = useState(true);
  const [dataValue, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await getListSuggestGPT();
      setData(res?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible === true) {
      getData();
    }
  }, [visible]);

  const onClick = (item: any) => {
    closeModal();
    if (lang === 2) {
      handleValue(item?.question_vi);
    } else {
      handleValue(item?.question_en);
    }
  };

  return (
    <Modal
      statusBarTranslucent={true}
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
      animationType="fade">
      <View style={styles.containerModal}>
        <View
          style={styles.viewOut}
          //@ts-ignore
          onStartShouldSetResponder={closeModal}
        />
        <View style={styles.container}>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
              padding: scaler(16),
            }}>
            <TouchableOpacity onPress={onCancel}>
              <Image
                source={iconClose}
                style={{width: scaler(28), height: scaler(28)}}
              />
            </TouchableOpacity>
          </View>
          {loading === true ? (
            <View style={styles.viewContent}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : (
            <View style={styles.viewContent}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.txtHeader}>{t('chat.questionTida')}</Text>
                {dataValue?.length > 0 &&
                  dataValue?.map((item: any, index: any) => {
                    return (
                      <TouchableOpacity
                        style={styles.viewItem}
                        key={item?.id}
                        onPress={() => onClick(item)}>
                        <Text style={styles.txtSuggest}>
                          {lang === 2 ? item?.question_vi : item?.question_en}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    height: scaler(391),
  },
  viewHeader: {
    width: '100%',
    paddingVertical: scaler(8),
    alignItems: 'center',
  },
  viewTopHeader: {
    width: scaler(40),
    height: scaler(6),
    backgroundColor: '#EAEAEA',
    borderRadius: scaler(200),
  },
  iconClose: {
    width: scaler(24),
    height: scaler(24),
    tintColor: '#515151',
  },
  viewOut: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  txtHeader: {
    // marginVertical: scaler(41),
    fontSize: scaler(14),
    ...stylesCommon.fontWeight500,
    color: colors.textColor,
    marginBottom: scaler(12),
  },
  cricle: {
    width: scaler(16),
    height: scaler(16),
    borderRadius: scaler(8),
    backgroundColor: '#FFFFFF',
  },
  containerToogle: {
    width: scaler(36),
    height: scaler(20),
    borderRadius: scaler(200),
    padding: scaler(2),
  },
  viewContent: {
    flex: 1,
    paddingTop: scaler(8),
    paddingBottom: getBottomSpace() + scaler(10),
    paddingHorizontal: scaler(16),
  },
  viewItem: {
    width: '100%',
    backgroundColor: '#F6F4F6',
    borderRadius: scaler(8),
    marginBottom: scaler(12),
    paddingHorizontal: scaler(16),
    paddingVertical: scaler(12),
  },
  txtContent: {
    fontSize: scaler(14),
    textAlign: 'center',
    ...stylesCommon.fontPlus500,
    color: colors.textColor,
  },
  txtSuggest: {
    // marginVertical: scaler(41),
    fontSize: scaler(14),
    ...stylesCommon.fontWeight500,
    color: colors.textColor,
  },
});

export {ModalSuggest};
